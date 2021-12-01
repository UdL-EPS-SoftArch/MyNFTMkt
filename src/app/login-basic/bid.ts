import { Authority } from './authority';
import { Resource } from '@lagoshny/ngx-hal-client';

export class Bid extends Resource {
  id: string;
  price: number;
  status: StatusTypes;
  dateTime: Date;
  uri: string;
  uriOffer: string;



  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

  /*getRoles(): string[] {
    return this.authorities.map(a => a.authority.split('_')[1].toLowerCase());
  }*/
}

export enum StatusTypes{ACTIVE, PURCHASED, SURPASSED}
