(() => {
  app.search = search;
  function search() {
    const input = document.getElementById("searchbar");
    console.log(input.value);
    const filter = input.value.toUpperCase();
    const table = document.getElementById("beneficiaries-body");
    const tablerow = table.querySelectorAll("tr");
    for (let i = 0; i < tablerow.length; i++) {
      tablerow[i].style.display = "none";
      beneficiaryName = tablerow[i].children[0];
      beneficiaryBank = tablerow[i].children[1];
      beneficiaryBankBranch = tablerow[i].children[2];
      beneficiaryIfscCode = tablerow[i].children[3];
      if (beneficiaryName.innerHTML.trim().toUpperCase().indexOf(filter) > -1) {
        tablerow[i].style.display = "";
      } else if (beneficiaryBank.innerHTML.trim().toUpperCase().indexOf(filter) > -1) {
        tablerow[i].style.display = "";
      } else if (beneficiaryBankBranch.innerHTML.trim().toUpperCase().indexOf(filter) > -1) {
        tablerow[i].style.display = "";
      } else if (beneficiaryIfscCode.innerHTML.trim().toUpperCase().indexOf(filter) > -1) {
        tablerow[i].style.display = "";
      }
    }
    const numofbeneficiaries = $('#add-table-1 > tbody > tr:visible').length
    document.getElementById("total-beneficiaries").innerHTML =
      "Total " + numofbeneficiaries + " Beneficiaries";
  }
})();

