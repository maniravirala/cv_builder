
document.getElementById("generate-pdf").addEventListener("click", function () {
  window.print();
});

// Pdf
document.getElementById("export-pdf").addEventListener("click", function () {
  const resumeContent = document.getElementById("resume").innerHTML;
  const watermark = document.URL;
  // const styles = './resume.css'
  // import styles from './resume.css';

  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  var doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <html>
    <head>
      <title>Print</title>
      <link rel="stylesheet" type="text/css" href="resume.css">
      <style>:root {
        --color1: #0c3760;
        --color2: #c4a079;
        --color3: #050100;
    }
    
    html {
        font-size: 12px;
    }
    
    body {
        font-family: "poppins", sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
    }
    
    #resume {
        display: flex;
        background-color: #f4f4f4;
        padding: 0;
        margin: 0;
        color: var(--color3);
        grid-column: 2 / span 1;
        /* width: 210mm;
        height: 297mm; */
        width: 8.3in;
        height: 11.7in;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow-y: auto;
        font-size: 1rem;
    }
    
    .cv-editor__body__right {
        display: flex;
        flex-direction: column;
        width: 100%;
    
    }
    
    .cv-editor__body__right__personal-info {
        display: flex;
        width: 100%;
        background-color: var(--color1);
        color: var(--color2);
    }
    
    .wrapping {
        overflow-wrap: anywhere;
    }
    
    .personal-info {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 20px;
        padding: 20px;
    }
    
    .personal-info__profile {
        display: grid;
        align-items: center;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
    
    .personal-info__profile img {
        border-radius: 50%;
        grid-column: 2/ span 3;
    }
    
    .personal-info__name {
        grid-column: 2 / span 2;
        text-align: center;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 1.2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    #personal-info-name {
        font-size: 2rem;
        font-weight: 600;
    }
    
    .personal-info__contact {
        display: flex;
        flex-direction: column;
        /* align-items: flex-end; */
    }
    
    .personal-info__contact span {
        margin-bottom: 5px;
    }
    
    .main-border {
        width: 2px;
        background-color: var(--color2);
        height: calc(100% - 60px);
        margin-top: 30px;
    }
    
    .item-border {
        height: 2px;
        background-color: var(--color2);
        width: 100%;
        margin: 15px 0;
        /* margin-left: 30px; */
    }
    
    .cv_main {
        display: grid;
        grid-template-columns: 1fr 2px 1fr 1fr;
        overflow-wrap: anywhere;
    }
    
    .cv_main__left {
        grid-column: 1 / span 1;
        padding: 30px;
    }
    
    .cv_main__right {
        grid-column: 3 / span 2;
        padding: 30px;
    }
    
    .cv_main-item__title {
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 10px;
        color: var(--color2);
        text-transform: uppercase;
    }
    
    .cv_main-technical_skills p{
        padding-left: 15px;
    }
    
    ul li {
        list-style: disc;
        margin-left: 15px;
    }
    
    .cv_main-item_certification {
        display: flex;
        /* justify-content: space-between; */
        gap: 5px;
    }

      .watermark {
        position: fixed;
        top: 40%;
        left: 60%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 3em;
        color: rgba(0, 0, 0, 0.5); /* 50% transparency */
        pointer-events: none; /* This allows clicking through the watermark */
        z-index: -100; /* Place the watermark behind other elements */
        width: 100%;
      }      
    </style>
    </head>
    <body>
      <div class="watermark">${watermark}</div>
      ${resumeContent}
    </body>
    </html>
  `);
  doc.close();

  iframe.contentWindow.print();
  document.body.removeChild(iframe);
});

// Docx
document.getElementById("export-docx").addEventListener("click", function () {
  // generate();
});

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

window.generate = function generate() {
  loadFile("https://docxtemplater.com/input.docx", function (error, content) {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new window.docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    doc.render({
      first_name: "John",
      last_name: "Doe",
      phone: "0652455478",
      description: "New Website",
    });

    const blob = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: "DEFLATE",
    });
    // Output the document using Data-URI
    saveAs(blob, "output.docx");
  });
};

// Auto Scroll for Text Areas
document.querySelectorAll("textarea").forEach((textarea) => {
  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
    if (this.parentNode) {
      this.parentNode.style.height = this.scrollHeight + "px";
      console.log(this.parentNode.style.height);
    }
  });
});

// Date picker
$('input[data-toggle="datepicker"]').datepicker({
  format: "mm/yyyy",
  autoHide: true,
  autoPick: true,
});

// Zoom in and out
let zoomLevel = 1; // Initial zoom level

function zoomIn() {
  zoomLevel += 0.1;
  document.getElementById('resume').style.zoom = zoomLevel;
}

function zoomOut() {
  zoomLevel -= 0.1;
  document.getElementById('resume').style.zoom = zoomLevel;
}
