import { Resource } from '@lagoshny/ngx-hal-client';

export class Nft extends Resource {
  title: string;
  description: string;
  keywords: []; // lista string
  category: string;
  mediaType: string;
  content: string;
  uri: string;
  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

}
