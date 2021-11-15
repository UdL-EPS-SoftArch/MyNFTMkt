import {Component, OnInit} from '@angular/core';
import {AuthenticationBasicService} from './authentication-basic.service';
import {User} from './user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-navbar,[app-login-navbar]',
  templateUrl: './login-navbar.component.html',
  styleUrls: [],
})
export class LoginNavbarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationBasicService, private router: Router) {}

  ngOnInit(): void {}

  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  logout(event): void {
    event.preventDefault();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
