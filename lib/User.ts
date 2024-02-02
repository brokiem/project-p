import type {Article} from "~/lib/Article";
import type {Permissions} from "~/lib/Permissions";

export interface User {
  uuid: string;
  username: string;
  email: string;
  password_hash: string;
  permissions: Permissions;
  articles: Article[];
}
