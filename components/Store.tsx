import React from 'react';
import { Product } from '../types';

const products: Product[] = [
  {
    id: 1,
    name: 'The Transformer Table',
    description: 'A coffee table that elegantly rises and transforms into a full-sized dining or work table at the touch of a button.',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1593697821252-8c78577033a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'The Ascend Desk',
    description: 'A sleek, minimalist standing desk with programmable height presets and whisper-quiet dual motors for a seamless transition.',
    price: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1558959846-6d38a3791523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'The Hideaway Bed',
    description: 'Maximize your space with our smart bed frame featuring automated under-bed storage accessible via remote control.',
    price: 1899.99,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce0687954?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'The Organizer Shelf',
    description: 'Motorized, adjustable shelving that can be reconfigured on the fly to fit your storage needs. Perfect for any room.',
    price: 750.00,
    imageUrl: 'https://images.unsplash.com/photo-1616486793233-96b42b6d3711?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'The Guardian Cabinet',
    description: 'A stylish security cabinet with smart lock technology, perfect for keeping valuables safe. Controllable from your smartphone.',
    price: 1150.00,
    imageUrl: 'https://images.unsplash.com/photo-1598300188929-84b5242d547b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'The Lumina Side Table',
    description: 'A bedside table with integrated, app-controlled ambient lighting and wireless charging for all your devices.',
    price: 499.50,
    imageUrl: 'https://images.unsplash.com/photo-1618220252344-88b9a186494d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
];

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative overflow-hidden">
            <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-xl font-bold text-sky-800">{product.name}</h3>
            <p className="mt-2 text-slate-600 flex-grow">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-2xl font-extrabold text-slate-800 tracking-tight">${product.price.toFixed(2)}</span>
                <button 
                    onClick={() => onAddToCart(product)}
                    className="px-5 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 transition-transform transform active:scale-95"
                    aria-label={`Add ${product.name} to cart`}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
);


type StorePageProps = {
    onAddToCart: (product: Product) => void;
}

const StorePage: React.FC<StorePageProps> = ({ onAddToCart }) => (
    <div className="animate-fade-in">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-sky-700 tracking-tight">Our Collection</h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
                Discover furniture that thinks, adapts, and transforms with your lifestyle.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    </div>
);

export default StorePage;
