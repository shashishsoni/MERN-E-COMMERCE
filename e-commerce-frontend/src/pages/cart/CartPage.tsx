import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import NavBar from "../../components/Navigation/NavBar";
import { T_Product } from "../../@types/Types";

function Cart() {
  const { Cart, setUserCart } = useAppContext();
  const [promoCode, setPromocode] = useState<string>("");

  const handleQuantityChange = (productId: string, quantityChange: number) => {
    setUserCart(
      Cart.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + quantityChange) } 
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setUserCart(Cart.filter((item) => item._id !== productId));
  };

  const handlePromoCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromocode(e.target.value);
  };

  const calculateSubtotal = () => {
    return Cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateGrandTotal = () => {
    const shippingCost = 60;
    return (parseFloat(calculateSubtotal()) + shippingCost).toFixed(2);
  };

  return (
    <>
      <NavBar />
      <h1 className="text-center font-protest mt-16 text-[60px]">CART</h1>
      <div className="container mx-auto p-5 shadow-2xl mt-[25px] border-[2px] border-white">
        <h1 className="text-2xl font-bold mb-5">Your Order</h1>
        <div className="grid grid-cols-1 gap-5">
          {Cart.map((item) => (
            <div key={item._id} className="border-b-2 pb-4 mb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    className="w-24 h-24 object-cover mr-5"
                  />
                  <div>
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <p>Description: {item.description}</p>
                    <div className="flex items-center mt-2">
                      <button
                        className="bg-gray-200 p-1 rounded-l"
                        onClick={() => handleQuantityChange(item._id, -1)}
                        disabled={item.quantity <= 1} // Disable when quantity is 1
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        className="bg-gray-200 p-1 rounded-r"
                        onClick={() => handleQuantityChange(item._id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    Rs {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 mt-2 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto pt-20 p-24 flex justify-between  shadow-2xl shadow-gray-50 mt-10 mb-12 border-[2px] border-white">
          <div className="w-1/2">
            <label className="block mb-2">Coupon Code:</label>
            <div className="flex">
              <input
                type="text"
                value={promoCode}
                onChange={handlePromoCode}
                className="border px-4 py-2 w-full rounded-l"
                placeholder="Apply Promo Code"
              />
              <button className="bg-black text-white px-4 py-2 rounded-r">
                Apply
              </button>
            </div>
          </div>

          <div className="text-right">
            <p>Subtotal: Rs {calculateSubtotal()}</p>
            <p>Shipping: Rs 60/-</p>
            <p className="font-bold">
              Grand Total: Rs {calculateGrandTotal()}
            </p>
            <button className="bg-black text-white w-full py-2 mt-5">
              Proceed to Checkout
            </button>
            <div className="flex justify-between mt-4">
              <button className="bg-yellow-500 text-black px-4 py-2">
                PayPal
              </button>
              <button className="bg-orange-500 text-black px-4 py-2">
                Amazon Pay
              </button>
            </div>
          </div>
        </div>
    </>
  );
}

export default Cart;
