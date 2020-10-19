console.log('test')
function getItems() {
    fetch('http://localhost:5000/api/items')
        .then((res) => res.json())
        .then((data) => {
            let output = '<h2>Items</h2>'
            data.forEach(function (item) {
                output += `
                <ul>
                <li>Name: ${item.name} </li>
                <li>Name: ${item.quantity} </li>
                <img class="img-fluid" src="${item.file}">
                <button type="button" onclick="addToCart('${item._id}')">Click Me!</button>
                </ul>
                `
            })
            document.getElementById('output').innerHTML = output
        })
}

function addItems(e) {
    e.preventDefault()

    // let name = document.getElementById('name').value
    // let quantity = document.getElementById('quantity').value

    // fetch('http://localhost:5000/api/items', {
    //     method: 'POST',
    //     // headers: {
    //     //     'Accept': 'application/json, text/plain, */*',
    //     //     'Content-type': 'application/json'
    //     // },
    //     // body: JSON.stringify({ name: name, quantity: quantity })
    //     body: formData

    // })
    //     .then((res) => res.json())
    //     .then((data) => console.log(data))

}
// document.getElementById("addItems").addEventListener('click', addItems)

function addToCart(itemID) {
    console.log('adding itemID', itemID)
}

getItems()

