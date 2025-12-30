import "../styles/main.scss";

document.addEventListener("DOMContentLoaded", (): void => {
  //@ts-expect-error GLightbox is not typed
  GLightbox({
    selector: ".glightbox",
    autoplayVideos: true,
  });
});
