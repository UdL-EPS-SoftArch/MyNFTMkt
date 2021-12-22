import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DecliningService} from '../declining.service';
import {Declining} from '../declining';
import {Location} from '@angular/common';


@Component({
  selector: 'app-user-register',
  templateUrl: './declining-add.component.html'
})
export class DecliningAddComponent implements OnInit {
  public declining: Declining;

  constructor(private router: Router,
              private location: Location,
              private declineService: DecliningService, ) {
  }

  ngOnInit(): void {
    this.declining = new Declining();
  }
  onSubmit(): void {
    this.declineService.create(this.declining).subscribe(
      (newDeclining: Declining) => {
        this.router.navigate(['']);
      }
    );
  }

  onCancel(): void {
    this.location.back();
  }
}
