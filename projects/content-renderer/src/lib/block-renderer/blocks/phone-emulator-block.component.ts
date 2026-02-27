import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-phone-emulator-block-display',
  imports: [],
  template: `
    <div class="phone-emulator-display">
      @if (safeUrl) {
        <div class="phone-scale-wrapper">
          <div class="phone-frame" [class.iphone]="deviceType === 'iphone'" [class.android]="deviceType === 'android'">
            @if (deviceType === 'iphone') {
              <div class="iphone-notch">
                <div class="dynamic-island"></div>
              </div>
            }
            @if (deviceType === 'android') {
              <div class="android-status-bar">
                <div class="status-bar-left">
                  <span class="status-time">9:41</span>
                </div>
                <div class="status-bar-right">
                  <div class="camera-hole"></div>
                </div>
              </div>
            }
            <div class="phone-viewport">
              <iframe [src]="safeUrl" frameborder="0" allowfullscreen></iframe>
            </div>
            @if (deviceType === 'iphone') {
              <div class="iphone-home-indicator">
                <div class="home-bar"></div>
              </div>
            }
            @if (deviceType === 'android') {
              <div class="android-nav-bar">
                <span class="nav-icon">◁</span>
                <span class="nav-icon">○</span>
                <span class="nav-icon">□</span>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .phone-emulator-display {
      margin: 2rem 0;
      display: flex;
      justify-content: center;
    }

    .phone-scale-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .phone-frame {
      background: #1a1a1a;
      position: relative;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(255, 255, 255, 0.1) inset;
    }

    .phone-frame.iphone {
      width: 320px;
      border-radius: 36px;
    }

    .phone-frame.android {
      width: 308px;
      border-radius: 20px;
    }

    .iphone-notch {
      height: 44px;
      background: #1a1a1a;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 2;
    }

    .dynamic-island {
      width: 100px;
      height: 28px;
      background: #000;
      border-radius: 20px;
    }

    .android-status-bar {
      height: 32px;
      background: #1a1a1a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      position: relative;
      z-index: 2;
    }

    .status-time {
      font-size: 11px;
      color: #fff;
      font-weight: 600;
    }

    .camera-hole {
      width: 12px;
      height: 12px;
      background: #333;
      border-radius: 50%;
    }

    .phone-viewport {
      width: 100%;
      height: 580px;
      overflow: hidden;
      position: relative;
    }

    .phone-viewport iframe {
      width: 100%;
      height: 100%;
      border: none;
      background: #fff;
    }

    .iphone-home-indicator {
      height: 30px;
      background: #1a1a1a;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .home-bar {
      width: 110px;
      height: 5px;
      background: #555;
      border-radius: 3px;
    }

    .android-nav-bar {
      height: 36px;
      background: #1a1a1a;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 40px;
    }

    .nav-icon {
      font-size: 14px;
      color: #666;
    }
  `]
})
export class PhoneEmulatorBlockDisplayComponent {
  @Input() data: any;

  private sanitizer: DomSanitizer;
  private _cachedUrl = '';
  private _cachedSafeUrl: SafeResourceUrl | null = null;

  constructor(sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }

  get deviceType(): string {
    return this.data?.deviceType || 'iphone';
  }

  get safeUrl(): SafeResourceUrl | null {
    const url = this.data?.url;
    if (!url || !url.startsWith('https://')) {
      this._cachedUrl = '';
      this._cachedSafeUrl = null;
      return null;
    }
    if (url !== this._cachedUrl) {
      this._cachedUrl = url;
      this._cachedSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return this._cachedSafeUrl;
  }
}
