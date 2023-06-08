const coinUrl="http://localhost:3000/coins"
const cartUrl="http://localhost:3000/cart"
let cartQuantity
let coinNameInCart
let cartTotal
let priceOfDraggedCoin
let balance1 
let quantity1
let nameInDropDown
function init(coinUrl){



function fetchCoins(coinUrl){
    fetch(coinUrl)
    .then(response=>response.json())
    .then(coins=>{coins.forEach(coin => {
        createCoinCard(coin)
        addOptions(coin)
    }
    )})
    .catch(error => alert(error.message))
}
fetchCoins(coinUrl)





    function createCoinCard(coin){

        coinNameInCart = coin.name
        

    
        const coinCards=document.querySelector(".coinCards")
        const detailsCard=document.createElement("div")
        detailsCard.className="card text-white bg-dark mb-3" 
        detailsCard.id = 'detailsCard'
        detailsCard.setAttribute('draggable', true)

            const cardBody =document.createElement("div")
            cardBody.className="card-body"

                const imageThumbnail = document.createElement('img')
                imageThumbnail.className="img-thumbnail"
                imageThumbnail.src = coin.thumbnail
 
                const nameAndIDOfCoin=document.createElement("span")
                nameAndIDOfCoin.id="nameAndIDOfCoin"
                nameAndIDOfCoin.textContent=` ${coin.name} - ${coin.symbol} `

                const price=document.createElement("span")
                price.id="price"
                price.textContent=`$${coin.price.toFixed(2)} `
                
                const priceImg=document.createElement("img") 
                priceImg.src="src/price.png" 
                priceImg.className="img-thumbnail"

                const supply=document.createElement("span")
                supply.id="supply"
                supply.textContent = coin.supply.toFixed(2)
                const supplySpan=document.createElement("span")
                const smallSupply=document.createElement("small")
                smallSupply.textContent= " supply "

                const supplyImg=document.createElement("img") 
                supplyImg.src="src/growth.png" 
                supplyImg.className="img-thumbnail"

                const marketCap=document.createElement("span")
                marketCap.id ="marketCap"
                marketCap.textContent=coin.marketCapUsd.toFixed(2)
                const marketCapSpan=document.createElement("span")

                const smallMarketCap=document.createElement("small")
                smallMarketCap.textContent=" mkt cap "

                const marketCapImg=document.createElement("img") 
                marketCapImg.src="src/cap.png" 
                marketCapImg.className="img-thumbnail"

                const addToCartInCardButton=document.createElement("button")
                addToCartInCardButton.type="button" 
                addToCartInCardButton.className="btn btn-light" 
                addToCartInCardButton.id = 'addToCartInCardButton'
                addToCartInCardButton.textContent = "Add to Cart"
                supplySpan.appendChild(smallSupply)
                marketCapSpan.appendChild(smallMarketCap)
                
                cardBody.append(imageThumbnail,nameAndIDOfCoin,price,priceImg,supply,supplySpan,supplyImg,marketCap,marketCapSpan,marketCapImg,addToCartInCardButton)
                detailsCard.appendChild(cardBody)
                coinCards.appendChild(detailsCard)
    }

function addOptions(coin){
        coinNameInCart=coin.name
        const option =document.createElement("option")
        option.textContent= coin.name
        document.querySelector("#coinList").append(option)   
    }
    function fetchCart(cartUrl) {
        fetch(cartUrl).then(response => response.json())
        .then(cart => printCartDetails(cart))
        .catch(error => alert(error.message))
    }
    fetchCart(cartUrl)

    function updateCart(cartUrl, cartQuantity, coinNameInCart, cartTotal){
        fetch(cartUrl, {
              method: 'PATCH',
              headers: {
              'Content-Type': 'application/json', 
               'Accept': 'application/json'
           }, 

              body: JSON.stringify({quantity: cartQuantity, 
              names: coinNameInCart, total: cartTotal})
      }).then(response => response.json())
      .then(cart => printCartDetails(cart))
      .catch(error => alert(error.message))
  }
  updateCart(cartUrl, cartQuantity, coinNameInCart, cartTotal)

  function printCartDetails(cart){
    cartQuantity = cart.quantity
    coinNameInCart = cart.names
    cartTotal = cart.total

    document.querySelector('#nameInCart').textContent = `Coin: ${cart.names}`
    document.querySelector('#amountInCart').textContent = `Total Quantity: ${cart.quantity}`
    document.querySelector('#shoppingCartAmount').textContent = cart.quantity
    document.querySelector('#totalInCart').textContent = `Total: $${cart.total}`

}
// function updateCart(e){
//         e.preventDefault()
//         const amount = e.target.coinAmount.value
//         const total=cart.total+amount
//         const updatedCart={}
//         updatedCart.total= total
//         document.querySelector("#totalBuyAmount").textcontent=total
    // fetch(cartUrl, {
    //     method: 'PATCH',
    //     headers: {
    //       "Content-Type": 'application/json',
    //       "Accept" : 'application/json'
    //     },
    //     body: JSON.stringify(updatedCart)
    //   }).then(res => res.json())
    //   .then(cart => {
    //     document.querySelector("#totalBuyAmount").textContent= cart.total
    //   })
    //   .catch(e=>alert(e.message))
    
    document.querySelector("#AddtoCartForm").addEventListener("submit",(e)=>{
        e.preventDefault()
        // cartQuantity = cart.quantity
        // coinNameInCart = cart.names
        // cartTotal = cart.total
        cartQuantity = e.target.coinAmount.value
        //const total=cartTotal+cartQuantity
        cartTotal= document.querySelector("#totalBuyAmount").textcontent
        //const updatedCart={}
        //updatedCart.total= total
        updateCart(cartUrl, cartQuantity, coinNameInCart, cartTotal)
    
     })
    }
init(coinUrl)


{/* <div class="form-group" >
<label class="form-label" for="amount">Select Quantity</label>
<input type="number" id="amount" name ="coinAmount" class="form-control" />
</div>
<!--create the following span ID via dom and add 
dollar sign and total via sting interpolation-->
<div class="total">
Total: $<span id = 'totalBuyAmount'></span>
</div>
<br>
<!--this is the button for the submit event-->
<button type="submit" class="btn btn-dark">Add to Cart</button> */}

    
