import {
  selectTotalDiscount,
  selectTotalPrice,
  selectTotalPriceBeforeDiscounted,
} from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const totalPriceBeforeDiscounted = useSelector(
    selectTotalPriceBeforeDiscounted
  );
  const totalDiscount = useSelector(selectTotalDiscount);

  return (
    <div className="lg:max-w-[455px] w-full">
      {/* <!-- order list box --> */}
      <div className="bg-white shadow-1 rounded-[10px] sticky top-[1rem]">
        <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-dark">Order Summary</h3>
        </div>

        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          {/* <!-- product item --> */}

          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-dark">Items total:</p>
            </div>
            <div>
              <p className="text-dark text-right">
                <span className="text-xs">$</span>
                {totalPriceBeforeDiscounted}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-dark">Items discount:</p>
            </div>
            <div>
              <p className="text-dark text-right">
                <span className="text-xs">$</span>
                {totalDiscount}
              </p>
            </div>
          </div>

          {/* <!-- total --> */}
          <div className="flex items-center justify-between pt-5">
            <div>
              <p className="font-medium text-lg text-dark">Total</p>
            </div>
            <div>
              <p className="font-medium text-lg text-dark text-right">
                <span className="text-xs">$</span>
                <span>{totalPrice}</span>
              </p>
            </div>
          </div>

          {/* <!-- checkout button --> */}
          <button
            type="submit"
            className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
          >
            Process to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
