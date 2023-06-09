//my code starts here

//document.addEventListener("DOMContentLoaded", init())
const cartUrl = "http://localhost:3000/cart/1";
const accountUrl = "http://localhost:3000/account/1";
const coinUrl = "http://localhost:3000/coins";

let cartQuantity;
let coinNameInCart;
let cartTotal;
let priceOfDraggedCoin;
let balance1;
let quantity1;

function init() {
  function fetchCoins(coinUrl) {
    fetch(coinUrl)
      .then((response) => response.json())
      .then((coins) => {
        coins.forEach((coin) => {
          createCoinCard(coin);
          addOptions(coin);
        });
        addToCartButtonEvent();
      })
      .catch((error) => alert(error.message));
  }
  fetchCoins(coinUrl);

  function createCoinCard(coin) {
    //coinNameInCart = coin.name;

    const coinCards = document.querySelector(".coinCards");
    const detailsCard = document.createElement("div");
    detailsCard.className = "card text-white bg-dark mb-3";
    detailsCard.id = "detailsCard";
    detailsCard.setAttribute("draggable", true);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const justifyCardContent = document.createElement("div");
    justifyCardContent.className = "d-flex justify-content-center";

    const imageThumbnail = document.createElement("img");
    imageThumbnail.className = "img-thumbnail";
    imageThumbnail.src = coin.thumbnail;

    const nameAndIDOfCoin = document.createElement("span");
    nameAndIDOfCoin.id = "nameAndIDOfCoin";
    nameAndIDOfCoin.textContent = ` ${coin.name} - ${coin.symbol} `;

    const price = document.createElement("span");
    price.id = "price";
    price.textContent = `  $${coin.price.toFixed(2)}   `;

    const priceImg = document.createElement("img");
    priceImg.src = "src/price.png";
    priceImg.className = "img-thumbnail";

    const supply = document.createElement("span");
    supply.id = "supply";
    supply.textContent = coin.supply.toFixed(2);
    const supplySpan = document.createElement("span");
    const smallSupply = document.createElement("small");
    smallSupply.textContent = "  supply  ";

    const supplyImg = document.createElement("img");
    supplyImg.src = "src/growth.png";
    supplyImg.className = "img-thumbnail";

    const marketCap = document.createElement("span");
    marketCap.id = "marketCap";
    marketCap.textContent = coin.marketCapUsd.toFixed(2);
    const marketCapSpan = document.createElement("span");

    const smallMarketCap = document.createElement("small");
    smallMarketCap.textContent = "  mkt cap  ";

    const marketCapImg = document.createElement("img");
    marketCapImg.src = "src/cap.png";
    marketCapImg.className = "img-thumbnail";

    const addToCartInCardButton = document.createElement("button");
    addToCartInCardButton.type = "button";
    addToCartInCardButton.className = "btn btn-light";
    addToCartInCardButton.id = "addToCartInCardButton";
    addToCartInCardButton.textContent = "Add to Cart";
    supplySpan.appendChild(smallSupply);
    marketCapSpan.appendChild(smallMarketCap);

    cardBody.append(justifyCardContent);
    justifyCardContent.append(
      imageThumbnail,
      nameAndIDOfCoin,
      price,
      priceImg,
      supply,
      supplySpan,
      supplyImg,
      marketCap,
      marketCapSpan,
      marketCapImg,
      addToCartInCardButton
    );
    detailsCard.appendChild(cardBody);
    coinCards.appendChild(detailsCard);
  }

  function fetchCart(cartUrl) {
    fetch(cartUrl)
      .then((response) => response.json())
      .then((cart) => printCartDetails(cart))
      .catch((error) => alert(error.message));
  }
  fetchCart(cartUrl);

  function updateCart(cartUrl, cartQuantity, coinNameInCart, cartTotal) {
    fetch(cartUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        quantity: cartQuantity,
        names: coinNameInCart,
        total: cartTotal,
      }),
    })
      .then((response) => response.json())
      .then((cart) => printCartDetails(cart))
      .catch((error) => alert(error.message));
  }
  updateCart(cartUrl, cartQuantity, coinNameInCart, cartTotal);

  function printCartDetails(cart) {
    cartQuantity = cart.quantity;
    coinNameInCart = cart.names;
    cartTotal = cart.total;
    document.querySelector("#nameInCart").textContent = `Coin: ${cart.names}`;
    document.querySelector(
      "#amountInCart"
    ).textContent = `Total Quantity: ${cart.quantity}`;
    document.querySelector("#shoppingCartAmount").textContent = cart.quantity;
    document.querySelector(
      "#totalInCart"
    ).textContent = `Total: $${cart.total}`;
  }

  // drag and drop event listeners
  document.querySelector("#detailsCard").addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/html", e.target.innerHTML);
    coinNameInCart = document.querySelector("#nameAndIDOfCoin").textContent;
    priceOfDraggedCoin = document.querySelector("#price").textContent;
    e.dataTransfer.setData(
      "text/plain",
      `${coinNameInCart},${priceOfDraggedCoin}`
    );
  });

  document.querySelector("#theCart").addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  document.querySelector("#theCart").addEventListener("drop", (e) => {
    e.preventDefault();
    cartQuantity++;
    [coinNameInCart, priceOfDraggedCoin] = e.dataTransfer
      .getData("text/plain")
      .split(",");
    cartTotal = parseInt(priceOfDraggedCoin.replace("$", "")) * cartQuantity;
    updateCart(cartUrl, cartQuantity, coinNameInCart, cartTotal);
  });

  //complete order functionality
  function fetchAccountBalance(accountUrl) {
    fetch(accountUrl)
      .then((response) => response.json())
      .then((account) => printAccountBalance(account))
      .catch((error) => alert(error.message));
  }
  fetchAccountBalance(accountUrl);

  function updateAccount(accountUrl, coinNameInCart, balance1, quantity1) {
    fetch(accountUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        names: coinNameInCart,
        quantity: quantity1 + cartQuantity,
        balance: balance1 + cartTotal,
      }),
    })
      .then((response) => response.json())
      .then((account) => printAccountBalance(account))
      .catch((error) => alert(error.message));
  }

  function printAccountBalance(account) {
    balance1 = account.balance;
    quantity1 = account.quantity;
    document.querySelector(
      "#updatedBalance"
    ).textContent = `$${account.balance}`;
  }

  //clear dom of cart
  function clearCart(coinNameInCart, balance1, quantity1) {
    return printCartDetails(
      (buyObj = {
        names: coinNameInCart,
        quantity: quantity1,
        quantity: quantity1,
        total: balance1,
      })
    );
  }

  //complete order functionality
  document.querySelector("#buy").addEventListener("click", (e) => {
    e.preventDefault();
    alert(`Purchase Complete!`);
    updateAccount(accountUrl, coinNameInCart, balance1, quantity1);
    clearCart("", 0, 0);
  });

  //retrieve cart functionality
  document.querySelector("#retrieveCart").addEventListener("click", () => {
    location.reload();
  });

  //clear cart functionality
  document.querySelector("#clearCart").addEventListener("click", (e) => {
    e.preventDefault();
    updateCart(cartUrl, 0, " ", 0);
    clearCart("", 0, 0);
  });

  //add to card functionality in card

  function addToCartButtonEvent() {
    const cartButtons = Array.from(document.querySelectorAll("button.btn-light"))
    cartButtons.forEach((cartButtons) => {
        cartButtons.addEventListener("click", () => {
        //alert('it works')
        cartQuantity++
        coinNameInCart = Array.from(document.querySelectorAll('#nameAndIDOfCoin'))
        priceOfDraggedCoin = Array.from(document.querySelectorAll('#price'))
        // cartTotal = priceOfDraggedCoin.forEach(priceOfDraggedCoin => 
        // parseInt(priceOfDraggedCoin.replace("$", "")) * cartQuantity)

        cartTotal = 100
        
        
        //console.log()

        
        //alert(cartQuantity)
        
        //console.log(a)


        // document.querySelector("#addToCartInCardButton").addEventListener("click", (e)=>{
        //     //     cartQuantity++
        //     //     coinNameInCart = document.querySelector('#nameAndIDOfCoin').textContent
        //     //     priceOfDraggedCoin = document.querySelector('#price').textContent
        //     //     cartTotal = parseInt(priceOfDraggedCoin.replace("$", "")) * cartQuantity
        //     //     e.preventDefault()
        //     //     updateCart(cartUrl, cartQuantity, coinNameInCart, cartTotal)
        //     // })
        updateCart(cartUrl, cartQuantity, coinNameInCart[coinNameInCart.length - 1].textContent, cartTotal)
        // for(let i = 0; i < coinNameInCart.length; i++) {
        //     // const obj = {
        //     //     names: coinNameInCart[i], quantity: priceOfDraggedCoin[i], total: cartTotal[i] 
        //     // }
        //     // setTimeout(updateCart(cartUrl, cartQuantity, coinNameInCart[i].textContent, cartTotal), 0)
           
            
        //     // updateCart(cartUrl, cartQuantity, coinNameInCart, cartTotal)
        //     //console.log(priceOfDraggedCoin[i].textContent)



        //     //console.log(obj)
        //     // updateCart(cartUrl, priceOfDraggedCoin[i], coinNameInCart[i], cartTotal)
        //     //coinNameInCart[i]

        // }

        // for(const y in obj){
        //     coinNameInCart = obj.coinNameInCart.textContent
        //     priceOfDraggedCoin = obj.priceOfDraggedCoin.textContent
        //     cartTotal = obj.cartTotal.textContent
        //     updateCart(cartUrl, cartQuantity, coinNameInCart, cartTotal)
        // }

        // obj.forEach((obj) => {
        //     coinNameInCart = obj.coinNameInCart.textContent
        //     priceOfDraggedCoin = obj.priceOfDraggedCoin.textContent
        //     cartTotal = obj.cartTotal.textContent
        //     //console.log(coinNameInCart)
        //     //updateCart(cartUrl, coinNameInCart)
        //     updateCart(cartUrl, cartQuantity, coinNameInCart, cartTotal)
            
        // })
        
        

    
    });
    });
  }

  // document.querySelector("#addToCartInCardButton").addEventListener("click", (e)=>{
  //     cartQuantity++
  //     coinNameInCart = document.querySelector('#nameAndIDOfCoin').textContent
  //     priceOfDraggedCoin = document.querySelector('#price').textContent
  //     cartTotal = parseInt(priceOfDraggedCoin.replace("$", "")) * cartQuantity
  //     e.preventDefault()
  //     updateCart(cartUrl, cartQuantity, coinNameInCart, cartTotal)
  // })

  //populate dropdown
  function addOptions(coin) {
    priceOfDraggedCoin = coin.price;
    coinNameInCart = coin.name;
    const option = document.createElement("option");
    option.textContent = coin.name;
    document.querySelector("#coinList").append(option);
  }

  document.querySelector("#AddToCartForm").addEventListener("click", (e) => {
    e.preventDefault();
    cartQuantity += parseInt(document.querySelector("#amount").value);
    coinNameInCart = document.querySelector("#coinList").value;
    cartTotal += 1000;
    updateCart(cartUrl, cartQuantity, coinNameInCart, cartTotal);
  });

  document
    .querySelector("#updatedBalance")
    .addEventListener("mouseover", () => {
      document.querySelector("#updatedBalance").style.fontSize = "2em";
    });

  document.querySelector("#updatedBalance").addEventListener("mouseout", () => {
    document.querySelector("#updatedBalance").style.fontSize = "";
  });
}
init();
//document.addEventListener("DOMContentLoaded", init())
