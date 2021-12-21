import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Observable} from 'rxjs';
import {Declining} from './declining';

@Injectable({
  providedIn: 'root'
})
export class DecliningService extends RestService<Declining>{
  constructor(injector: Injector) {
    super(Declining, 'decliningPriceOffers', injector);
  }

  public findById(uri: string): Observable<Declining> {
    const options: any = {params: [{key: 'id', value: uri}]};
    return this.searchSingle('findById', options);
  }
}
