let product = {
    id:0,
    name:"",
    reference:"",
    description: "",
    days_promotion: 0,
    price_promotion: 0,
    price: 0,
    stock:100,
    categories:[],
    images:[]
}

//Inicio consulta
jQuery(document).ready(function(){
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []
    for (let s = 0; s < products.length; s++) {
        buildProduct(products[s])
    }
})

function setData(products){
    localStorage.setItem("products", JSON.stringify(products))
}

function saveProduct(){
    products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []
    product.id = Number(products.length) + Number(1)
    product.name = $("#name").val()
    product.reference = $("#reference").val()
    product.description = $("#description").val()
    product.days_promotion = $("#days_promotion").val()
    product.price_promotion = $("#price_promotion").val()
    product.price = $("#price").val()
    product.categories = $("#categories").val()
    products.push(product)

    setData(products)

    window.location.href = "consult.html"
}

function removeProducts(id){
    products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []
    let idx = products.findIndex(product => product.id === id)
    products.splice(idx, 1)
    
    setData(products)
    $("#product_"+id).remove()
}

function buildProduct(product){
    let tr = `
        <tr class="align-middle text-center" id="product_`+product.id+`">
            <td>
                `+product.name+`
            </td>
            <td>
                `+product.reference+`
            </td>
            <td>
                `+product.stock+`
            </td>
            <td>
                `+product.days_promotion+` días / $ `+product.price_promotion+`
            </td>
            
            <td class="align-middle text-center align-middle">
                <a href="#!" class="btn btn-sm btn-outline-success">Editar</a>
            </td>
            <td class="align-middle text-center align-middle">
                <a href="images.html?id=`+product.id+`" class="btn btn-sm btn-outline-success">Imagenes</a>
            </td>
            <td class="align-middle text-center align-middle">
                <button class="btn btn-sm btn-outline-danger" onclick="removeProducts(`+product.id+`)" >Eliminar</button>
            </td>
        </tr>
    `
    
    $("#bodyProducts").append(tr)
}