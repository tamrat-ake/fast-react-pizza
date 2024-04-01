import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
import Deleteitem from '../cart/Deleteitem';

MenuItem.propTypes = {
  pizza: PropTypes.object,
};

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  // console.log(currentQuantity);
  const isInCart = currentQuantity > 0;
  const newItem = {
    pizzaId: id,
    name,
    quantity: 1,
    unitPrice,
    totalPrice: unitPrice * 1,
  };
  function handleAddToCart() {
    dispatch(addItem(newItem));
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''} `}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between ">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                currentQuantity={currentQuantity}
                pizzaId={id}
              />
              <Deleteitem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type="small">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
