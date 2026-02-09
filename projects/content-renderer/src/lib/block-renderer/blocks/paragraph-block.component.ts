import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-paragraph-block-display',
    imports: [],
    template: `<p [innerHTML]="data.text"></p>`,
    styles: [`:host { display: block; }`]
})
export class ParagraphBlockDisplayComponent {
  @Input() data: any;
}
