import "../styles/main.scss";
import Gallery from "./Gallery";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

document.addEventListener("DOMContentLoaded", (): void => {
  const lightbox = GLightbox({
    selector: ".glightbox",
    autoplayVideos: true,
    touchNavigation: false,
    keyboardNavigation: false,
    closeButton: true,
    loop: false,
  });

  new Gallery([], lightbox);
});
