import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, decreaseQuantity } from "../redux/slice/cartSlice";

function CartDrawer({ isOpen, onClose, onGoToCheckout }) {
    const { items, totalPrice, totalQuantity } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleGoToCheckout = () => {
        if (items.length === 0) {
            alert("Sepetiniz boş! Önce ürün ekleyin.");
            return;
        }

        onClose(); // Drawer'ı kapat
        onGoToCheckout(); // Checkout sayfasına git
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                    <div>
                        <h2 className="text-xl font-bold">Sepetim</h2>
                        <p className="text-sm text-gray-500">{totalQuantity} ürün</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-600 text-2xl transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* İçerik */}
                <div className="flex flex-col h-full">
                    {/* Ürün Listesi */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {items.length === 0 ? (
                            <div className="text-center mt-20">
                                <div className="text-gray-300 text-6xl mb-4">🛒</div>
                                <p className="text-gray-500">Sepetiniz boş</p>
                                <p className="text-sm text-gray-400 mt-2">Alışverişe başlamak için ürün ekleyin</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center p-3 border rounded-lg bg-gray-50">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-contain rounded border"
                                        />
                                        <div className="flex-1 px-3">
                                            <h4 className="font-medium text-sm text-gray-800 mb-1">
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                {item.quantity} x ${item.price}
                                            </p>
                                            <p className="font-semibold text-green-600 text-sm">
                                                ${(item.quantity * item.price).toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            <button
                                                onClick={() => dispatch(decreaseQuantity(item.id))}
                                                className="px-2 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                −
                                            </button>
                                            <button
                                                onClick={() => dispatch(removeFromCart(item.id))}
                                                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer - Toplam ve Butonlar */}
                    <div className="border-t bg-white p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-700">Toplam:</span>
                            <span className="text-2xl font-bold text-green-600">
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>

                        <div className="space-y-2">
                            {/* Sepete Git Butonu */}
                            <button
                                onClick={handleGoToCheckout}
                                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${items.length === 0
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:scale-105"
                                    }`}
                                disabled={items.length === 0}
                            >
                                🛒 Sepete Git ({totalQuantity})
                            </button>

                            {/* Alışverişe Devam Et */}
                            <button
                                onClick={onClose}
                                className="w-full py-2 px-4 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Alışverişe Devam Et
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartDrawer;