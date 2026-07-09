// check if user has permission client side// hooks/usePermission.ts
// import { useAuthStore } from "@/store/useAuthStore";
// import { hasPermission, type Permission } from "@/lib/rbac";

import { hasPermission, Permission } from "../lib/rbac";
import { useAuthStore } from "../store/useAuthStore";

export function usePermission(permission: Permission) {
  const { user } = useAuthStore();

  if (!user) return false;

  return hasPermission(user.role, permission);
}