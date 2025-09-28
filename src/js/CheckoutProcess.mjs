import { formDataToJSON, getLocalStorage, get_total_cart_items } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
const services = new ExternalServices();

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
export function packageItems(items) {
    //console.log(items);
    // convert the list of products from localStorage to the simpler form required for the checkout process.
    const converted_items = items.map((element) => {
        return {
            id: element.Id,
            name: element.Name,
            price: element.FinalPrice,
            quantity: element.quantity
        }
        
    })
    // An Array.map would be perfect for this process.
    return converted_items;
}
//setting up netlify
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
        this.calculateItemSubTotal();
        this.calculateOrderTotal();
    }

    calculateItemSubTotal() {
        // calculate and display the total dollar amount of the items in the cart, and the number of items.
        const summaryElement = document.querySelector(
            this.outputSelector + " #subtotal"
        );

        // calculate the total of all the items in the cart
        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
       
        summaryElement.innerText = `$${this.itemTotal}`;

    }

    calculateOrderTotal() {
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        this.tax = (this.itemTotal * .06) 
        this.shipping = 10 +(this.list.length -1) * 2
        this.orderTotal = this.itemTotal + this.tax + this.shipping

            // display the totals.
            this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const total = document.querySelector(`${this.outputSelector} a#total`)

        

        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`
        total.innerText = `$${this.orderTotal.toFixed(2)}`
    }

    async checkout() {
        // get the form element data by the form name
        const formElement = document.forms["checkout-form"]
        // convert the form data to a JSON order object using the formDataToJSON function
        // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items0
        const order = formDataToJSON(formElement)
        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);
        console.log(order);
        
        // call the checkout method in the ExternalServices module and send it the JSON order data.
         try {
      const response = await services.checkout(order);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    }
    
}
