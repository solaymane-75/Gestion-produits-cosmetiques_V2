let i = 0 ;
document.getElementById("ajouter").onclick = function () {

    i++;
    document.getElementById('table').style.display = "flex";
    var table = document.getElementById("table");
    var row = table.insertRow(table.tr);
    row.id = `R${i}`;
    var A = row.insertCell(0);
    var B = row.insertCell(1);
    var C = row.insertCell(2);
    var D = row.insertCell(3);
    var E = row.insertCell(4);
    var F = row.insertCell(5);
    var btn = row.insertCell(6);
    var nom = document.getElementById("nom").value;
    var marque = document.getElementById("marque").value;
    var prix = document.getElementById("prix").value;
    var date = document.getElementById("date").value;
    var option = document.getElementById("multiple-select").value;
    var radioBtn = document.querySelector("input[name='check']:checked");
    A.innerHTML = nom;
    B.innerHTML = marque;
    C.innerHTML = prix;
    D.innerHTML = date;
    E.innerHTML = option;
    btn.innerHTML = `<button id='edit' onclick='editrow(${i})'><i class='fa-solid fa-pen'></i></button><button id='delete' onclick='supprimer(${i})'><i class='fa-solid fa-times'></i></button>`;
    F.innerHTML = radioBtn.value;
    document.getElementById('login').reset();
     }
    


function supprimer(i) {
    document.getElementById("popup").style.display = "flex";
    document.getElementById('supprimer').addEventListener('click', function () {

        document.getElementById(`R` + i).remove();
        document.getElementById("popup").style.display = "none";
    })
}
function annuler() {
    document.getElementById('popup').style.display = "none";
}


let tableau = document.getElementById('table'), rIndex;
function editrow() {
    for (let i = 0; i < tableau.rows.length; i++) {
        tableau.rows[i].onclick = function () {
            document.getElementById('ajouter').style.display = "none";
            document.getElementById('modifier').style.display = "block";

            rIndex = this.rowIndex;

            document.getElementById('nom').value = this.cells[0].innerHTML;
            document.getElementById('marque').value = this.cells[1].innerHTML;
            document.getElementById('prix').value = this.cells[2].innerHTML;
            document.getElementById('date').value = this.cells[3].innerHTML;
            document.getElementById('multiple-select').value = this.cells[4].innerHTML;
            document.querySelector("input[name='check']:checked") = this.cells[5].innerHTML;
        }

    }
}
function edit() {
    document.getElementById('ajouter').style.display = "block";
    document.getElementById('modifier').style.display = "none";

    tableau.rows[rIndex].cells[0].innerHTML = document.getElementById('nom').value;
    tableau.rows[rIndex].cells[1].innerHTML = document.getElementById('marque').value;
    tableau.rows[rIndex].cells[2].innerHTML = document.getElementById('prix').value;
    tableau.rows[rIndex].cells[3].innerHTML = document.getElementById('date').value;
    tableau.rows[rIndex].cells[4].innerHTML = document.getElementById('multiple-select').value;
    tableau.rows[rIndex].cells[5].innerHTML = document.querySelector("input[name='check']:checked").value;

    document.getElementById('login').reset();
}
// table gestion with local storage ?
const state = document.querySelector("#state");
const why = document.querySelector(".why");
const button = document.querySelector(".button");
const table = document.querySelector(".table");

// Date
var currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
let cDate = cMonth + "-" + cDay;

var sArray = [];

getDataFromLocalStorage();

button.addEventListener("click", () => {
  if (state.value !== "state?") {
    addToArray({
      state: state.value,
      reason: why.value,
    });
    why.value = "";
    state.value = "state?";
  }
});

function addToArray(dataObject) {
  sArray.push(dataObject);
  addToTable(dataObject);
  addDataToLocalStorage();
}
function addDataToLocalStorage() {
  window.localStorage.setItem("states", JSON.stringify(sArray));
}

function addToTable(dataObject) {
  const tr = document.createElement("tr");
  const tdstate = document.createElement("td");
  const tdWhy = document.createElement("td");
  const tdDate = document.createElement("td");
  tr.appendChild(tdstate);
  tr.appendChild(tdWhy);
  tr.appendChild(tdDate);
  table.appendChild(tr);
  tdstate.innerText = dataObject.state;
  tdWhy.innerText = dataObject.reason;
  tdDate.innerText = cDate;
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("states");
  if (data) {
    sArray = JSON.parse(data);
    for(const row of sArray) {
      addToTable(row);
    } 
  }
}







