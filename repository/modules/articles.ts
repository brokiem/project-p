import type { Prisma } from "@prisma/client";
import HttpFactory from "~/repository/factory";
import { ArticleFlags, type ArticleType as TheArticleType } from "~/utils/articles";

export type Article = {
    id: number;
    image_url: string;
    title: string;
    summary: string;
    content: Prisma.JsonValue;
    author_uuid: string;
    created_at: string;
    updated_at: string;
    type: TheArticleType;
    flags: ArticleFlags;
};

class ArticlesModule extends HttpFactory {
    private readonly ROUTE = `${this.API_URL}/articles`;

    async getAnnouncementCount(token?: string): Promise<{ success: boolean; message: { count: string } }> {
        const request: RequestInit = {
            method: "GET",
        };

        // Check if token is defined
        if (!!token) {
            request.headers = {
                "Authorization": `Bearer ${token}`,
            };
        }

        return this.request(`${this.ROUTE}/announcements/count`, request);
    }

    async getAnnouncementById(id: number, token?: string): Promise<{
        success: boolean; message: {
            announcement: Article;
        }
    }> {
        const request: RequestInit = {
            method: "GET",
        };

        // Check if token is defined
        if (!!token) {
            request.headers = {
                "Authorization": `Bearer ${token}`,
            };
        }

        return this.request(`${this.ROUTE}/announcements/${id}`, request);
    }

    async getAnnouncements(offset: number | null, limit: number | null, token?: string): Promise<{
        success: boolean; message: {
            announcements: Article[];
        }
    }> {
        const url = new URL(`${this.ROUTE}/announcements`);

        if (offset != null) {
            url.searchParams.set("offset", String(offset));
        }
        if (limit != null) {
            url.searchParams.set("limit", String(limit));
        }

        const request: RequestInit = {
            method: "GET",
        };

        // Check if token is defined
        if (!!token) {
            request.headers = {
                "Authorization": `Bearer ${token}`,
            };
        }

        return this.request(url.toString(), request);
    }

    async searchAnnouncements(query: string, token?: string): Promise<{
        success: boolean; message: {
            announcements: Article[];
        }
    }> {
        const url = new URL(`${this.ROUTE}/announcements/search`);
        url.searchParams.set("query", encodeURIComponent(query));

        const request: RequestInit = {
            method: "GET",
        };

        // Check if token is defined
        if (!!token) {
            request.headers = {
                "Authorization": `Bearer ${token}`,
            };
        }

        return this.request(url.toString(), request);
    }

    async getNewsCount(token?: string): Promise<{ success: boolean; message: { count: string } }> {
        const request: RequestInit = {
            method: "GET",
        };

        // Check if token is defined
        if (!!token) {
            request.headers = {
                "Authorization": `Bearer ${token}`,
            };
        }

        return this.request(`${this.ROUTE}/news/count`, request);
    }

    async getNewsById(id: number, token?: string): Promise<{
        success: boolean; message: {
            news: Article;
        }
    }> {
        const request: RequestInit = {
            method: "GET",
        };

        // Check if token is defined
        if (!!token) {
            request.headers = {
                "Authorization": `Bearer ${token}`,
            };
        }

        return this.request(`${this.ROUTE}/news/${id}`, request);
    }

    async getNews(offset: number | null, limit: number | null, token?: string): Promise<{
        success: boolean; message: {
            news: Article[];
        }
    }> {
        const url = new URL(`${this.ROUTE}/news`);

        if (offset != null) {
            url.searchParams.set("offset", String(offset));
        }
        if (limit != null) {
            url.searchParams.set("limit", String(limit));
        }

        const request: RequestInit = {
            method: "GET",
        };

        // Check if token is defined
        if (!!token) {
            request.headers = {
                "Authorization": `Bearer ${token}`,
            };
        }

        return this.request(url.toString(), request);
    }

    async searchNews(query: string, token?: string): Promise<{
        success: boolean; message: {
            news: Article[];
        }
    }> {
        const url = new URL(`${this.ROUTE}/news/search`);
        url.searchParams.set("query", encodeURIComponent(query));

        const request: RequestInit = {
            method: "GET",
        };

        // Check if token is defined
        if (!!token) {
            request.headers = {
                "Authorization": `Bearer ${token}`,
            };
        }

        return this.request(url.toString(), request);
    }

    async createAnnouncement(image_url: string, title: string, summary: string, content: Prisma.JsonValue, flags: ArticleFlags, token: string): Promise<{
        success: boolean; message: {
            announcement: Article;
        },
        error: string,
    }> {
        return this.request(`${this.ROUTE}/announcements`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                image_url,
                title,
                summary,
                content,
                flags,
            }),
        });
    }

    async createNews(image_url: string, title: string, summary: string, content: Prisma.JsonValue, flags: ArticleFlags, token: string): Promise<{
        success: boolean; message: {
            news: Article;
        },
        error: string,
    }> {
        return this.request(`${this.ROUTE}/news`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                image_url,
                title,
                summary,
                content,
                flags,
            }),
        });
    }

    async updateAnnouncement(id: number, image_url: string, title: string, summary: string, content: Prisma.JsonValue, flags: ArticleFlags, token: string): Promise<{
        success: boolean; message: {
            announcement: Article;
        },
        error: string,
    }> {
        return this.request(`${this.ROUTE}/announcements/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                image_url,
                title,
                summary,
                content,
                flags,
            }),
        });
    }

    async updateNews(id: number, image_url: string, title: string, summary: string, content: Prisma.JsonValue, flags: ArticleFlags, token: string): Promise<{
        success: boolean; message: {
            news: Article;
        },
        error: string,
    }> {
        return this.request(`${this.ROUTE}/news/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                image_url,
                title,
                summary,
                content,
                flags,
            }),
        });
    }

    async draftAnnouncement(id: number, token: string): Promise<{
        success: boolean; message: {
            announcement: Article;
        },
        error: string,
    }> {
        return this.request(`${this.ROUTE}/announcements/${id}/draft`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }

    async draftNews(id: number, token: string): Promise<{
        success: boolean; message: {
            news: Article;
        },
        error: string,
    }> {
        return this.request(`${this.ROUTE}/news/${id}/draft`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }

    async deleteAnnouncement(id: number, token: string): Promise<{
        success: boolean; message: {
            announcement: Article;
        },
        error: string,
    }> {
        return this.request(`${this.ROUTE}/announcements/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }

    async deleteNews(id: number, token: string): Promise<{
        success: boolean; message: {
            news: Article;
        },
        error: string,
    }> {
        return this.request(`${this.ROUTE}/news/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }

    async undraftAnnouncement(id: number, token: string): Promise<{
        success: boolean; message: {
            announcement: Article;
        },
        error: string,
    }> {
        return this.request(`${this.ROUTE}/announcements/${id}/undraft`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }

    async undraftNews(id: number, token: string): Promise<{
        success: boolean; message: {
            announcement: Article;
        },
        error: string,
    }> {
        return this.request(`${this.ROUTE}/news/${id}/undraft`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }
}

export default ArticlesModule;
