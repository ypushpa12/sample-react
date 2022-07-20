import './App.css';
import Home from './component/Home';
import Navbar from './component/Navbar';
import { Routes, Route } from 'react-router-dom';
import Products from './component/Products';
import Product from './component/Product';
import Basket from './component/Basket';
import { useEffect, useState } from 'react';
import About from './component/About';
import Filter from './component/Filter';
import Footer from './component/Footer';
import Signin from './component/Signin';
import Signout from './component/Signout';
import Signup from "./component/Create";
import Navbarone from './component/Navbarone';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [category, setCategory] = useState("");
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const getCategory = () => category;
  return (
    <>
      <Navbar countCartItems={cartItems.length} setCategory={setCategory} selectedCategory={category} />
      <Navbarone countCartItems={cartItems.length} setCategory={setCategory} selectedCategory={category} />
      <Routes>
        <Route exact path='/' element={<Home category={category} />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/filter'element={<Filter />} />
        <Route exact path='/products' element={<Products category="" />} />
        <Route exact path='/signin' element={<Signin />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/signout' element={<Signout />} />
        <Route exact path='/products/:id' element={<Product onAdd={onAdd} />} />
        <Route exact path='/cart' element={<Basket  cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
