import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestService } from '@lagoshny/ngx-hal-client';


import {Offer} from '../login-basic/offer';

@Injectable()
export class OfferService extends RestService<Offer> {

  constructor(injector: Injector) {
    super(Offer, 'offers', injector);
  }



}
