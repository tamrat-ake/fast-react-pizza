// import { useState } from "react";

import { Form, useActionData, useNavigation } from 'react-router-dom';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';
// https://uibakery.io/regex-library/phone-number

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user);
  const isLoadingAddress = addressStatus === 'loading';

  const [withPriority, setWithPriority] = useState(false);

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold ">Ready to order? Lets go!</h2>

      <Form method="POST" action="">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-400 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Address</label>

          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              required
              defaultValue={address}
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-400 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          {!position?.latitude && !position?.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAddress || isSubmitting}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                getPosition
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="focus:ring-yell0w-400 h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-offset-1"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />

          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude
                ? `${position.latitude}, ${position.longitude} `
                : ''
            }
          />
          <Button
            // disabled={true}
            type="primary"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Placing order....'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
