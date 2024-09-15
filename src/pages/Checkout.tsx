import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCheckout, selectCheckoutProducts } from "@/redux/features/checkout/checkoutSlice";
import { useNewCheckoutMutation } from '@/redux/features/checkout/checkoutApi';
import RHFormProvider from "@/components/form/RHFormProvider";
import RHInput from "@/components/form/RHInput";
import RHTextArea from '@/components/form/RHTextArea';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type CheckoutInfo = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  cartProducts: Array<{
    product: string;
    cartId: string;
    productName: string;
    productImage: string;
    productPrice: number;
    quantity: number;
  }>;
}

type CheckoutData = {
  userId: string;
  cartProducts: CheckoutInfo['cartProducts'];
  total: number;
}

const Checkout = () => {
  const checkoutData = useAppSelector(selectCheckoutProducts) as CheckoutData;
  const [newCheckout] = useNewCheckoutMutation();
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setCheckoutLoading(true)
    const checkoutInfo: CheckoutInfo = {
      userId: checkoutData?.userId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      deliveryAddress: data.deliveryAddress,
      cartProducts: checkoutData?.cartProducts,
    };

    try {
      const result = await newCheckout(checkoutInfo).unwrap();
      if (result?.success) {
        dispatch(clearCheckout());
        setCheckoutLoading(false)
        navigate("/success-page")
      } else {
        toast.error(result?.message || 'Checkout failed', { duration: 2000 })
      }
    } catch (error) {
      setCheckoutLoading(false)
      toast.error('An error occurred during checkout', { duration: 2000 });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="font-primary text-2xl sm:text-3xl font-medium text-primary">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6 sm:mt-8">
        <div className="w-full lg:w-2/3">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Your Information</h2>
          <RHFormProvider onSubmit={onSubmit}>
            <div className="space-y-4">
              <RHInput
                type='text'
                name="name"
                label="Full Name"
                placeholder="John Doe"
                className="w-full"
              />
              <RHInput
                name="email"
                label="Email Address"
                placeholder="john@example.com"
                type='text'
                className="w-full"
              />
              <RHInput
                name="phone"
                label="Phone Number"
                placeholder="(123) 456-7890"
                type='text'
                className="w-full"
              />
              <RHTextArea
                name="deliveryAddress"
                label="Delivery Address"
                placeholder="123 Main St, City, Country"
                className="w-full"
              />
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-2">Payment Method</h3>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Cash on Delivery"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio"
                  />
                  <span className="text-sm sm:text-base">Cash on Delivery</span>
                </label>
              </div>
              <Button
                type="submit"
                className='w-full text-sm sm:text-base'
                disabled={paymentMethod !== 'Cash on Delivery' || checkoutLoading}
              >
                {checkoutLoading ? "Placing your order" : "Place Order"}
              </Button>
            </div>
          </RHFormProvider>
        </div>
        <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-customGray p-4 rounded shadow-sm">
            {checkoutData?.cartProducts?.map((item) => (
              <div key={item.cartId} className="flex items-center mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mr-3 sm:mr-4 relative flex-shrink-0">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="rounded object-cover w-full h-full"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xs sm:text-sm font-medium">{item.productName}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-semibold">${(item.productPrice * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-gray-300 mt-4 pt-4">
              <div className="flex justify-between items-center font-bold text-base sm:text-lg">
                <span>Total</span>
                <span>${checkoutData?.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;