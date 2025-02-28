import { Product } from "@/types/product";
import Link from "next/link";

const ProductCard = ({ title, description, price, image, id }: Product) => {
  return (
    <li className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      <div className="p-4">
        <img
          src={image}
          alt={title}

          className="w-full h-48 object-contain"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <Link href={`/products/${id}`}>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {description}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200 text-right">
            R${price.toFixed(2)}
          </p>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;