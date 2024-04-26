const btn = document.querySelector(".btn");
const tbody = document.querySelector("tbody");
const table = document.querySelector("table");
const input = document.querySelector(".input");
const priceBtn = document.querySelector(".price");
const dateBtn = document.querySelector(".date");
const priceIcon = document.querySelector("#price");
const dateIcon = document.querySelector("#date");

// rendering transactions on dom

function rendertrans(data) {
  tbody.innerHTML = "";
  data.forEach((tran) => {
    const tranTr = document.createElement("tr");
    tranTr.innerHTML = ` <td >${tran.id}</td>
    <td data-id=${tran.id} >${tran.type}</td>
    <td>${tran.price}</td>
    <td>${tran.refId}</td>
    <td>${new Date(tran.date).toLocaleString("fa-IR")}</td> `;

    tbody.appendChild(tranTr);
  });
}

// showing transactions after clicking

btn.addEventListener("click", showItem);
function showItem() {
  btn.style.display = "none";
  table.style.display = "block";
  input.style.display = "block";

  axios.get(" http://localhost:3000/transactions").then((response) => {
    const datas = response.data;

    rendertrans(datas);
  });
}

// searching on datas based on refid

input.addEventListener("input", searchId);

function searchId(e) {
  const inputValue = e.target.value;
  axios
    .get(` http://localhost:3000/transactions?refId_like=${inputValue} `)
    .then((res) => {
      const datas = res.data;
      rendertrans(datas);
    });
}

// sorting based on price

priceBtn.addEventListener("click", sortPrice);

let asc = true;
function sortPrice() {
  priceIcon.classList.toggle("rotate");
  if (asc) {
    axios
      .get("http://localhost:3000/transactions?_sort=price&_order=asc")
      .then((res) => {
        const data = res.data;
        rendertrans(data);
      });
  } else {
    axios
      .get("http://localhost:3000/transactions?_sort=price&_order=desc")
      .then((res) => {
        const data = res.data;
        rendertrans(data);
      });
  }
  asc = !asc;
}

// sorting based on date

dateBtn.addEventListener("click", sortDate);

asending = true;

function sortDate() {
  dateIcon.classList.toggle("rotate");
  axios.get("http://localhost:3000/transactions").then((res) => {
    const data = res.data;
    if (asending) {
      data.sort((a, b) => a.date - b.date);
      rendertrans(data);
    } else {
      data.sort((a, b) => b.date - a.date);
      rendertrans(data);
    }
  });

  asending = !asending;
}
