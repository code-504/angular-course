import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from '../../components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';
import { BalanceTransactionComponent } from '../../components/balance-transaction/balance-transaction.component';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    CommonModule,
    TransactionFormComponent,
    TransactionListComponent,
    BalanceTransactionComponent,
  ],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent {}
