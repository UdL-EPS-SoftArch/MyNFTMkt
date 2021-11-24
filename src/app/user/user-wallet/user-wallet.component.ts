import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { UserService } from '../user.service';
import { User } from '../../login-basic/user';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import './user-wallet.component.css';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'Successful Withdrawal!',
}, {
  type: 'warning',
  message: 'You do not have the sufficient amount',
}, {
  type: 'success',
  message: 'Successful Deposit!',
}, {
  type: 'warning',
  message: 'You are not allowed to put a negative or null amount',
}
];

@Component({
  selector: 'app-user-wallet',
  templateUrl: './user-wallet.component.html',
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal],
  styleUrls: ['user-wallet.component.css'],
})
export class UserWalletComponent implements OnInit {
  public user: User = new User();
  moneyToAdd: number;
  moneyToWithdraw: number;
  withdrawNotPossible: boolean;
  withdrawSuccess: boolean;
  depositSuccess: boolean;
  negativeAmount: boolean;
  alerts: Alert[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationBasicService,
              config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.withdrawNotPossible = false;
    this.withdrawSuccess = false;
    this.depositSuccess = false;
    this.negativeAmount = false;
    this.reset();
  }

  // tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content);
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.get(id).subscribe(
      (user: User) => this.user = user);
  }

  onSubmitDeposit(): void {
    if (this.moneyToAdd <= 0 || this.moneyToAdd == null) {
      this.negativeAmount = true;
    } else {
      this.user.balance = this.user.balance + this.moneyToAdd;
      this.user.password = this.user.passwordReset ? this.user.password : undefined; // Don't edit if not a reset
      this.userService.patch(this.user).subscribe(
        (patchedUser: User) => {
          if (this.user.passwordReset) {
            this.authenticationService.logout();
            this.authenticationService.login(this.user.id, this.user.password).subscribe(
              (user: User) => this.router.navigate(['users', user.id, 'wallet']));
          } else {
            this.depositSuccess = true;
            this.router.navigate(['users', patchedUser.id, 'wallet']);
          }
        });
    }
  }

  onSubmitWithdrawal(): void {
    if (this.moneyToWithdraw <= 0 || this.moneyToWithdraw == null) {
      this.negativeAmount = true;
    } else if (this.user.balance >= this.moneyToWithdraw){
      this.user.balance = this.user.balance - this.moneyToWithdraw;
      this.user.password = this.user.passwordReset ? this.user.password : undefined; // Don't edit if not a reset
      this.userService.patch(this.user).subscribe(
        (patchedUser: User) => {
          if (this.user.passwordReset) {
            this.authenticationService.logout();
            this.authenticationService.login(this.user.id, this.user.password).subscribe(
              (user: User) => this.router.navigate(['users', user.id, 'wallet']));
          } else {
            this.withdrawSuccess = true;
            this.router.navigate(['users', patchedUser.id, 'wallet']);
          }
        });
    } else {
      this.withdrawNotPossible = true;
    }
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().id;
  }

  close(alert: Alert): void {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset(): void {
    this.alerts = Array.from(ALERTS);
  }
}


