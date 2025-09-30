import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    target: "esnext",
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        productpageindex: resolve(__dirname, "src/product_pages/index.html"),
        productpage: resolve(__dirname, "src/product_pages/productpage.html"),
        productlisting: resolve(__dirname, "src/product_listing/index.html"),
      },
    },
  },
});
