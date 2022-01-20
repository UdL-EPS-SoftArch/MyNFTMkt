import { Resource } from '@lagoshny/ngx-hal-client';
import { User } from './user';
import { Offer } from './offer';
export class NFT extends Resource {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  mediaType: string;
  content: string;
  uri: string;
  owner: User;
  offer: Offer;
  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}

