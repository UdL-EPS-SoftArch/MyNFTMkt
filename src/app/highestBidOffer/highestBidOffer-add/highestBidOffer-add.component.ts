import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HighestBidOfferService } from '../highestBidOffer.service';
import { HighestBidOffer } from '../../login-basic/highestBidOffer';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-register',
  templateUrl: './highestBidOffer-add.component.html'
})
export class HighestBidOfferAddComponent implements OnInit {
  public highestBidOffer: HighestBidOffer;

  constructor(private router: Router,
              private location: Location,
              private highestBidOfferService: HighestBidOfferService,
  ) {
  }

  ngOnInit(): void {
    this.highestBidOffer = new HighestBidOffer();
  }
  onSubmit(): void {
    this.highestBidOfferService.create(this.highestBidOffer).subscribe(
      (newHighestBidOffer: HighestBidOffer) => {
        this.router.navigate(['']);
      }
    );
  }


  onCancel(): void {
    this.location.back();
  }
}
