(function () {
  class Card {
    constructor(number, type, amount, id) {
      this.number = number;
      this.type = type;
      this.amount = amount;
      this.id = id;
    }
  }

  let cardsObject;
  const [selectElement, cardType, cardInr, cardSubmit, cardTransactionsBody] = [
    $("#cards-select"),
    $("#cards-type"),
    $("#cards-inr"),
    $("#cards-submit"),
    $("#card-transactions-body"),
  ];

  async function changecard() {
    const matchingCard = cardsObject.find(
      (card) => card.id == selectElement.val()
    );
    updatecardDetails(matchingCard);
  }

  async function loadCards() {
    const response = await fetch(app.BASE_URL + "cards");
    cardsObject = await response.json();
    let cardOptions = '';
    cardsObject.map((card) => {
      card = new Card(card.number, card.type, card.amount, card.id);
      const cardOption = `<option value=${card.id}>${card.number}</option>`;
      cardOptions += cardOption;
    });
    selectElement.html(cardOptions);
    updatecardDetails(cardsObject[0]);
  }

  function updatecardDetails(card) {
    cardType.html(card.type);
    cardInr.html(card.amount + " INR");
    app.cardsDisablePayBtn(card.amount);
    cardTransactionsBody.html("");
    loadCardTransactions(card);
  }
  loadCards();
  app.changecard = changecard;

  async function loadCardTransactions(card) {
    const response = await fetch(app.BASE_URL + "transactions");
    const card_transactions = await response.json();
    let numberOfTransactions = 0;
    card_transactions.map((transaction) => {
      const { img, name, bankName, refNo, date, type, dueAmount } = transaction;
      if (transaction.card_number === card.number) {
        numberOfTransactions++;
        const row = $("<tr>");
        const data = `
              <th scope="row">
                <div class="d-flex flex-row align-items-center">
                  <img
                    src=${img}
                    class="rounded-circle card-transactions-avatar"
                    width="50px"
                    height="50px"
                  />
                  <div class="pl-2">${name}</div>
                </div>
              </th>
      
              <td>
                <div class="cts-size">
                 ${bankName}
                  <div class="ref-size">Ref No:${refNo}</div>
                </div>
              </td>
              <td>${date}</td>
              <td>
                <div class="text-white">
                  <span class=${
                    ["Withdraw", "IMPC"].includes(type)
                      ? "span-yellow"
                      : "span-blue"
                  }>${type}</span>
                </div>
              </td>
              <td>${dueAmount}</td>
            `;
        row.html(data);
        cardTransactionsBody.append(row);
      }
    });
    if (numberOfTransactions === 0) {
      const div = $("<div>");
      div.html("No Transactions");
      div.css({
        "margin-left": "20.5rem",
        "margin-top": "2rem",
        "font-weight": "700",
        "font-size": "larger",
      });
      cardTransactionsBody.append(div);
    }
  }

  function cardsPayPopup() {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: ["Cancel", "Pay Now!"],
      dangerMode: false,
    }).then((willPay) => {
      if (willPay) {
        swal("Your payment has been successful", {
          icon: "success",
        });
      } else {
        swal("Your payment has been cancelled", {
          icon: "error",
        });
      }
    });
  }
  app.cardsPayPopup = cardsPayPopup;
})();
