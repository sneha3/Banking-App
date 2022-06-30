const app = {};
app.BASE_URL = "http://localhost:3000/";

function loadTransactionScreen() {
  $("#dynamiccontent").load("../../screens/transactions/transactions.html");
}

function loadFundsTransferScreens() {
  $("#dynamiccontent").load("../../screens/fund-transfer/fund-transfer.html");
}

function loadCardsScreen() {
  $("#dynamiccontent").load("../../screens/cards/cards.html");
}

function loadJavascript(path) {
  let script = document.createElement("script");
  script.src = path;
  document.body.append(script);
}

function loadCss(path) {
  let link = document.createElement("link");
  link.href = path;
  link.rel = "stylesheet";
  document.head.append(link);
}

async function loadAccountSummaryScreen() {
  $("#dynamiccontent").load("../../screens/dashboard/dashboard.html");

  await loadComponent(
    "../../screens/transactions/transactions.html",
    "transactions"
  );

  await loadComponent(
    "../../screens/dashboard/components/account-summary.html",
    "account-summary"
  );

  await loadComponent(
    "../../screens/fund-transfer/fund-transfer.html",
    "funds"
  );

  await loadComponent("../../screens/cards/cards.html", "cards");
  loadCss("../../screens/cards/css/cards.css");
  loadComponent("../../screens/dashboard/components/bills.html", "bills");
  loadJavascript("../../screens/cards/js/cards.js");
  loadJavascript("common-components/js/disable-button.js");
}

async function loadComponent(path, tag) {
  const response = await fetch(path);
  const data = await response.text();
  document.querySelector(tag).innerHTML = data;
}

(function () {
  loadComponent("common-components/header.html", "header");
  loadComponent("common-components/navigation.html", "navigation");
  loadComponent("common-components/navigation-collapse.html", "nav-collapse");
  loadComponent("common-components/hamburger.html", "hamburger");
  loadComponent("common-components/footer.html", "footer-component");
  loadCss("../../common-components/css/header.css");
  loadCss("../../common-components/css/navigation.css");
  loadCss("../../common-components/css/navigation-collapse.css");
  loadCss("../../common-components/css/hamburger.css");
  loadCss("../../common-components/css/footer.css");
  loadCss("../../common-components/css/button.css");
  loadJavascript("../../common-components/js/hamburger.js");
  loadJavascript("../../common-components/js/navigation-collapse.js");
  loadJavascript("../../common-components/js/navigation.js");
})();

function loadBillAndRecharge() {
  $("#dynamiccontent").load(
    "../../screens/bill-and-recharge/bill-recharge.html"
  );
}

function loadAddBeneficiaries() {
  $("#dynamiccontent").load(
    "../../screens/fund-transfer/components/add-beneficiary-form.html"
  );
}
