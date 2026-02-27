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
  styles: [`:host { display: block; } ul, ol { color: #2d3039; line-height: 1.75; margin: 0.75rem 0; padding-left: 1.5rem; } li { margin-bottom: 0.375rem; }`]
})
export class ListBlockDisplayComponent {
  @Input() data: any;
  @Input() type: 'bullet' | 'numbered' = 'bullet';
}
