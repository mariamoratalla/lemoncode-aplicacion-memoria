import { Tablero, tablero } from "./modelo";
import { iniciaPartida } from "./motor";

const boton = document.getElementById("nueva-partida") as HTMLButtonElement;

export const iniciaPartidaUI = () => {
  iniciaPartida(tablero);
  crearTablero(tablero);
};

if (boton && boton instanceof HTMLButtonElement) {
  boton.addEventListener("click", () => {
    window.location.reload();
  });
}

export const crearContenedor = (nombreClase: string): HTMLDivElement => {
  const div = document.createElement("div");
  div.classList.add(nombreClase);
  div.id = nombreClase;
  return div;
};

export const crearImagenContenedor = (
  nombreClase: string
): HTMLImageElement => {
  const img = document.createElement("img");
  img.classList.add(nombreClase);
  img.id = nombreClase;
  img.src = "";

  return img;
};

const mostrarImagen = (imagen: HTMLImageElement, src: string): void => {
  if (imagen && imagen instanceof HTMLImageElement) {
    imagen.src = src;
  }
};

export const crearTablero = (tablero: Tablero) => {
  //Obtener div principal
  const cartasContainer = document.querySelector(
    ".cartas-container"
  ) as HTMLDivElement;

  //Comprobar si existe
  if (cartasContainer && cartasContainer instanceof HTMLDivElement) {
    tablero.cartas.forEach((carta) => {
      let indice = carta.idFoto;
      //Crear div carta
      const divCarta = crearContenedor("divCarta");
      divCarta.setAttribute("indice", indice.toString());
      cartasContainer.appendChild(divCarta);

      //Crear div imagen
      const imagen = crearImagenContenedor("imagen");
      imagen.setAttribute("indice", indice.toString());
      divCarta.appendChild(imagen);

      //Agregar evento click a cada div de carta
      divCarta.addEventListener("click", () => {
        mostrarImagen(imagen, carta.imagen);
      });
    });
  }
};
