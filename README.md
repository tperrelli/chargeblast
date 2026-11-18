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
npm run lint
npm test
npm run build
```

Os testes verificam filtros combinados, intervalos de data, ordenação, paginação e busca por identificador. As datas são exibidas e filtradas em UTC. Os valores são comparados na moeda original, sem conversão entre moedas.

## Organização

- `app/`: rotas e composição de Server Components.
- `components/`: apresentação, tabela, filtros e detalhes.
- `hooks/`: estado e coordenação da tabela.
- `utils/`: filtragem, ordenação, paginação e formatação.
- `lib/`: dados fictícios e horário de referência da requisição.
- `rules/`: padrões de arquitetura, React e TypeScript adotados pelo projeto.
