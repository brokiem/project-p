import HttpFactory from "~/repository/factory";
import { ArticleFlags, type ArticleType } from "~/utils/articles";

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
            announcement: {
                id: number;
                image_url: string;
                title: string;
                content: string;
                author_uuid: string;
                created_at: string;
                updated_at: string;
                type: ArticleType;
                flags: ArticleFlags;
            }
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
            announcements: {
                id: number;
                image_url: string;
                title: string;
                content: string;
                author_uuid: string;
                created_at: string;
                updated_at: string;
                type: ArticleType;
                flags: ArticleFlags;
            }[]
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
            announcements: {
                id: number;
                image_url: string;
                title: string;
                content: string;
                author_uuid: string;
                created_at: string;
                updated_at: string;
                type: ArticleType;
                flags: ArticleFlags;
            }[]
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
            news: {
                id: number;
                image_url: string;
                title: string;
                content: string;
                author_uuid: string;
                created_at: string;
                updated_at: string;
                type: ArticleType;
                flags: ArticleFlags;
            }
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
            news: {
                id: number;
                image_url: string;
                title: string;
                content: string;
                author_uuid: string;
                created_at: string;
                updated_at: string;
                type: ArticleType;
                flags: ArticleFlags;
            }[]
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
            news: {
                id: number;
                image_url: string;
                title: string;
                content: string;
                author_uuid: string;
                created_at: string;
                updated_at: string;
                type: ArticleType;
                flags: ArticleFlags;
            }[]
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
}

export default ArticlesModule;
