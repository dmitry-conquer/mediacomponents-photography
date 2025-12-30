export default class Video {
  private rootSelector: string = "[data-js-column-video]";
  private rootElement: HTMLElement | null = null;
  private video: HTMLVideoElement | null = null;

  constructor() {
    this.rootElement = document.querySelector(this.rootSelector) as HTMLElement;
    this.video = this.rootElement?.querySelector("video");

    if (this.rootElement && this.video) {
      this.rootElement?.addEventListener("click", () => this.handleClick());
    }
  }

  private handleClick() {
    this.rootElement?.classList.toggle("is-active");
    const isPlaying = this.video?.paused;
    if (isPlaying) {
      this.video?.play();
    } else {
      this.video?.pause();
    }
  }
}
