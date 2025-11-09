import React from 'react';
import { Product } from '../types';

const products: Product[] = [
  {
    id: 1,
    name: 'The Transformer Table',
    description: 'A coffee table that elegantly rises and transforms into a full-sized dining or work table.',
    detailedDescription: 'Experience the pinnacle of versatility with The Transformer Table. Crafted from solid oak with a reinforced steel mechanism, this table smoothly transitions from a 18-inch high coffee table to a 30-inch high dining table, comfortably seating six. Its integrated smart controls allow for precise height adjustment, making it the perfect centerpiece for any modern living space.',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1593697821252-8c78577033a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'The Ascend Desk',
    description: 'A sleek, minimalist standing desk with programmable height presets and whisper-quiet dual motors.',
    detailedDescription: 'Elevate your workday with The Ascend Desk. Featuring a bamboo surface and a sturdy steel frame, it offers four programmable memory presets to save your favorite sitting and standing heights. The whisper-quiet dual motors ensure a smooth and silent transition, while the built-in cable management system keeps your workspace tidy and organized.',
    price: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1558959846-6d38a3791523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'The Hideaway Bed',
    description: 'Maximize your space with our smart bed frame featuring automated under-bed storage.',
    detailedDescription: 'Reclaim your bedroom with The Hideaway Bed. This innovative queen-sized bed frame features a silent, automated lift mechanism that reveals a spacious storage compartment underneath. Accessible via a sleek remote control, it’s the perfect solution for storing bedding, clothes, and more in small apartments or minimalist homes.',
    price: 1899.99,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce0687954?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'The Organizer Shelf',
    description: 'Motorized, adjustable shelving that can be reconfigured on the fly to fit your storage needs.',
    detailedDescription: 'Adapt your storage to your life with The Organizer Shelf. This modular shelving unit uses a motorized system to adjust the height and spacing of each shelf with a simple command from your smartphone. It’s perfect for growing book collections, displaying art, or creating dynamic storage in any room.',
    price: 750.00,
    imageUrl: 'https://images.unsplash.com/photo-1616486793233-96b42b6d3711?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'The Guardian Cabinet',
    description: 'A stylish security cabinet with smart lock technology, controllable from your smartphone.',
    detailedDescription: 'Protect your valuables in style with The Guardian Cabinet. Constructed from reinforced walnut and featuring a discreet smart lock, this cabinet offers top-tier security. Lock, unlock, and monitor access directly from our secure app, which sends real-time alerts to your smartphone for ultimate peace of mind.',
    price: 1150.00,
    imageUrl: 'https://images.unsplash.com/photo-1598300188929-84b5242d547b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'The Lumina Side Table',
    description: 'A bedside table with integrated, app-controlled ambient lighting and wireless charging.',
    detailedDescription: 'Meet The Lumina, the smartest side table you\'ll ever own. It features a built-in wireless charging pad for your devices and customizable ambient LED lighting controlled via an app. Set schedules, choose from millions of colors, and wake up gently with a simulated sunrise, all from one elegant piece of furniture.',
    price: 499.50,
    imageUrl: 'https://images.unsplash.com/photo-1618220252344-88b9a186494d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
];

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onSelectProduct }) => (
    <div 
        className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        onClick={() => onSelectProduct(product)}
    >
        <div className="relative overflow-hidden">
            <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-xl font-bold text-sky-800">{product.name}</h3>
            <p className="mt-2 text-slate-600 flex-grow">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-2xl font-extrabold text-slate-800 tracking-tight">${product.price.toFixed(2)}</span>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                    }}
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
    onSelectProduct: (product: Product) => void;
}

const StorePage: React.FC<StorePageProps> = ({ onAddToCart, onSelectProduct }) => (
    <div className="animate-fade-in">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-sky-700 tracking-tight">Our Collection</h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
                Discover furniture that thinks, adapts, and transforms with your lifestyle.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onSelectProduct={onSelectProduct} />
            ))}
        </div>
    </div>
);

export default StorePage;
