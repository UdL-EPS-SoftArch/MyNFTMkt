import { Authority } from '../../login-basic/authority';
import { Resource } from '@lagoshny/ngx-hal-client';
import {NFT} from '../../login-basic/nft';

export class FixedPriceOffer extends Resource {
  uri: string;
  id: string;
  dateTime: Date;
  nft: NFT;
  price: number;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
