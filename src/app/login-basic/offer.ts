import { Authority } from './authority';
import { Resource } from '@lagoshny/ngx-hal-client';
import {NFT} from './nft';

export class Offer extends Resource {
  uri: string;
  id: string;
  dateTime: Date;
  nft: NFT;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

}
