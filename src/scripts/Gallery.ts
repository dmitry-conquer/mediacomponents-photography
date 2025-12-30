export default class Gallery {
  private selectors: Record<string, string> = {
    root: "[data-js-gallery-portfolio]",
    container: "[data-js-gallery-portfolio-container]",
    button: "[data-js-gallery-portfolio-button]",
  };

  private rootElement: HTMLElement | null = null;
  private files: string[] = [];
  private containerElement: HTMLElement | null = null;
  private buttonElement: HTMLButtonElement | null = null;
  private perPage: number = 8;
  private currentIndex: number = 0;
  private lightbox: any;

  constructor(files: string[], lightbox: any) {
    this.lightbox = lightbox;
    this.files = files;
    this.rootElement = document.querySelector(this.selectors.root) as HTMLElement;
    this.containerElement = document.querySelector(this.selectors.container) as HTMLElement;
    this.buttonElement = document.querySelector(this.selectors.button) as HTMLButtonElement;
    if (this.rootElement && this.containerElement && this.buttonElement) {
      this.perPage = this.rootElement.getAttribute("data-js-gallery-portfolio-per-page")
        ? parseInt(this.rootElement.getAttribute("data-js-gallery-portfolio-per-page") as string)
        : 8;
      this.init();
    }
  }

  private init() {
    this.buttonElement?.addEventListener("click", () => this.handleButtonClick());
    this.initialRender();
    if (this.lightbox && this.lightbox.reload) {
      this.lightbox.reload();
    }
  }

  private initialRender() {
    const items = this.files.slice(this.currentIndex, this.currentIndex + this.perPage);
    this.containerElement!.innerHTML += items.join("");
    this.currentIndex += items.length;
  }

  private handleButtonClick() {
    const items = this.files.slice(this.currentIndex, this.currentIndex + this.perPage);
    this.containerElement!.innerHTML += items.join("");
    this.currentIndex += items.length;

    if (this.lightbox && this.lightbox.reload) {
      this.lightbox.reload();
    }

    if (this.currentIndex >= this.files.length) {
      this.buttonElement!.style.display = "none";
    }
  }
}
