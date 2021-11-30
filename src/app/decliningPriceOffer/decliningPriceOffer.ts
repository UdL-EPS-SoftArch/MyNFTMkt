import {Resource} from '@lagoshny/ngx-hal-client';

export class decliningPriceOffer extends Resource{

  startingPrice: number;
  endingPrice: number;
  expiration: Date;

  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
