'use client'
import 'tailwindcss/tailwind.css'
import Appbar from '@/app/components/Appbar';
import Bottom from '@/app/components/Bottom';
import Drawer from '@/app/components/Drawer';
import React, {useContext, useEffect, useState} from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { fetchProducts } from '@/app/utils/api'
import { CartContext } from '@/app/contexts/CartContext';

const ProductsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();
  const {addToCart} = useContext(CartContext);

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { data: session } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
        const productsData = await fetchProducts();
        setProducts(productsData);
    }
    getProducts();
  }, []);

  
  return (
    <main className="min-h-screen">
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>

      <h1> Produtos da Loja Virtual </h1>
      <ul>
        {products.map((product) =>(
            <li key={product.id}>
                <img src={product.image} width={200}></img>
                <p>{product.title}</p>
                <p>{product.price}</p> 
                <p>{product.description}</p>
                <p>{product.category} </p>
                <button 
                  onClick={addToCart(product)}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                >
                  Add cart
                </button>
            </li>
        ))}
      </ul>
      <Bottom></Bottom>
    </main>
  );

}
export default ProductsPage;