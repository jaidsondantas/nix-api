export const ERROR_MESSAGES = {
  TENANT_ALREADY_EXISTS: 'Tenant with this name already exists',
  TENANT_NOT_FOUND: 'Tenant not found',
  EMAIL_ALREADY_EXISTS: 'Email already exists within the specified tenant',
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  INVALID_ROLE: 'Invalid roles',
  UNAUTHORIZED: 'Unauthorized',
  INVALID_RECOVERY_CODE: 'Invalid recovery code',
  VISITOR_NOT_FOUND: 'Visitor not found',
  VALIDATION_ERROR: 'Validation error',
  CHANNEL_ALREADY_EXISTS: 'Channel with this name already exists',
  CHANNEL_NOT_FOUND: 'Channel not found',
};

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'SECRETE_KEY',
};
