(() => {
  async function loadBeneficiariesData() {
    try {
      const response = await fetch(app.BASE_URL + "fund-transfer");
      const beneficiaries = await response.json();
      const totalBeneficiaries = beneficiaries.length;
      document.querySelector("#total-beneficiaries").innerHTML =
        "Total " + totalBeneficiaries + " Beneficiaries";
      beneficiaries.map((beneficiary) => {
        const { avatarPath, name, bankName, place, bankIFSC } = beneficiary;
        const row = document.createElement("tr");
        row.setAttribute("class", "table-row");
        row.setAttribute("id", "fundsDrag");
        const fundTransferData = `
    <th scope="row">
              <div class="d-flex flex-row align-items-center">
                <img
                  src=${avatarPath}
                  class="rounded-circle"
                  width="50px"
                  height="50px"
                />
                <div class="pl-2 pt-1">${name}</div>
              </div>
            </th>
            <td class="table_content pt-4" data-label="Bank name" >${bankName}</td>
            <td class="table_content pt-4" data-label="City">${place}</td>
            <td class="table_content pt-4" data-label="IFSC Code">
            ${bankIFSC}
            </td>
            <td class="table_content pt-3" data-label="Transfer">
              <button class="btn btn-primary" data-toggle="modal" data-target="#submit-transfer" id="transferbtn" >Transfer</button>
            </td>
            <form id="submittransferform">
            <div class="modal fade" id="submit-transfer" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
    
                    <div class="modal-content">
                        <div class="modal-header">
                            <p class="rupee-symbol-design fa-lg mt-2">&#x20b9;</p>
                            <i class="bi bi-arrow-right fa-xs mt-1"></i>
                            <h5 class="modal-title" id="exampleModalLabel">Submit Transfer</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
    
                            <label class="submit-transfer-text" for="">Narration</label>
                            <div>
                                <input class="narration form-control" type="text" placeholder="Narration" id ="submit-narration" required onkeyup="app.disableSubmitTransferbutton()">
                            </div>
                            <label class="submit-transfer-text" for="">Transfer</label>
                            <div>
                                <select class="type form-control" id="submit-transfer-type" required="required">
                                    <option class="submit-transfer-input-box" value="NEFT">NEFT</option>
                                    <option class="submit-transfer-input-box" value="IMPS">IMPS</option>
                                </select>
                            </div>
                            <label class="submit-transfer-text" for="">Amount</label>
                            <div>
                                <input class="amount form-control" id="submit-amount" type="number" pattern="[0-9]" placeholder="Amount"
                                    required onkeyup="app.disableSubmitTransferbutton()" step="0.1">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <input class="btn btn-primary disable-button" type="submit" onclick = "sendSubmitTransferRequest()" id="submitbtn" disabled></input>
                        </div>
                    </div>
                </div>
            </div>
        </form>
                 `;
        row.innerHTML = fundTransferData;
        document.querySelector("#beneficiaries-body").appendChild(row);
      });
    } catch (error) {
      console.log(error);
    }

    $("#add-table-1").DataTable({
      columnDefs: [
        { targets: [-1, -2, -3, -4], visible: true, orderable: false },
      ],
      paging: true,
      pageLength: 5,
      pagingType: "full_numbers",
      searching: false,
      ordering: true,
      info: false,
      lengthChange: false,
    });
    $("#beneficiaries-body").sortable();
    $("table.dataTable.no-footer").each(function () {
      this.style.setProperty("border-bottom", "none");
    });
    $("table.dataTable thead th").each(function () {
      this.style.setProperty("border-bottom", "none");
    });

    $("table.dataTable thead td").each(function () {
      this.style.setProperty("border-bottom", "none");
    });
  }
  loadBeneficiariesData();
})();

