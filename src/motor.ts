import { Carta, Tablero, cartas } from "./modelo";

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }

  console.log(cartas);
  return cartas;
};

export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  if (
    tablero.estadoPartida !== "DosCartasLevantadas" &&
    !tablero.cartas[indice].encontrada &&
    !tablero.cartas[indice].estaVuelta
  ) {
    return true;
  }
  return false;
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  const cartaTablero = tablero.cartas[indice];
  const cartaArray = cartas.find(
    (carta) => carta.idFoto === cartaTablero.idFoto
  );

  if (cartaArray) {
    cartaTablero.imagen = cartaArray.imagen;
    cartaTablero.estaVuelta = true;
  }
};

export const sonPareja = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceA].estaVuelta = false;

  tablero.cartas[indiceB].encontrada = true;
  tablero.cartas[indiceB].estaVuelta = false;
};

export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = false;
  tablero.cartas[indiceA].estaVuelta = false;

  tablero.cartas[indiceB].encontrada = false;
  tablero.cartas[indiceB].estaVuelta = false;
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

export const iniciaPartida = (tablero: Tablero): void => {
  tablero.cartas = barajarCartas([...tablero.cartas]);

  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });
  tablero.estadoPartida = "CeroCartasLevantadas";
};

export function cambiarEstadoPartida(tablero: Tablero) {
  let cartasLevantadas = tablero.cartas.filter((carta) => carta.estaVuelta);
  const numeroCartasLevantadas = cartasLevantadas.length;
  let cartasEncontradas = tablero.cartas.filter((carta) => carta.encontrada);
  const numeroCartasEncontradas = cartasEncontradas.length;

  switch (numeroCartasLevantadas) {
    case 0:
      tablero.estadoPartida = "CeroCartasLevantadas";
      break;
    case 1:
      tablero.estadoPartida = "UnaCartaLevantada";
      break;
    case 2:
      tablero.estadoPartida = "DosCartasLevantadas";
      break;
  }

  if (numeroCartasEncontradas === tablero.cartas.length) {
    tablero.estadoPartida = "PartidaCompleta";
  }

  console.log(tablero.estadoPartida);
}
