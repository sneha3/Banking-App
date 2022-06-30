(function () {
  const reg = /^\d{0,9}(\.\d{0,2})?$/;
  const billNarration = document.getElementById("bill-narration");
  const billAmount = document.getElementById("bill-amount");
  const payNowBtn = document.getElementById("bill-recharge-pay-now");
  const cardsPayNowBtn = document.getElementById("cards-submit");

  function billRechargeDisablePayBtn() {
    const billNarrationValue = billNarration.value;
    const billAmountValue = billAmount.value;
    if (
      billNarrationValue.trim() != "" &&
      billAmountValue.trim() != "" &&
      reg.test(billAmountValue) &&
      billAmountValue != 0
    ) {
      enablePayButton(payNowBtn);
    } else {
      disablePayButton(payNowBtn);
    }
  }

  function disableSubmitTransferbutton() {
    const submitNarrationValue = document.getElementById("submit-narration").value;
    const submitAmountValue = document.getElementById("submit-amount").value;
    const submitTransferbutton = document.getElementById("submitbtn");

    if (
      submitNarrationValue.trim() != "" &&
      submitAmountValue.trim() != "" &&
      reg.test(submitAmountValue) &&
      submitAmountValue != 0
    ) {
      enablePayButton(submitTransferbutton);
    } else {
      disablePayButton(submitTransferbutton);
    }
  }

  function cardsDisablePayBtn(amount) {
    if (amount === 0) {
      disablePayButton(cardsPayNowBtn);
    } else {
      enablePayButton(cardsPayNowBtn);
      cardsPayNowBtn.click(app.cardsPayPopup);
    }
  }

  function disablePayButton(buttonId) {
    buttonId.disabled = true;
  }

  function enablePayButton(buttonId) {
    buttonId.disabled = false;
  }

  app.cardsDisablePayBtn = cardsDisablePayBtn;
  app.billRechargeDisablePayBtn = billRechargeDisablePayBtn;
  app.disableSubmitTransferbutton = disableSubmitTransferbutton;
})();
