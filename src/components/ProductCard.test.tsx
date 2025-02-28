// ProductCard.test.tsx
import { Product } from "@/types/product";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('lucide-react', () => ({
  Star: () => <svg data-testid="star-icon"></svg>,
}));

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "This is a test product description",
  price: 123.45,
  image: "https://example.com/test-product.jpg",
  category: "Test Category",
  rating: { rate: 4.5, count: 10 },
};

describe("ProductCard", () => {
  const renderComponent = (props?: Partial<Product>) => {
    render(<ProductCard {...mockProduct} {...props} />);
  };

  it("renders as a list item", () => {
    renderComponent();
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("renders image with correct attributes", () => {
    renderComponent();
    const img = screen.getByRole('img', { name: mockProduct.title });
    expect(img).toHaveAttribute('src', mockProduct.image);
    expect(img).toHaveAttribute('alt', mockProduct.title);
  });

  it("renders product title with truncation", () => {
    const longTitle = 'Very long product title that exceeds thirty characters limit for truncation';
    renderComponent({ title: longTitle });
    const truncated = `${longTitle.slice(0, 30)}...`;
    expect(screen.getByRole('heading', { name: truncated })).toBeInTheDocument();
  });

  it("renders original title when under 30 characters", () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: mockProduct.title })).toBeInTheDocument();
  });

  it("renders formatted price correctly", () => {
    renderComponent();
    expect(screen.getByText(`R$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
  });

  it("links to product details page", () => {
    renderComponent();
    const link = screen.getByRole('link', { name: mockProduct.title });
    expect(link).toHaveAttribute('href', `/products/${mockProduct.id}`);
  });

  it("displays correct number of stars", () => {
    renderComponent();
    const stars = screen.getAllByTestId('star-icon');
    expect(stars.length).toBe(Math.round(mockProduct.rating.rate));
  });

  it("shows yellow border for high-rated products", () => {
    renderComponent({ rating: { rate: 4.6, count: 10 } });
    expect(screen.getByRole('listitem')).toHaveClass('border-yellow-400');
  });

  it("shows default border for ratings ≤4.5", () => {
    renderComponent();
    expect(screen.getByRole('listitem')).toHaveClass('border-gray-300');
  });

  it("displays rating count and score", () => {
    renderComponent();
    expect(screen.getByText(
      `${mockProduct.rating.rate.toFixed(1)} (${mockProduct.rating.count} avaliações)`
    )).toBeInTheDocument();
  });

  it("renders description correctly", () => {
    renderComponent();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });
});