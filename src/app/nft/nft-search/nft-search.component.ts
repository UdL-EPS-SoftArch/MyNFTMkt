import { Component, EventEmitter, Output } from '@angular/core';
import { NftService } from '../nft.service';
import { NFT } from '../../login-basic/nft';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-nft-search',
  templateUrl: './nft-search.component.html'
})

export class NFTSearchComponent {
  @Output() emitResults: EventEmitter<NFT> = new EventEmitter();
  searchFailed = false;
  searching = false;

  constructor(private nftService: NftService) {
  }

  search(): (text$: Observable<string>) => Observable<NFT[]> {
    return (text$: Observable<string>) => text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => term.length < 3 ? of([]) :
        this.nftService.findByTitle(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    );
  }

  select(item: any): void {
    this.emitResults.emit(item as NFT);
  }
}
