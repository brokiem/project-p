import type { Roles } from "~/utils/roles";
import type { Permissions } from "~/utils/permissions";

export interface PartialUser {
    uuid: string;
    username: string;
    email: string;
}

export interface User extends PartialUser {
    permissions: Permissions;
    roles: Roles;
}
