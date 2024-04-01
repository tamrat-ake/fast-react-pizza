import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Error from './ui/Error';
import Menu from './features/menu/Menu';
// don't forget
import { menuLoader } from './services/menuLoader';
import Cart from './features/cart/Cart';
import CreateOrder from './features/order/CreateOrder';
// dont
import { action as createOrderAction } from './services/CreateOrderActions';
import Order from './features/order/Order';
import { action as updaterorderAction } from './features/order/UpdateOrder';
// don't forget
import { orderLoader } from './services/orderLoader';
import AppLayout from './ui/AppLayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updaterorderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
