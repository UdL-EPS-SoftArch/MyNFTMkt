import { Authority } from './authority';
import { Resource } from '@lagoshny/ngx-hal-client';

export class User extends Resource {
  id: string;
  email: string;
  authorities: Authority[] = [];
  authorization = '';
  password = '';
  passwordReset = false;

  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

  getRoles(): string[] {
    return this.authorities.map(a => a.authority.split('_')[1].toLowerCase());
  }
}
