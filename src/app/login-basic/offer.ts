import { Authority } from './authority';
import { Resource } from '@lagoshny/ngx-hal-client';

export class Offer extends Resource {
  uri: string;
  id: string;
  dateTime: Date;
  nft: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

}
