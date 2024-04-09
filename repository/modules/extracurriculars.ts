import HttpFactory from "~/repository/factory";
import type { User } from "~/utils/user";

class ExtracurricularsModule extends HttpFactory {
    private readonly ROUTE = `${this.API_URL}/extracurriculars`;

    async get(): Promise<{ success: boolean, message: { extracurriculars: { id: number; title: string; description: string; extracurricular_mentors: { id: number; users: User; }[]; }[] }, error: string }> {
        return this.request(this.ROUTE, {
            method: "GET",
        });
    }

    async getById(id: number): Promise<{ success: boolean, message: { extracurricular: { id: number; title: string; description: string; extracurricular_mentors: { id: number; users: User; }[]; } }, error: string }> {
        return this.request(`${this.ROUTE}/${id}`, {
            method: "GET",
        });
    }

    async add(title: string, description: string, mentor_uuids: string, token: string): Promise<{ success: boolean, message: { extracurricular: { id: number; title: string; description: string; extracurricular_mentors: { id: number; users: User; }[]; } }, error: string }> {
        return this.request(this.ROUTE, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                mentor_uuids,
            }),
        });
    }

    async edit(id: number, title: string, description: string, mentor_uuids: string, token: string): Promise<{ success: boolean, message: { extracurriculars: { id: number; title: string; description: string; extracurricular_mentors: { id: number; users: User; }[]; } }, error: string }> {
        return this.request(`${this.ROUTE}/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                mentor_uuids,
            }),
        });
    }

    async delete(id: number, token: string): Promise<{ success: boolean, message: { extracurriculars: { id: number; title: string; description: string; extracurricular_mentors: { id: number; users: User; }[]; } }, error: string }> {
        return this.request(`${this.ROUTE}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }
}

export default ExtracurricularsModule;
