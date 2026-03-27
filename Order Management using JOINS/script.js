async function loadOrders(){

    const res = await fetch("/orders");
    const data = await res.json();

    let table = "<tr><th>Customer</th><th>Product</th><th>Qty</th><th>Total</th></tr>";

    data.orders.forEach(order=>{
        table += `<tr>
                    <td>${order.name}</td>
                    <td>${order.product_name}</td>
                    <td>${order.quantity}</td>
                    <td>${order.total_amount}</td>
                  </tr>`;
    });

    document.getElementById("orderTable").innerHTML = table;

    document.getElementById("highestOrder").innerText =
        "Highest Order Value: ₹" + data.highest;

    document.getElementById("mostActive").innerText =
        "Most Active Customer: " + data.active;
}