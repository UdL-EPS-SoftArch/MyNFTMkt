import { Authority } from '../../login-basic/authority';
import { Resource } from '@lagoshny/ngx-hal-client';
import {Offer} from '../../login-basic/offer';

export class FixedPriceOffer extends Offer {
  uri: string;
  id: string;
  dateTime: Date;
  nft: string;
  price: number;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

}
