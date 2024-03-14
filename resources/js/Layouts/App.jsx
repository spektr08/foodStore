import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../Pages/Home";
import Order from "../Pages/Order";
import NavBar from "../Components/Navbar";


function App() {    
  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order/:id" element={<Order />} />
      </Routes>
    </BrowserRouter>
    </>    
  );
}
export default App;