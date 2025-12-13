# 📸 Memora V2: A Rede Social Exclusiva do Seu Evento

> "Desenvolvido para conectar momentos reais."

## 🌟 Sobre o Projeto

O **Memora V2** é uma plataforma Fullstack SaaS (Software as a Service) que transforma qualquer evento (casamentos, festas, corporativos) em uma experiência social em tempo real.

O projeto é ambicioso, focado em alta disponibilidade e monetização. Os convidados acessam a rede social temporária via **QR Code** e compartilham fotos que são exibidas instantaneamente em um **Feed ao Vivo** no telão.

Ele possui um sistema de planos e **upsells** robusto para maximizar a receita, tornando-o um produto de portfólio com valor comercial real.

## ⚙️ Tecnologias Utilizadas

Este projeto foi construído para ser moderno e escalável, utilizando as seguintes tecnologias:

* **Frontend:** `React` com `Vite` (para performance de desenvolvimento)
* **Estilização:** `Tailwind CSS` (para construção rápida de interfaces)
* **Backend & DB:** `Supabase` (Autenticação, Banco de Dados SQL e Realtime)
* **Storage:** `Cloudflare R2` (Para armazenamento seguro e eficiente das fotos dos eventos)
* **Rotas:** `React Router DOM`

## 🛠️ Instalação e Execução

Para rodar o Memora V2 localmente, siga os passos abaixo:

1.  **Clone o Repositório:**
    ```bash
    git clone [SEU LINK DO REPOSITÓRIO AQUI]
    cd memora-v2
    ```
2.  **Instale as Dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Configuração de Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto e adicione suas chaves do Supabase e do Cloudflare R2 (bucket e chaves de acesso).
    ```env
    VITE_SUPABASE_URL=...
    VITE_SUPABASE_ANON_KEY=...
    # ... outras chaves R2 ...
    ```
4.  **Execute o Projeto:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    O aplicativo estará disponível em `http://localhost:5173/`.

## 📌 Status do Projeto

Estamos na fase de **Implementação da UI e Conexão Inicial** (Header e Hero Section).
