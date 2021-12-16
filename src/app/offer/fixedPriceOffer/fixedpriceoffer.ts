import { Authority } from '../../login-basic//authority';
import { Resource } from '@lagoshny/ngx-hal-client';

export class Offer extends Resource {
  uri: string;
  id: string;
  dateTime: Date;
  nft: string;
  price: BigInteger;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

}
