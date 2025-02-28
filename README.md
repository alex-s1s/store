# Desafio Front-End

## Introdução
Desenvolvimento de uma aplicação web para gerenciamento de produtos utilizando a API Fake Store API.

## Tecnologias Utilizadas
- **Typescript**
- **Next.js V.14/V.15** (Com estrutura de pastas `app` e `src`)
- **Tailwind CSS** e/ou **MUI.Js**
- **Jest** (Testes unitários)
- **Shadcn** (Componentes UI)
- **Yup/Zod** (Validação de formulários)
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
  npm run test  # ou yarn test
  ```
- Para verificar a cobertura de testes:
  ```sh
  npm run test:coverage  # ou yarn test:coverage
  ```
### **Cobertura Atual**
| Arquivo | % Stmts | % Branch | % Funcs | % Lines |
|---------|--------|---------|--------|--------|
| All files | 100% | 90.56% | 78.57% | 100% |
| components | 100% | 90.9% | 76.92% | 100% |

## Documentação com Storybook
O projeto inclui documentação de componentes via **Storybook**.
- Para rodar o Storybook:
  ```sh
  npm run storybook  # ou yarn storybook
  ```

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
|-- tests/
|-- public/
|-- README.md
```

## Prints da Interface
![Tela Inicial](https://via.placeholder.com/600x300?text=Home+Page)
![Detalhes do Produto](https://via.placeholder.com/600x300?text=Detalhes+do+Produto)

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
