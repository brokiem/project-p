import type {ArticleType} from "~/lib/ArticleType";

export interface Article {
  id: number;
  image_url: string;
  title: string;
  content: string;
  author_uuid: string;
  created_at: Date;
  updated_at?: Date;
  type: ArticleType;
}
