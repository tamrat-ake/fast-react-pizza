import { formatCurrency } from '../../utils/helpers';
import PropTypes from 'prop-types';
import Deleteitem from './Deleteitem';
import UpdateItemQuantity from './UpdateItemQuantity';
import { getCurrentQuantityById } from './cartSlice';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';

CartItem.propTypes = {
  item: PropTypes.object,
};
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  console.log(pizzaId);
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center  sm:justify-between ">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity
          currentQuantity={currentQuantity}
          pizzaId={pizzaId}
        />
        <Deleteitem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
