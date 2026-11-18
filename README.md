# Chargeblast — Payments

Implementação da tela **Transactions → Payments**, inspirada no Stripe Dashboard e na [referência visual](stripe-mockup.png) fornecida para o desafio. A aplicação permite explorar pagamentos, combinar filtros e consultar os detalhes de cada transação.

Os dados são fictícios e locais: não há conexão com a API do Stripe, autenticação, banco de dados ou processamento de pagamentos.

## Como executar

**Pré-requisitos:** Node.js 20.9 ou superior e npm. Nenhuma variável de ambiente ou credencial é necessária.

```bash
npm ci
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). Se a porta estiver ocupada, o Next.js informa a porta utilizada no terminal.

Para executar a versão de produção:

```bash
npm run build
npm run start
```

O comando de produção deste projeto utiliza a porta **8989**: [http://localhost:8989](http://localhost:8989).

## Funcionalidades

- **Tabela de pagamentos:** valor e moeda, status, método, descrição, cliente, data de criação, data de reembolso, motivo de recusa e ID. Para acessar o ID quando necessário, role a tabela horizontalmente.
- **Busca:** em **More filters**, por ID completo ou parcial, e-mail ou últimos quatro dígitos.
- **Filtros combináveis:** período (`Today`, `7 days`, `30 days` e `Custom`), múltiplos status, métodos e moedas, além de valor mínimo e máximo. **Clear filters** restaura a visualização inicial.
- **Ordenação:** clique em **Amount** ou **Date**; a ordenação por status fica no filtro **Status**. É possível combinar critérios em ordem de prioridade; cada acionamento alterna entre crescente, decrescente e sem ordenação.
- **Paginação:** 25, 50 ou 100 linhas por página. Filtros e ordenação são aplicados antes da paginação.
- **Detalhes:** abra o ID ou o menu de ações da linha para acessar `/payments/[id]`. A página apresenta dados do pagamento, cliente e atividade; IDs desconhecidos exibem a página de pagamento não encontrado.
- **Seleção e CSV:** selecione linhas individualmente ou por página. **Export** baixa os pagamentos selecionados; sem seleção, exporta todos os resultados filtrados, inclusive os de outras páginas.
- **Colunas:** **Edit columns** permite mostrar ou ocultar descrição, cliente, data de reembolso e motivo de recusa. As colunas essenciais continuam disponíveis.

A interface inclui estado sem resultados, cópia do ID, tempo relativo na data, navegação por teclado e fechamento de menus com `Escape` ou clique externo.

## Dados e decisões

O conjunto contém **420 pagamentos determinísticos**, gerados em memória com uma semente fixa. Os mesmos IDs e valores são reproduzidos a cada inicialização. Há exemplos de `Card`, `ACH` e `Wallet`, cinco moedas e os status `Succeeded`, `Pending`, `Failed`, `Refunded`, `Canceled` e `Blocked`.

As datas da amostra estão entre **9 de setembro e 18 de novembro de 2026**. Por isso, filtros relativos como `Today` podem retornar zero resultados quando a aplicação for avaliada em outra data. Para testar um intervalo com resultados, selecione **Custom** e use datas dentro desse período.

- Datas, limites dos períodos e horários apresentados usam **UTC**. O tempo relativo usa o horário de referência recebido do servidor no carregamento da página.
- Valores de moedas diferentes são filtrados e ordenados pelo número na moeda original, **sem conversão cambial**.
- O CSV inclui um conjunto fixo de campos, independentemente das colunas visíveis. Valores que começam com caracteres de fórmula são prefixados para reduzir o risco de execução em planilhas.
- Filtros, ordenação, seleção e colunas são mantidos em memória no cliente; não são persistidos na URL ou entre recarregamentos.

## Arquitetura

A aplicação utiliza **Next.js 16, App Router, React 19 e TypeScript**. As rotas e a estrutura estática são Server Components; a tabela interativa é um Client Component. Com Cache Components habilitado, o horário inicial é obtido por requisição e enviado ao cliente para manter filtros e hidratação coerentes.

```text
app/                         Rotas, layout e estilos globais
components/                  Estrutura e ícones compartilhados
features/payments/
  components/                Tabela, filtros, ações e detalhes
  hooks/                     Estado e comportamentos interativos
  utils/                     Filtragem, ordenação, paginação, formatação e CSV
  types.ts                   Tipos e opções do domínio
  mock-payments.ts           Geração e consulta dos dados fictícios
  payments.css               Estilos da feature
lib/request-time.ts          Horário de referência por requisição
tests/                       Testes de lógica e de interface
rules/                       Padrões de arquitetura, código e design
```

A filtragem, a ordenação e a paginação são feitas no cliente, uma escolha adequada ao volume limitado de dados do desafio. Em uma aplicação com dados reais e maior volume, essas operações deveriam ser transferidas para o servidor, com paginação e autorização adequadas.

## Verificação

```bash
npm run format:check   # Formatação com Prettier
npm run lint           # ESLint
npm test               # Testes de lógica e de interface
npm run build          # Build de produção
```

Neste ambiente, o build padrão com Turbopack foi bloqueado pela restrição de abertura de porta local; `npx next build --webpack` foi executado com sucesso.

Use `npm run format` para aplicar a formatação. Os testes cobrem filtros combinados, datas, ordenação, paginação, seleção, cópia, CSV e interações dos menus. Os testes de interface usam JSDOM; eles **não substituem** uma inspeção visual e funcional em um navegador real.

## Limitações

- A barra superior e as demais seções da navegação são ilustrativas; não implementam busca global, conta ou outras áreas do dashboard.
- A atividade dos detalhes é derivada dos dados fictícios e não representa um histórico real de eventos do Stripe.
- Não há filtros compartilháveis por URL, reordenação ou redimensionamento de colunas por arraste.
- A comparação visual lado a lado em navegador não foi concluída neste ambiente. A imagem fornecida é uma referência da tabela, não uma captura da implementação.
