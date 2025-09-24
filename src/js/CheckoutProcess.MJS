import { formDataToJSON, getLocalStorage } from "./utils.mjs";


export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSubTotal() {
        // calculate and display the total dollar amount of the items in the cart, and the number of items.

    }

    calculateOrderTotal() {
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        this.tax = (this.itemTotal)
        this.shipping =
            this.orderTotal =

            // display the totals.
            this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const tax = document.querySelector(`${this.outputSelector} #tax`);


        tax.innerText = `$${this.tax.toFixed(2)}`;
    }

    async checkout(form) {
        // get the form element data by the form name
        // convert the form data to a JSON order object using the formDataToJSON function
        // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items
        // call the checkout method in the ExternalServices module and send it the JSON order data.
    }

}
// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
export function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process.
    const converted_items = items.map()
    // An Array.map would be perfect for this process.

}