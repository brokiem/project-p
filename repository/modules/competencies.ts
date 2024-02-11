import HttpFactory from "~/repository/factory";

class CompetenciesModule extends HttpFactory {
    private readonly ROUTE = `${this.API_URL}/competencies`;

    async get(): Promise<{ success: boolean, message: { competencies: { id: number; title: string; description: string; }[] }, error: string }> {
        return this.request(this.ROUTE, {
            method: "GET",
        });
    }

    async add(title: string, description: string, token: string): Promise<{ success: boolean, message: { competency: { id: number; title: string; description: string; } }, error: string }> {
        return this.request(this.ROUTE, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
            }),
        });
    }

    async edit(id: number, newTitle: string, newDescription: string, token: string): Promise<{ success: boolean, message: { competencies: { id: number; title: string; description: string; } }, error: string }> {
        return this.request(`${this.ROUTE}/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newTitle,
                newDescription,
            }),
        });
    }

    async delete(id: number, token: string): Promise<{ success: boolean, message: { competencies: { id: number; title: string; description: string; } }, error: string }> {
        return this.request(`${this.ROUTE}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }
}

export default CompetenciesModule;
