import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-video-block-display',
    imports: [],
    template: `
    <figure class="video-block">
      <video [src]="data.url" controls preload="metadata" class="video-player"></video>
      @if (data.caption) {
        <figcaption>{{ data.caption }}</figcaption>
      }
    </figure>
  `,
    styles: [`
    .video-block {
      margin: 1.5rem 0;
    }

    .video-player {
      width: 100%;
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    figcaption {
      text-align: center;
      font-size: 14px;
      color: #4b5059;
      margin-top: 8px;
      font-style: italic;
    }
  `]
})
export class VideoBlockDisplayComponent {
    @Input() data: any;
}
