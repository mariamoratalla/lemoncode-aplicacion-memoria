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

if (boton && boton instanceof HTMLButtonElement) {
  boton.addEventListener("click", () => {
    window.location.reload();
  });
}

export const iniciaPartidaUI = () => {
  iniciaPartida(tablero);
  crearTablero(tablero);
};

let numeroCarta = 0;
let numeroImagen = 0;
export const crearContenedor = (nombreClase: string): HTMLDivElement => {
  const div = document.createElement("div");
  div.classList.add(nombreClase);
  div.id = nombreClase + numeroCarta++;
  return div;
};

export const crearImagenContenedor = (
  nombreClase: string
): HTMLImageElement => {
  const img = document.createElement("img");
  img.classList.add(nombreClase);
  img.id = nombreClase + numeroImagen++;
  img.src = "";

  return img;
};

export const crearTablero = (tablero: Tablero) => {
  //obtener div principal
  const cartasContainer = document.querySelector(".cartas-container");

  if (cartasContainer && cartasContainer instanceof HTMLDivElement) {
    tablero.cartas.forEach((carta) => {
      let indice = carta.idFoto;
      let indiceDiv = tablero.cartas.indexOf(carta);

      //Crear div de carta
      const divCarta = crearContenedor("divCarta");
      divCarta.setAttribute("indice", indice.toString());
      cartasContainer.appendChild(divCarta);

      //crear imagen
      const imagen = crearImagenContenedor("imagen");
      imagen.setAttribute("indice-imagen", indice.toString());
      divCarta.appendChild(imagen);

      divCarta.addEventListener("click", () => handleClickCarta(indiceDiv));
    });
  }
};

export const handleClickCarta = (indice: number): void => {
  const imagen = document.getElementById(`imagen${indice}`);

  if (imagen && imagen instanceof HTMLImageElement) {
    if (sePuedeVoltearLaCarta(tablero, indice)) {
      voltearLaCarta(tablero, indice);

      //mostrar imagen
      imagen.src = tablero.cartas[indice].imagen;

      //cambiar estado
      if (tablero.estadoPartida === "CeroCartasLevantadas") {
        tablero.indiceCartaVolteadaA = indice;
        cambiarEstadoPartida(tablero);
      } else if (tablero.estadoPartida === "UnaCartaLevantada") {
        tablero.indiceCartaVolteadaB = indice;
        cambiarEstadoPartida(tablero);

        //comprobar si son pareja
        if (
          tablero.indiceCartaVolteadaA !== undefined &&
          tablero.indiceCartaVolteadaB !== undefined
        ) {
          if (
            sonPareja(
              tablero,
              tablero.indiceCartaVolteadaA,
              tablero.indiceCartaVolteadaB
            )
          ) {
            parejaEncontrada(
              tablero,
              tablero.indiceCartaVolteadaA,
              tablero.indiceCartaVolteadaB
            );
            tablero.indiceCartaVolteadaA = undefined;
            tablero.indiceCartaVolteadaB = undefined;
            cambiarEstadoPartida(tablero);
          } else {
            setTimeout(() => {
              if (
                tablero.indiceCartaVolteadaA !== undefined &&
                tablero.indiceCartaVolteadaB !== undefined
              ) {
                parejaNoEncontrada(
                  tablero,
                  tablero.indiceCartaVolteadaA,
                  tablero.indiceCartaVolteadaB
                );

                const cartaA = document.getElementById(
                  `imagen${tablero.indiceCartaVolteadaA}`
                ) as HTMLImageElement;
                const cartaB = document.getElementById(
                  `imagen${tablero.indiceCartaVolteadaB}`
                ) as HTMLImageElement;
                cartaA.src = "";
                cartaB.src = "";
                cambiarEstadoPartida(tablero);
              }
            }, 1000);
          }
        }
      }
    }
  }
};
