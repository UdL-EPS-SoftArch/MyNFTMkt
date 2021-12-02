import { Authority } from './authority';
import { Resource } from '@lagoshny/ngx-hal-client';

export class User extends Resource {
  id: string;
  email: string;
  balance: number;
  authorities: Authority[] = [];
  authorization = '';
  password = '';
  passwordReset = false;
  currency: string;
  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

  getRoles(): string[] {
    return this.authorities.map(a => a.authority.split('_')[1].toLowerCase());
  }
  getCurrencySymbol(): string {
    const myMap = new Map([
      ['euro', '€'],
      ['USD', '$'],
      ['JPY', '¥'],
      ['GBP', '£']
    ]);
    return myMap.get(this.currency);
  }
}
