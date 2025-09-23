import { getTotals } from "./utils.mjs";
async function getTotalsAndDisplay(){
const subtotal = (await getTotals()).toFixed(2);
return subtotal
}
async function display(){
    const subtotalstr = await getTotalsAndDisplay()
    const subtotal = parseFloat(subtotalstr)
    const tax = +(subtotal * .06).toFixed(2);
    const total = (subtotal + tax).toFixed(2);
    
    const subtotalSelect = document.getElementById("subtotal");
    subtotalSelect.textContent = subtotal;

    const taxTextSelect = document.getElementById("tax");
    taxTextSelect.textContent = tax;

    const totaltextSelect = document.getElementById("total");
    totaltextSelect.textContent = total;
}
display();