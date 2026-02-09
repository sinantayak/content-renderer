# @sinantayak/content-renderer

Angular bileşeni olarak geliştirilmiş, dinamik içerik bloklarını render eden bir npm paketidir. Yardım merkezi, blog, dokümantasyon ve CMS uygulamaları için ideal bir çözümdür.

## 📦 Kurulum

```bash
npm install @sinantayak/content-renderer
```

## 🚀 Kullanım

### 1. Component'i Import Edin

Angular uygulamanızda `ContentRendererComponent`'i import edin:

```typescript
import { Component } from '@angular/core';
import { ContentRendererComponent, ContentBlock } from '@sinantayak/content-renderer';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [ContentRendererComponent],
  template: `
    <tyk-content-renderer [blocks]="contentBlocks"></tyk-content-renderer>
  `
})
export class ArticleComponent {
  contentBlocks: ContentBlock[] = [
    {
      id: '1',
      type: 'heading',
      data: { level: 1, text: 'Başlık' }
    },
    {
      id: '2',
      type: 'paragraph',
      data: { text: 'Bu bir paragraf örneğidir.' }
    }
  ];
}
```

### 2. Veri Yapısı

Her içerik bloğu aşağıdaki yapıya sahiptir:

```typescript
interface ContentBlock {
  type: BlockType;
  id: string;
  data: any;
}
```

## 📚 Desteklenen Blok Tipleri

| Blok Tipi | Açıklama | Örnek Veri |
|-----------|----------|------------|
| `heading` | Başlık (H1-H6) | `{ level: 1, text: 'Başlık' }` |
| `paragraph` | Paragraf metni | `{ text: 'Metin içeriği' }` |
| `bulletList` | Madde işaretli liste | `{ items: ['Madde 1', 'Madde 2'] }` |
| `numberedList` | Numaralı liste | `{ items: ['Madde 1', 'Madde 2'] }` |
| `image` | Görsel | `{ url: 'image.jpg', alt: 'Açıklama' }` |
| `table` | Tablo | `{ headers: [...], rows: [...] }` |
| `button` | Buton | `{ text: 'Tıkla', url: 'https://...' }` |
| `infoBox` | Bilgi kutusu | `{ type: 'info', content: '...' }` |
| `codeBlock` | Kod bloğu | `{ language: 'typescript', code: '...' }` |

## 🔧 Teknik Özellikler

- **Framework:** Angular 21.1.x
- **Paket Versiyonu:** 0.0.5
- **Standalone Component:** Evet
- **TypeScript:** 5.9.x
- **Lisans:** MIT

## 💡 Örnek Kullanım

```typescript
const exampleContent: ContentBlock[] = [
  {
    id: '1',
    type: 'heading',
    data: { level: 1, text: 'Hoş Geldiniz' }
  },
  {
    id: '2',
    type: 'paragraph',
    data: { text: 'Bu bir örnek içeriktir.' }
  },
  {
    id: '3',
    type: 'bulletList',
    data: {
      items: [
        'Kolay kurulum',
        'Esnek yapı',
        'Zengin içerik desteği'
      ]
    }
  },
  {
    id: '4',
    type: 'codeBlock',
    data: {
      language: 'typescript',
      code: 'console.log("Hello World!");'
    }
  }
];
```

## 🛠️ Geliştirme

### Projeyi Klonlama

```bash
git clone <repository-url>
cd content-renderer
npm install
```

### Development Server

```bash
npm start
```

Tarayıcınızda `http://localhost:4200/` adresine gidin.

### Build

```bash
npm run build
```

Build çıktıları `dist/` klasöründe oluşturulur.

### Publish

```bash
npm run publish
```

## 📄 Lisans

MIT

## 👤 Yazar

Sinan Tayak

## 🔗 Bağlantılar

- [NPM Package](https://www.npmjs.com/package/@sinantayak/content-renderer)
- [GitHub Repository](https://github.com/sinantayak/content-renderer)
