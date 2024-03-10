import { Carta, Tablero, cartas } from "./modelo"

export const barajarCartas = (cartas : Carta[]): Carta[] => {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }
    return cartas;
  }
  
  /*
    Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
  */
  export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
    let voltearCarta = true
    if(tablero.estadoPartida === 'DosCartasLevantadas' || 
    tablero.cartas[indice].encontrada && tablero.cartas[indice].estaVuelta) {
        voltearCarta = false
    }
    return voltearCarta
  }
  
  export const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
    if(sePuedeVoltearLaCarta(tablero, indice)) {
        const cartaTablero = tablero.cartas[indice]
        const cartaArray = cartas.find(carta => carta.idFoto === cartaTablero.idFoto)

        if(cartaArray) {
            cartaTablero.estaVuelta = true
            cartaArray.imagen = cartaTablero.imagen
        }
    } 
  }
  
  /*
    Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
  */
  export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
    //...
    return true
  }
  
  /*
    Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
  */
  export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
    //...
  }
  
  /*
    Aquí asumimos que no son pareja y las volvemos a poner boca abajo
  */
  export const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
    // ...
  }
  
  /*
    Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
  */
  export const esPartidaCompleta(tablero: Tablero) : boolean => {
    //...
  }
  
  /*
  Iniciar partida
  */
  
  export const iniciaPartida = (tablero: Tablero): void => {
    //...
  };