import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { UserService } from '../user.service';
import { User } from '../../login-basic/user';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-wallet',
  templateUrl: './user-wallet.component.html',
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal],
})
export class UserWalletComponent implements OnInit {
  public user: User = new User();
  moneyToAdd: number;
  moneyToWithdraw: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationBasicService,
              config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content) {
    this.modalService.open(content);
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.get(id).subscribe(
      (user: User) => this.user = user);
  }

  onSubmitDeposit(): void {
    this.user.balance = this.user.balance + this.moneyToAdd;
    this.user.password = this.user.passwordReset ? this.user.password : undefined; // Don't edit if not a reset
    this.userService.patch(this.user).subscribe(
      (patchedUser: User) => {
        if (this.user.passwordReset) {
          this.authenticationService.logout();
          this.authenticationService.login(this.user.id, this.user.password).subscribe(
            (user: User) => this.router.navigate(['users', user.id, 'wallet']));
        } else {
          this.router.navigate(['users', patchedUser.id, 'wallet']);
        }
      });
  }

  onSubmitWithdrawal(): void {
    this.user.balance = this.user.balance - this.moneyToWithdraw;
    this.user.password = this.user.passwordReset ? this.user.password : undefined; // Don't edit if not a reset
    this.userService.patch(this.user).subscribe(
      (patchedUser: User) => {
        if (this.user.passwordReset) {
          this.authenticationService.logout();
          this.authenticationService.login(this.user.id, this.user.password).subscribe(
            (user: User) => this.router.navigate(['users', user.id, 'wallet']));
        } else {
          this.router.navigate(['users', patchedUser.id, 'wallet']);
        }
      });
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().id;
  }
}


