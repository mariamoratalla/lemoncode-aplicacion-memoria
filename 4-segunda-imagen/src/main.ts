const carta1 = document.getElementById("carta-1") as HTMLDivElement;
const carta2 = document.getElementById("carta-2") as HTMLDivElement;
const imagen1 = document.getElementById("imagen-1") as HTMLImageElement;
const imagen2 = document.getElementById("imagen-2") as HTMLImageElement;

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

if (carta1 && carta1 instanceof HTMLDivElement) {
  carta1.addEventListener("click", () => {
    mostrarImagen(
      imagen1,
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
      "león"
    );
  });
}

if (carta2 && carta2 instanceof HTMLDivElement) {
  carta2.addEventListener("click", () => {
    mostrarImagen(
      imagen2,
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
      "búho"
    );
  });
}
