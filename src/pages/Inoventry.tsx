import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Inventory} from "../models/Inventory";
;
import {getProduct} from "../reducers/ProductReducer";
import {Edit2, Trash2, PlusCircle} from "react-feather";
import type {AppDispatch} from "../store/store.tsx";
import {deleteInventory, getInventory, saveInventory, updateInventory} from "../reducers/InoventryReducer.ts";

function InventoryForm() {
    const dispatch = useDispatch<AppDispatch>();
    const inventories = useSelector((state: any) => state.inventory);
    const products = useSelector((state: any) => state.product);

    const [id, setId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [location, setLocation] = useState("");
    const [productId, setProductId] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(getInventory());
        dispatch(getProduct());
    }, [dispatch]);

    useEffect(() => {
        if (inventories.length > 0) {
            const maxId = Math.max(...inventories.map((inv: Inventory) => Number(inv.id)));
            setId(String(maxId + 1));
        } else {
            setId("1");
        }
    }, [inventories]);

    const resetForm = () => {
        setId("");
        setQuantity("");
        setLocation("");
        setProductId("");
        setIsEditing(false);
    };

    const handleAdd = () => {
        if (!quantity || !location || !productId) {
            alert("All fields are required!");
            return;
        }
        const newInventory = new Inventory(Number(id), Number(quantity), location, Number(productId));
        dispatch(saveInventory(newInventory));
        resetForm();
    };

    const handleEdit = (inv: Inventory) => {
        setId(String(inv.id));
        setQuantity(String(inv.quantity));
        setLocation(inv.location);
        setProductId(String(inv.productId));
        setIsEditing(true);
    };

    const handleUpdate = () => {
        if (!quantity || !location || !productId) {
            alert("All fields are required!");
            return;
        }
        const updated = new Inventory(Number(id), Number(quantity), location, Number(productId));
        dispatch(updateInventory(updated));
        resetForm();
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Delete this inventory item?")) {
            dispatch(deleteInventory(id));
        }
    };

    const getProductName = (productId: number) => {
        const product = products.find((p: any) => p.id === productId);
        return product ? product.name : `Product #${productId}`;
    };

    return (
        <div className="p-6 bg-rose-100 min-h-screen">
            <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-xl">
                <input
                    type="text"
                    placeholder="Inventory ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="p-3 bg-rose-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                    disabled
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="p-3 bg-rose-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="p-3 bg-rose-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
                <select
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="p-3 bg-rose-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                    <option value="">Select Product</option>
                    {products.map((product: any) => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex gap-4 mt-6">
                <button onClick={handleAdd}
                        className="bg-rose-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-rose-600">
                    <PlusCircle size={18}/> Add
                </button>
                {isEditing && (
                    <button onClick={handleUpdate}
                            className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-gray-800">
                        <Edit2 size={18}/> Update
                    </button>
                )}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6">
                {inventories.map((inv: Inventory) => (
                    <div key={inv.id} className="bg-white p-6 rounded-xl shadow-lg relative">
                        <h3 className="text-xl font-bold text-black mb-2">Inventory #{inv.id}</h3>
                        <p className="text-gray-700">Qty: {inv.quantity}</p>
                        <p className="text-gray-700">Location: {inv.location}</p>
                        <p className="text-gray-700">Product: {getProductName(inv.productId)}</p>
                        <button onClick={() => handleDelete(inv.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                            <Trash2 size={18}/>
                        </button>
                        <button onClick={() => handleEdit(inv)}
                                className="mt-4 bg-black text-white px-3 py-1 rounded-lg flex items-center gap-2 shadow-md hover:bg-gray-800">
                            <Edit2 size={16}/> Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InventoryForm;