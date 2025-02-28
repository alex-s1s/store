import { Product } from "@/types/product";
import { Star } from "lucide-react";
import Link from "next/link";

const ProductCard = ({ title, description, price, image, id, rating }: Product) => {
  const isHighRated = rating?.rate > 4.5;
  const truncatedTitle = title.length > 30 ? `${title.slice(0, 30)}...` : title;

  return (
    <li
      className={`bg-white dark:bg-gray-800 border ${isHighRated ? "border-yellow-400" : "border-gray-300 dark:border-gray-700"
        } rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full`}
    >
      <div className="p-4">
        <img src={image} alt={title} className="w-full h-48 object-contain" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex flex-col flex-grow">
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 flex items-center">
              {[...Array(Math.round(rating?.rate || 0))].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" className="mr-1" />
              ))}
            </span>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {rating?.rate.toFixed(1)} ({rating?.count} avaliações)
            </span>
          </div>

          <Link href={`/products/${id}`}>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
              {truncatedTitle}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{description}</p>
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
