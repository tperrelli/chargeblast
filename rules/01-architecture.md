# Arquitetura e organização

- Use App Router e leia a documentação instalada de Next.js indicada em `AGENTS.md` antes de escrever código. Mantenha páginas focadas em obter dados, compor a tela e definir os limites entre servidor e cliente.
- Prefira Server Components. Coloque `"use client"` no menor ponto de entrada que precisa de estado, eventos ou APIs do navegador; não transforme uma página inteira em componente cliente por conveniência.
- Organize código por domínio: mantenha componentes, hooks, tipos, dados e funções usados apenas por uma feature próximos entre si. Deixe em diretórios compartilhados apenas o que tem uso real em mais de uma feature. Não mova arquivos sem necessidade em alterações localizadas.
- Para uma tela complexa, esta é a estrutura de referência; subdivida por responsabilidade, sem criar arquivos ou camadas vazias por obrigação:

```text
app/<rota>/page.tsx                 # entrada e composição da rota
features/<feature>/
  components/                       # tabela, filtros e componentes próprios
  hooks/                            # estado e coordenação de interações
  utils/                            # regras e transformações puras
  types.ts                          # contratos do domínio, quando necessário
components/                         # componentes realmente compartilhados
```

- Filtragem, ordenação, paginação, exportação e regras de negócio pertencem a funções puras ou hooks, não à marcação. Separe acesso a dados, regras e apresentação. Um componente de composição pode coordenar props e eventos simples, mas não deve concentrar toda a feature.
- Cada arquivo deve ter uma responsabilidade reconhecível pelo nome. Evite `helpers`, `utils`, `common` ou `data` como depósitos genéricos; prefira nomes que descrevam o domínio e a operação. Evite abstrações genéricas para um único caso quando uma função ou componente local for mais claro.
- Mantenha componentes com até 120 linhas após formatação legível; a tabela principal deve ter menos de 100 linhas. Divida por responsabilidade antes de ultrapassar o limite. Nunca comprima JSX, CSS ou funções para cumprir a contagem, nem crie componentes triviais apenas para reduzir linhas.
- Durante um cleanup, preserve contratos e comportamento; mova uma responsabilidade por vez, remova código sem uso e execute as verificações relevantes a cada mudança estrutural.
