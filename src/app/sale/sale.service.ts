import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Sale} from './sale';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SaleService extends RestService<Sale>{
  constructor(injector: Injector) {
    super(Sale, 'sales', injector);
  }

  public findById(uri: string): Observable<Sale> {
    const options: any = {params: [{key: 'id', value: uri}]};
    return this.searchSingle('findById', options);
  }
}
