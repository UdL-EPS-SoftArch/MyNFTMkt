import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestService } from '@lagoshny/ngx-hal-client';


import {Offer} from '../login-basic/offer';
import {NFT} from '../login-basic/nft';

@Injectable()
export class OfferService extends RestService<Offer> {

  constructor(injector: Injector) {
    super(Offer, 'offers', injector);
  }
  public findByNftOrderByDateTime(nft: NFT): Observable<Offer[]> {
    const options: any = ({params: [{key: 'nft', value: nft}]});
    return this.search('findByNftOrderByDateTime', options);
  }


}
