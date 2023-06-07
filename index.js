const coinUrl="http://localhost:3000/coins"
function fetchCoins(coinUrl){
    fetch(coinUrl)
    .then(response=>response.json())
    .then(coins=>{coins.forEach(coin => createCoinCard(coin))})
    .catch(error => alert(error.message))
}


const coinCards=document.querySelector(".coinCards")
    function createCoinCard(coin){
    
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
