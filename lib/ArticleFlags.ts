export enum ArticleFlags {
  // The article is a draft and should not be displayed
  DRAFT = 1 << 0,
  // The article is pinned and should be displayed at the top
  PINNED = 1 << 1,
}
