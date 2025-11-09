import React, { useMemo } from 'react';
import { CartItem } from '../types';

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
};

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" aria-modal="true" role="dialog" onClick={onClose}>
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'transform-none' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-2xl font-bold text-sky-800">Your Cart</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100" aria-label="Close cart">
            <svg className="w-6 h-6 text-slate-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
             <svg className="w-24 h-24 text-slate-300 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.823-6.874a.5.5 0 00-.478-.636H5.214M6 18a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM15.75 18a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-slate-700">Your cart is empty</h3>
            <p className="text-slate-500 mt-2">Find something special to add!</p>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-start gap-4">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md border" />
                  <div className="flex-grow">
                    <h4 className="font-semibold text-slate-800">{item.name}</h4>
                    <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded-md">-</button>
                      <span className="px-3">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded-md">+</button>
                    </div>
                  </div>
                  <button onClick={() => onRemoveItem(item.id)} className="text-slate-400 hover:text-red-500" aria-label={`Remove ${item.name} from cart`}>
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.124-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.077-2.09.921-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 border-t space-y-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button className="w-full py-3 bg-sky-600 text-white font-bold rounded-md hover:bg-sky-700 transition">
                Proceed to Checkout
              </button>
              <button onClick={onClearCart} className="w-full text-center text-sm text-slate-500 hover:text-red-600">
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
