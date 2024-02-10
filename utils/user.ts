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
