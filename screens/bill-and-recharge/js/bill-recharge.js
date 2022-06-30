class Data {
  img = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg";
  bankName = "PNB";
  refNo = "75281946324";
  date = "16 Feb 2022";
  type = "Withdraw";
  constructor(narration, dueAmount) {
    this.name = narration;
    this.dueAmount = dueAmount;
  }
}

async function sendBillRequest() {
  try {
    const url = app.BASE_URL + "transactions";
    const narration = document.getElementById("bill-narration").value;
    const dueAmount = document.getElementById("bill-amount").value;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new Data(narration, dueAmount)),
    };
    const postRequest = await fetch(url, options);
    billRechargePopup();
  } catch (err) {
    console.log("Error Occured: " + err);
  }
}
function billRechargePopup() {
  swal("Success!", "Your transaction is completed!", "success");
}
