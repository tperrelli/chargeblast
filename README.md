# Chargeblast — Payments

Aplicação Next.js App Router com uma lista de pagamentos fictícios e uma página de detalhes para cada pagamento. Os 420 registros são gerados de forma determinística em memória; não existe integração com o Stripe nem processamento real de pagamentos.

## Executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`. Use o identificador na tabela para abrir os detalhes e o link de retorno para voltar à lista.

## Verificação

```bash
npm run format:check
npm run lint
npm test
npm run build
```

Use `npm run format` para formatar o código. Os testes cobrem filtros combinados, ordenação, paginação, seleção, cópia, exportação e interação dos menus por teclado. As datas são exibidas e filtradas em UTC; os valores são comparados na moeda original, sem conversão.

## Organização

- `app/`: rotas e composição de Server Components.
- `features/payments/`: componentes, hooks, tipos, dados fictícios, estilos e regras de pagamentos.
- `components/`: estrutura e ícones compartilhados.
- `lib/`: funções de infraestrutura compartilhadas.
- `tests/`: testes de lógica e de interface.
- `rules/`: padrões de arquitetura, React, TypeScript e design adotados pelo projeto.
