function displayCart() {
    fetch('http://localhost:5000/api/cart')
        .then((res) => res.json())
        .then((data) => {
            let cart = data[0].cartItems
            let output = ''
            cart.forEach(function (item) {
                output += `
                <tr>
                <td width="60"><img src="${item.file}" height="80" /></td>
                <td class="align-middle">${item.name}</td>
                <td class="align-middle">$5.99</td>
                <td class="align-middle">${item.quantity}</td>
                </tr>
                `
            })
            document.getElementById('output').innerHTML = output
        })

}



// let output = '<h2 class="text-center display-2">Shopping Cart</h2>'
{/* <div class="mt-5 clearfix border-border-dark">
<span>
<img class="img-fluid img-thumbnail float-left" src="${item.file}">
<p class="col-sm-3">Name: ${item.name} </p>     
<p class="display-5">Quantity: ${item.quantity} </p>
</div>     */}
displayCart()