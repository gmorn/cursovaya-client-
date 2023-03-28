import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import productsSlice from "./productsSlice";

export default configureStore({
    reducer: {
        products: productsSlice,
        categories: categorySlice,
    }
})