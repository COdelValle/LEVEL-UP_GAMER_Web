import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "../Footer";

describe("Testing Footer", () => {
  it("TEST_Foot_1: Renderiza el contenedor principal", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).to.exist;
  });

  it("TEST_Foot_2: Muestra el nombre de la tienda y el ícono", () => {
    render(<Footer />);
    expect(screen.getByText("Level-Up Gamer")).to.exist;
    expect(screen.getByText("🎮")).to.exist;
  });

  it("TEST_Foot_3: Contiene la sección Tienda con sus enlaces", () => {
    render(<Footer />);
    expect(screen.getByText("Tienda")).to.exist;
    expect(screen.getByRole("link", { name: "Productos" }).getAttribute("href"))
      .to.equal("/productos");
    expect(screen.getByRole("link", { name: "Ofertas" })).to.exist;
    expect(screen.getByRole("link", { name: "Nuevos" })).to.exist;
  });

  it("TEST_Foot_4: Contiene la sección Comunidad con sus enlaces", () => {
    render(<Footer />);
    expect(screen.getByText("Comunidad")).to.exist;
    expect(screen.getByRole("link", { name: "Blog" }).getAttribute("href"))
      .to.equal("/blogs");
    expect(screen.getByRole("link", { name: "Eventos" })).to.exist;
    expect(screen.getByRole("link", { name: "Discord" })).to.exist;
  });

  it("TEST_Foot_5: Contiene la sección Soporte con sus enlaces", () => {
    render(<Footer />);
    expect(screen.getByText("Soporte")).to.exist;
    expect(screen.getByRole("link", { name: "Contacto" })).to.exist;
    expect(screen.getByRole("link", { name: "FAQ" })).to.exist;
    expect(screen.getByRole("link", { name: "Envíos" })).to.exist;
  });

  it("TEST_Foot_6: Muestra el texto de copyright", () => {
    render(<Footer />);
    expect(
      screen.getByText(/© 2024 Level-Up Gamer. Todos los derechos reservados./i)
    ).to.exist;
  });
});