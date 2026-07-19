// lib/rbac.ts
export const permissions = {
  "users:read":    ["admin"],
  "users:delete":  ["admin"],
  "reports:read":  ["admin", "manager"],
  "settings:read": ["admin", "manager", "user"],
} as const;

export type Permission = keyof typeof permissions;
export type Role       = "admin" | "manager" | "user";

export function hasPermission(role: Role, permission: Permission): boolean {
  return (permissions[permission] as readonly string[]).includes(role);
}