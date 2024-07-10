// src/app/pages/account/account.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from '../../components/balance/balance.component';
import { AccountFormComponent } from '../../components/account-form/account-form.component';
import { AccountListComponent } from '../../components/account-list/account-list.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    BalanceComponent,
    AccountFormComponent,
    AccountListComponent,
  ],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {}
