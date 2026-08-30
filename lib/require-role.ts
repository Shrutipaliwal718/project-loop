import { Role } from "@prisma/client";

export function requireRole(
  userRole: Role,
  allowedRoles: Role[]
) {
  return allowedRoles.includes(userRole);
}