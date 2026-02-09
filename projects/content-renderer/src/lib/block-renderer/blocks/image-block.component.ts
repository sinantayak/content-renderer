import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-image-block-display',
    imports: [],
    template: `
    <figure class="image-block">
      <img [src]="data.url" [alt]="data.alt">
      @if (data.caption) {
        <figcaption>{{ data.caption }}</figcaption>
      }
    </figure>
  `,
    styles: [`
    .image-block {
      margin: 0;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    figcaption {
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      margin-top: 12px;
      font-style: italic;
    }
  `]
})
export class ImageBlockDisplayComponent {
  @Input() data: any;
}
