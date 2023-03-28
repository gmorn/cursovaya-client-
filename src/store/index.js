import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import OrderSlice from "./OrderSlice";
import productsSlice from "./productsSlice";

export default configureStore({
    reducer: {
        products: productsSlice,
        categories: categorySlice,
        orders: OrderSlice,
    }
})