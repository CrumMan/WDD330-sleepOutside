


function renderCheckoutInformation(){
const checkoutInfo = getCheckOutInfo()
document.getElementById("Information").innerHTML = checkoutInfo
}

function getCheckOutInfo(){
const urlParams = new URLSearchParams(window.location.search);
const fname = urlParams.get('fname');
const lname = urlParams.get('lname');
const street = urlParams.get('street');
const city = urlParams.get('city');
const state = urlParams.get('state');
const zipcode = urlParams.get('zipcode');
const month = urlParams.get('ExpirationMonth');
const year = urlParams.get('ExpirationYear');
const card = urlParams.get('card').slice(-4)
const checkoutInfo = `<li>
<p><strong>Name:</strong> ${fname} ${lname}</p>
<p><strong>Address Information</strong>
<br><strong>Street:</strong> ${street}
<br><strong>City:</strong> ${city} <strong>State:</strong> ${state}
<br><strong>Zipcode:</strong> ${zipcode}
<br><br><strong>Card info</strong>
<br><strong>Card Last four:</strong> ${card}
<br><strong>Expiration:</strong> ${month}/${year}</p>
</li>`;
return checkoutInfo
}
renderCheckoutInformation();