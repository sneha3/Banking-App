(function () {
  async function loadTrxns() {
    let transactions;
    try {
      const response = await fetch(app.BASE_URL + "transactions");
      transactions = await response.json();
      transactions.map((transaction) => {
        const { img, name, bankName, refNo, date, type, dueAmount } =
          transaction;
        const row = document.createElement("tr");
        row.setAttribute("id", "transactionDrag");
        const data = `
              <th scope="row">
                <div class="d-flex flex-row align-items-center">
                  <img
                    src=${img}
                    class="rounded-circle"
                    width="50px"
                    height="50px"
                  />
                  <div class="pl-2">${name}</div>
                </div>
              </th>
      
              <td>
                <div class="cts-size pt-1">
                 ${bankName}
                  <div class="ref-size">Ref No:${refNo}</div>
                </div>
              </td>
              <td class="pt-4">${date}</td>
              <td class="pt-4">
                <div class="text-white">
                  <span class=${
                    ["Withdraw", "IMPC"].includes(type)
                      ? "span-yellow"
                      : "span-blue"
                  }>${type}</span>
                </div>
              </td>
              <td class="pl-4 pt-4">${dueAmount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            `;
        row.innerHTML = data;
        document.querySelector("#transaction-body").appendChild(row);
      });
    } catch (error) {
      console.log(error);
    }
    function filter() {
      const search = document.querySelector(".search");
      const value = search.value.toUpperCase();
      const table_element = document.querySelector("#transaction-body");
      const table_rows = table_element.querySelectorAll("tr");
      for (let index = 0; index < table_rows.length; index++) {
        table_rows[index].style.display = "none";
        const date = table_rows[index].children[2].innerHTML;
        const type_value =
          table_rows[index].children[3].children[0].children[0].innerHTML;
        if (
          date.toUpperCase().indexOf(value) > -1 ||
          type_value.toUpperCase().indexOf(value) > -1
        )
          table_rows[index].style.display = "";
      }
    }
    app.filter = filter;
    $(".transaction-table-table").DataTable({
      columnDefs: [{ targets: [-2, -4], visible: true, orderable: false }],
      paging: true,
      pageLength: 8,
      pagingType: "full_numbers",
      searching: false,
      ordering: true,
      lengthChange: false,
      info: false,
    });
    $("#transaction-body").sortable();
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
  loadTrxns();
})();
