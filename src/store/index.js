import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./products/categorySlice";
import OrderSlice from "./products/OrderSlice";
import productsSlice from "./products/productsSlice";

export default configureStore({
    reducer: {
        products: productsSlice,
        categories: categorySlice,
        orders: OrderSlice,
    }
})