import HttpFactory from "~/repository/factory";
import type { User } from "~/utils/user";

class AuthModule extends HttpFactory {
    private readonly ROUTE = `${this.API_URL}/auth`;

    async login(email: string, password: string): Promise<{ success: boolean, message: { token: string; user: User; }, error: string }> {
        return this.request(`${this.ROUTE}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
    }

    async verify(token: string): Promise<{ success: boolean, message: { user: User; }, error: string }> {
        return this.request(`${this.ROUTE}/verify`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }
}

export default AuthModule;
