import { saveProduct } from "@/app/actions/createProduct";
import { putProduct } from "@/app/actions/updateProduct";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import ProductForm from "./ProductForm";

jest.mock("@/app/actions/createProduct", () => ({
  saveProduct: jest.fn(),
}));
jest.mock("@/app/actions/updateProduct", () => ({
  putProduct: jest.fn(),
}));
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

const originalConsoleError = console.error;
console.error = jest.fn();


describe("ProductForm", () => {
  const mockCategories = ["electronics", "clothing"];
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /** Test 1: Rendering with initial values */
  test("renders form with initial values when editing", () => {
    const initialData = {
      title: "Test Product",
      price: 99.99,
      category: "electronics",
      description: "Test Description",
      image: "https://example.com/image.jpg",
    };

    render(
      <ProductForm
        categories={mockCategories}
        initialData={initialData}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByLabelText("Título")).toHaveValue("Test Product");
    expect(screen.getByLabelText("Descrição")).toHaveValue("Test Description");
    expect(screen.getByLabelText("Preço")).toHaveValue(99.99);
    expect(screen.getByRole("combobox")).toHaveTextContent("Eletrônicos");
    expect(screen.getByLabelText("URL da Imagem")).toHaveValue(
      "https://example.com/image.jpg"
    );
  });

  /** Test 2: Validation errors on empty submission */
  test("shows validation errors when submitting an empty form", async () => {
    render(<ProductForm categories={mockCategories} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: /salvar/i }));

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts).toHaveLength(5);
      expect(alerts[0]).toHaveTextContent("O título é obrigatário");
      expect(alerts[1]).toHaveTextContent("A descrição é obrigatória");
      expect(alerts[2]).toHaveTextContent("O preço deve ser positivo");
      expect(alerts[3]).toHaveTextContent("A categoria é obrigatória");
      expect(alerts[4]).toHaveTextContent("A imagem deve ser uma URL válida");
    });
  });

  /** Test 3: Successful submission for new product */
  test("submits form successfully when creating a new product", async () => {
    // Mock scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    // Mock the saveProduct function
    (saveProduct as jest.Mock).mockResolvedValue({ success: true });

    render(<ProductForm categories={mockCategories} onClose={mockOnClose} />);

    // Fill the form
    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "New Product" },
    });
    fireEvent.change(screen.getByLabelText("Descrição"), {
      target: { value: "New Description" },
    });
    fireEvent.change(screen.getByLabelText("Preço"), {
      target: { value: "50" },
    });

    // Select category using the right approach for Radix UI Select
    const selectTrigger = screen.getByRole("combobox");
    fireEvent.click(selectTrigger);

    // Wait for the select content to be visible
    await waitFor(() => {
      const selectItems = screen.getAllByRole("option");
      expect(selectItems.length).toBeGreaterThan(0);
    });

    // Use a more specific selector - find the SelectItem with role="option" that contains the text
    const option = screen.getAllByRole("option").find(
      item => item.textContent === "Eletrônicos"
    );
    expect(option).toBeTruthy();
    fireEvent.click(option!);

    // Set image URL
    fireEvent.change(screen.getByLabelText("URL da Imagem"), {
      target: { value: "https://example.com/new.jpg" },
    });

    // Submit the form
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    // Assert that saveProduct was called with the right data
    await waitFor(() => {
      expect(saveProduct).toHaveBeenCalledWith(
        {
          title: "New Product",
          description: "New Description",
          price: 50,
          category: "electronics",
          image: "https://example.com/new.jpg",
        },
        undefined
      );
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  /** Test 4: Successful submission for updating a product */
  test("submits form successfully when updating an existing product", async () => {
    const initialData = {
      title: "Old Product",
      price: 100,
      category: "clothing",
      description: "Old Description",
      image: "https://example.com/old.jpg",
    };
    (putProduct as jest.Mock).mockResolvedValue({ success: true });

    render(
      <ProductForm
        categories={mockCategories}
        initialData={initialData}
        onClose={mockOnClose}
        id={1}
      />
    );

    // Update some fields
    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "Updated Product" },
    });
    fireEvent.change(screen.getByLabelText("Preço"), {
      target: { value: "150" },
    });

    // Submit
    fireEvent.click(screen.getByRole("button", { name: /salvar/i }));

    await waitFor(() => {
      expect(putProduct).toHaveBeenCalledWith(
        {
          title: "Updated Product",
          description: "Old Description",
          price: 150,
          category: "clothing",
          image: "https://example.com/old.jpg",
        },
        1
      );
      expect(toast.success).toHaveBeenCalledWith(
        "Produto atualizado com sucesso! ✅",
        expect.any(Object)
      );
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  /** Test 5: Error handling on submission failure */
  test("displays error toast when submission fails", async () => {
    // Mock scrollIntoView which is not implemented in JSDOM
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    (saveProduct as jest.Mock).mockRejectedValue(
      new Error("Failed to create product")
    );

    render(<ProductForm categories={mockCategories} onClose={mockOnClose} />);

    // Fill the form
    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "New Product" },
    });
    fireEvent.change(screen.getByLabelText("Descrição"), {
      target: { value: "New Description" },
    });
    fireEvent.change(screen.getByLabelText("Preço"), {
      target: { value: "50" },
    });

    // Select category using the right approach for Radix UI Select
    const selectTrigger = screen.getByRole("combobox");
    fireEvent.click(selectTrigger);

    // Wait for the select content to be visible
    await waitFor(() => {
      const selectItems = screen.getAllByRole("option");
      expect(selectItems.length).toBeGreaterThan(0);
    });

    // Use a more specific selector - find the SelectItem with role="option" that contains the text
    const option = screen.getAllByRole("option").find(
      item => item.textContent === "Eletrônicos"
    );
    expect(option).toBeTruthy();
    fireEvent.click(option!);

    // Set image URL
    fireEvent.change(screen.getByLabelText("URL da Imagem"), {
      target: { value: "https://example.com/new.jpg" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /salvar/i }));

    // Check error toast
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Falha ao criar o produto ❌",
        expect.objectContaining({
          description: "Failed to create product",
        })
      );
    });
  });

  /** Test 6: Cancel button triggers onClose */
  test("calls onClose when cancel button is clicked", () => {
    render(<ProductForm categories={mockCategories} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });
});