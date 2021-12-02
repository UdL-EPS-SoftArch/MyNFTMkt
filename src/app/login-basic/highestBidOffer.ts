import { Authority } from './authority';
import { Resource } from '@lagoshny/ngx-hal-client';
import {Offer} from './offer';

export class HighestBidOffer extends Resource {
  id: string;
  minimumBid: number;
  reservePrice: number;
  expiration: Date;
  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

  /*getRoles(): string[] {
    return this.authorities.map(a => a.authority.split('_')[1].toLowerCase());
  }*/
}


