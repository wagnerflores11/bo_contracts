export class User {
  id: number;
  name: string;
  email: string;
  permissions: string[];

  constructor(params) {
    Object.assign(this, params);
  }

  havePermission(permission: string): boolean {
    if (!this.permissions || !Array.isArray(this.permissions)) {
      return false;
    }

    return this.permissions.includes(permission);
  }

  getPermissions(): string[] {
    return this.permissions;
  }
}
