import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private apiUrl = 'http://localhost:3000/api';
  private isEditing: boolean = false;
  private account: Account = { _id: '', name: '', address: '', balance: 0 };
  private transaction: Transaction = {
    _id: '',
    amount: 0,
    date: new Date(),
    from: '',
    to: '',
  };
  private transactionUpdated = new BehaviorSubject<void | null>(null);
  private accountUpdated = new BehaviorSubject<void | null>(null);

  constructor(private http: HttpClient) {}

  transactionUpdated$ = this.transactionUpdated.asObservable();
  accountUpdated$ = this.accountUpdated.asObservable();

  setFormAction(isEditing: boolean) {
    this.isEditing = isEditing;
  }

  getFormAction(): Boolean {
    return this.isEditing;
  }

  // Account Methods
  setEditAccount(account: Account) {
    this.account = account;
  }

  getEditAccount(): Account {
    return this.account;
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/accounts`);
  }

  addAccount(account: Account): Observable<Account> {
    return this.http
      .post<Account>(`${this.apiUrl}/accounts`, account)
      .pipe(tap(() => this.accountUpdated.next()));
  }

  editAccount(id: string, account: Account): Observable<Account> {
    return this.http
      .put<Account>(`${this.apiUrl}/accounts/${id}`, account)
      .pipe(tap(() => this.accountUpdated.next()));
  }

  deleteAccount(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/accounts/${id}`)
      .pipe(tap(() => this.accountUpdated.next()));
  }

  getTotalBalanceAccount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/accounts/totalBalance`);
  }

  submitAccount(): Observable<Account> {
    if (this.isEditing && this.account._id) {
      this.isEditing = false;
      return this.editAccount(this.account._id, this.account);
    } else {
      this.isEditing = false;
      return this.addAccount(this.account);
    }
  }

  // Transaction Methods
  setEditTransaction(transaction: Transaction) {
    this.transaction = transaction;
  }

  getEditTransaction(): Transaction {
    return this.transaction;
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http
      .post<Transaction>(`${this.apiUrl}/transactions`, transaction)
      .pipe(tap(() => this.transactionUpdated.next()));
  }

  editTransaction(
    id: string,
    transaction: Transaction
  ): Observable<Transaction> {
    return this.http
      .put<Transaction>(`${this.apiUrl}/transactions/${id}`, transaction)
      .pipe(tap(() => this.transactionUpdated.next()));
  }

  deleteTransaction(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/transactions/${id}`)
      .pipe(tap(() => this.transactionUpdated.next()));
  }

  getTotalBalanceTransaction(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/transactions/totalBalance`);
  }

  submitTransaction(): Observable<Transaction> {
    if (this.isEditing && this.transaction._id) {
      this.isEditing = false;
      return this.editTransaction(this.transaction._id, this.transaction);
    } else {
      this.isEditing = false;
      return this.addTransaction(this.transaction);
    }
  }
}
