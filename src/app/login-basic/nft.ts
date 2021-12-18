import { Authority } from './authority';
import { Resource } from '@lagoshny/ngx-hal-client';


export class Nft extends Resource {
  id: string;
  title: string;
  keywords: string[];
  category: string;
  mediaType: string;
  content: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
  
}

