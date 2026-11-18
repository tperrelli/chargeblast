# Sistema visual e referência

- Quando houver referência, trate-a como especificação: confira ordem, conteúdo, hierarquia, dimensões, espaçamento, tipografia, cores, bordas, estados e comportamento responsivo. Registre qualquer diferença necessária por conflito com requisitos funcionais.
- Faça inspeção visual da implementação renderizada no navegador, no viewport da referência e em telas menores. Compare com a imagem, ajuste diferenças perceptíveis e verifique estados de hover, foco, menus, seleção e vazio. Se a inspeção não for possível, relate a limitação; não declare fidelidade visual validada.
- Centralize cores, espaçamentos, tipografia, raios e dimensões reutilizados em tokens nomeados, derivados do design. Preserve medidas específicas da referência quando necessário; não imponha uma escala que altere o visual.
- Mantenha estilos de feature próximos dela e limite estilos globais a base, tokens e primitivas compartilhadas. Evite seletores globais amplos para componentes, dependência frágil de `nth-child` e múltiplos arquivos sobrescrevendo o mesmo seletor sem necessidade.
- Formate CSS com uma declaração por linha e blocos legíveis. Remova regras obsoletas, duplicadas ou sobrescritas na mesma alteração; não acumule correções no fim do arquivo. Preserve os estados acessíveis e a rolagem em telas menores.
- Não apresente controles decorativos como funcionais: use ações reais ou sinalize claramente a indisponibilidade. Preserve o conteúdo e os nomes da referência, sem inventar dados apresentados como fatos.
