import type { Role, User } from "./user.types";

export type ActivityAction =
  | "ORDER_CREATED"
  | "ORDER_UPDATED"
  | "ORDER_STATUS_CHANGED"
  | "CUSTOMER_CREATED"
  | "PRODUCT_CREATED"
  | "USER_CREATED";

  export type EntityType = "order" | "customer" | "product" | "user";

  export interface ActivityLog {
  _id: string;

  action: ActivityAction;
  entityType: EntityType;
  entityId:string;

  message: string;

  performedBy: User;

  role: Role;

  managerId?: string;

  createdAt: string; 
  updatedAt: string;
}
