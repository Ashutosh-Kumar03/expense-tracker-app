let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
  const title = document.getElementById("title").value;
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  if (title === "" || amount <= 0) {
    alert("Please enter a valid title and amount");
    return;
  }

  const transaction = {
    title,
    amount,
    type,
    category
  };

  transactions.push(transaction);
  saveTransactions();
  renderTransactions();

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
}

function renderTransactions() {
  const list = document.getElementById("transactionList");
  const balanceEl = document.getElementById("balance");
  const incomeEl = document.getElementById("income");
  const expenseEl = document.getElementById("expense");

  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach((transaction, index) => {
    if (transaction.type === "income") {
      income += transaction.amount;
    } else {
      expense += transaction.amount;
    }

    const li = document.createElement("li");
    li.classList.add(transaction.type);

    li.innerHTML = `
      <strong>${transaction.title}</strong><br>
      <small>${transaction.category} | ${transaction.type}</small><br>
      <span>₹${transaction.amount}</span>
      <button class="delete-btn" onclick="deleteTransaction(${index})">X</button>
    `;

    list.appendChild(li);
  });

  const balance = income - expense;

  balanceEl.textContent = `₹${balance}`;
  incomeEl.textContent = `₹${income}`;
  expenseEl.textContent = `₹${expense}`;
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveTransactions();
  renderTransactions();
}

renderTransactions();