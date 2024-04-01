import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';
import PropTypes from 'prop-types';

Deleteitem.propTypes = {
  pizzaId: PropTypes.number,
};

function Deleteitem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(deleteItem(pizzaId))} type="small">
      Delete
    </Button>
  );
}

export default Deleteitem;
