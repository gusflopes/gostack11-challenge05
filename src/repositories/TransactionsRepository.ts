import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    // console.log(this.transactions);
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  private updateBalance(transaction: Transaction): void {
    if (transaction.type === 'income') {
      this.balance.income += transaction.value;
    }
    if (transaction.type === 'outcome') {
      this.balance.outcome += transaction.value;
    }
    this.balance.total = this.balance.income - this.balance.outcome;
  }

  public create(data: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(data);
    this.transactions.push(transaction);
    if (
      transaction.type === 'outcome' &&
      this.balance.total - transaction.value < 0
    ) {
      throw Error('Sem grana companheiro!');
    }
    this.updateBalance(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
