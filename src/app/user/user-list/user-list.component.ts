import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Sort } from '@lagoshny/ngx-hal-client';
import { User } from '../../login-basic/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  public users: User[] = [];
  public pageSize = 5;
  public page = 1;
  public totalUsers = 0;
  private sorting: Sort[] = [{ path: 'username', order: 'ASC' }];

  constructor(
    public router: Router,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
        (users: User[]) => {
          this.users = users;
          this.totalUsers = this.userService.totalElement();
        });
  }

  changePage(): void {
    this.userService.page(this.page - 1).subscribe(
      (users: User[]) => this.users = users);
  }

  detail(user: User): void {
    this.router.navigate(['users', user.id]);
  }
}
