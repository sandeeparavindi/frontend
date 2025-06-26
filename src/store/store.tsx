import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/ProductReducer";
import inventoryReducer from "../reducers/InoventryReducer";

export const store = configureStore({
    reducer: {
        product: productReducer,
        inventory: inventoryReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
