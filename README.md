# Retroniva — Projeto Integrador Front-end

## 1. Título e descrição
**Retroniva** é um site de catálogo para uma loja temática de games retrô, voltado a colecionadores, entusiastas e pessoas que desejam reviver clássicos dos videogames. O projeto apresenta produtos em destaque, informações comparativas, mídia, gráfico e um catálogo interativo com busca e favoritos. O objetivo é consolidar, em uma única página, os conteúdos de HTML, CSS e JavaScript puro desenvolvidos ao longo das aulas, com foco em semântica, responsividade e interatividade acessível.

## 2. Tecnologias utilizadas
- HTML5
- CSS3
- JavaScript puro (Vanilla JS)
- SVG
- Canvas API
- WebVTT (legendas/descrição de áudio)

## 3. Estrutura de pastas
```text
.
├── index.html
├── README.md
├── css/
│   ├── reset.css
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── audio/
    │   ├── efeito-retro.au
    │   ├── efeito-retro.vtt
    │   └── efeito-retro.wav
    └── images/
        ├── hero-fundo.png
        ├── logo-retroniva.png
        ├── produto-cartucho.jpeg
        ├── produto-extra.jpg
        ├── produto-ps2.jpeg
        ├── produto-r36s.jpeg
        ├── produto-snes.jpeg
        └── produto-xbox360.jpeg
```

## 4. Como executar
1. Clone o repositório em uma pasta local.
2. Abra o arquivo `index.html` diretamente no navegador, **ou** utilize a extensão Live Server no VS Code.
3. Verifique no DevTools (aba Console e Network) que não há erros e que os recursos carregam corretamente.

## 5. Mapa dos requisitos

| Requisito (Seção 2) | Atendimento (arquivo / seção / função) |
| --- | --- |
| **2.1 Estrutura e organização** | Estrutura com `index.html`, `css/`, `js/`, `assets/images/` e `assets/audio/`; caminhos relativos em `index.html`, `css/style.css` e `js/script.js`. |
| **2.2 HTML5 válido** | `index.html`: `<!DOCTYPE html>`, `<html lang="pt-BR">`, `<meta charset>`, `<meta name="viewport">`, `<title>`. |
| **2.2 Conteúdo básico** | `index.html`: `<h1>` (hero), parágrafo descritivo, lista `<ul>` com 3+ itens, tabela com 5 linhas de dados e 4 colunas, link externo Wikipedia (`target="_blank"` e `rel="noopener noreferrer"`), imagens com `alt` descritivo. |
| **2.2 Semântica** | `index.html`: `<header>`, `<nav>`, `<main>` único, múltiplas `<section>` com títulos (`#produtos`, `#midia`, `#catalogo`, `#contato`) e `<footer>`. |
| **2.2 Formulário** | `index.html` seção `#contato`: 5 campos, `<label for/id>`, `<fieldset>` e `<legend>`, `required` em nome/e-mail/mensagem, `pattern` no telefone e `min/max` na quantidade; botões/links como `<button>`/`<a>`. |
| **2.2 Mídia** | `index.html` seção `#midia`: `<audio controls preload="metadata">` com comentário justificando `preload`, 2 fontes (`.wav` e `.au`) e `<track>` (`assets/audio/efeito-retro.vtt`). |
| **2.2 Gráfico SVG/Canvas** | `index.html` seção `#midia`: SVG responsivo com `viewBox`, `title` e `desc`; Canvas com fallback textual. `js/script.js` função `iniciarCanvas()` usa `requestAnimationFrame()` e `clearRect()`. |
| **2.3 Reset e variáveis** | `css/reset.css`: `box-sizing: border-box` global. `css/style.css`: variáveis no `:root` (cores, espaçamento, tipografia). |
| **2.3 Seletores e box model** | `css/style.css`: classes reutilizáveis (`.secao`, `.btn`, `.card-produto` etc.), seletor de ID (`#titulo-principal`), combinadores (`.nav .nav-link`, `.site-footer > p`), box model explícito (`padding`, `border`, `margin`). |
| **2.3 Links, tabela e lista** | `css/style.css`: estados `a:link`, `a:visited`, `a:hover`, `a:active` em ordem; `.tabela-produtos` com `border-collapse` e `padding`; listas estilizadas (`.hero-lista`, `.lista-catalogo`). |
| **2.3 Tipografia em rem** | `css/style.css`: `font-size` definidos em `rem` com comentário de justificativa no topo do arquivo. |
| **2.3 Navbar e layout** | `css/style.css` + `index.html`: navbar em Flexbox, item `.ativo`, dropdown via `:hover` (`.has-dropdown:hover .dropdown`), `position: sticky` no header, estrutura visual do hambúrguer (`.menu-toggle`/`.hamburger`). |
| **2.3 Grid, pseudo-classe e responsividade** | `css/style.css`: `.galeria-grid` em Grid, pseudo-classe estrutural `.card-produto:nth-child(odd)`, hover com `transform`; media query para mobile/desktop. |
| **2.4 Lógica (Aula 09)** | `js/script.js`: comentário de planejamento no topo; `if / else if / else` e `switch` em `classificarPreco()`; `for...of` com acumulador e `while` em `calcularResumo()`. |
| **2.4 Funções e escopo (Aula 10)** | `js/script.js`: `processarCatalogo()` (processa) e `classificarPreco()` (classifica/formata); uso de `const/let`; coerção com `Number()`; `return`; escopo local comentado em `processarCatalogo()`. |
| **2.4 Arrays e DOM (Aula 11)** | `js/script.js`: `filter`, `map` e `reduce` sobre `produtos`; criação com `createElement`/`textContent` e inserção em `#lista-catalogo`; classes CSS como `.item-catalogo`, `.badge`, `.favorito`. |
| **2.4 Eventos (Aula 12)** | `js/script.js`: botão `#btn-destaques` com `aria-pressed`; delegação em `#lista-catalogo` para `.btn-favorito` (itens recriados dinamicamente); busca com `input` em `#busca-catalogo`; resumo atualizado em `#resumo-catalogo` (`aria-live="polite"` no HTML); sem `innerHTML` com texto do usuário. Menu `#menu-toggle` com `aria-expanded`. |
| **2.4 Integração do script** | `index.html`: `<script src="js/script.js" defer></script>` ao final do `<body>`; arquivo único e organizado `js/script.js`. |

## 7. Autor
- **Nome:** Luiz Miguel Gomes Silva
- **RGM:** 47861029
- **Curso:** Superior de Tecnologia em Análise e Desenvolvimento de Sistemas
