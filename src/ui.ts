import { Tablero, tablero } from "./modelo";
import {
  cambiarEstadoPartida,
  iniciaPartida,
  parejaEncontrada,
  parejaNoEncontrada,
  sePuedeVoltearLaCarta,
  sonPareja,
  voltearLaCarta,
} from "./motor";

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
  img.src = "";

  return img;
};

export const crearTablero = (tablero: Tablero) => {
  //Obtener div principal
  const cartasContainer = document.querySelector(
    ".cartas-container"
  ) as HTMLDivElement;

  //Comprobar si existe
  if (cartasContainer && cartasContainer instanceof HTMLDivElement) {
    tablero.cartas.forEach((_, indice) => {
      //Crear div carta
      const divCarta = crearContenedor("divCarta");
      divCarta.setAttribute("indice", indice.toString());
      cartasContainer.appendChild(divCarta);

      //Crear div imagen
      const imagen = crearImagenContenedor("imagen");
      imagen.setAttribute("indice", indice.toString());
      divCarta.appendChild(imagen);

      //Escuchar el evento click en la carta
      divCarta.addEventListener("click", () => handleClickCarta(indice));
    });
  }
};

let indicePrimeraCartaVolteada: number | null = null; //Almacena el índice de la primera carta volteada

export const handleClickCarta = (indice: number) => {
  const divCarta = document.querySelector(
    `.divCarta[indice="${indice}"]`
  ) as HTMLDivElement;

  if (divCarta && divCarta instanceof HTMLDivElement) {
    if (sePuedeVoltearLaCarta(tablero, indice)) {
      // Verificar si la carta ya está volteada
      if (!tablero.cartas[indice].estaVuelta) {
        // Si no está volteada, voltearla
        voltearLaCarta(tablero, indice);

        // Mostrar la imagen de la carta volteada
        const imagen = divCarta.querySelector(".imagen") as HTMLImageElement;
        if (imagen && imagen instanceof HTMLImageElement) {
          const indiceImagen = imagen.getAttribute("indice");
          if (indiceImagen) {
            const imagenUrl = tablero.cartas[parseInt(indiceImagen)].imagen;
            imagen.src = imagenUrl;
          }
        }
        // Almacenar el índice de la primera carta volteada
        if (indicePrimeraCartaVolteada === null) {
          indicePrimeraCartaVolteada = indice;
          console.log("Primera carta volteada:", indicePrimeraCartaVolteada);
        } else {
          // Si ya hay una primera carta volteada, comparar con la actual
          const indicePrimera = indicePrimeraCartaVolteada;
          if (sonPareja(indicePrimera, indice, tablero)) {
            // Si son pareja, marcarlas como encontradas
            parejaEncontrada(tablero, indicePrimera, indice);
            console.log("Has encontrado una pareja!");
          } else {
            setTimeout(() => {
              // Si no son pareja, voltearlas de nuevo
              parejaNoEncontrada(tablero, indicePrimera, indice);
              console.log("Las cartas no coinciden, inténtalo de nuevo.");
              actualizarCartas();
            }, 1000);
          }
          // Reiniciar el índice de la primera carta volteada
          indicePrimeraCartaVolteada = null;
        }
      }
      // Actualizar el estado de la partida
      cambiarEstadoPartida(tablero);
    }
  }
};

// Función para actualizar las cartas en la interfaz de usuario
const actualizarCartas = () => {
  tablero.cartas.forEach((carta, indice) => {
    const divCarta = document.querySelector(
      `.divCarta[indice="${indice}"]`
    ) as HTMLDivElement;
    if (divCarta && divCarta instanceof HTMLDivElement) {
      const imagen = divCarta.querySelector(".imagen") as HTMLImageElement;
      if (imagen && imagen instanceof HTMLImageElement) {
        // Si la carta no ha sido encontrada, ocultar la imagen
        if (!carta.encontrada) {
          imagen.src = "";
        }
      }
    }
  });
};
