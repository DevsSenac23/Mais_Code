# Mais Code - Sistema de Gerenciamento de Comissão

## Introdução
Bem-vindo!!! Este é um sistema completo para gerenciamento de comissões para os colaboradores Mais Code. Este documento irá guiá-lo pelos passos necessários para configurar e executar o projeto em seu ambiente.

---

## Pré-requisitos
Antes de iniciar, certifique-se de ter os seguintes itens instalados em seu ambiente:

- **PHP** em um servidor (por exemplo, XAMPP, WAMP ou outro).
- **Node.js** e **npm**:
  - [Download Node.js](https://nodejs.org/)
- **React.js** e **Next.js**:
  - [Documentação React.js](https://reactjs.org/)
  - [Documentação Next.js](https://nextjs.org/)

---

## Passo a Passo de Instalação

### 1. Clone o repositório do projeto
Utilize o comando abaixo para clonar o repositório para sua máquina:
```bash
git clone <URL_DO_REPOSITORIO>
```

Substitua `<URL_DO_REPOSITORIO>` pelo link do seu repositório GitHub.

---

### 2. Configure o banco de dados
1. Localize o arquivo `mais_code_banco.sql` no diretório do projeto.
2. Importe este arquivo para o banco de dados desejado (por exemplo, utilizando o phpMyAdmin ou linha de comando MySQL).

---

### 3. Configure o ambiente PHP
1. Certifique-se de que os arquivos do projeto estejam localizados em um ambiente capaz de executar PHP.
2. Configure o servidor local (como o XAMPP ou outro ambiente de preferência).

---

### 4. Configure o Frontend
1. Certifique-se de que o **Node.js** e o **npm** estão instalados no ambiente.
2. No diretório do projeto, navegue para o diretório `frontend`:
   ```bash
   cd frontend
   ```
3. Instale as dependências do projeto com o comando:
   ```bash
   npm install
   ```
4. Compile o projeto para produção:
   ```bash
   npm run build
   ```
5. Inicie o servidor do React/Next.js com o comando:
   ```bash
   npm start
   ```

---

### 5. Acesse o sistema
1. Após iniciar o servidor, acesse a URL local gerada pelo ambiente (geralmente `http://localhost` ou algo semelhante).
2. O sistema criará automaticamente um usuário administrador com as seguintes credenciais:
   - **Login:** `admin@maiscode.com`
   - **Senha:** `admin`

---

## Observações
- Caso enfrente problemas, verifique os logs do servidor PHP e do Node.js.
- Consulte as documentações oficiais para suporte adicional:
  - [Node.js](https://nodejs.org/)
  - [React.js](https://reactjs.org/)
  - [Next.js](https://nextjs.org/)
