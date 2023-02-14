
let empid = [];

var selectedRow = null;
function onFormSubmit(e) {
    event.preventDefault();
    var formData = readFormData();
    if (empid.includes(formData.empid)) {
        document.getElementById("warning").style.display = "block";
    }
    else {
        document.getElementById("warning").style.display = "none";
        empid.push(formData.empid);
        insertNewRecord(formData);
        resetForm();
    }

}



function update() {
    event.preventDefault();
    var updateData = readUpdateData();
    var currentid = localStorage.getItem("currid");
    if (empid.includes(updateData.empid) && updateData.empid != currentid) {
        document.getElementById("updatewarning").style.display = "block";
    }
    else {
        document.getElementById("updatewarning").style.display = "block"
        if (empid.indexOf(updateData.empid) === -1) {
            empid.push(updateData.empid);
        }
        if (confirm('Do you want to update this record?')) {
            updateRecord(updateData);
            document.getElementById("updatewarning").style.display = "none";
        }
        else {
            document.getElementById("add-employee").style.opacity = "1";
            document.getElementById("updatewarning").style.display = "none";
        }
        document.getElementById("update-employee").style.display = "none";

    }

}


function readFormData() {
    var formData = {};
    formData["empid"] = document.getElementById("empid").value;
    formData["empname"] = document.getElementById("empname").value;
    formData["empage"] = document.getElementById("empage").value;
    formData["empgender"] = document.getElementById("empgender").value;
    return formData;
}

function readUpdateData() {
    var updateData = {};
    updateData["empid"] = document.getElementById("updateid").value;
    updateData["empname"] = document.getElementById("updatename").value;
    updateData["empage"] = document.getElementById("updateage").value;
    updateData["empgender"] = document.getElementById("updategender").value;
    return updateData;

}

function insertNewRecord(data) {
    var table = document.getElementById("employee-List").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.empid;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empname;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.empage;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.empgender;
    cell5 = newRow.insertCell(4);
    // inserting buttons for update or delete the entry.
    cell5.innerHTML = `<div id="action"><button id="edit-btn"onClick="onEdit(this)">Edit</button><button  id="delete-btn" onClick="onDelete(this)">Delete</button></div>`;

}

function onEdit(td) {
    document.getElementById("update-employee").style.display = "block";
    document.getElementById("add-employee").style.opacity = " 0.33";
    selectedRow = td.parentElement.parentElement.parentElement;
    localStorage.setItem("currid", selectedRow.cells[0].innerHTML);
    document.getElementById("updateid").value = selectedRow.cells[0].innerHTML;
    document.getElementById("updatename").value = selectedRow.cells[1].innerHTML;
    document.getElementById("updateage").value = selectedRow.cells[2].innerHTML;
    document.getElementById("updategender").value = selectedRow.cells[3].innerHTML;

}

function updateRecord(updateData) {
    selectedRow.cells[0].innerHTML = updateData.empid;
    selectedRow.cells[1].innerHTML = updateData.empname;
    selectedRow.cells[2].innerHTML = updateData.empage;
    selectedRow.cells[3].innerHTML = updateData.empgender;
    document.getElementById("add-employee").style.opacity = "1";
}


function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement.parentElement;
        document.getElementById('employee-List').deleteRow(row.rowIndex);
        resetForm();
    }
}

function resetForm() {
    document.getElementById("empid").value = '';
    document.getElementById("empname").value = '';
    document.getElementById("empage").value = '';
    document.getElementById("empgender").value = '';
    selectedRow = null;
}

function cancel() {
    document.getElementById("update-employee").style.display = "none";
    document.getElementById("add-employee").style.opacity = "1";
}

