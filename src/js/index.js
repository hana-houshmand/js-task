const btn = document.querySelector(".btn");
const tbody = document.querySelector("tbody");
const table = document.querySelector("table");
const input = document.querySelector(".input");
const priceBtn = document.querySelector(".price");
const dateBtn = document.querySelector(".date");
const priceIcon = document.querySelector("#price");
const dateIcon = document.querySelector("#date");
const div = document.querySelector(".div");
const messageContainer = document.querySelector(".messagecontainer");

// url and querystrings

const baseUrl = " http://localhost:3000/transactions";
const queryStrings = {
  asc: "&_sort=price&_order=asc",
  desc: "&_sort=price&_order=desc",
  refId: "http://localhost:3000/transactions?refId_like=",
};

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

  axios.get(baseUrl).then((response) => {
    const datas = response.data;

    rendertrans(datas);
  });
}

// searching on datas based on refid
let inputValue = "";
input.addEventListener("input", searchId);
function searchId(e) {
  inputValue = e.target.value;
  console.log(inputValue);
  axios
    .get(`${queryStrings.refId}${inputValue}${queryStrings.asc}`)
    .then((res) => {
      const datas = res.data;
      console.log(datas);

      if (datas.length === 0) {
        div.classList.add("display");
        messageContainer.innerHTML = "";
        const message = document.createElement("p");
        message.classList.add("message");
        message.innerText = " تراکنش  مورد نظر یافت نشد !!!";
        input.classList.add("searchinput");
        messageContainer.append(message);
      } else {
        messageContainer.innerHTML = "";
        div.classList.remove("display");
        rendertrans(datas);
      }
    });
}

// sorting based on price

priceBtn.addEventListener("click", sortPrice);

let asc = true;
function sortPrice() {
  console.log(inputValue);
  priceIcon.classList.toggle("rotate");
  if (asc) {
    axios
      .get(`${queryStrings.refId}${inputValue}${queryStrings.asc} `)
      .then((res) => {
        const data = res.data;
        console.log(data);
        rendertrans(data);
      });
  } else {
    axios
      .get(` ${queryStrings.refId}${inputValue}${queryStrings.desc} `)
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
  axios.get(`${queryStrings.refId}${inputValue} `).then((res) => {
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
