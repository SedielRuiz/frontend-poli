jQuery(document).ready(function(){
    orders = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : []
    cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
    totalCart = 0
    for (let s = 0; s < cart.length; s++) {
        buildConfirm(cart[s])
        totalCart += cart[s].quantity * cart[s].product.price
    }
    $("#totalCart").text(totalCart)

    totalOrder = 0
    for (let s = 0; s < orders.length; s++) {
        //general
        $("#code").text(orders[s].id)
        $("#date").text(orders[s].date)
        //billing
        $("#type_document").text(orders[s].billing.type_document)
        $("#document").text(orders[s].billing.document)
        $("#name_billing").text(orders[s].billing.name)
        //delivery
        $("#name_delivery").text(orders[s].delivery.name)
        $("#phone").text(orders[s].delivery.phone)
        $("#city").text(orders[s].delivery.city)
        $("#neighborhood").text(orders[s].delivery.neighborhood)
        $("#address").text(orders[s].delivery.address)
        $("#complement").text(orders[s].delivery.complement)
        $("#postal_code").text(orders[s].delivery.postal_code)

        for (let r = 0; r < orders[s].products.length; r++) {
            buildConfirm(orders[s].products[r])
            totalOrder += Number(orders[s].products[r].quantity) * Number(orders[s].products[r].product.price)
        }
        $("#totalOrder").text(totalOrder)
    }
})

function setData(orders){
    localStorage.setItem("orders", JSON.stringify(orders))
}

function addOrder(){
    let order = {
        id: Number(orders.length) + Number(1),
        date: new Date(),
        products: cart,
        delivery:{
            name:"Sediel Ruiz",
            document:"Cedula",
            city:"Bogotá",
            neighborhood:"Barrios Unidos",
            address:"Calle prueba 123",
            complement:"Apto 201",
            postal_code:"110010",
            phone:"3227105954"
        },
        billing: {
            name:"Sediel Ruiz",
            type_document:"Cedula",
            document:"1234567"
        }
    }
    orders.push(order)

    setData(orders)
    localStorage.setItem("cart", [])

    window.location.href = "history.html"
}

function buildConfirm(cart){
    let productConfirm = `
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-9">
                <span class="text-muted miga">NOMBRE:</span> `+cart.product.name+` (`+cart.product.reference+`) (`+cart.quantity+`) 
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