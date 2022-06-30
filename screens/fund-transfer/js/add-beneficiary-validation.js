(function() {
    const account_number = $("#account_number");
    const re_account_number = $("#re_enter_account_number");
    const account_holder_name = $("#Account_h_name");
    const bank_name = $("#bank_name");
    const ifsc_code = $("#IFSC_code");
    const button_add = $("#add-beneficiary-button");
    const bank_radio = $('[name="bankRadio"]');

    function disableAddBeneficiaryButton() {
        let formValid = false;
        for (let index = 0; index < bank_radio.length && !formValid; index++) {
            if (bank_radio[index].checked)
                formValid = true;
        }
        if (bank_name.val().trim() !== "" && ifsc_code.val().trim() !== "" && account_holder_name.val().trim() !== "" && re_account_number.val().trim() !== "" && account_number.val().trim() !== "" && formValid) {
            button_add.removeProp('disabled');

        } else {
            button_add.prop('disabled', 'disabled');
        }
    }

    app.disableAddBeneficiaryButton = disableAddBeneficiaryButton;


    const add_beneficiary_reAccountNo = $("#add-beneficiary-account-2");
    const add_beneficiary_username = $("#add-beneficiary-username");
    const add_beneficiary_bankname = $("#add-beneficiary-bankname");
    const letters = /^[a-zA-Z]+$/;

    function validateForm() {
        if (account_number.val() !== re_account_number.val()) {
            add_beneficiary_reAccountNo.html("*Account Number does not match");
            return false;
        } else {
            add_beneficiary_reAccountNo.html(" ");
        }
        if (account_holder_name.val() == "" || !account_holder_name.val().match(letters)) {
            add_beneficiary_username.html("*Please enter valid name");
            return false;
        } else {
            add_beneficiary_username.html(" ");
        }
        if (bank_name.val() == "" || !bank_name.val().match(letters)) {
            add_beneficiary_bankname.html("*Please enter valid Bankname");
            return false;
        } else {
            add_beneficiary_bankname.html(" ");
        }
    }
    app.validateForm = validateForm;

    const error_label = $("#add-beneficiary-error-label");

    async function validateAccountNumber() {
        const beneficiary_response = await fetch(app.BASE_URL + "beneficiary");
        const beneficiary = await beneficiary_response.json();
        if (account_number.val() !== beneficiary[0].accountNumber) {
            error_label.html("");
        } else {
            error_label.html("This Account Number already exsists!");
        }
    }
    app.validateAccountNumber = validateAccountNumber;
})();