import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Product} from "../models/Product";
import {
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct,
} from "../reducers/ProductReducer";
import {PlusCircle, Trash2, Edit2} from "react-feather";
import type {AppDispatch} from "../store/store";

function ProductForm() {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: any) => state.product);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            const maxId = Math.max(...products.map((p: Product) => Number(p.id)));
            setId(String(maxId + 1));
        } else {
            setId("1");
        }
    }, [products]);

    const resetForm = () => {
        setId("");
        setName("");
        setDescription("");
        setPrice("");
        setIsEditing(false);
    };

    const handleAdd = () => {
        if (!name || !description || !price)
            return alert("All fields are required");
        const product = new Product(
            Number(id),
            name,
            description,
            Number(price),
            []
        );
        dispatch(saveProduct(product));
        resetForm();
    };

    const handleEdit = (product: Product) => {
        setId(String(product.id));
        setName(product.name);
        setDescription(product.description);
        setPrice(String(product.price));
        setIsEditing(true);
    };

    const handleUpdate = () => {
        const updated = new Product(
            Number(id),
            name,
            description,
            Number(price),
            []
        );
        dispatch(updateProduct(updated));
        resetForm();
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Confirm delete?")) dispatch(deleteProduct(id));
    };

    return (
        <div className="p-6 bg-rose-100 min-h-screen">
            <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-xl">
                {[{placeholder: "Product ID", value: id, setter: setId},
                    {placeholder: "Name", value: name, setter: setName},
                    {placeholder: "Description", value: description, setter: setDescription},
                    {placeholder: "Price", value: price, setter: setPrice},
                ].map((field, i) => (
                    <input
                        key={i}
                        type="text"
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => field.setter(e.target.value)}
                        className="p-3 bg-rose-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                ))}
            </div>

            <div className="flex gap-4 mt-6">
                <button
                    onClick={handleAdd}
                    className="bg-rose-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-rose-600"
                >
                    <PlusCircle size={18}/> Add
                </button>
                {isEditing && (
                    <button
                        onClick={handleUpdate}
                        className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-gray-800"
                    >
                        <Edit2 size={18}/> Update
                    </button>
                )}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6">
                {products.map((product: Product) => (
                    <div key={product.id} className="bg-white p-6 rounded-xl shadow-lg relative">
                        <h3 className="text-xl font-bold text-black mb-2">{product.name}</h3>
                        <p className="text-gray-700">Description: {product.description}</p>
                        <p className="text-gray-700">Price: ${product.price}</p>
                        <button
                            onClick={() => handleDelete(product.id)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                            <Trash2 size={18}/>
                        </button>
                        <button
                            onClick={() => handleEdit(product)}
                            className="mt-4 bg-black text-white px-3 py-1 rounded-lg flex items-center gap-2 shadow-md hover:bg-gray-800"
                        >
                            <Edit2 size={16}/> Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductForm;
