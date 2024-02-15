export enum ArticleType {
    NEWS = "NEWS",
    ANNOUNCEMENT = "ANNOUNCEMENT",
}

export enum ArticleFlags {
    IS_DRAFT = 1 << 0,
    IS_PINNED = 1 << 1,
    IS_PUBLISHED = 1 << 2,
}

export const hasFlag = (articleFlag: ArticleFlags, flag: ArticleFlags) => {
    return (articleFlag & flag) === flag;
};
