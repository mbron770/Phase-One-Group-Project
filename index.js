const URL = "http://localhost:3000/cart/1"
let cartQuantity
let coinNameInCart
let cartTotal

function init(URL){

function fetchFunction(URL){
    fetch(URL)
    .then(response=>response.json())
    .then(cart=>printCartDetails(cart))
    .catch(error => alert(error.message))
}
fetchFunction(URL)

function updateCart(URL, cartQuantity, coinNameInCart, cartTotal) {
    fetch(URL,{ 
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({quantity: cartQuantity, names: coinNameInCart, total: cartTotal})
})
.then(response => response.json())
.then(cart => printCartDetails(cart))
.catch(error => alert(error.message))
}
updateCart(URL, cartQuantity, coinNameInCart, cartTotal)
function printCartDetails(cart){
    cartQuantity = cart.quantity
    coinNameInCart = cart.names
    cartTotal = cart.total

    document.querySelector('#nameInCart').textContent = `Coin: ${cart.names}`
    document.querySelector('#amountInCart').textContent = `Total Quantity: ${cart.quantity}`
    document.querySelector('#shoppingCartAmount').textContent = cart.quantity
    document.querySelector('#totalInCart').textContent = `Total: $${cart.total}`
}


document.querySelector("#addToCartInCardButton").addEventListener("click", (e)=>{
    cartQuantity++
    coinNameInCart = document.querySelector('#nameAndIDOfCoin').textContent
    priceOfDraggedCoin = document.querySelector('#price').textContent
    cartTotal = parseInt(priceOfDraggedCoin.replace("$", "")) * cartQuantity
    e.preventDefault()
  updateCart(URL, cartQuantity, coinNameInCart, cartTotal)
})


}

init(URL)
