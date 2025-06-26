import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Inventory} from "../models/Inventory";

const BASE_URL = "http://localhost:8080/inventoryManagement/api/inventories";

export const getInventory = createAsyncThunk("inventory/get", async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
});

export const saveInventory = createAsyncThunk("inventory/save", async (inventory: Inventory) => {
    const res = await axios.post(BASE_URL, inventory);
    return res.data;
});

export const updateInventory = createAsyncThunk("inventory/update", async (inventory: Inventory) => {
    const res = await axios.put(`${BASE_URL}/${inventory.id}`, inventory);
    return res.data;
});

export const deleteInventory = createAsyncThunk("inventory/delete", async (id: number) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
});

const inventorySlice = createSlice({
    name: "inventory",
    initialState: [] as Inventory[],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getInventory.fulfilled, (_, action) => action.payload)
            .addCase(saveInventory.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(updateInventory.fulfilled, (state, action) => {
                const index = state.findIndex(i => i.id === action.payload.id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(deleteInventory.fulfilled, (state, action) => {
                return state.filter(i => i.id !== action.payload);
            });
    },
});

export default inventorySlice.reducer;