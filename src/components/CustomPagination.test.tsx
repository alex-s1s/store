import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSearchParams } from "next/navigation";
import { CustomPagination } from "./CustomPagination";
const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/products"),
  useSearchParams: jest.fn(() => new URLSearchParams("page=1")),
  useRouter: jest.fn(() => ({
    push: pushMock,
  })),
}));

describe("CustomPagination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default current page and totalPages=3", () => {
    render(<CustomPagination totalPages={3} />);

    expect(screen.getByRole("navigation", { name: /pagination/i })).toBeInTheDocument();

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    const previousButton = screen.getByLabelText("Go to previous page");
    expect(previousButton).toHaveAttribute("aria-disabled", "true");

    const nextButton = screen.getByLabelText("Go to next page");
    expect(nextButton).toHaveAttribute("aria-disabled", "false");
  });

  it("disables the next button when on the last page", () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams("page=3"));
    render(<CustomPagination totalPages={3} />);

    const nextButton = screen.getByLabelText("Go to next page");
    expect(nextButton).toHaveAttribute("aria-disabled", "true");

    const previousButton = screen.getByLabelText("Go to previous page");
    expect(previousButton).toHaveAttribute("aria-disabled", "false");
  });

  it("calls router.push with correct query when a page number is clicked", async () => {
    render(<CustomPagination totalPages={5} />);

    const pageButton = screen.getByText("3");
    await userEvent.click(pageButton);

    expect(pushMock).toHaveBeenCalledWith("/products?page=3");
  });

  it("renders ellipsis when totalPages > 5 and currentPage is not near the end", () => {
    render(<CustomPagination totalPages={10} />);

    expect(screen.getByText("More pages")).toBeInTheDocument();
  });
});
