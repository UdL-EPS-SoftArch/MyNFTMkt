import {Resource} from '@lagoshny/ngx-hal-client';

export class Declining extends Resource{

  id: number;
  startingPrice: number;
  endingPrice: number;
  expiration: Date;

  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
