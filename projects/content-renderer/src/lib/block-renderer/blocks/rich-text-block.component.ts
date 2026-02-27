import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-rich-text-block-display',
  encapsulation: ViewEncapsulation.None,
  template: `<div class="rich-text-display" [innerHTML]="safeHtml"></div>`,
  styles: [`
    app-rich-text-block-display { display: block; margin: 0.75rem 0; }
    .rich-text-display {
      line-height: 1.75;
      color: #2d3039;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: normal;
    }
    .rich-text-display h1,
    .rich-text-display h2,
    .rich-text-display h3,
    .rich-text-display h4 { margin: 1.5em 0 0.5em; font-weight: 700; color: #1a1d23; }
    .rich-text-display p { margin: 0.75em 0; }
    .rich-text-display ul,
    .rich-text-display ol { padding-left: 1.5em; margin: 0.75em 0; }
    .rich-text-display li { margin-bottom: 0.375em; }
    .rich-text-display blockquote {
      border-left: 4px solid #003acc;
      padding: 0.75em 1em;
      color: #4b5059;
      background: #f8fafc;
      margin: 1em 0;
      border-radius: 0 8px 8px 0;
    }
    .rich-text-display a { color: #003acc; text-decoration: underline; }
    .rich-text-display img { max-width: 100%; border-radius: 8px; margin: 1rem 0; }
    .rich-text-display pre,
    .rich-text-display .ql-syntax,
    .rich-text-display pre.ql-syntax {
      background: #1e293b;
      color: #e2e8f0;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1rem 0;
      font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
      font-size: 0.875rem;
      line-height: 1.6;
    }
    .rich-text-display .ql-code-block-container {
      background: #1e293b;
      color: #e2e8f0;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1rem 0;
      font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
      font-size: 0.875rem;
      line-height: 1.6;
    }
    .rich-text-display code:not(pre code) {
      background: #f1f5f9;
      color: #003acc;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.875em;
    }
    .rich-text-display .ql-align-center { text-align: center; }
    .rich-text-display .ql-align-right { text-align: right; }
    .rich-text-display .ql-align-justify { text-align: justify; }
  `]
})
export class RichTextBlockDisplayComponent {
  @Input() data: any;

  safeHtml: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(): void {
    let html = this.data?.html || '';
    // Replace non-breaking spaces between words with normal spaces so word-wrap works
    html = html.replace(/&nbsp;/g, ' ');
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
