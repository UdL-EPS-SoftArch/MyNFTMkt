
import { Component, OnInit } from '@angular/core';
import {NFT} from '../../login-basic/nft';
import {NftService} from '../nft.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-nft-delete',
  templateUrl: './nft-delete.component.html',
})
export class NftDeleteComponent implements OnInit {
  public nft: NFT = new NFT();
  public id: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private nftService: NftService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.nftService.get(this.id).subscribe(
      nft => this.nft = nft);
  }
  delete(): void {
    this.nftService.delete(this.nft).subscribe(
      () => {
        this.router.navigate(['/nFTs']);
      });
  }

}
