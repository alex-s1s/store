# Fake Store API CRUD

## Introdução
Desenvolvimento de uma aplicação web para gerenciamento de produtos utilizando a API Fake Store API.

## Tecnologias Utilizadas
- **Typescript**
- **Next.js V.14/V.15** (Com estrutura de pastas `app` e `src`)
- **Tailwind CSS**
- **Jest** (Testes unitários)
- **Shadcn** (Componentes UI)
- **Yup** (Validação de formulários)
- **Storybook** (Documentação de componentes)

## Funcionalidades Implementadas
- [x] Listagem de produtos paginada.
- [x] Filtro de produtos por categoria.
- [x] Ordenação de produtos por preço.
- [x] Nome dos produtos limitado a 30 caracteres.
- [x] Destaque para produtos com rating acima de 4.5.
- [x] Bloqueio de edição da categoria de um produto.
- [x] Visualização detalhada de um produto.
- [x] Confirmação antes da exclusão de produtos.

## Instalação e Execução
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```
2. Instale as dependências:
   ```sh
   npm install  # ou yarn install
   ```
3. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev  # ou yarn dev
   ```
4. Acesse a aplicação em `http://localhost:3000`

## Testes Unitários
O projeto possui cobertura de testes utilizando Jest.
- Para rodar os testes:
  ```sh
     "test": "jest", # npm run test
     "test:watch": "jest --watch", # npm run test:watch
  ```
- Para verificar a cobertura de testes:
  ```sh
  "test:coverage": "jest --coverage", # npm run test:coverage
  ```
### **Cobertura Atual**
![image](https://github.com/user-attachments/assets/49c41076-5915-466c-892a-e87902ec3cf0)

## Documentação com Storybook
O projeto inclui documentação de componentes via **Storybook**.
- Para rodar o Storybook:
  ```sh
  npm run storybook  # ou yarn storybook
  ```
![image](https://github.com/user-attachments/assets/0ec23a6e-9062-43f5-a809-6953201e48e4)

## Estrutura do Projeto
```
/
|-- src/
|   |-- components/
|   |   |-- ui/
|   |   |   |-- Button.tsx
|   |   |   |-- Input.tsx
|   |-- pages/
|   |-- styles/
|   |-- lib/
|-- .storybook/
|-- public/
|-- README.md
```

## Prints da Interface
![image](https://github.com/user-attachments/assets/2026d2d3-81af-4941-9b74-3e650471336c)

![image](https://github.com/user-attachments/assets/70687908-f1c5-435a-8359-3d7e5cccad49)


## Critérios de Avaliação
1. **Funcionalidade**: Implementação correta de todos os requisitos.
2. **Código**: Estrutura organizada, SOLID, e bem documentada.
3. **Documentação**: README explicativo e Storybook para componentes.
4. **Boas Práticas**: Versionamento adequado, testes unitários, e commits bem documentados.

## Submissão
1. Criar um repositório público no **GitHub**.
2. Implementar todos os requisitos.
3. Documentar no **README.md**.
4. Submeter o link para avaliação.
