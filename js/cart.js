let cart = []
let productCart = {
    product:0,
    quantity:0
}

jQuery(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []
    cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
    product = products.find(product => product.id === Number(id))
    let totalCart = 0
    for (let s = 0; s < cart.length; s++) {
        buildCart(cart[s], s)
        totalCart += cart[s].quantity * cart[s].product.price
    }
    $("#totalCart").text(totalCart)
})

function setData(cart){
    localStorage.setItem("cart", JSON.stringify(cart))
}

function addProduct(){
    productCart.product = product
    productCart.quantity = $("#quantity").val()
    cart.push(productCart)

    setData(cart)

    window.location.href = "../cart.html"
}

function removeProductCart(idx){
    cart.splice(idx, 1)

    setData(cart)
    location.reload()
}

function buildCart(cart, idx){
    let productCart = `
        <div class="col-xs-12 col-sm-12 col-md-12" id="productCart_`+idx+`">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-5">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-2">
                            <img src="../images/aceite.webp" class="card-img-top d-block img-responsive imgCart" alt="Imagen">
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-10 align-self-center">
                            <span>
                                <a class="dark" href="products/detail.html?id=`+cart.product.id+`&detail=1" target="_blank">`+cart.product.name+`</a>
                                <span class="badge badge-pill badge-light" data-toggle="collapse" href="#12345678" role="button" aria-expanded="false" aria-controls="12345678">
                                    <i class="fas fa-ellipsis-h cursor"></i>
                                </span>
                                <div class="collapse" id="12345678">
                                    <span class="text-muted miga font-12">Descripción:</span> <span class="font-13">No tiene</span><br>
                                </div>
                            </span>
                        </div>
                    </div>

                </div>
                <div class="col-xs-12 col-sm-12 col-md-2 text-center align-self-center font-18">
                    <span><span class="d-md-none">Precio:</span> $ `+cart.product.price+`</span>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-2 text-center align-self-center">
                    <input type="text" class="text-center form-control height-control-quantity" value="`+cart.quantity+`" min="1" name="quantity" id="quantity"
                                data-bts-button-down-class="align-self-center btn-quantity font-20 btn btn-light"
                                data-bts-button-up-class="align-self-center btn-quantity font-20 btn btn-light"><br>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-2 text-center align-self-center font-18">
                    <span><span class="d-md-none">Total:</span> $ `+cart.quantity * cart.product.price+`</span>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-1 text-center align-self-center">
                    <i class="fas fa-trash-alt cursor font-18" onclick="removeProductCart(`+idx+`)"></i>
                </div>
            </div><hr>
        </div>
    `

    $("#productsCart").append(productCart)
}