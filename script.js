const form = document.getElementById("leaveForm");
const tableBody = document.querySelector("#leaveTable tbody");
const searchInput = document.getElementById("search");

// Load saved leaves from localStorage on page load
window.onload = function() {
  let savedLeaves = JSON.parse(localStorage.getItem("leaves")) || [];
  savedLeaves.forEach(addRow);
};

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const type = document.getElementById("type").value;

  if (name && date && type) {
    let leave = { name, date, type };

    // Save in localStorage
    let savedLeaves = JSON.parse(localStorage.getItem("leaves")) || [];
    savedLeaves.push(leave);
    localStorage.setItem("leaves", JSON.stringify(savedLeaves));

    addRow(leave);
    form.reset();
  }
});

function addRow(leave) {
  const row = tableBody.insertRow();
  row.insertCell(0).textContent = leave.name;
  row.insertCell(1).textContent = leave.date;
  row.insertCell(2).textContent = leave.type;

  const actions = row.insertCell(3);

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "action-btn edit-btn";
  editBtn.onclick = () => editRow(row, leave);
  actions.appendChild(editBtn);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "action-btn delete-btn";
  deleteBtn.onclick = () => deleteRow(row, leave);
  actions.appendChild(deleteBtn);
}

function editRow(row, leave) {
  document.getElementById("name").value = leave.name;
  document.getElementById("date").value = leave.date;
  document.getElementById("type").value = leave.type;

  deleteRow(row, leave); // remove old entry
}

function deleteRow(row, leave) {
  row.remove();

  let savedLeaves = JSON.parse(localStorage.getItem("leaves")) || [];
  savedLeaves = savedLeaves.filter(
    l => !(l.name === leave.name && l.date === leave.date && l.type === leave.type)
  );
  localStorage.setItem("leaves", JSON.stringify(savedLeaves));
}

// 🔍 Filter rows based on search
searchInput.addEventListener("keyup", function() {
  let filter = searchInput.value.toLowerCase();
  let rows = tableBody.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let name = rows[i].cells[0].textContent.toLowerCase();
    let type = rows[i].cells[2].textContent.toLowerCase();
    rows[i].style.display = (name.includes(filter) || type.includes(filter)) ? "" : "none";
  }
});
