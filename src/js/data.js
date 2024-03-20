let formData = JSON.parse(localStorage.getItem("formData")) || {
};

function storeFormData() {
    localStorage.setItem("formData", JSON.stringify(formData));
}

function updateFormData(key, value) {
    if (value.length == 0) {
        delete formData[key];
    } else if (key == "") {
        return;
    } else {
        formData[key] = value;
    }
    // console.log(formData);
    // for value sometimes index may be different so we need to update the value in the array instead of replacing the whole array
    storeFormData();
    // console.log(key, value);
}


function fillForm() {
    for (let key in formData) {
        if (formData.hasOwnProperty(key) && key != "") {
            let element = document.getElementById(key);
            if (element) {
                element.value = formData[key];
            }
        }
    }
}

fillForm();

document.querySelectorAll(".input-field, .textarea-field").forEach((input) => {
    input.addEventListener("input", function (e) {
        const inputId = e.target.id;
        const inputValue = e.target.value;
        updateFormData(inputId, inputValue);
    });
});




// onchange of the value of the local storage, preview the changes in the resume
window.addEventListener("storage", function (e) {
    console.log(e.key, e.newValue);
    if (e.key === "formData") {
        // fillForm();
    }
});