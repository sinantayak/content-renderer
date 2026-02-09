import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-code-block-display',
    imports: [],
    template: `
    <div class="code-block-wrapper">
      <div class="code-container">
        <pre><code class="font-mono text-sm">{{ data.code }}</code></pre>
        <button class="copy-button" (click)="copyCode()">
          <span class="material-symbols-outlined">{{ copied ? 'check' : 'content_copy' }}</span>
        </button>
      </div>
    </div>
  `,
    styles: [`
    .code-block-wrapper {
      margin: 24px 0;
    }

    .code-container {
      position: relative;
      background: #0f172a;
      border-radius: var(--radius-lg);
      padding: 20px;
    }

    pre {
      margin: 0;
      overflow-x: auto;
    }

    code {
      color: #93c5fd;
      font-family: 'Fira Code', monospace;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .copy-button {
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      color: #64748b;
      cursor: pointer;
      padding: 4px;
      border-radius: var(--radius-sm);
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .copy-button:hover {
      color: white;
      background: rgba(255, 255, 255, 0.1);
    }

    .copy-button .material-symbols-outlined {
      font-size: 18px;
    }
  `]
})
export class CodeBlockDisplayComponent {
  @Input() data: any;
  copied = false;

  copyCode(): void {
    navigator.clipboard.writeText(this.data.code).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    });
  }
}
