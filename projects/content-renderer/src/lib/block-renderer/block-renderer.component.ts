import { Component, Input } from '@angular/core';

import { ContentBlock } from './models';

// Block display components
import { HeadingBlockDisplayComponent } from './blocks/heading-block.component';
import { ParagraphBlockDisplayComponent } from './blocks/paragraph-block.component';
import { ListBlockDisplayComponent } from './blocks/list-block.component';
import { ImageBlockDisplayComponent } from './blocks/image-block.component';
import { TableBlockDisplayComponent } from './blocks/table-block.component';
import { ButtonBlockDisplayComponent } from './blocks/button-block.component';
import { InfoBoxBlockDisplayComponent } from './blocks/info-box-block.component';
import { CodeBlockDisplayComponent } from './blocks/code-block.component';

@Component({
    selector: 'tyk-content-renderer',
    imports: [
    HeadingBlockDisplayComponent,
    ParagraphBlockDisplayComponent,
    ListBlockDisplayComponent,
    ImageBlockDisplayComponent,
    TableBlockDisplayComponent,
    ButtonBlockDisplayComponent,
    InfoBoxBlockDisplayComponent,
    CodeBlockDisplayComponent
],
    template: `
    <div class="block-renderer">
      @for (block of blocks; track block.id) {
        <div class="block">
          @switch (block.type) {
            @case ('heading') {
              <app-heading-block-display [data]="block.data"></app-heading-block-display>
            }
            @case ('paragraph') {
              <app-paragraph-block-display [data]="block.data"></app-paragraph-block-display>
            }
            @case ('bulletList') {
              <app-list-block-display [data]="block.data" type="bullet"></app-list-block-display>
            }
            @case ('numberedList') {
              <app-list-block-display [data]="block.data" type="numbered"></app-list-block-display>
            }
            @case ('image') {
              <app-image-block-display [data]="block.data"></app-image-block-display>
            }
            @case ('table') {
              <app-table-block-display [data]="block.data"></app-table-block-display>
            }
            @case ('button') {
              <app-button-block-display [data]="block.data"></app-button-block-display>
            }
            @case ('infoBox') {
              <app-info-box-block-display [data]="block.data"></app-info-box-block-display>
            }
            @case ('codeBlock') {
              <app-code-block-display [data]="block.data"></app-code-block-display>
            }
          }
        </div>
      }
    </div>
  `,
    styles: [`
    .block-renderer {
      display: flex;
      flex-direction: column;
      // gap: 24px;
    }

    .block {
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class ContentRendererComponent {
  @Input() blocks: ContentBlock[] = [];
}
