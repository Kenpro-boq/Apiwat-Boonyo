import React from 'react';
import { Product } from '../types';

type ProductDetailPageProps = {
    product: Product;
    onAddToCart: (product: Product) => void;
    setActivePage: (page: string) => void;
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onAddToCart, setActivePage }) => {
    if (!product) {
        return (
            <div className="text-center p-8 animate-fade-in">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <button 
                    onClick={() => setActivePage('store')} 
                    className="mt-4 px-6 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition"
                >
                    Back to Store
                </button>
            </div>
        );
    }
    return (
        <div className="animate-fade-in max-w-6xl mx-auto">
            <div className="mb-8">
                <button 
                    onClick={() => setActivePage('store')}
                    className="flex items-center text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Collection
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="rounded-lg overflow-hidden shadow-lg border border-slate-200 bg-white">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex flex-col justify-center py-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-sky-800 tracking-tight">{product.name}</h1>
                    <span className="block mt-4 text-4xl font-bold text-slate-800">${product.price.toFixed(2)}</span>
                    
                    <div className="mt-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                           <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                           In Stock
                        </span>
                    </div>

                    <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                        {product.detailedDescription}
                    </p>

                    <div className="mt-8">
                        <button 
                            onClick={() => onAddToCart(product)}
                            className="w-full md:w-auto inline-block px-12 py-4 bg-sky-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-sky-700 transition-transform transform hover:scale-105"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
