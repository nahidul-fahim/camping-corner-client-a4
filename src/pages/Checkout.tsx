import { selectCheckoutProducts } from "@/redux/features/checkout/checkoutSlice";
import { useAppSelector } from "@/redux/hooks";


const Checkout = () => {

  // checkout products from redux
  const checkoutData = useAppSelector(selectCheckoutProducts);

  console.log("From checkout page =>", checkoutData)


  return (
    <div className="p-10 container mx-auto flex flex-col justify-start items-start gap-5">
      <h3 className="font-primary text-3xl font-medium text-primary">Checkout</h3>
    </div>
  );
};

export default Checkout;
