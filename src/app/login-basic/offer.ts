import { Authority } from './authority';
import { Resource } from '@lagoshny/ngx-hal-client';

export class Offer extends Resource {
  uri: string;
  dateTime: Date;
  minimumBid: number;
  reservePrice: number;
  expiration: Date;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

}
