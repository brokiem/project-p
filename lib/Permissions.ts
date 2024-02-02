export const Permissions = {
  // Allows creation of news
  CREATE_NEWS: 1 << 0,
  // Allows management and editing of news
  MANAGE_NEWS: 1 << 1,
  // Allows creation of announcements
  CREATE_ANNOUNCEMENT: 1 << 2,
  // Allows management and editing of announcements
  MANAGE_ANNOUNCEMENT: 1 << 3,
  // Allows all permissions
  ADMINISTRATOR: 1 << 4,
  // Allows no permissions
  NONE: 1 << 5,
} as const;
