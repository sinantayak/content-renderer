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
    h1, h2, h3, h4 { scroll-margin-top: 100px; }
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
