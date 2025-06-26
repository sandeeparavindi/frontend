import {BrowserRouter, Routes, Route} from "react-router-dom";
import {RootLayout} from "./component/RootLayout";
import ProductForm from "./pages/Product";
import InventoryForm from "./pages/Inoventry";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RootLayout/>}>
                    <Route path="product" element={<ProductForm/>}/>
                    <Route path="inventory" element={<InventoryForm/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
