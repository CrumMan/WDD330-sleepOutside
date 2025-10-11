import { loadHeaderFooter } from "./utils.mjs";

//Clear local storage on first open of the session
window.addEventListener('load', () => {
  //Check if we've already initialized this session
  if (!sessionStorage.getItem('sessionStarted')) {
    //First time this session — clear the cart
    localStorage.clear();
    localStorage.setItem("selectedItems", "[]");

    //Set the flag so it doesn't run again
    sessionStorage.setItem('sessionStarted', 'true');
  }
});

loadHeaderFooter();