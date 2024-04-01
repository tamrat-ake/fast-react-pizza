import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  console.log(menu);
  return (
    <ul className="divide-y px-2  divide-stone-200">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Menu;
