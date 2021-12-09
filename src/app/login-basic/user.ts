import { Authority } from './authority';
import { Resource } from '@lagoshny/ngx-hal-client';

export class NFT extends Resource {
  id: number;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  mediaType: string;
  content: string;
}

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
  favoriteNFTs: NFT[] = [];

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
