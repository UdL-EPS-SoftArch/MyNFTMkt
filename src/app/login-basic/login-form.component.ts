import {Component, OnInit} from '@angular/core';
import {AuthenticationBasicService} from './authentication-basic.service';
import {Location} from '@angular/common';
import {NgForm} from '@angular/forms';
import {User} from './user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  user: User;

  constructor(private authenticationService: AuthenticationBasicService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(loginForm: NgForm): void {
    this.authenticationService.login(this.user.id, this.user.password)
      .subscribe(() => this.router.navigateByUrl(''));
  }

  onCancel(): void {
    this.location.back();
  }
}
