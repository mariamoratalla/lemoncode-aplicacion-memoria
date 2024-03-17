import { Carta, Tablero, cartas } from "./modelo";

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }

  console.log(cartas);
  return cartas;
};

/*
    Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
  */
export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  let voltearCarta = true;
  if (
    tablero.estadoPartida === "DosCartasLevantadas" ||
    (tablero.cartas[indice].encontrada && tablero.cartas[indice].estaVuelta)
  ) {
    voltearCarta = false;
  }
  return voltearCarta;
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  const cartaTablero = tablero.cartas[indice];
  const cartaArray = cartas.find(
    (carta) => carta.idFoto === cartaTablero.idFoto
  );

  if (cartaArray) {
    if (tablero.estadoPartida === "CeroCartasLevantadas") {
      tablero.indiceCartaVolteadaA = indice;
    } else if (tablero.estadoPartida === "UnaCartaLevantada") {
      tablero.indiceCartaVolteadaB = indice;
    }
    cartaTablero.estaVuelta = true;
    cartaArray.imagen = cartaTablero.imagen;
  }
};

/*
    Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
  */
export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  const cartaA = tablero.cartas[indiceA].idFoto;
  const cartaB = tablero.cartas[indiceB].idFoto;

  if (cartaA === cartaB) {
    return true;
  }

  return false;
};

/*
    Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
  */
export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
};

/*
    Aquí asumimos que no son pareja y las volvemos a poner boca abajo
  */
export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;

  tablero.cartas[indiceB].estaVuelta = false;
};

/*
    Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
  */
export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

/*
  Iniciar partida
  */

export const iniciaPartida = (tablero: Tablero) => {
  barajarCartas(tablero.cartas);

  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });
};

export const cambiarEstadoPartida = (tablero: Tablero): void => {
  let cartasVolteadas = 0;

  tablero.cartas.forEach((carta) => {
    if (carta.estaVuelta) {
      cartasVolteadas++;
    }
  });

  switch (cartasVolteadas) {
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

  if (esPartidaCompleta(tablero)) {
    tablero.estadoPartida = "PartidaCompleta";
  }

  console.log(tablero.estadoPartida);
};
