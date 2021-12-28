import {Offer} from "../login-basic/offer";

export class Declining extends Offer{
  id: string;
  startingPrice: number;
  endingPrice: number;
  expiration: Date;

  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
