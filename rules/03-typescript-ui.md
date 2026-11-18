# TypeScript e semântica

- Use TypeScript estrito. Tipifique precisamente props existentes, callbacks, children e props do framework conforme a versão instalada. Componentes sem props não precisam de argumento; não use `Record<string, never>` nem `void _props` para esse fim.
- Modele o domínio com tipos específicos e valores conhecidos. Evite `any`, casts para silenciar erros, strings genéricas para conjuntos fechados e booleanos ambíguos quando um tipo discriminado expressar melhor as variantes. Valide dados vindos de fronteiras externas.
- Mantenha status, moedas, opções e configurações em uma fonte de verdade tipada quando representam o mesmo conjunto; derive tipos e opções dela. Não replique listas independentes em componentes, dados fictícios e filtros.
- Use nomes que expliquem significado e unidade. Extraia números mágicos recorrentes ou com significado de negócio para constantes nomeadas; não crie constantes para cada valor óbvio sem ganho de clareza.
- Defina explicitamente fuso horário, limites e formatação de datas e valores. Dados de exemplo devem ser determinísticos e coerentes entre lista, detalhes, filtros e exportação.
- Use HTML semântico, rótulos acessíveis, foco visível e controles operáveis por teclado. Links navegam; botões executam ações. Preserve estados vazio, carregamento e erro quando aplicáveis.
