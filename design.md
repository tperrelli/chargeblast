# Projeto Chargeblast: tela de pagamentos do Stripe

Implemente neste repositório a tela **Transactions → Payments** do Stripe Dashboard, seguindo os requisitos abaixo. Trabalhe até concluir os requisitos obrigatórios e validar o resultado.

## Antes de implementar

- Leia o `AGENTS.md` e as partes relevantes da documentação da versão instalada do Next.js em `node_modules/next/dist/docs/` antes de escrever código. Respeite as convenções e a estrutura existentes no projeto.
- Use a captura de referência fornecida com o desafio como fonte principal para a aparência. Reproduza o mais fielmente possível os textos, ícones, cores, tipografia, dimensões, espaçamentos e estados de interação.
- Se a captura não estiver disponível no repositório ou na conversa, informe essa limitação. Prossiga com o trabalho possível sem afirmar que houve correspondência visual com uma referência que não foi fornecida.
- Se houver acesso ao Stripe Dashboard em modo de teste, ele pode ser usado para consultar interações e medidas; não dependa da criação de uma conta para entregar a implementação.

## Escopo obrigatório

A tabela de pagamentos é o único elemento visual obrigatório. Use Next.js com TypeScript, conforme a estrutura do projeto.

### Colunas

- **Payment ID:** identificador abreviado e ação para copiar o identificador completo.
- **Customer:** identificação do cliente.
- **Amount:** valor formatado com sua moeda.
- **Status:** badge para `Succeeded`, `Pending`, `Failed` ou `Refunded`.
- **Payment method:** método de pagamento; para cartões, exiba a bandeira e os últimos quatro dígitos.
- **Created:** data e hora, com o tempo relativo em tooltip ao passar o mouse.

### Interações e filtros

- Permita ordenar por data, valor e status, em uma ou mais colunas.
- Implemente paginação com opções de 25, 50 e 100 linhas por página; processamento no cliente é suficiente.
- Filtre por período, com `Today`, `7 days`, `30 days` e `Custom`.
- Filtre por status com seleção múltipla.
- Filtre por método de pagamento com seleção múltipla, incluindo exemplos como `Card`, `ACH` e `Wallet`.
- Filtre por faixa de valor.
- Busque por payment ID, e-mail ou últimos quatro dígitos.
- Faça os filtros funcionarem em conjunto com a ordenação e a paginação, com um estado útil quando não houver resultados.

### Dados fictícios

- Crie entre 300 e 1.000 pagamentos em um arquivo JSON local ou serviço em memória.
- Use valores realistas, várias moedas e uma mistura de status e métodos de pagamento.
- Mantenha os dados consistentes entre recarregamentos para facilitar a avaliação das interações.

## Extras opcionais

Implemente apenas depois dos requisitos obrigatórios, seguindo esta ordem de preferência:

1. Sidebar com as seções `Payments`, `Customers`, `Balances` e `Product catalog`.
2. Barra superior com busca e menu da conta.
3. Página de detalhes do pagamento em rota própria, com timeline de eventos e metadados.
4. Filtros salvos ou persistidos na URL para compartilhar links.
5. Redimensionamento e reordenação de colunas por arraste.
6. Exportação CSV da visualização atual.

## Qualidade e entrega

- Priorize a fidelidade visual e o funcionamento completo dos requisitos obrigatórios. Cuide da acessibilidade, dos estados de interação e da adaptação a telas menores.
- Execute as verificações apropriadas ao projeto e corrija os problemas encontrados.
- Ao concluir, informe o que foi implementado, como foi validado e quaisquer limitações ou extras pendentes.

## Contexto do desafio

O prazo informado é o fim do dia **20 de novembro de 2026**, no horário de Brasília. O documento também pede que o candidato responda ao e-mail de recebimento; isso é uma ação separada e não deve ser executada sem instrução explícita.
