function getItems() {
    fetch('http://localhost:5000/api/items')
        .then((res) => res.json())
        .then((data) => {
            let output = '<h2>Items</h2>'
            data.forEach(function (item) {
                output += `
                <ul>
                <li>Name: ${item.name} </li>
                <li>Quantity: ${item.quantity} </li>
                <img class="img-fluid" src="${item.file}">
                <button type="button" onclick="addToCart('${item._id}','${item.name}','${item.quantity}','${item.file}')">Click Me!</button> 
                </ul>
                `
            })
            document.getElementById('output').innerHTML = output
        })
}
{/* <button type="button" onclick="addToCart('${item._id}')">Click Me!</button> */ }
// function addToCart(itemID) {
// console.log('adding itemID', itemID,)
function addToCart(itemID, itemName, itemQuantity, itemPicture) {
    let id = itemID
    let name = itemName
    let quantity = itemQuantity
    let picture = itemPicture
    // console.log(JSON.stringify(id), JSON.stringify(name), JSON.stringify(quantity), JSON.stringify(picture))
    fetch("http://localhost:5000/api/cart", {

        // Adding method type 
        method: "POST",
        // Adding body or contents to send 
        // Adding headers to the request 
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "cartItems": {
                "product": id,
                "name": name,
                "quantity": quantity,
                "file": picture
            }
        })
    })
        // Converting to JSON 
        .then(response => response.json())
        // Displaying results to console 
        .then(json => console.log(json));


}
getItems()

