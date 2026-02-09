import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-info-box-block-display',
    imports: [],
    template: `
    <div class="info-box" [class]="data.boxType">
      <div class="info-box-container">
        <span class="material-symbols-outlined icon">{{ getIconName() }}</span>
        <div class="info-content">
          @if (data.title) {
            <h4 class="info-title">{{ data.title }}</h4>
          }
          <div class="info-text" [innerHTML]="data.content"></div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .info-box {
      margin: 32px 0;
      border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
      border-left: 4px solid;
    }

    .info-box-container {
      display: flex;
      padding: 24px;
      gap: 16px;
      align-items: flex-start;
    }

    .icon {
      font-size: 24px;
      flex-shrink: 0;
    }

    .info-content {
      flex: 1;
    }

    .info-title {
      font-size: 0.875rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0 0 4px 0;
    }

    .info-text {
      font-size: 0.875rem;
      line-height: 1.5;
    }

    /* Info Box Type Styles */
    .info-box.info {
      background: #f0f7ff;
      border-color: #3b82f6;

      .icon {
        color: #3b82f6;
      }

      .info-title {
        color: #1e40af;
      }

      .info-text {
        color: #1e40af;
      }
    }

    .info-box.warning {
      background: #fffbef;
      border-color: #f59e0b;

      .icon {
        color: #f59e0b;
      }

      .info-title {
        color: #92400e;
      }

      .info-text {
        color: #92400e;
      }
    }

    .info-box.success {
      background: #f0fdf4;
      border-color: #22c55e;

      .icon {
        color: #22c55e;
      }

      .info-title {
        color: #166534;
      }

      .info-text {
        color: #166534;
      }
    }

    .info-box.error {
      background: #fef2f2;
      border-color: #ef4444;

      .icon {
        color: #ef4444;
      }

      .info-title {
        color: #991b1b;
      }

      .info-text {
        color: #991b1b;
      }
    }
  `]
})
export class InfoBoxBlockDisplayComponent {
  @Input() data: any;

  getIconName(): string {
    switch (this.data.boxType) {
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'success': return 'check_circle';
      default: return 'info';
    }
  }
}
