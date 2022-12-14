import { Role } from "../../../utils/enums/role.enum";


export interface UserPayload {
  id: string;
  username: string;
  role: keyof typeof Role;
}
