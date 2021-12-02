
import { Component, OnInit } from '@angular/core';
import {Sale} from '../sale';
import {SaleService} from '../sale.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sale-delete',
  templateUrl: './sale-delete.component.html',
})
export class SaleDeleteComponent implements OnInit {
  public sale: Sale = new Sale();
  public id: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private SaleSerice: SaleService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.SaleSerice.get(this.id).subscribe(
      sale => this.sale = sale);
  }
  delete(): void {
    this.SaleSerice.delete(this.sale).subscribe(
      () => {
        this.router.navigate(['']);
      });
  }

}
