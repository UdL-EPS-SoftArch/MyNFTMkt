import { Resource } from '@lagoshny/ngx-hal-client';

export class NFT extends Resource {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  mediaType: string;
  content: string;
  uri: string;
  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}

