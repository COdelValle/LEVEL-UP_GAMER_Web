// /src/components/common/__tests__/Hero.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Hero from "../Hero.jsx";

describe("Testing Hero", () => {
  it("TEST_HERO_1: Renderiza el título principal", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).to.equal("LEVEL-UP GAMER");
  });

  it("TEST_HERO_2: Muestra el párrafo con el texto destacado", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Descubre el siguiente nivel en gaming.", { exact: false })
    ).to.exist;

    expect(
      screen.getByText("Tecnología, rendimiento y estilo en un solo lugar.", { exact: false })
    ).to.exist;
  });

  it("TEST_HERO_3: Contiene el botón para explorar productos", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const linkProductos = screen.getByRole("link", { name: /explorar productos/i });
    expect(linkProductos).to.exist;
    expect(linkProductos.getAttribute("href")).to.equal("/productos");
  });

  it("TEST_HERO_4: Contiene el botón para ver el blog", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const linkBlog = screen.getByRole("link", { name: /ver blog/i });
    expect(linkBlog).to.exist;
    expect(linkBlog.getAttribute("href")).to.equal("/blogs");
  });
});