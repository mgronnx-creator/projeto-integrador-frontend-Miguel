/*
  Planejamento (Lógica - Aula 09)
  Tema: catálogo interativo da loja Retroniva.
  Entrada: lista de produtos (array de objetos), texto digitado na busca e estado do filtro de destaques.
  Processamento: filtrar itens, classificar/faixar preços e categorias, calcular totais e contagens.
  Saída: lista renderizada no DOM e resumo textual atualizado em tempo real.
*/

// Dados: 5+ itens com 3+ propriedades cada
const produtos = [
  { id: 1, nome: "R36S Portátil", plataforma: "Portátil", preco: 299.9, categoria: "console", destaque: true },
  { id: 2, nome: "PlayStation 2", plataforma: "Mesa", preco: 549.9, categoria: "console", destaque: true },
  { id: 3, nome: "Xbox 360 + Kinect", plataforma: "Mesa", preco: 899.9, categoria: "console", destaque: false },
  { id: 4, nome: "Super Nintendo", plataforma: "Mesa", preco: 599.9, categoria: "console", destaque: true },
  { id: 5, nome: "Cartucho 900 em 1", plataforma: "Cartucho", preco: 129.9, categoria: "cartucho", destaque: false },
  { id: 6, nome: "Controle USB Retrô", plataforma: "Acessório", preco: 79.9, categoria: "acessorio", destaque: false }
];

const estado = {
  busca: "",
  apenasDestaques: false,
  favoritos: new Set()
};

// Função 1 (processa): filtra e prepara dados para exibição
const processarCatalogo = (lista, termo, somenteDestaques) => {
  // Exemplo claro de escopo local: variáveis existem apenas dentro desta função
  const termoNormalizado = String(termo).toLowerCase().trim();
  const listaFiltrada = lista.filter((item) => {
    const textoItem = `${item.nome} ${item.plataforma} ${item.categoria}`.toLowerCase();
    const combinaBusca = textoItem.includes(termoNormalizado);
    const combinaDestaque = !somenteDestaques || item.destaque;
    return combinaBusca && combinaDestaque;
  });

  // Uso de map para transformar a lista (Arrays e DOM - requisito)
  const idsVisiveis = listaFiltrada.map((item) => Number(item.id));
  // Coerção explícita de tipos com Number() aplicada de forma clara
  const limiteId = Number(idsVisiveis.length);

  return { listaFiltrada, limiteId };
};

// Função 2 (classifica/formata): classifica faixa de preço e retorna rótulo
const classificarPreco = (valor) => {
  const preco = Number(valor); // coerção explícita
  let faixa = "econômico";

  // if / else if / else
  if (preco >= 700) {
    faixa = "premium";
  } else if (preco >= 300) {
    faixa = "intermediário";
  } else {
    faixa = "econômico";
  }

  // switch (requisito de lógica)
  let rotulo;
  switch (faixa) {
    case "premium":
      rotulo = "Faixa premium";
      break;
    case "intermediário":
      rotulo = "Faixa intermediária";
      break;
    default:
      rotulo = "Faixa econômica";
      break;
  }

  return rotulo;
};

