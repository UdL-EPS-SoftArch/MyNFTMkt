import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestService } from '@lagoshny/ngx-hal-client';


import {Offer} from '../login-basic/Offer';

@Injectable()
export class HighestBidOfferService extends RestService<Offer> {

  constructor(injector: Injector) {
    super(Offer, 'highestBidOffers', injector);
  }



}
