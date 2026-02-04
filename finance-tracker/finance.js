const transactions = require('./data');
const chalk = require('chalk');

function addTransaction(newTransaction) {
  transactions.push({ ...newTransaction });
}

function getTotalIncome() {
  let sum = 0;
  for (const t of transactions) {
    if (t.type === 'income') {
      sum += t.amount;
    }
  }
  return sum;
}

function getTotalExpenses() {
  let sum = 0;
  for (const t of transactions) {
    if (t.type === 'expense') {
      sum += t.amount;
    }
  }
  return sum;
}

function getBalance() {
  return getTotalIncome() - getTotalExpenses();
}

function getTransactionsByCategory(category) {
  let filtered = [];
  for (const t of transactions) {
    if (t.category === category) {
      filtered.push(t);
    }
  }
  return filtered;
}

function getLargestExpense() {
  let largest = { amount: 0, description: 'None' };
  for (const t of transactions) {
    if (t.type === 'expense' && t.amount > largest.amount) {
      largest = t;
    }
  }
  return largest;
}

function printAllTransactions() {
  console.log(chalk.bold.yellow('\n💰 PERSONAL FINANCE TRACKER 💰'));
  console.log('\nAll Transactions:');

  transactions.forEach((t, index) => {
    const { type, description, amount, category } = t;

    const label =
      type === 'income' ? chalk.green('[INCOME]') : chalk.red('[EXPENSE]');
    const categoryStyled = chalk.yellow(category);

    console.log(
      `${index + 1}. ${label} ${description} - €${amount} (${categoryStyled})`
    );
  });
}

function printSummary() {
  const balance = getBalance();
  const balanceColor = balance >= 0 ? chalk.cyan : chalk.red;

  console.log(chalk.bold('\n📊 FINANCIAL SUMMARY 📊'));
  console.log(`Total Income: ${chalk.green('€' + getTotalIncome())}`);
  console.log(`Total Expenses: ${chalk.red('€' + getTotalExpenses())}`);
  console.log(`Current Balance: ${balanceColor('€' + balance)}`);

  const largest = getLargestExpense();
  console.log(`\nLargest Expense: ${largest.description} (€${largest.amount})`);
  console.log(`Total Transactions: ${transactions.length}\n`);
}

module.exports = {
  addTransaction,
  printAllTransactions,
  printSummary,
};
