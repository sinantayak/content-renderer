export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'bulletList'
  | 'numberedList'
  | 'image'
  | 'table'
  | 'button'
  | 'infoBox'
  | 'codeBlock'
  | 'richText'
  | 'phoneEmulator'
  | 'video';

export interface ContentBlock {
  type: BlockType;
  id: string;
  data: any;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  category_id: number | null;
  status: string;
  content: ContentBlock[];
  author_id: number;
  author_name?: string;
  category_name?: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parent_id: number | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryTree extends Category {
  children: CategoryTree[];
  articles?: { id: number; title: string; slug: string }[];
}
