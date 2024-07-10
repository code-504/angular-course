// src/app/components/balance/balance.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-balance-transaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance-transaction.component.html',
  styleUrls: ['./balance-transaction.component.css'],
})
export class BalanceTransactionComponent implements OnInit {
  balance: number = 0;

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.walletService.getTotalBalanceTransaction().subscribe({
      next: (balance: number) => {
        this.balance = balance;
      },
      error: (error: any) => {
        console.error('Error fetching total balance:', error);
      },
    });
  }
}
