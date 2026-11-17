'use strict';

// عناصر الصفحة 2
const expenseForm = document.querySelector('#expense-form');
const descriptionInput = document.querySelector('#description');
const amountInput = document.querySelector('#amount');
const categoryInput = document.querySelector('#category');
const dateInput = document.querySelector('#date');
const expenseList = document.querySelector('#expense-list');
const totalElement = document.querySelector('#total');

// تخزين المصروفات 3
let expenses = JSON.parse(
  localStorage.getItem('moneyMapExpenses') || '[]'
);
// 4 انشاءIDجديد
let nextId =
  expenses.reduce(function (highestId, expense) {
    return Math.max(highestId, expense.id);
  }, 0) + 1;
  // 5 حفظ المصروفات
  function saveExpenses() {
  localStorage.setItem(
    'moneyMapExpenses',
    JSON.stringify(expenses)
  );
}

// 6 وتحديد تاريخ
function setToday() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  dateInput.value = `${year}-${month}-${day}`;
}

// 7 عرض المصروفات وحساب الإجمالي
function renderExpenses() {
  expenseList.replaceChildren();

  let total = 0;

  expenses.forEach(function (expense) {
    total += expense.amount;

// 8 انشاء عناصر HTML
    const item = document.createElement('li');
    const details = document.createElement('p');
    const deleteButton = document.createElement('button');
// 9 عرض تفاصيل المصروف
    details.textContent =
      `${expense.description} — ${expense.amount.toFixed(2)} SAR` +
      ` | ${expense.category} | ${expense.date}`;

// 10 حذف المصروف
    deleteButton.textContent = 'Delete';
    deleteButton.type = 'button';

    deleteButton.addEventListener('click', function () {
      expenses = expenses.filter(function (item) {
        return item.id !== expense.id;
      });

      renderExpenses();
    });
// 11 تحديث القائمه وحفظها
    item.append(details, deleteButton);
    expenseList.append(item);
  });

  totalElement.textContent = total.toFixed(2);
  saveExpenses();
}

// 12 التعامل مع النموذج
expenseForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categoryInput.value;
  const date = dateInput.value;
// 13 التحقق من المدخلات
  if (
    !description ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    !category ||
    !date
  ) {
    alert('Please complete all fields and enter an amount above 0.');
    return;
  }
// 14 انشاء مصروف جديد
  const expense = {
    id: nextId++,
    description,
    amount,
    category,
    date,
  };

  expenses.push(expense);

// 15 تحديث النموذج
  renderExpenses();
  expenseForm.reset();
  setToday();

  descriptionInput.focus();

// 16 عرض بيانات في CONSOLE
  console.log('Expenses:', expenses);
});

// 17 تشغيل التطبيق عند فتح الصفحه
setToday();
renderExpenses();