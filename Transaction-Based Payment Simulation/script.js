async function makePayment(){

    const senderId = document.getElementById("sender").value;
    const receiverId = document.getElementById("receiver").value;
    const amount = document.getElementById("amount").value;

    const res = await fetch("/payment",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            sender:senderId,
            receiver:receiverId,
            amount:amount
        })
    });

    const message = await res.text();
    document.getElementById("status").innerText = message;
}