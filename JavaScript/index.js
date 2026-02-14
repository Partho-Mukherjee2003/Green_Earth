// Spinner

const showSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinnerDiv").classList.remove("hidden");
    document.getElementById("cardDiv").classList.add("hidden");
  } else {
    document.getElementById("cardDiv").classList.remove("hidden");
    document.getElementById("spinnerDiv").classList.add("hidden");
  }
};





//*******  Category functionality  *****/

const category = async () => {
  showSpinner(true);
  const res = await fetch("https://openapi.programming-hero.com/api/categories");
  const data = await res.json();
  showCategory(data.categories);
};
const showCategory = (arry) => {
  for (let ar of arry) {
    const categoriDiv = document.getElementById("CategoriDiv");
    //  console.log(ar);
    const categoribtn = document.createElement("button");
    categoribtn.innerHTML = `
        <button id="btn-${ar.id}" onclick="categoryBtn(${ar.id})" class="catbtn cursor-pointer p-3 text-left text-sm border border-gray-200 rounded-sm w-full">${ar.category_name}</button>
    `;

    categoriDiv.append(categoribtn);
    showSpinner(false);
  }
};
category();

const removeClass = () => {
  const lessonBtnClass = document.getElementsByClassName("catbtn");
  // console.log(lessonBtnClass)
  for (let btn of lessonBtnClass) {
    btn.classList.remove("active");
  }
};


const categoryBtn = async (id) => {
  showSpinner(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${id}`,
  );
  const data = await res.json();
  removeClass();
  const categorybtn = document.getElementById(`btn-${id}`);
  categorybtn.classList.add("active");
  showcatagory(data.plants);
};

const showcatagory = (ary) => {
  // console.log(ary);
  const cardDiv = document.getElementById("cardDiv");
  cardDiv.innerHTML = "";
  for (let ar of ary) {
    // console.log(ar);
    const card = document.createElement("div");
    card.innerHTML = `
  <div class="bg-white rounded-lg  shadow-sm p-3">
              <figure>
                <img class="rounded-xl w-full h-[180px]"
                  src="${ar.image}"
                  alt="Shoes"
                />
              </figure>
              <div class="space-y-2">
                <h2 onclick=" loadModal(${ar.id}) " class="text-xl font-bold mt-3 cursor-pointer">${ar.name}</h2>
                <p class="text-sm text-gray-400">
                  ${ar.description}
                </p>
                <div class="flex justify-between items-center">
                  <button class="rounded-2xl text-sm bg-green-300 text-green-700 p-2">${
                    ar.category
                  }</button>
                  <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${ar.price}</p>
                </div>
                <div class="">
                  <button onclick="loadCart(${ar.price},'${ar.name}')" class="cursor-pointer w-full bg-green-700 p-2 text-white rounded-3xl">Add to Cart</button>
                </div>
              </div>
            </div>

  `;
    cardDiv.append(card);
  }
  showSpinner(false);
};

const loadAllCategory = async () => {
  showSpinner(true);
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  removeClass();
  const categorybtn = document.getElementById("allbtn");
  categorybtn.classList.add("active");
  allCategory(data.plants);
};

const allCategory = (ary) => {
  // console.log(ary);
  const cardDiv = document.getElementById("cardDiv");
  cardDiv.innerHTML = "";
  for (let ar of ary) {
    // console.log(ar);
    const card = document.createElement("div");
    card.innerHTML = `
  <div class="bg-white rounded-lg  shadow-sm p-3">
              <figure>
                <img class="rounded-xl w-full h-[230px]"
                  src="${ar.image}"
                  alt="Shoes"
                />
              </figure>
              <div class="space-y-2">
                <h2 onclick="loadModal(${ar.id})" class="text-xl font-bold mt-3 cursor-pointer">${ar.name}</h2>
                <p class="text-sm text-gray-400">
                  ${ar.description}
                </p>
                <div class="flex justify-between items-center">
                  <button class="rounded-2xl bg-green-300 text-green-700 p-2">${ar.category}</button>
                  <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${ar.price}</p>
                </div>
                <div class="">
                  <button onclick="loadCart(${ar.price},'${ar.name}')" class="cursor-pointer w-full bg-green-700 p-2 text-white rounded-3xl">Add to Cart</button>
                </div>
              </div>
            </div>

  `;
    cardDiv.append(card);
  }
  showSpinner(false);
};
loadAllCategory();

/**
 *Modal Functionality
 * */

const loadModal = async (id) => {
  showSpinner(true);
  const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
  const data = await res.json();
  showModal(data.plants);
};
const showModal = (ary) => {
  // console.log(ary);
  const modalDiv = document.getElementById("modalDiv");
  modalDiv.innerHTML = `
<div class="modal-box w-11/12 max-w-lg p-4 md:p-6 mx-auto">

  <h1 class="text-xl md:text-2xl font-bold mb-3">${ary.name}</h1>

  <img
    class="w-full h-[200px] md:h-[300px] object-cover rounded-lg"
    src="${ary.image}"
    alt="${ary.name}"
  >

  <div class="mt-4 space-y-2 text-sm md:text-base">
    <p><span class="font-bold">Category:</span> ${ary.category}</p>
    <p><span class="font-bold">Price:</span> ${ary.price}</p>
    <p class="py-2 text-gray-600">
      <span class="font-bold text-black">Description:</span> ${ary.description}
    </p>
  </div>

  <div class="modal-action">
    <form method="dialog">
      <button class="btn btn-sm md:btn-md btn-success">Close</button>
    </form>
  </div>
</div>

`;
  document.getElementById("my_modal_5").showModal();
  showSpinner(false);
};


/********History functionality***********/
let cartItems = {};
let grandTotal = 0;

const loadCart = (price, name) => {
  const priceDiv = document.getElementById("priceDiv");
  const totalDisplay = document.getElementById("totalDisplay");

  if (cartItems[name]) {
    cartItems[name].quantity += 1;
  } else {
    cartItems[name] = {
      price: price,
      quantity: 1,
    };
  }

  grandTotal += price;

  renderCart();
};

const renderCart = () => {
  const priceDiv = document.getElementById("priceDiv");
  const totalDisplay = document.getElementById("totalDisplay");

  priceDiv.innerHTML = "";
  for (const name in cartItems) {
    const item = cartItems[name];
    const pricenewdiv = document.createElement("div");
    pricenewdiv.classList.add("mb-2");

    pricenewdiv.innerHTML = `
        <div class="flex justify-between items-center bg-green-50 px-4 py-3 rounded-lg border border-green-100">
          <div>
            <h1 class="font-bold text-gray-800">${name}</h1>
            <p class="text-gray-500 font-medium text-sm">
                <i class="fa-solid fa-bangladeshi-taka-sign"></i>${item.price} x ${item.quantity}
            </p>
          </div>
          <div>
            <button class="remove-btn text-gray-400 hover:text-red-500 transition-colors">
                <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
    `;
    pricenewdiv.querySelector(".remove-btn").addEventListener("click", () => {
      grandTotal -= item.price * item.quantity;
      delete cartItems[name];
      renderCart();
    });
    priceDiv.append(pricenewdiv);
  }
  if (totalDisplay) {
    totalDisplay.innerText = grandTotal;
  }
};
