import "../styles/main.scss";
import Gallery from "./Gallery";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

declare const ajax_obj: {
  ajax_url: string;
};

async function fetchGalleryItems(): Promise<string[]> {


  const ajaxUrl = ajax_obj?.ajax_url;

  if (!ajaxUrl) {
    console.error("ajax_obj.ajax_url is not defined");
    return [];
  }

  try {
    const response = await fetch(ajaxUrl + "?action=get_gallery_items", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }


    return [];
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async (): Promise<void> => {
  const lightbox = GLightbox({
    selector: ".glightbox",
    autoplayVideos: true,
  });

  const items = await fetchGalleryItems();

  new Gallery(items, lightbox);
});
