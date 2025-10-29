// /src/components/common/__tests__/Dashboard.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Dashboard from "../Dashboard.jsx";

// 👇 Mockeamos StatsCard para aislar el test
vi.mock("../StatsCard.jsx", () => ({
  default: ({ label, value }) => (
    <div data-testid="stats-card">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  ),
}));

describe("Testing Dashboard", () => {
  it("TEST_DASHBOARD_1: Renderiza el contenedor principal con clase grid", () => {
    const { container } = render(<Dashboard />);
    expect(container.firstChild.className).to.include("grid");
  });

  it("TEST_DASHBOARD_2: Renderiza dos StatsCard", () => {
    render(<Dashboard />);
    const cards = screen.getAllByTestId("stats-card");
    expect(cards).to.have.length(2);
  });

  it("TEST_DASHBOARD_3: Muestra el label y value de 'Usuarios registrados'", () => {
    render(<Dashboard />);
    expect(screen.getByText("Usuarios registrados")).to.exist;
    expect(screen.getByText("128")).to.exist;
  });

  it("TEST_DASHBOARD_4: Muestra el label y value de 'Productos activos'", () => {
    render(<Dashboard />);
    expect(screen.getByText("Productos activos")).to.exist;
    expect(screen.getByText("42")).to.exist;
  });
});