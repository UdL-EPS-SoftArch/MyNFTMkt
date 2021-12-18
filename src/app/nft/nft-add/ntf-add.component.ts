import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { NftService } from '../nft.service';
import { Nft } from '../../login-basic/nft';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-register',
  templateUrl: './ntf-add.component.html'
})
export class NftAddComponent implements OnInit {
  public nft: Nft;


  constructor(private route: Router,
              private location: Location,
              private nftService: NftService,
  ) {
  }

  ngOnInit(): void {
    this.nft = new Nft();
  }
  onSubmit(): void {
    this.nftService.create(this.nft).subscribe(
      (newNft: Nft) => {
        this.route.navigate(['nFTs']);
      }
    );
  }


  onCancel(): void {
    this.location.back();
  }
}
