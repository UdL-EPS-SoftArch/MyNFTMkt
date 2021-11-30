import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Observable} from 'rxjs';
import {decliningPriceOffer} from "./decliningPriceOffer";

@Injectable({
  providedIn: 'root'
})
export class decliningPriceOfferService extends RestService<decliningPriceOffer>{
  constructor(injector: Injector) {
    super(decliningPriceOffer, 'decliningPriceOffers', injector);
  }

  public findById(uri: string): Observable<decliningPriceOffer> {
    const options: any = {params: [{key: 'id', value: uri}]};
    return this.searchSingle('findById', options);
  }
}
