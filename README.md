# LABORATORIO APLICACIÓN MEMORIA

Este laboratorio consiste en crear un juego de cartas en el que se buscan parejas.
Se reparten las cartas boca abajo, y el usuario tiene que hacer click en cada carta para descubrir su contenido. Si este contenido coincide con el de otra carta, se habrá encontrado una pareja.
El objetivo es encontrar todas las parejas de cartas.

## ¿Cómo abrir la aplicación?

Pasos:

- Clonate el proyecto.
- Instala las dependencias con `npm install`.
- Ejecuta el sandbox con `npm run dev`.
- Abre el navegador en `http://localhost:5173/` (si ese puerto no te funciona, mira en la consola donde has hecho el build, puede que este ocupado y se haya abierto en otro puerto).

## Instrucciones de juego

- Mostramos al usuario 12 cartas boca abajo.
- El usuario pincha en una carta y se ve el contenido de la misma (por ejemplo un gatito).
- El usuario pincha en otra carta y se ve el contenido de la misma
  - Si por ejemplo es un perrito, ambas cartas se ocultan y vuelta a empezar.
  - Si es un gatito (y la carta origen era el mismo gatito), se quedan las dos cartas bocarriba y el usuario vuelve a jugar.
- Esto así hasta que el usuario encuentre todas las parejas.

## ¿Cómo lo he hecho?

Practicando con pruebas de concepto.

### Prueba de concepto 1

**Objetivo:** buscar una función que barajara las cartas.

### Prueba de concepto 2

**Objetivo:** crear una carta boca abajo y al darle click mostrar la imagen que contiene.

### Prueba de concepto 3

**Objetivo:** mostrar un grid con las 12 cartas boca abajo.

### Prueba de concepto 4

**Objetivo:** hacer lo mismo que en la prueba de conceptro 2 pero esta vez creando dos cartas de forma que la app identifique en cuál se ha dado click y muestre la imagen correcta.

### Prueba de concepto 5

**Objetivo:** mapear el div que contiene la carta ccon la posición del array de cartas.

## Implementación del juego

El código en Typescript está dividido en cuatro archivos: modelo, motor, UI y main.

### Modelo

Archivo que contiene las constantes y se definen las interfaces y tipos de variables.

### Motor

Contiene la lógica del juego.

### UI

Contiene lo relacionado con la interfaz de usuario y su interacción.