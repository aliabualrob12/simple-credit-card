const resturentItems = [
  { name: "burger", price: 6 ,image:"stuff/burger.png" },
  { name: "pizza", price: 15,image:"stuff/pizza.png" },
  { name: "shawarma", price: 4,image:"stuff/shawarma.png" },
  { name: "KFC", price: 18,image:"stuff/shawarma.png" },
  { name: "tacos", price: 7,image:"stuff/Taco.png" },
];
const orders = [];
const onClickItem = (itemName) => {
  const item = resturentItems.find((element) => element.name === itemName);
  const itemOnOrders= orders.find((element) => element.name === item.name);
  if(itemOnOrders){
    itemOnOrders.counter+=1;
  }
  else{
    const item = resturentItems.find((element) => element.name === itemName);
    const itemOnOrders= orders.find((element) => element.name === item.name);
    item.counter=1;
    orders.push(item);

  }
  console.log(orders)

  //increaseItemcounter(ordersItem);
  renderItemsNames(orders);
  renderItemsPrice(orders);

  //
  const cartItemDiv=document.getElementById("cart-items");
  cartItemDiv.innerHTML = ``;
  for (const itemOnOrders of orders) {
    cartItemDiv.innerHTML +=`
    <div class="items">
                    <div class="burger" >
                        <div class="item-title-photo" >
                            <div class="item-title"><h2>${itemOnOrders.name}</h2></div>
                            <div class="item-photo"><img src=${itemOnOrders.image} /></div>
                            </div>
                            <div class="item-title"><h2>${itemOnOrders.counter}</h2></div>
                        <div class="item-price"><h2>${itemOnOrders.counter *itemOnOrders.price}</h2></div>
                        </div>
                        
                    </div>
                    </div>
    `;
    
    
  }
};

const renderItemsNames = (orders) => {
  const ordersNames = orders.map((item) => {
    // item.counter===1 ? `${item.name}` : `${item.name} (${item.counter})`
    if (item.counter===1)
    return `${item.name}`;
    else
    return `${item.name} (${item.counter})`;

  });
  document.getElementById("your-order").value = ordersNames;
};

let total = 0;
const renderItemsPrice = (orders) => {
  const ordersPrices = orders.map((elem) => {
      return (elem.price)*elem.counter});
  total = ordersPrices.reduce((previous, current) => previous + current, 0);
  document.getElementById("total-price").value = total;
};


////////////////for pay
const creditCard = [
  { cardNumber: 1, holderName: "ali", cvv: 123, amount: 100 },
  { cardNumber: 2, holderName: "omar", cvv: 456, amount: 0 },
  { cardNumber: 3, holderName: "yazan", cvv: 789, amount: 20 },
];
const onclickPay = () => {
  const cardNumber = +document.getElementById("cardNumber").value;
  const cardHolderName = document.getElementById("cardHolderName").value;
  const cvvNumber = +document.getElementById("cvvNumber").value;
  const creditCardInformation = creditCard.find(
    (element) => element.cardNumber === cardNumber
  );

  if (creditCardInformation) {
    if (
      creditCardInformation.cvv === cvvNumber &&
      creditCardInformation.holderName === cardHolderName
    ) {
      if (total <= creditCardInformation.amount) {
        document.getElementById("paymeent-result").value =
          "Payment completed successfully";
      } else {
        document.getElementById("paymeent-result").value =
          "You do not have enough money";
      }
    } else if (creditCardInformation.cvv != cvvNumber) {
      document.getElementById("paymeent-result").value = "error in cvv number";
    } else if (creditCardInformation.holderName != cardHolderName) {
      document.getElementById("paymeent-result").value =
        "error in card holder name";
    }
  } else if (!creditCardInformation) {
    document.getElementById("paymeent-result").value = "your card not found";
  }
};
///// on load
const renderItemsOnLoad=()=>{
  const resturentItemsHtml=document.getElementById("resturentItems");
  resturentItemsHtml.innerHTML=``
  for (const item of resturentItems) {
    resturentItemsHtml.innerHTML+=` 
   <div class="${item.name}" onclick="onClickItem('${item.name}')">
  <div class="item-title-photo" >
      <div class="item-title"><h2>${item.name}</h2></div>
      <div class="item-photo"><img src="${item.image}" alt="burger"></div>
  </div>
  <div class="item-price"><h2>${item.price}</h2></div>
</div>`
}
}