import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-button-block-display',
    imports: [],
    template: `
    <div class="button-block">
      <a [href]="data.url" [class]="'btn btn-' + data.style" target="_blank">
        {{ data.label }}
      </a>
    </div>
  `,
    styles: [`
    .button-block {
      display: flex;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-secondary {
      background: #1f2937;
      color: white;
    }

    .btn-secondary:hover {
      background: #374151;
    }

    .btn-outline {
      background: transparent;
      border: 2px solid #667eea;
      color: #667eea;
    }

    .btn-outline:hover {
      background: #667eea;
      color: white;
    }
  `]
})
export class ButtonBlockDisplayComponent {
  @Input() data: any;
}
