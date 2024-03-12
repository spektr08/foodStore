import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../Pages/Home";
import NavBar from "../Components/Navbar";


function App() {
  return (
    <>
    <NavBar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>    
  );
}
export default App;