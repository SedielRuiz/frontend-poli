//Inicio consulta
jQuery(document).ready(function(){
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []
    for (let s = 0; s < products.length; s++) {
        buildProduct(products[s])
    }
})

function buildProduct(product){
    let tr = `
        <div class="col-xs-12 col-sm-12 col-md-4 p-1" id="product_`+product.id+`">
            <a href="detail.html?id=`+product.id+`&detail=1" class="item dark">
                <div class="card boxItemPanel standing-out" style="height: 500px;max-height: 500px;padding: 25px 10px 7px;">
                    <div class="imgPanel align-self-center img-catalogue">
                        <img src="../../images/aceite.webp" class="card-img-top d-block img-responsive itemPanel" alt="Aceite">
                    </div>
                    <div class="card-body align-self-center text-center">
                        <p class="card-text">
                            <h3 class="dark">
                                <span class="promotion">$ `+product.price+`</span>
                                <br>
                                Promoción <br>
                                `+product.days_promotion+` días /
                                $ `+product.price_promotion+`
                            </h3>
                            <span class="font-20">Disponible</span>
                            <br>
                            <h4 class="dark  cursor">Más información</h5>
                        </p>
                        <span class="card-title dark font-14">
                            `+product.name+` <br>
                        </span>
                    </div>
                </div>
            </a>
        </div>
    `
    
    $("#bodyProducts").append(tr)
}