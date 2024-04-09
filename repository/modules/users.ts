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

    async createUser(userInput: { username: string; permissions: number; roles: number; email: string; password: string; }, token: string): Promise<{ success: boolean, message: { user: User; }, error: string }> {
        return this.request(`${this.ROUTE}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(userInput),
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