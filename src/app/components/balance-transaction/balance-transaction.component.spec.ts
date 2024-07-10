import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTransactionComponent } from './balance-transaction.component';

describe('BalanceTransactionComponent', () => {
  let component: BalanceTransactionComponent;
  let fixture: ComponentFixture<BalanceTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
