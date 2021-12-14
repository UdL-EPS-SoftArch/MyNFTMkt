import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestService } from '@lagoshny/ngx-hal-client';
import { Bid } from '../login-basic/bid';
import { User } from '../login-basic/user';

@Injectable()
export class BidService extends RestService<Bid> {

  constructor(injector: Injector) {
    super(Bid, 'bids', injector);
  }

  public findByBidder(user: User): Observable<Bid[]> {
    const options: any = {params: [{key: 'user', value: user}]};
    return this.search('findByBidder', options);
  }

 /* public findByOffer(obj: Offer): Observable<Bid[]> {
    const options: any = {params: [{key: 'text', value: text}]};
    return this.search('findByOffer', options);
  }*/

}
