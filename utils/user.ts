import type { Roles } from "~/utils/roles";
import type { Permissions } from "~/utils/permissions";

export interface PartialUser {
    uuid: string;
    email: string;
}

export interface User extends PartialUser {
    username: string;
    permissions: Permissions;
    roles: Roles;
}

export function isValidUUID(uuid: string): boolean {
    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return regex.test(uuid);
}
