// /src/components/common/__tests__/StatsCard.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatsCard from "../StatsCard.jsx";

describe("Testing StatsCard", () => {
  it("TEST_STATSCARD_1: Renderiza el label en un h3", () => {
    render(<StatsCard label="Usuarios registrados" value={128} />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading.textContent).to.equal("Usuarios registrados");
  });

  it("TEST_STATSCARD_2: Renderiza el value en un párrafo", () => {
    render(<StatsCard label="Productos activos" value={42} />);
    const valueElement = screen.getByText("42");
    expect(valueElement.tagName).to.equal("P");
  });

  it("TEST_STATSCARD_3: Aplica las clases de estilo al contenedor", () => {
    const { container } = render(<StatsCard label="Test" value={1} />);
    const wrapper = container.firstChild;
    expect(wrapper.className).to.include("bg-negro");
    expect(wrapper.className).to.include("border-azul-claro");
    expect(wrapper.className).to.include("text-center");
  });
});