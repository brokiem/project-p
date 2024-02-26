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

export const encodeArticleTitle = (title: string) => {
    return encodeURIComponent(title.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase());
};

export const formatArticleDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const translateArticleType = (type: ArticleType) => {
    switch (type) {
        case ArticleType.NEWS:
            return "Berita";
        case ArticleType.ANNOUNCEMENT:
            return "Pengumuman";
    }
};

export const formatArticleUrl = (type: ArticleType, title: string, id: number) => {
    return `/artikel/${translateArticleType(type).toLowerCase()}/${id}/${encodeArticleTitle(title)}`;
};
