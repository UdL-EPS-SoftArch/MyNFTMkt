import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../login-basic/user';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {Declining} from '../declining';
import {DecliningService} from '../declining.service';

@Component({
  selector: 'app-declining-detail',
  templateUrl: './declining-detail.component.html'
})

export class DecliningDetailComponent implements OnInit {
  public declining: Declining = new Declining();

  constructor(private route: ActivatedRoute,
              private declineService: DecliningService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.declineService.get(id).subscribe(
      declining => {
        this.declining = declining;
      });
  }

  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }
}
