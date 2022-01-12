import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DecliningService} from '../declining.service';
import {Declining} from '../declining';
import {Location} from '@angular/common';
import {FixedPriceOffer} from '../../offer/fixedPriceOffer/fixedpriceoffer';

@Component({
  selector: 'app-user-register',
  templateUrl: './declining-add.component.html'
})
export class DecliningAddComponent implements OnInit {
  public declining: Declining;
  public idNft: string;

  constructor(private router: Router,
              private location: Location,
              private declineService: DecliningService, ) {
  }

  ngOnInit(): void {
    this.idNft = '/nft/' + this.router.url.split('/')[3];
    this.declining = new Declining();
  }
  onSubmit(): void {
    this.declining.nft = this.idNft;
    this.declining.dateTime = new Date(this.declining.dateTime);
    this.declineService.create(this.declining).subscribe(
      (newDeclining: Declining) => {
        this.router.navigate([newDeclining.uri]);
      }
    );
  }

  onCancel(): void {
    this.location.back();
  }
}
