# 🖥️ Frontend em Next.js - SI

## 🔧 Tecnologias usadas no projeto:
- Next.js
- Typescript
- Shadcn UI
- Docker e Docker Compose↓
- Websocket: Socket.io

> ⚠️ **_Não é necessário nenhum requisito e dependência de sistema além do Docker e Docker Compose_**

## ⚙️ Executando de forma local:

1) Clone o repositório para sua máquina:
    ```bash
    $ git clone https://github.com/speedlightzx/si-imobiliarias-frontend
    ```

2) Suba todos os containers do Docker Compose:
    ```bash
    $ docker compose up -d
    ```

Após seguir esses passos a cima, os containers ficarão disponíveis nas seguintes URIs:

- Frontend: 
    - Local: `http://localhost:3001`

## 🗃️ Variáveis de ambiente:
Crie um arquivo .env, e insira as seguintes variáveis de ambiente:
    - NEXT_PUBLIC_API_URL=http://localhost:3001

## ❓ Como se integra com os outros serviços?
O frontend se integra diretamente com todos os outros serviços, é ele quem consome o backend, permitindo realizar login, gerenciar leads, listas e interagir com o chatbot.

## 📁 Rotas:

### 🔓 Rotas públicas:

```http
    /register
```
- Página para realizar o cadastro na aplicação. Se o cadastro for bem sucedido, o usuário será redirecionado para a página de login.
---

```http
    /
```
- Página para realizar login na aplicação. Se o login for bem sucedido, o usuário será redirecionado para /home.
---

### 🔐 Rotas privadas:

> _Para poder acessar as rotas privadas basta fazer login na rota /auth/login que será setado um cookie de autenticação!_

```http
    /home
```
- Página inicial onde o usuário pode gerenciar suas listas, leads, e interagir com chatbot.
---