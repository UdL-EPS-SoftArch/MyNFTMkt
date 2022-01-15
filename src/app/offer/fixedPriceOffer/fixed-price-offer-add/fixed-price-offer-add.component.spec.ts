import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedPriceOfferAddComponent } from './fixed-price-offer-add.component';

describe('FixedPriceOfferAddComponent', () => {
  let component: FixedPriceOfferAddComponent;
  let fixture: ComponentFixture<FixedPriceOfferAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedPriceOfferAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedPriceOfferAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
