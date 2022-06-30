class Options {
  img = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg";
  bankName = "ICICI Bank";
  refNo = "66666666666";
  date = "9 April 2019";
  type = "Withdraw";
  constructor(narration, submitAmount, methodOfTransfer) {
    this.name = narration;
    this.dueAmount = submitAmount;
    this.method = methodOfTransfer;
  }
}

const sendSubmitTransferRequest = async () => {
  const narrationName = document.getElementById('submit-narration').value;
  const submitAmount = document.getElementById('submit-amount').value;
  const methodOfTransfer = document.getElementById('submit-transfer-type').value;

  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(new Options(narrationName, submitAmount, methodOfTransfer))
    }
    await fetch(app.BASE_URL + "transactions", options);
    swal("Success!", "Your transaction is completed!", "success");
  } catch (error) {
    swal("Failed!", "Error occured! Please try again.", "error");
  }
}