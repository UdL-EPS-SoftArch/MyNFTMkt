import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestService } from '@lagoshny/ngx-hal-client';


import {HighestBidOffer} from '../login-basic/highestBidOffer';

@Injectable()
export class HighestBidOfferService extends RestService<HighestBidOffer> {

  constructor(injector: Injector) {
    super(HighestBidOffer, 'highestBidOffers', injector);
  }



}
