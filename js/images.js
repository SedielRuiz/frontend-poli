let images = []
let productIdx
let products = []
let detail
jQuery(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    detail = urlParams.get('detail')

    products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []
    product = products.find(product => product.id === Number(id))
    productIdx = products.findIndex(product => product.id === Number(id))
    images = product.images
    $("#name").text(product.name)
    $(".name").text(product.name)
    $("#price").text("$ "+product.price)
    $("#daysPromotion").text("$ "+product.days_promotion)
    $("#pricePromotion").text("$ "+product.price_promotion)
    for (let s = 0; s < images.length; s++) {
        buildMiniImage(images[s])
        buildCarouselItem(images[s], s)
        buildPreviewImage(images[s], s)
    }
})

function buildMiniImage(path){
    let image = `
        <div class="text-center border-bottom padding-carousel">
            <img data-bs-target="#galleryCaptions" data-bs-slide-to="0" src="`+path+`" class="img-fluid d-block " alt="Imagen">
        </div>
    `
    $("#miniImages").append(image)
}

function buildCarouselItem(path, idx){
    let lateral = `
        <div class="text-center border-bottom padding-carousel">
            <img data-ns-target="#galleryCaptions" data-bs-slide-to="`+idx+`" src="`+path+`" class="img-fluid d-block " alt="Imagen">
        </div>
    `
    $("#lateral").append(lateral)

    let indicator
    if(detail == 1){
        indicator = `
            <li data-ns-target="#galleryCaptions" data-bs-slide-to="`+idx+`" class="`+(idx === 0 ? "active" : "")+` indicator-control"></li>
        `
    }else{
        indicator = `
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="`+idx+`" class="`+(idx === 0 ? "active" : "")+`" aria-current="true" aria-label="Slide `+idx+`"></button>
        `
    }
    $("#indicators").append(indicator)

    let image = `
        <div class="carousel-item active">
            <img class="imgCarousel" src="`+path+`" alt="Imagen">
        </div>
    `
    $("#bigImages").append(image)
}

function buildPreviewImage(path, idx){
    let image = `
        <div class="col-xs-12 col-sm-12 col-md-2">
            <div class="card card-body">
                <div class="row">
                    <div class="col-xs-8 col-sm-8 col-md-8">
                        <img src="`+path+`" class="d-block miniItem" alt="Imagen">
                    </div>
                    <i class="fas fa-trash-alt bigIcon cursor" onclick=deleteImage(`+idx+`)></i>
                </div>
            </div>
        </div>
    `
    $("#previewImages").append(image)
}

function saveImage(){

    let files = document.getElementById("file").files
    for (let s = 0; s < files.length; s++) {
        console.log(files[s])
        images.push(URL.createObjectURL(files[s]))
    }
    

    product.images = images

    setData(product)
}

function deleteImage(idx){
    images.splice(idx, 1)

    product.images = images

    setData(product)
}

function setData(product){
    products[productIdx] = product
    console.log(products)
    //localStorage.setItem("products", JSON.stringify(products))
    //location.reload()
}
