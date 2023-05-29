import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./products/categorySlice";
import OrderSlice from "./products/OrderSlice";
import productsSlice from "./products/productsSlice";
import loginSlice from "./user/loginSlice";
import UsersSlice from "./user/UsersSlice";


export default configureStore({
    reducer: {
        products: productsSlice,
        categories: categorySlice,
        orders: OrderSlice,
        user: loginSlice,
        users: UsersSlice,
    }
})