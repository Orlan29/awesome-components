import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from "@angular/core";

@Directive({
  selector: "[highlight]"
})
export class HighlightDirective implements AfterViewInit{

  @Input() color = 'yellow';
  constructor(private el: ElementRef,
              private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setBackgroundColor(this.color);
  }

  setBackgroundColor(color: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.setBackgroundColor('lightblue');
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(target: HTMLElement) {
    this.setBackgroundColor(this.color);
    console.log(target.textContent);
  }

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent) {
    this.color = 'orange';
    console.log($event);
  }
}
