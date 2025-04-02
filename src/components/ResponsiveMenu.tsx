import clsx from "clsx";
import { Link, useResolvedPath } from "react-router-dom";

const menuItems = [
  {
    name: "Tempo",
    route: "/tempo",
    image: "/menuimages/tempo.png",
    fallback: "/menuimages/tempo.webp",
    alt: "Fast like the wind",
  },
  {
    name: "Delta",
    route: "/delta",
    image: "/menuimages/delta.png",
    fallback: "/menuimages/delta.webp",
    alt: "A red square",
  },
  {
    name: "Føniks",
    route: "/foniks",
    image: "menuimages/foniks.png",
    fallback: "menuimages/foniks.webp",
    alt: "A phoenix",
  },
  {
    name: "Boble",
    route: "/boble",
    image: "/menuimages/boble.png",
    fallback: "/menuimages/boble.webp",
    alt: "Champagne bottle",
  },
];

const ResponsiveMenu = () => {
  //const selected = window.location.pathname.split("/")[1];
  const selected = useResolvedPath(window.location.pathname).pathname;
  const isSelected = (item: string) =>
    selected.toLowerCase() === item.toLowerCase();

  //const selectedItem = menuItems.find((item) => item.route === `/${selected}`);

  return (
    <nav className="bg-wow-dark p-4 w-full">
      <ul className="flex items-center justify-center flex-wrap gap-2">
        {menuItems.map((item) => {
          console.log("SELECTED", isSelected(item.route), selected, item.route);
          return (
            <li
              key={item.name}
              className={clsx("m-2", isSelected(item.route) && "bg-gray-700")}
            >
              <Link
                to={item.route}
                className="flex flex-row items-center space-x-2 border border-gray-700 rounded p-2 hover:bg-wow-dark hover:text-wow-gold"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-8 h-8 object-contain"
                  loading="lazy"
                />
                <span className="text-sm md:text-base font-medium">
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ResponsiveMenu;
