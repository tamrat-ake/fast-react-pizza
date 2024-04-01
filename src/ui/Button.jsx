import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

function Button({ children, disabled, to, type, onClick }) {
  const base =
    'inline-block text-sm rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';
  const styles = {
    primary: base + 'px-4 py-3 md:px-6 md:py-4',
    small: base + 'px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + 'px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
    secondary:
      ' px-4 py-3 tx-sm md:px-6 md:py-4inline-block rounded-full   font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800  focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed',
  };
  console.log(styles[type]);
  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button onClick={onClick} className={styles[type]} disabled={disabled}>
        {children}
      </button>
    );
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
