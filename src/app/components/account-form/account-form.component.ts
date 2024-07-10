import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css'],
})
export class AccountFormComponent {
  newAccount: Account = {
    _id: '',
    name: '',
    address: '',
    balance: 0,
  };

  constructor(private walletService: WalletService) {}

  addAccount(form: NgForm) {
    if (form.valid) {
      if (this.walletService.getFormAction()) {
        this.newAccount = {
          ...this.newAccount,
          _id: this.walletService.getEditAccount()._id,
        };
      }

      this.walletService.setEditAccount(this.newAccount);
      this.walletService.submitAccount().subscribe((account) => {
        console.log('Account added/edited:', account);
        form.resetForm();
        this.resetForm();
      });
    }
  }

  private resetForm() {
    this.newAccount = {
      _id: '',
      name: '',
      address: '',
      balance: 0,
    };
  }
}
