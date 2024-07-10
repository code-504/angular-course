import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../services/wallet.service';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../models/transaction.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  transaction: Transaction = { from: '', to: '', amount: 0, date: new Date() };
  private transactionSub: Subscription | undefined;

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.loadTransactions();
    this.transactionSub = this.walletService.transactionUpdated$.subscribe(
      () => {
        this.loadTransactions();
      }
    );
  }

  loadTransactions() {
    this.walletService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions;
    });
  }

  editTransaction(index: number) {
    this.transaction = { ...this.transactions[index] };
    this.walletService.setFormAction(true);
    this.walletService.setEditTransaction(this.transaction);
  }

  deleteTransaction(index: number) {
    const transactionId = this.transactions[index]._id;
    if (transactionId) {
      this.walletService.deleteTransaction(transactionId).subscribe(() => {
        this.walletService.getTransactions().subscribe((transactions) => {
          this.transactions = transactions;
        });
      });
    }
  }

  ngOnDestroy() {
    if (this.transactionSub) {
      this.transactionSub.unsubscribe();
    }
  }
}
