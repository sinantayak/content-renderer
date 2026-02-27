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
      margin: 1.25rem 0;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 32px;
      border-radius: 8px;
      font-size: 0.9375rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .btn-primary {
      background: #003acc;
      color: white;
      box-shadow: 0 4px 14px rgba(0, 58, 204, 0.25);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 58, 204, 0.35);
    }

    .btn-secondary {
      background: #1e293b;
      color: white;
    }

    .btn-secondary:hover {
      background: #334155;
      transform: translateY(-2px);
    }

    .btn-outline {
      background: white;
      border: 2px solid #003acc;
      color: #003acc;
      box-shadow: none;
    }

    .btn-outline:hover {
      background: rgba(0, 58, 204, 0.05);
      transform: translateY(-2px);
    }
  `]
})
export class ButtonBlockDisplayComponent {
  @Input() data: any;
}
