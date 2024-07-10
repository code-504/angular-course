import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
})
export class TransactionFormComponent {
  newTransaction: Transaction = {
    from: '',
    to: '',
    amount: 0,
    date: new Date(),
  };

  constructor(private walletService: WalletService) {}

  addTransaction(form: NgForm) {
    if (form.valid) {
      if (this.walletService.getFormAction())
        this.newTransaction = {
          ...this.newTransaction,
          _id: this.walletService.getEditTransaction()._id,
        };

      this.walletService.setEditTransaction(this.newTransaction);

      this.walletService.submitTransaction().subscribe(() => {
        form.resetForm();
        this.newTransaction = {
          from: '',
          to: '',
          amount: 0,
          date: new Date(),
        };
      });
    }
  }
}
