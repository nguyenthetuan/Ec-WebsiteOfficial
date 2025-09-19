// ICONS
import { Plus, Minus, Trash2 } from "lucide-react";

import React, { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/redux/features/cart-slice";

import Image from "next/image";

const SingleItem = ({ item, onRequestRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const dispatch = useDispatch<AppDispatch>();

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(updateCartItemQuantity({ id: item.id, quantity: quantity + 1 }));
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(updateCartItemQuantity({ id: item.id, quantity: quantity - 1 }));
    } else {
      return;
    }
  };

  return (
    <div className="flex border-t border-gray-3 py-5 px-7.5 gap-x-5">
      <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[120px] min-h-[120px] w-full h-17.5">
        <Image
          width={200}
          height={200}
          src={item.imgs?.thumbnails[0]}
          alt="product"
        />
      </div>

      <div className="flex flex-col  w-full gap-y-2">
        <div className="flex justify-between">
          <h3 className="text-dark text-[14px] ease-out duration-200 hover:text-blue">
            <a href="#">{item.title}</a>
          </h3>
          <button
            onClick={onRequestRemove}
            aria-label="button for remove product from cart"
            className="flex items-center justify-center rounded-lg ease-out duration-200 text-dark hover:text-red"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="min-w-[200px] flex justify-between">
          <p className="text-dark text-lg font-semibold">
            <span className="text-sm">$</span>
            <span>{item.price}</span>
          </p>
          <div className="flex items-center max-w-[100px] rounded-full border border-gray-400 overflow-hidden text-sm">
            <button
              onClick={() => handleDecreaseQuantity()}
              aria-label="Decrease quantity"
              className="flex items-center justify-center px-2 py-1 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
              disabled={quantity === 1}
            >
              <Minus className="w-3 h-3" />
            </button>

            <span className="flex-1 text-center w-[50px] font-bold">
              {quantity}
            </span>

            <button
              onClick={() => handleIncreaseQuantity()}
              aria-label="Increase quantity"
              className="flex items-center justify-center px-2 py-1 text-gray-700 hover:bg-gray-200"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-5">Shipping fee: $5.99</p>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
