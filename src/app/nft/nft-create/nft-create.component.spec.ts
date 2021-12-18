import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftCreateComponent } from './nft-create.component';

describe('NftCreateComponent', () => {
  let component: NftCreateComponent;
  let fixture: ComponentFixture<NftCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
