// src/app/components/balance/balance.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
  balance: number = 0;

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.walletService.getTotalBalanceAccount().subscribe({
      next: (balance: number) => {
        this.balance = balance;
      },
      error: (error: any) => {
        console.error('Error fetching total balance:', error);
      },
    });
  }
}
