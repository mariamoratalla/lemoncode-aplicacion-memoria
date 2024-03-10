interface InfoCarta {
  idFoto: number;
  src: string;
  alt: string;
}

const cartas: InfoCarta[] = [
  {
    idFoto: 1,
    src: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png",
    alt: "abeja",
  },
  {
    idFoto: 2,
    src: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png",
    alt: "gallina",
  },
  {
    idFoto: 3,
    src: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png",
    alt: "gallina",
  },
  {
    idFoto: 4,
    src: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png",
    alt: "abeja",
  },
];

function crearContenedor(nombreClase: string): HTMLDivElement {
  const div = document.createElement("div");
  div.classList.add(nombreClase);
  div.id = nombreClase;

  return div;
}

function crearImagenContenedor(nombreClase: string): HTMLImageElement {
  const img = document.createElement("img");
  img.classList.add(nombreClase);
  img.id = nombreClase;
  img.src = "";
  img.alt = "";

  return img;
}

function mostrarImagen(
  imagen: HTMLImageElement,
  src: string,
  alt: string
): void {
  if (imagen && imagen instanceof HTMLImageElement) {
    imagen.src = src;
    imagen.alt = alt;
  }
}

function mostrarCartas(cartas: InfoCarta[]): void {
  //Obtener div principal
  const cartasContainer = document.querySelector(".cartas-container");

  //Comprobar que existe
  if (cartasContainer && cartasContainer instanceof HTMLDivElement) {
    cartas.forEach((carta) => {
      let indice = carta.idFoto;
      //Crear div carta
      const divCarta = crearContenedor("divCarta");
      //Agregar atributo del index
      divCarta.setAttribute("indice", indice.toString());
      //Agregar divCarta al div principal
      cartasContainer.appendChild(divCarta);

      //Crear div imagen
      const imagen = crearImagenContenedor("imagen");
      imagen.setAttribute("indice", indice.toString());
      //Añadir imagen a divCarta
      divCarta.appendChild(imagen);

      //Agregar evento click a cada div de carta
      divCarta.addEventListener("click", () => {
        mostrarImagen(imagen, carta.src, carta.alt);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => mostrarCartas(cartas));
