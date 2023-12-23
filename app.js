let products = [];

document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                products = JSON.parse(e.target.result);
                displayTable();
            } catch (error) {
                alert('Error parsing JSON file. Please make sure it is valid.');
            }
        };
        reader.readAsText(file);
    }
});

function displayTable() {
    const tableHeader = document.getElementById('tableHeader');
    const productTableBody = document.getElementById('productTableBody');
    const availableFields = document.getElementById('availableFields');
    const displayFields = document.getElementById('displayFields');

    // Clear previous data
    tableHeader.innerHTML = '';
    productTableBody.innerHTML = '';
    availableFields.innerHTML = '';
    displayFields.innerHTML = '';

    // Extract field names from the first product
    const fields = Object.keys(products[0]);

    // Populate availableFields and displayFields
    fields.forEach(field => {
        const option = document.createElement('option');
        option.value = field;
        option.textContent = field;
        availableFields.appendChild(option.cloneNode(true));
        displayFields.appendChild(option);
    });

    // Display products in the table based on selected fields
    displayFields.addEventListener('change', displayTable);

    // Add selected fields to the table header
    const selectedFields = Array.from(displayFields.selectedOptions).map(option => option.value);
    selectedFields.forEach(field => {
        const th = document.createElement('th');
        th.textContent = field;
        tableHeader.appendChild(th);
    });

    // Display products in the table body
    products.forEach(product => {
        const row = productTableBody.insertRow();
        selectedFields.forEach(field => {
            const cell = row.insertCell();
            cell.textContent = product[field];
        });
    });
}

function moveOptions(sourceId, targetId) {
    const source = document.getElementById(sourceId);
    const target = document.getElementById(targetId);

    Array.from(source.selectedOptions).forEach(option => {
        target.appendChild(option);
    });
    displayTable();
}
