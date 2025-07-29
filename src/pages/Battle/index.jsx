import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { usePlayer } from '../../hooks/usePlayer'
import { useSocket } from '../../hooks/useSocket'
import api from '../../services/api'
import { toast } from 'sonner'

import {
  Container,
  Arena,
  MonsterContainer,
  InfoBox,
  MonsterName,
  HealthBarOuter,
  HealthBarInner,
  GifDisplay,
  ActionLog,
  Controls,
  ActionButton,
  EndGameOverlay,
  NavButton,
} from './styles'

const ATTACK_ANIMATION_DURATION = 1000
const DEFEND_ANIMATION_DURATION = 1500
const SPECIAL_ANIMATION_DURATION = 2200
const HIT_ANIMATION_DURATION = 1200
const DEATH_ANIMATION_DURATION = 2000

const initialAnimationState = { player: 'default', opponent: 'default' }

export const BattlePage = () => {
  const [battle, setBattle] = useState(null)
  const [monsters, setMonsters] = useState({ player: null, opponent: null })
  const [animation, setAnimation] = useState(initialAnimationState)
  const [isAnimating, setIsAnimating] = useState(false)
  const [actionLog, setActionLog] = useState('A batalha começou!')
  const [showEndGameOverlay, setShowEndGameOverlay] = useState(false)
  const [monsterVisibility, setMonsterVisibility] = useState({
    player: true,
    opponent: true,
  })

  const { player, stats, updateStats } = usePlayer()
  const socket = useSocket()
  const navigate = useNavigate()
  const location = useLocation()
  const { id: battleId } = useParams()

  useEffect(() => {
    const fetchBattleAndMonsterData = async () => {
      try {
        let currentBattle = location.state?.battleData
        if (!currentBattle) {
          const res = await api.get(`/api/battle/${battleId}`)
          currentBattle = res.data
        }
        setBattle(currentBattle)

        const isPlayer1 = currentBattle.player1_id === player.id
        const playerMonsterId = isPlayer1
          ? currentBattle.monster1_id
          : currentBattle.monster2_id
        const opponentMonsterId = isPlayer1
          ? currentBattle.monster2_id
          : currentBattle.monster1_id

        const [playerMonsterRes, opponentMonsterRes] = await Promise.all([
          api.get(`/api/monster/${playerMonsterId}`),
          api.get(`/api/monster/${opponentMonsterId}`),
        ])

        setMonsters({
          player: playerMonsterRes.data,
          opponent: opponentMonsterRes.data,
        })
      } catch {
        toast.error('Batalha não encontrada. Redirecionando...')
        navigate('/lobby')
      }
    }

    if (player) {
      fetchBattleAndMonsterData()
    }
  }, [battleId, location.state, player, navigate])

  useEffect(() => {
    if (!socket || !battle || !monsters.player) return

    const handleBattleUpdate = data => {
      const { battle: updatedBattle, lastAction } = data
      const { playerId: attackerId, type: actionType } = lastAction

      const isPlayerTheAttacker = attackerId === player.id
      const attackerName = isPlayerTheAttacker
        ? monsters.player.name
        : monsters.opponent.name

      setIsAnimating(true)
      setActionLog(`${attackerName} usou ${actionType}!`)
      setAnimation({
        player: isPlayerTheAttacker ? actionType : 'default',
        opponent: !isPlayerTheAttacker ? actionType : 'default',
      })

      const resetTurn = () => {
        setAnimation(initialAnimationState)
        const nextPlayerName =
          updatedBattle.current_turn_player_id === player.id
            ? 'você'
            : 'seu oponente'
        setActionLog(`É o turno de ${nextPlayerName}.`)
        setIsAnimating(false)
      }

      const myCurrentPlayerKey =
        battle.player1_id === player.id ? 'player1' : 'player2'
      const opponentCurrentPlayerKey =
        battle.player1_id === player.id ? 'player2' : 'player1'

      const myOldHp = battle.battle_state[myCurrentPlayerKey].hp
      const myNewHp = updatedBattle.battle_state[myCurrentPlayerKey].hp
      const opponentOldHp = battle.battle_state[opponentCurrentPlayerKey].hp
      const opponentNewHp =
        updatedBattle.battle_state[opponentCurrentPlayerKey].hp

      const iTookDamage = myNewHp < myOldHp
      const opponentTookDamage = opponentNewHp < opponentOldHp

      const triggerHitAnimation = () => {
        if (iTookDamage) {
          setAnimation(prev => ({ ...prev, player: 'hit' }))
        } else if (opponentTookDamage) {
          setAnimation(prev => ({ ...prev, opponent: 'hit' }))
        }
      }

      if (actionType === 'attack') {
        triggerHitAnimation()
        setBattle(updatedBattle)
        setTimeout(resetTurn, ATTACK_ANIMATION_DURATION + 500)
      } else if (actionType === 'special') {
        setTimeout(() => {
          triggerHitAnimation()
          setBattle(updatedBattle)
          setTimeout(resetTurn, HIT_ANIMATION_DURATION)
        }, SPECIAL_ANIMATION_DURATION)
      } else if (actionType === 'defend') {
        setBattle(updatedBattle)
        setTimeout(resetTurn, DEFEND_ANIMATION_DURATION)
      }
    }

    const handleBattleEnd = data => {
      const { battle: finalBattle } = data
      const isWinner = finalBattle.winner_id === player.id

      setIsAnimating(true)
      setBattle(finalBattle)
      setAnimation({
        player: isWinner ? 'default' : 'death',
        opponent: isWinner ? 'death' : 'default',
      })

      setTimeout(() => {
        if (isWinner) {
          setMonsterVisibility(prev => ({ ...prev, opponent: false }))
        } else {
          setMonsterVisibility(prev => ({ ...prev, player: false }))
        }
      }, DEATH_ANIMATION_DURATION - 500)

      if (isWinner) {
        updateStats({ ...stats, wins: (stats.wins || 0) + 1 })
      } else {
        updateStats({ ...stats, losses: (stats.losses || 0) + 1 })
      }

      setTimeout(() => setShowEndGameOverlay(true), DEATH_ANIMATION_DURATION)
    }

    const handleBattleError = data => toast.error(data.message)

    socket.on('battle_update', handleBattleUpdate)
    socket.on('battle_end', handleBattleEnd)
    socket.on('battle_error', handleBattleError)

    return () => {
      socket.off('battle_update', handleBattleUpdate)
      socket.off('battle_end', handleBattleEnd)
      socket.off('battle_error', handleBattleError)
    }
  }, [socket, battle, player, monsters, stats, updateStats, navigate])

  const handleAction = actionType => {
    socket.emit('battle_action', {
      battleId: battle.id,
      playerId: player.id,
      actionType,
    })
  }

  const myState = useMemo(() => {
    if (!battle || !player) return null
    return battle.player1_id === player.id
      ? battle.battle_state.player1
      : battle.battle_state.player2
  }, [battle, player])

  const opponentState = useMemo(() => {
    if (!battle || !player) return null
    return battle.player1_id === player.id
      ? battle.battle_state.player2
      : battle.battle_state.player1
  }, [battle, player])

  if (!battle || !player || !monsters.player || !myState) {
    return <div>Carregando batalha...</div>
  }

  const isMyTurn = battle.current_turn_player_id === player.id
  const isFinished = battle.status === 'finished'
  const isWinner = battle.winner_id === player.id
  const getGif = (monster, animState) =>
    monster ? monster[`gif_${animState}`] || monster.gif_default : ''

  return (
    <>
      {showEndGameOverlay && (
        <EndGameOverlay $isWinner={isWinner}>
          <h1>{isWinner ? 'Vitória!' : 'Derrota!'}</h1>
          <NavButton onClick={() => navigate('/lobby')}>
            Voltar ao Lobby
          </NavButton>
        </EndGameOverlay>
      )}

      <Container $arenaId={battle.arena_id}>
        <Arena>
          <MonsterContainer
            $isHit={animation.player === 'hit'}
            $isVisible={monsterVisibility.player}
          >
            <InfoBox>
              <MonsterName>{monsters.player.name} (Você)</MonsterName>
              <HealthBarOuter>
                <HealthBarInner
                  $hpPercent={(myState.hp / monsters.player.hp) * 100}
                />
              </HealthBarOuter>
            </InfoBox>
            <GifDisplay>
              <img
                src={getGif(monsters.player, animation.player)}
                alt={monsters.player.name}
              />
            </GifDisplay>
          </MonsterContainer>

          <MonsterContainer
            $isHit={animation.opponent === 'hit'}
            $isVisible={monsterVisibility.opponent}
          >
            <InfoBox>
              <MonsterName>{monsters.opponent.name}</MonsterName>
              <HealthBarOuter>
                <HealthBarInner
                  $hpPercent={(opponentState.hp / monsters.opponent.hp) * 100}
                />
              </HealthBarOuter>
            </InfoBox>
            <GifDisplay $isOpponent>
              <img
                src={getGif(monsters.opponent, animation.opponent)}
                alt={monsters.opponent.name}
              />
            </GifDisplay>
          </MonsterContainer>
        </Arena>

        <ActionLog>{actionLog}</ActionLog>

        <Controls>
          <ActionButton
            disabled={!isMyTurn || isFinished || isAnimating}
            onClick={() => handleAction('attack')}
          >
            Atacar
          </ActionButton>
          <ActionButton
            disabled={!isMyTurn || isFinished || isAnimating}
            onClick={() => handleAction('defend')}
          >
            Defender
          </ActionButton>
          <ActionButton
            disabled={
              !isMyTurn ||
              isFinished ||
              isAnimating ||
              myState.specialCooldown > 0
            }
            onClick={() => handleAction('special')}
          >
            Especial{' '}
            {myState.specialCooldown > 0 ? `(${myState.specialCooldown})` : ''}
          </ActionButton>
          <ActionButton
            disabled={isFinished || isAnimating}
            onClick={() => handleAction('forfeit')}
          >
            Desistir
          </ActionButton>
        </Controls>
      </Container>
    </>
  )
}
