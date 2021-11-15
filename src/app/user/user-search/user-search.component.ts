import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../login-basic/user';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html'
})

export class UserSearchComponent {
  @Output() emitResults: EventEmitter<User> = new EventEmitter();
  searchFailed = false;
  searching = false;

  constructor(private userService: UserService) {
  }

  search(): (text$: Observable<string>) => Observable<User[]> {
    return (text$: Observable<string>) => text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => term.length < 3 ? of([]) :
        this.userService.findByUsernameContaining(term).pipe(
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
    this.emitResults.emit(item as User);
  }
}
