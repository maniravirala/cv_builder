
let education = JSON.parse(localStorage.getItem("education")) || [];
let technical_skills = JSON.parse(localStorage.getItem("technical_skills")) || [];
let certificates = JSON.parse(localStorage.getItem("certificates")) || [];
let activity = JSON.parse(localStorage.getItem("activity")) || [];
let internship = JSON.parse(localStorage.getItem("internship")) || [];
let projects = JSON.parse(localStorage.getItem("projects")) || [];
let achievements = JSON.parse(localStorage.getItem("achievements")) || [];


document.getElementById("generate-pdf").addEventListener("click", function () {
  window.print();
});

// Auto Scroll for Text Areas
document.querySelectorAll("textarea").forEach((textarea) => {
  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
    if (this.parentNode) {
      this.parentNode.style.height = this.scrollHeight + "px";
      // console.log(this.parentNode.style.height);
    }
  });
});

// Date picker
// $('input[data-toggle="datepicker"]').datepicker({
//   format: "mm/yyyy",
//   autoHide: true,
// });


let zoomLevel = localStorage.getItem("zoomLevel");

function zoomIn() {
  zoomLevel = parseFloat(zoomLevel);
  if (isNaN(zoomLevel) || zoomLevel === null || zoomLevel === undefined || zoomLevel === "") {
    zoomLevel = 1;
  }
  // console.log(zoomLevel);
  zoomLevel += 0.1;
  document.getElementById('resume').style.zoom = zoomLevel;
  localStorage.setItem("zoomLevel", zoomLevel.toString());
}

function zoomOut() {
  zoomLevel = parseFloat(zoomLevel);
  if (isNaN(zoomLevel) || zoomLevel === null || zoomLevel === undefined || zoomLevel === "" || zoomLevel <= 0.1) {
    zoomLevel = 1;
  }
  // console.log(zoomLevel);
  zoomLevel -= 0.1;
  document.getElementById('resume').style.zoom = zoomLevel;
  localStorage.setItem("zoomLevel", zoomLevel.toString());
}


function addForm(buttonId, targetId, parentId) {

  const button = document.getElementById(buttonId);
  button.addEventListener("click", function () {
    const originalForm = document.querySelector(`#${targetId}`);
    const clonedForm = originalForm.cloneNode(true);

    // Generate a unique ID
    const uniqueId = Date.now();
    clonedForm.id = `${clonedForm.id}__${uniqueId}`;
    clonedForm.querySelectorAll("input, textarea").forEach((input) => {
      // input.id = `${input.id}__${uniqueId}`;
      input.value = "";
    });

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function () {
      clonedForm.remove();

      let formDataArray = JSON.parse(localStorage.getItem(parentId)) || [];

      // Remove the form data from the formDataArray
      formDataArray = formDataArray.filter(data => data.id !== clonedForm.id);
      console.log(formDataArray);
      // Update local storage after removing form
      localStorage.setItem(parentId, JSON.stringify(formDataArray));
    });

    clonedForm.appendChild(deleteButton);
    document.getElementById(parentId).appendChild(clonedForm);

    // Update formDataArray
    let formDataArray = JSON.parse(localStorage.getItem(parentId)) || [];
    formDataArray.push({
      id: clonedForm.id
    });
    console.log(formDataArray);
    localStorage.setItem(parentId, JSON.stringify(formDataArray));
    // Add event listeners to update formDataArray and local storage on input change
    clonedForm.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", function () {
        const index = formDataArray.findIndex((data) => data.id === clonedForm.id);
        formDataArray[index][input.name] = input.value;
        console.log(formDataArray);
        localStorage.setItem(parentId, JSON.stringify(formDataArray));
      });
    });
  });
}

addForm("education_add", "education__id", "education", education);
addForm("skill_add", "skill__id", "technical_skills", technical_skills);
addForm("certificate_add", "certificate__id", "certificates", certificates);
addForm("activity_add", "activity__id", "activity", activity);
addForm("internship_add", "internship__id", "internship", internship);
addForm("project_add", "project__id", "projects", projects);
addForm("achievement_add", "achievement__id", "achievements", achievements);


function loadForms(targetId, parentId, formDataArray) {
  formDataArray.forEach((data) => { 
    const originalForm = document.querySelector("#" + targetId);
    const clonedForm = originalForm.cloneNode(true);
    clonedForm.id = `${clonedForm.id}__${data.id.split("__")[2]}`;
    clonedForm.querySelectorAll("input, textarea").forEach((input) => {
      input.value = data[input.name] || "";
    });
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function () {
      clonedForm.remove();
      formDataArray = formDataArray.filter(data => data.id !== clonedForm.id);
      console.log(formDataArray);
      localStorage.setItem(parentId, JSON.stringify(formDataArray));

    });
    clonedForm.appendChild(deleteButton);
    document.getElementById(parentId).appendChild(clonedForm);

    clonedForm.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", function () {
        const index = formDataArray.findIndex((data) => data.id === clonedForm.id);
        formDataArray[index][input.name] = input.value;
        // console.log(formDataArray);
        localStorage.setItem(parentId, JSON.stringify(formDataArray));
      });
    });
  }
  );
}

loadForms("education__id", "education", education);
loadForms("skill__id","technical_skills", technical_skills);
loadForms("certificate__id", "certificates", certificates);
loadForms("activity__id", "activity", activity);
loadForms("internship__id", "internship", internship);
loadForms("project__id", "projects", projects);
loadForms("achievement__id", "achievements", achievements);