const formatarMoeda = (valor) => {
  const numero = Number(valor);
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

// Cálculo de resumo (for...of com acumulador, reduce e while)
const calcularResumo = (listaFiltrada) => {
  let soma = 0;
  let contador = 0;

  // for...of com acumulador
  for (const item of listaFiltrada) {
    soma += Number(item.preco);
    contador += 1;
  }

  // reduce sobre a lista (requisito)
  const totalReduce = listaFiltrada.reduce((acc, item) => acc + Number(item.preco), 0);

  // while (requisito): conta quantos itens são destaque na lista filtrada
  let indice = 0;
  let destaquesVisiveis = 0;
  while (indice < listaFiltrada.length) {
    if (listaFiltrada[indice].destaque) {
      destaquesVisiveis += 1;
    }
    indice += 1;
  }

  const media = contador > 0 ? soma / contador : 0;

  // usa totalReduce para garantir coerência e demonstrar uso real
  const totalFinal = Number(totalReduce);

  return {
    quantidade: contador,
    total: totalFinal,
    media,
    destaquesVisiveis
  };
};

const listaCatalogo = document.getElementById("lista-catalogo");
const resumoCatalogo = document.getElementById("resumo-catalogo");
const buscaInput = document.getElementById("busca-catalogo");
const btnDestaques = document.getElementById("btn-destaques");

const renderizarCatalogo = () => {
  const { listaFiltrada } = processarCatalogo(produtos, estado.busca, estado.apenasDestaques);

  // Limpa área antes de inserir novos elementos (sem innerHTML com texto do usuário)
  while (listaCatalogo.firstChild) {
    listaCatalogo.removeChild(listaCatalogo.firstChild);
  }

  listaFiltrada.forEach((item) => {
    const li = document.createElement("li");
    li.className = "item-catalogo";
    li.dataset.id = String(item.id);

    if (item.destaque) {
      li.classList.add("destaque");
    }
    if (estado.favoritos.has(Number(item.id))) {
      li.classList.add("favorito");
    }

    const titulo = document.createElement("h3");
    titulo.textContent = item.nome;

    const metaPlataforma = document.createElement("p");
    metaPlataforma.className = "meta-item";
    metaPlataforma.textContent = `Plataforma: ${item.plataforma}`;

    const metaPreco = document.createElement("p");
    metaPreco.className = "meta-item";
    metaPreco.textContent = `Preço: ${formatarMoeda(item.preco)}`;

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = classificarPreco(item.preco);

    const badgeCategoria = document.createElement("span");
    badgeCategoria.className = "badge";
    badgeCategoria.textContent = `Categoria: ${item.categoria}`;

    const acoes = document.createElement("div");
    acoes.className = "acoes-item";

    const botaoFavorito = document.createElement("button");
    botaoFavorito.type = "button";
    botaoFavorito.className = "btn btn-secondary btn-favorito";
    botaoFavorito.dataset.action = "favoritar";
    botaoFavorito.dataset.id = String(item.id);
    const pressionado = estado.favoritos.has(Number(item.id));
    botaoFavorito.setAttribute("aria-pressed", pressionado ? "true" : "false");
    botaoFavorito.textContent = pressionado ? "Remover favorito" : "Marcar favorito";

    acoes.appendChild(botaoFavorito);
    li.appendChild(titulo);
    li.appendChild(metaPlataforma);
    li.appendChild(metaPreco);
    li.appendChild(badge);
    li.appendChild(badgeCategoria);
    li.appendChild(acoes);

    listaCatalogo.appendChild(li);
  });

  if (listaFiltrada.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "item-catalogo";
    vazio.textContent = "Nenhum item encontrado para a busca atual.";
    listaCatalogo.appendChild(vazio);
  }

  const resumo = calcularResumo(listaFiltrada);
  resumoCatalogo.textContent = `Itens exibidos: ${resumo.quantidade} | Destaques visíveis: ${resumo.destaquesVisiveis} | Total: ${formatarMoeda(resumo.total)} | Média: ${formatarMoeda(resumo.media)}`;
};

// Eventos (Aula 12)

// (c) Busca/filtro com input
buscaInput.addEventListener("input", (event) => {
  estado.busca = event.target.value;
  renderizarCatalogo();
});

// (a) Botão com aria-pressed que funciona pelo teclado (button nativo)
btnDestaques.addEventListener("click", () => {
  estado.apenasDestaques = !estado.apenasDestaques;
  btnDestaques.setAttribute("aria-pressed", estado.apenasDestaques ? "true" : "false");
  btnDestaques.textContent = estado.apenasDestaques ? "Mostrar todos os itens" : "Mostrar apenas destaques";
  renderizarCatalogo();
});

// (b) Delegação de eventos na lista criada por JS (funciona para itens criados depois)
listaCatalogo.addEventListener("click", (event) => {
  const alvo = event.target;
  if (!(alvo instanceof Element)) return;
  const botao = alvo.closest("button[data-action='favoritar']");
  if (!botao) return;

  const id = Number(botao.dataset.id);
  if (estado.favoritos.has(id)) {
    estado.favoritos.delete(id);
  } else {
    estado.favoritos.add(id);
  }
  renderizarCatalogo();
});

// Botão de menu com aria-expanded (também atende requisito de botão acessível por teclado)
const menuToggle = document.getElementById("menu-toggle");
const menuPrincipal = document.getElementById("menu-principal");

if (menuToggle && menuPrincipal) {
  menuToggle.addEventListener("click", () => {
    const expandido = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", expandido ? "false" : "true");
    menuPrincipal.classList.toggle("aberto", !expandido);
  });
}

// Canvas animado (requisito de gráfico): requestAnimationFrame e clearRect
const iniciarCanvas = () => {
  const canvas = document.getElementById("grafico-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let angulo = 0;

  const desenhar = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fundo
    ctx.fillStyle = "#10162a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Barra base
    ctx.fillStyle = "#24335f";
    ctx.fillRect(30, 120, 260, 24);

    // Barra animada representando "nível de nostalgia"
    const nivel = 130 + Math.sin(angulo) * 90;
    ctx.fillStyle = "#4cc9f0";
    ctx.fillRect(30, 120, nivel, 24);

    // Texto
    ctx.fillStyle = "#e8ecff";
    ctx.font = "16px Arial";
    ctx.fillText("Nostalgia da coleção", 30, 40);
    ctx.font = "14px Arial";
    ctx.fillText(`Índice: ${Math.round((nivel / 260) * 100)}%`, 30, 70);

    angulo += 0.03;
    requestAnimationFrame(desenhar);
  };

  desenhar();
};

// Evita erro no envio do formulário em ambiente sem backend
const formContato = document.getElementById("form-contato");
if (formContato) {
  formContato.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

// Inicialização
renderizarCatalogo();
iniciarCanvas();
