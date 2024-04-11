import HttpFactory from "~/repository/factory";
import type { User } from "~/utils/user";

class UsersModule extends HttpFactory {
    private readonly ROUTE = `${this.API_URL}/users`;

    async getUsers(token: string): Promise<{ success: boolean, message: { users: User[]; }, error: string }> {
        return this.request(`${this.ROUTE}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }

    async getUser(uuid: string, token: string): Promise<{ success: boolean, message: { user: User; }, error: string }> {
        return this.request(`${this.ROUTE}/${uuid}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }

    async searchUsers(query: string, token: string): Promise<{ success: boolean, message: { users: User[]; }, error: string }> {
        const url = new URL(`${this.ROUTE}/search`);
        url.searchParams.set("query", encodeURIComponent(query));

        return this.request(url.toString(), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }

    async createUser(username: string, email: string, password: string, permissions: number, roles: number, token: string): Promise<{ success: boolean, message: { user: User; }, error: string }> {
        return this.request(`${this.ROUTE}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                username,
                email,
                password,
                permissions,
                roles,
            }),
        });
    }

    async updateUser(uuid: string, username: string, email: string, permissions: number, roles: number, token: string, password?: string | null): Promise<{ success: boolean, message: { user: User; }, error: string }> {
        const input = {
            username,
            email,
            permissions,
            roles,
            password,
        };

        if (!password) {
            delete input.password;
        }

        return this.request(`${this.ROUTE}/${uuid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(input),
        });
    }

    async deleteUser(uuid: string, token: string): Promise<{ success: boolean, message: { message: string; }, error: string }> {
        return this.request(`${this.ROUTE}/${uuid}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }
}

export default UsersModule;
