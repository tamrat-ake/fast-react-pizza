import { getOrder } from "./apiRestaurant";

export async function orderLoader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
