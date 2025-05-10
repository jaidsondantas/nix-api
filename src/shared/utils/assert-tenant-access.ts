import { ForbiddenException } from '@nestjs/common';

export function assertTenantAccess(
  user: { role: string; tenantId?: string },
  resourceTenantId: string,
  allowedRoles: string[] = ['super_admin', 'support'],
) {
  if (
    !allowedRoles.includes(user.role) &&
    (!user.tenantId || resourceTenantId.toString() !== user.tenantId)
  ) {
    throw new ForbiddenException();
  }
}
