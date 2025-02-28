import { getFilteredProducts } from "@/app/actions/getFilteredProducts";
import { Product } from "@/types/product";
import '@testing-library/jest-dom';
import { render, screen, waitFor, within } from "@testing-library/react";
import ProductList from "./ProductList";

jest.mock("@/app/actions/getFilteredProducts", () => ({
  getFilteredProducts: jest.fn(),
}));

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
    category: "electronics",
    description: "Description 1",
    image: "https://example.com/image1.jpg",
    rating: {
      rate: 4.5,
      count: 10,
    },
  },
  {
    id: 2,
    title: "Product 2",
    price: 200,
    category: "clothing",
    description: "Description 2",
    image: "https://example.com/image2.jpg",
    rating: {
      rate: 4.5,
      count: 10,
    },
  },
];

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams("page=1"),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe("ProductList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", async () => {
    (getFilteredProducts as jest.Mock).mockResolvedValue({
      products: [],
      totalPages: 1,
    });

    render(await ProductList({ searchParams: Promise.resolve({}) }));
    await waitFor(() => {
      expect(screen.getByRole("list", { name: /product list/i })).toBeInTheDocument();
    });
  });

  it("renders products correctly", async () => {
    (getFilteredProducts as jest.Mock).mockResolvedValue({
      products: mockProducts,
      totalPages: 1,
    });

    render(await ProductList({ searchParams: Promise.resolve({}) }));
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  it("renders pagination correctly", async () => {
    (getFilteredProducts as jest.Mock).mockResolvedValue({
      products: mockProducts,
      totalPages: 3,
    });

    render(await ProductList({ searchParams: Promise.resolve({}) }));
    await waitFor(() => {
      const paginationNav = screen.getByRole("navigation", { name: /pagination/i });
      expect(within(paginationNav).getByText("3")).toBeInTheDocument();
    });
  });

  it("filters products by category", async () => {
    (getFilteredProducts as jest.Mock).mockResolvedValue({
      products: [mockProducts[0]],
      totalPages: 1,
    });

    render(await ProductList({ searchParams: Promise.resolve({ category: "electronics" }) }));
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    });
  });

  it("sorts products by price", async () => {
    (getFilteredProducts as jest.Mock).mockResolvedValue({
      products: [mockProducts[1], mockProducts[0]],
      totalPages: 1,
    });

    render(await ProductList({ searchParams: Promise.resolve({ sortOrder: "desc" }) }));
    await waitFor(() => {
      const productItems = screen.getAllByRole("listitem");
      expect(productItems[0]).toHaveTextContent("Product 2");
      expect(productItems[1]).toHaveTextContent("Product 1");
    });
  });
});
