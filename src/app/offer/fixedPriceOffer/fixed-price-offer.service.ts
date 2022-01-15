import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestService } from '@lagoshny/ngx-hal-client';

import { FixedPriceOffer} from './fixedpriceoffer';


@Injectable()
export class FixedPriceOfferService extends RestService<FixedPriceOffer>{

  constructor(injector: Injector) {
    super(FixedPriceOffer, 'fixedPriceOffers', injector);
  }
  public  findAllByPriceIsLessThanEqual(price: number): Observable<FixedPriceOffer[]> {
    const options: any = ({params: [{key: 'price', value: price}]});
    return this.search('findAllByPriceIsLessThanEqual', options);
  }
}


