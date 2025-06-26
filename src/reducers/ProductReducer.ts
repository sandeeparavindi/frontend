import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Product} from "../models/Product";

const BASE_URL = "http://localhost:8080/inventoryManagement/api/products";

export const getProduct = createAsyncThunk("product/get", async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
});

export const saveProduct = createAsyncThunk("product/save", async (product: Product) => {
    const res = await axios.post(BASE_URL, product);
    return res.data;
});

export const updateProduct = createAsyncThunk("product/update", async (product: Product) => {
    const res = await axios.put(`${BASE_URL}/${product.id}`, product);
    return res.data;
});

export const deleteProduct = createAsyncThunk("product/delete", async (id: number) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
});

const productSlice = createSlice({
    name: "product",
    initialState: [] as Product[],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.fulfilled, (_, action) => action.payload)
            .addCase(saveProduct.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                return state.filter(p => p.id !== action.payload);
            });
    },
});

export default productSlice.reducer;