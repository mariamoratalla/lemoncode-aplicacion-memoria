function mostrarImagen(): void {
  const imagen = document.getElementById("imagen") as HTMLImageElement;

  if (imagen && imagen instanceof HTMLImageElement) {
    imagen.src =
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png";
    imagen.alt = "leon";
  }
}

const carta = document.querySelector(".imagen-container") as HTMLDivElement;

if (carta && carta instanceof HTMLDivElement) {
  document.addEventListener("click", mostrarImagen);
}
