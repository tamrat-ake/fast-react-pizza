import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import PropTypes from 'prop-types';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

UpdateItemQuantity.propTypes = {
  pizzaId: PropTypes.node,
  currentQuantity: PropTypes.node,
};
function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className=" flex items-center gap-1 md:gap-3">
      <Button
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        type="round"
        pizzaId={pizzaId}
      >
        -
      </Button>
      <span>{currentQuantity}</span>
      <Button
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        type="round"
        pizzaId={pizzaId}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
