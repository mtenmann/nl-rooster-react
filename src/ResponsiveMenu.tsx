import React from 'react';
import { Link } from 'react-router-dom';

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
  {
    name: "Panser",
    route: "/panser",
    image: "/menuimages/panser.png",
    fallback: "/menuimages/panser.webp",
    alt: "Tank or armored car",
  },
];

const ResponsiveMenu = () => {
  return (
    <nav className="bg-wow-dark p-4">
      <ul className="flex justify-around items-center flex-wrap">
        {menuItems.map((item) => (
          <li key={item.name} className="m-2">
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
              <span className="text-sm md:text-base font-medium">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ResponsiveMenu;
