import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-list-block-display',
    imports: [],
    template: `
    @if (type === 'bullet') {
      <ul>
        @for (item of data.items; track $index) {
          <li [innerHTML]="item"></li>
        }
      </ul>
    } @else {
      <ol>
        @for (item of data.items; track $index) {
          <li [innerHTML]="item"></li>
        }
      </ol>
    }
  `,
    styles: [`:host { display: block; }`]
})
export class ListBlockDisplayComponent {
  @Input() data: any;
  @Input() type: 'bullet' | 'numbered' = 'bullet';
}
