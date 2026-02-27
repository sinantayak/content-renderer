import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-paragraph-block-display',
  imports: [],
  template: `<p [innerHTML]="data.text"></p>`,
  styles: [`:host { display: block; } p { color: #2d3039; line-height: 1.75; margin: 0.75rem 0; font-size: 1rem; }`]
})
export class ParagraphBlockDisplayComponent {
  @Input() data: any;
}
