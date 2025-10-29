// CartIcon.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Creamos un mock explícito
const mockUseCart = vi.fn();

vi.mock("../../context/CartContext", () => ({
  useCart: mockUseCart,
}));

import CartIcon from "../CartIcon";

describe("Testing CartIcon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Muestra solo el ícono cuando no hay items", () => {
    mockUseCart.mockReturnValue({ getTotalItems: () => 0 });

    render(
      <MemoryRouter>
        <CartIcon />
      </MemoryRouter>
    );

    expect(screen.getByText("🛒")).toBeInTheDocument();
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("Muestra el badge con el número de items", () => {
    mockUseCart.mockReturnValue({ getTotalItems: () => 3 });

    render(
      <MemoryRouter>
        <CartIcon />
      </MemoryRouter>
    );

    expect(screen.getByText("🛒")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("El Link apunta a /carrito", () => {
    mockUseCart.mockReturnValue({ getTotalItems: () => 2 });

    render(
      <MemoryRouter>
        <CartIcon />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/carrito");
  });
});