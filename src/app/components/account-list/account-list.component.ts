import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../services/wallet.service';
import { AccountFormComponent } from '../account-form/account-form.component';
import { Account } from '../../models/account.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, AccountFormComponent],
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
})
export class AccountListComponent implements OnInit, OnDestroy {
  accounts: Account[] = [];
  account: Account = { name: '', balance: 0, address: '' };
  private accountSub: Subscription | undefined;

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.loadAccounts();
    this.accountSub = this.walletService.accountUpdated$.subscribe(() => {
      this.loadAccounts();
    });
  }

  loadAccounts() {
    this.walletService.getAccounts().subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  editAccount(index: number) {
    this.account = { ...this.accounts[index] };
    this.walletService.setFormAction(true);
    this.walletService.setEditAccount(this.account);
  }

  deleteAccount(index: number) {
    const accountId = this.accounts[index]._id;
    if (accountId) {
      this.walletService.deleteAccount(accountId).subscribe(() => {
        this.loadAccounts();
      });
    }
  }

  ngOnDestroy() {
    if (this.accountSub) {
      this.accountSub.unsubscribe();
    }
  }
}
