export type Role = "admin" | "sales" | "manager";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
 password:string,
  createdBy?: string;   // admin who created sales/manager
  managerId?: string | null;   // manager for sales

  createdAt: string;
  updatedAt: string;
}
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
  managerId?: string; // required only when admin creates sales
}
export interface SignupResponse {
  message: string;
  user: {
    id: string;
    name: string;
    role: Role;
  };
}
