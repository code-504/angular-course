import { Routes } from '@angular/router';
import { AccountComponent } from './views/account/account.component';
import { HomeComponent } from './views/home/home.component';
import { TransactionComponent } from './views/transaction/transaction.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'account',
    component: AccountComponent,
    title: 'Account Page',
  },
  {
    path: 'transactions',
    component: TransactionComponent,
    title: 'Transactions Page',
  },
];
