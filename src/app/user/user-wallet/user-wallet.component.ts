import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { UserService } from '../user.service';
import { User } from '../../login-basic/user';
import { NgbModalConfig, NgbModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import './user-wallet.component.css';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';

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
  // tslint:disable-next-line:variable-name
  private _success = new Subject<string>();
  successMessage = '';
  // tslint:disable-next-line:variable-name
  private _warning = new Subject<string>();
  warningMessage = '';

  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationBasicService,
              config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  // tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content);
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.get(id).subscribe(
      (user: User) => this.user = user);
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
    this._warning.subscribe(message => this.warningMessage = message);
    this._warning.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  onSubmitDeposit(): void {
    if (this.moneyToAdd <= 0 || this.moneyToAdd == null) {
      this.moneyToAdd = 0;
      this._warning.next('You can not insert a negative or null amount');
    } else {
      this.user.balance = this.user.balance + this.moneyToAdd;
      this.moneyToAdd = 0;
      this.user.password = this.user.passwordReset ? this.user.password : undefined; // Don't edit if not a reset
      this.userService.patch(this.user).subscribe(
        (patchedUser: User) => {
          if (this.user.passwordReset) {
            this.authenticationService.logout();
            this.authenticationService.login(this.user.id, this.user.password).subscribe(
              (user: User) => this.router.navigate(['users', user.id, 'wallet']));
          } else {
            this._success.next('Successful Deposit!');
            this.router.navigate(['users', patchedUser.id, 'wallet']);
          }
        });
    }
  }

  onSubmitWithdrawal(): void {
    if (this.moneyToWithdraw <= 0 || this.moneyToWithdraw == null) {
      this.moneyToWithdraw = 0;
      this._warning.next('You can not insert a negative or null amount');
    } else if (this.user.balance >= this.moneyToWithdraw){
      this.user.balance = this.user.balance - this.moneyToWithdraw;
      this.moneyToWithdraw = 0;
      this.user.password = this.user.passwordReset ? this.user.password : undefined; // Don't edit if not a reset
      this.userService.patch(this.user).subscribe(
        (patchedUser: User) => {
          if (this.user.passwordReset) {
            this.authenticationService.logout();
            this.authenticationService.login(this.user.id, this.user.password).subscribe(
              (user: User) => this.router.navigate(['users', user.id, 'wallet']));
          } else {
            this._success.next('Successful Withdrawal!');
            this.router.navigate(['users', patchedUser.id, 'wallet']);
          }
        });
    } else {
      this.moneyToWithdraw = 0;
      this._warning.next('You do not have the sufficient amount');
    }
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().id;
  }

}


