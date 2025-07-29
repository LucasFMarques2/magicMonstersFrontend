# Magic Monsters - Frontend
![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Powered%20by-Vite-yellowgreen) ![Styled Components](https://img.shields.io/badge/Styled-💅-pink) ![License](https://img.shields.io/badge/License-ISC-lightgrey)

![Imagem da Batalha no Magic Monsters](https://res.cloudinary.com/dmvhqaow3/image/upload/v1753767874/6cd60baa-5ccd-4b3e-885c-affafa6f30c1.png)

## 📄 Sobre o Projeto

Este é o repositório do frontend para a **Magic Monsters**, uma aplicação web interativa construída com React e Vite. A interface consome a [Magic Monsters API](https://github.com/LucasFMarques2/magicMonstersApi) para oferecer uma experiência de jogo completa, desde a criação de jogadores e monstros até batalhas animadas em tempo real.

O projeto foi estruturado com foco na componentização, gerenciamento de estado com Context API e uma experiência de usuário fluida e reativa.

---

## ✨ Funcionalidades Principais

-   **Interface Reativa:** Construída com React e Vite para um desenvolvimento rápido e uma experiência de usuário ágil.
-   **Criação de Personagens e Monstros:** Telas dedicadas para que os usuários criem seus próprios jogadores e monstros, com upload de GIFs para animações.
-   **Seleção com Carrossel:** Uso do Swiper.js para uma seleção de monstros moderna e intuitiva no lobby.
-   **Batalhas em Tempo Real:** Conexão via Socket.IO para receber atualizações da batalha, exibindo animações de ataque, defesa, dano e morte em tempo real.
-   **Gerenciamento de Estado:** Utilização da Context API do React para gerenciar o estado do jogador e a conexão do socket de forma global.
-   **Roteamento:** Navegação entre as diferentes telas da aplicação com React Router.
-   **Notificações:** Integração com a biblioteca Sonner para exibir toasts e feedbacks visuais para o usuário.

---

## 🛠️ Tecnologias Utilizadas

-   **Core:** React, Vite
-   **Estilização:** Styled Components
-   **Comunicação com API:** Axios
-   **Comunicação Real-time:** Socket.IO Client
-   **Roteamento:** React Router DOM
-   **Componentes de UI:** Swiper.js (para carrosséis)
-   **Notificações:** Sonner
-   **Linting:** ESLint

---

## 🚀 Começando

Siga estas instruções para configurar e executar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 18.x ou superior)
-   [NPM](https://www.npmjs.com/)
-   Uma instância do **[Magic Monsters API](https://github.com/LucasFMarques2/magicMonstersApi)** deve estar rodando localmente.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/LucasFMarques2/magicMonstersFrontend.git](https://github.com/LucasFMarques2/magicMonstersFrontend.git)
    cd magicMonstersFrontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto. Ele é necessário para apontar para o endereço da sua API backend.

    ```
    # .env

    # URL da API do Backend
    VITE_API_URL=http://localhost:3333
    ```

---

## ⚙️ Uso

Após a instalação e configuração, você pode usar os seguintes scripts do `package.json`:

-   **Iniciar em modo de desenvolvimento:**
    O servidor de desenvolvimento do Vite será iniciado, geralmente na porta `5173`.
    ```bash
    npm run dev
    ```

-   **Compilar para produção:**
    Gera uma versão otimizada do projeto na pasta `dist/`.
    ```bash
    npm run build
    ```

-   **Executar o linter:**
    Verifica a qualidade e o estilo do código.
    ```bash
    npm run lint
    ```

-   **Visualizar a build de produção:**
    Inicia um servidor local para testar a versão de produção.
    ```bash
    npm run preview
    ```

---

## 🏗️ Arquitetura do Projeto

O frontend é organizado de forma modular para facilitar a manutenção e escalabilidade:
 ```bash

src/
|-- assets/                 # Imagens, fontes e outros arquivos estáticos.
|-- contexts/               # Gerenciamento de estado global com Context API.
|   |-- PlayerContext.js
|   |-- PlayerProvider.jsx
|   |-- SocketContext.js
|   |-- SocketProvider.jsx
|-- hooks/                  # Hooks customizados para lógica reutilizável.
|   |-- usePlayer.jsx
|   |-- useSocket.jsx
|-- pages/                  # Componentes que representam as telas da aplicação.
|   |-- Battle/
|   |-- CreateCharacter/
|   |-- CreateMonster/
|   |-- CreatePlayer/
|   |-- Dashboard/
|   |-- Home/
|   |-- Lobby/
|-- routes/                 # Configuração das rotas da aplicação.
|   |-- index.jsx
|-- services/               # Lógica de comunicação com serviços externos.
|   |-- api.jsx
|-- styles/                 # Estilos globais.
|   |-- GlobalStyles.js
|-- App.jsx                 # Componente principal que organiza os providers e rotas.
|-- main.jsx                # Ponto de entrada da aplicação React.

 ```
---
**Desenvolvido por Lucas Freitas Marques**
