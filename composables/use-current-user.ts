import type { User } from "~/utils/user";

export const useCurrentUser = () => useState<User | null>("currentUser", () => null);
