import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-heading-block-display',
  imports: [],
  template: `
    @switch (data.level) {
      @case (1) { <h1 [id]="slugify(data.text)">{{ data.text }}</h1> }
      @case (2) { <h2 [id]="slugify(data.text)">{{ data.text }}</h2> }
      @case (3) { <h3 [id]="slugify(data.text)">{{ data.text }}</h3> }
      @case (4) { <h4 [id]="slugify(data.text)">{{ data.text }}</h4> }
    }
  `,
  styles: [`
    :host { display: block; }
    h1, h2, h3, h4 {
      scroll-margin-top: 100px;
      color: #1a1d23;
    }
    h1 { font-size: 2rem; margin: 2rem 0 1rem; font-weight: 800; }
    h2 { font-size: 1.5rem; margin: 1.75rem 0 0.75rem; font-weight: 700; }
    h3 { font-size: 1.25rem; margin: 1.5rem 0 0.5rem; font-weight: 600; }
    h4 { font-size: 1.125rem; margin: 1.25rem 0 0.5rem; font-weight: 600; }
  `]
})
export class HeadingBlockDisplayComponent {
  @Input() data: any;

  slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
}
