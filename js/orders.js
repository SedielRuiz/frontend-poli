jQuery(document).ready(function(){
    orders = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : []
    cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
    totalCart = 0
    for (let s = 0; s < cart.length; s++) {
        buildConfirm(cart[s])
        totalCart += cart[s].quantity * cart[s].product.price
    }
    $("#totalCart").text(totalCart)
})

function setData(orders){
    localStorage.setItem("orders", JSON.stringify(orders))
}

function addOrder(){
    let order = {
        products: cart,
        delivery:{

        },
        billing: {

        }
    }
    orders.push(order)

    setData(orders)

    window.location.href = "history.html"
}

function buildConfirm(cart){
    let productConfirm = `
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-9">
                <span class="text-muted miga">NOMBRE:</span> `+cart.product.name+` (`+cart.product.reference+`) 
                <span class="badge badge-primary font-14">Cantidad: `+cart.quantity+`</span>
                <span class="badge badge-primary font-14">Precio: $ `+cart.product.price+`</span>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-3 text-right">
                <span class="text-muted miga">TOTAL:</span> <span class="font-18"> $ `+cart.quantity * cart.product.price+`</span>
            </div>
        </div><hr>
    `

    $("#confirmProducts").append(productConfirm)
}