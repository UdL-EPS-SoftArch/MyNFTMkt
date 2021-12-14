import {Resource} from '@lagoshny/ngx-hal-client';

export class Sale extends Resource{

  id: number;
  dateTime: Date;

  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
