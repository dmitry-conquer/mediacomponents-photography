export default class Gallery {
  private selectors: Record<string, string> = {
    root: "[data-js-gallery-portfolio]",
    container: "[data-js-gallery-portfolio-container]",
    button: "[data-js-gallery-portfolio-button]",
    item: ".gallery-portfolio__item",
    filter: "[data-portfolio-filter]",
  };

  private rootElement: HTMLElement | null = null;
  private containerElement: HTMLElement | null = null;
  private buttonElement: HTMLButtonElement | null = null;
  private filterButtons: NodeListOf<HTMLButtonElement> | null = null;
  private galleryItems: HTMLElement[] = [];
  private perPage: number = 6;
  private currentIndex: number = 0;
  private currentFilter: string = "all";
  private lightbox: any;

  constructor(_files: string[], lightbox: any) {
    this.lightbox = lightbox;
    this.rootElement = document.querySelector(this.selectors.root) as HTMLElement;
    this.containerElement = document.querySelector(this.selectors.container) as HTMLElement;
    this.buttonElement = document.querySelector(this.selectors.button) as HTMLButtonElement;
    this.filterButtons = this.rootElement?.querySelectorAll(this.selectors.filter) as NodeListOf<HTMLButtonElement> | null;
    
    if (this.rootElement && this.containerElement && this.buttonElement) {
      this.perPage = this.rootElement.getAttribute("data-js-gallery-portfolio-per-page")
        ? parseInt(this.rootElement.getAttribute("data-js-gallery-portfolio-per-page") as string)
        : 6;
      this.init();
    }
  }

  private init() {
    this.galleryItems = Array.from(
      this.containerElement!.querySelectorAll(this.selectors.item)
    ) as HTMLElement[];

    this.buttonElement?.addEventListener("click", () => this.handleButtonClick());
    
    // Додаємо обробники для кнопок фільтрації
    this.filterButtons?.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-portfolio-filter");
        if (filter) {
          this.handleFilter(filter);
        }
      });
    });

    // Встановлюємо активний стан для кнопки "All" за замовчуванням
    const allButton = Array.from(this.filterButtons || []).find(
      (btn) => btn.getAttribute("data-portfolio-filter") === "all"
    );
    if (allButton) {
      allButton.classList.add("gallery-portfolio__filter--active");
    }

    this.initialRender();
    
    if (this.lightbox && this.lightbox.reload) {
      this.lightbox.reload();
    }
  }

  private initialRender() {
    this.applyFilter();
  }

  private handleFilter(filter: string) {
    this.currentFilter = filter;
    this.currentIndex = 0;

    // Оновлюємо активний стан кнопок
    this.filterButtons?.forEach((button) => {
      const buttonFilter = button.getAttribute("data-portfolio-filter");
      if (buttonFilter === filter) {
        button.classList.add("gallery-portfolio__filter--active");
      } else {
        button.classList.remove("gallery-portfolio__filter--active");
      }
    });

    this.applyFilter();

    if (this.lightbox && this.lightbox.reload) {
      this.lightbox.reload();
    }
  }

  private applyFilter() {
    // Отримуємо відфільтровані елементи
    const filteredItems = this.getFilteredItems();
    
    // Приховуємо всі елементи
    this.galleryItems.forEach((item) => {
      item.style.display = "none";
      item.classList.remove("gallery-portfolio__item--visible");
    });

    // Показуємо перші perPage відфільтрованих елементів
    const itemsToShow = filteredItems.slice(0, this.perPage);
    itemsToShow.forEach((item) => {
      item.style.display = "";
      item.classList.add("gallery-portfolio__item--visible");
    });

    this.currentIndex = itemsToShow.length;

    // Показуємо або приховуємо кнопку "Load more"
    if (this.currentIndex >= filteredItems.length || filteredItems.length === 0) {
      this.buttonElement!.style.display = "none";
    } else {
      this.buttonElement!.style.display = "";
    }
  }

  private getFilteredItems(): HTMLElement[] {
    if (this.currentFilter === "all") {
      return this.galleryItems;
    }
    return this.galleryItems.filter((item) => {
      const category = item.getAttribute("data-portfolio-category");
      return category === this.currentFilter;
    });
  }

  private handleButtonClick() {
    const filteredItems = this.getFilteredItems();
    const nextItems = filteredItems.slice(
      this.currentIndex,
      this.currentIndex + this.perPage
    );

    nextItems.forEach((item) => {
      item.style.display = "";
      item.classList.add("gallery-portfolio__item--visible");
    });

    this.currentIndex += nextItems.length;

    if (this.currentIndex >= filteredItems.length) {
      this.buttonElement!.style.display = "none";
    }

    if (this.lightbox && this.lightbox.reload) {
      this.lightbox.reload();
    }
  }
}
