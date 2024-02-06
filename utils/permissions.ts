import type { user_attributes as UserAttributes } from "@prisma/client";

export enum Permissions {
    // Allows creation of news
    CREATE_NEWS = 1 << 0,
    // Allows management and editing of news
    MANAGE_NEWS = 1 << 1,
    // Allows creation of announcements
    CREATE_ANNOUNCEMENT = 1 << 2,
    // Allows management and editing of announcements
    MANAGE_ANNOUNCEMENT = 1 << 3,
    // Allows all permissions
    ADMINISTRATOR = 1 << 4,
    // Allows no permissions
    NONE = 1 << 5,
    CREATE_EXTRACURRICULAR = 1 << 6,
    MANAGE_EXTRACURRICULAR = 1 << 7,
}

// Check if a user has a permission
export const hasPermission = (userAttributes: UserAttributes, permission: Permissions) => {
    // If the user is an administrator, they have all permissions
    if ((userAttributes.permissions & Permissions.ADMINISTRATOR) === Permissions.ADMINISTRATOR) {
        return true;
    }

    // Otherwise, check if the user has the permission
    return (userAttributes.permissions & permission) === permission;
};
