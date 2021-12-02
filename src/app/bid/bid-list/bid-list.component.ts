import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BidService } from '../bid.service';
import { Sort } from '@lagoshny/ngx-hal-client';
import { Bid } from '../../login-basic/bid';

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html'
})
export class BidListComponent implements OnInit {
  public bids: Bid[] = [];
  public pageSize = 5;
  public page = 1;
  public totalBids = 0;
  private sorting: Sort[] = [{ path: 'username', order: 'ASC' }];

  constructor(
    public router: Router,
    private bidService: BidService) {
  }

  ngOnInit(): void {
    this.bidService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (bids: Bid[]) => {
        this.bids = bids;
        this.totalBids = this.bidService.totalElement();
      });
  }

  changePage(): void {
    this.bidService.page(this.page - 1).subscribe(
      (bid: Bid[]) => this.bids = bid);
  }

  detail(bid: Bid): void {
    this.router.navigate(['bids', bid.id]);
  }
}
