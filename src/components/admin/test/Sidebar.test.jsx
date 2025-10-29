// /src/components/common/__tests__/Sidebar.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock de useAuth
const mockLogout = vi.fn();
vi.mock("../../../context/AuthContext", () => ({
  useAuth: () => ({
    user: { username: "Catalina" },
    logout: mockLogout,
  }),
}));

// Mock de useLocation
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: () => ({ pathname: "/admin" }), // ruta activa
  };
});

import Sidebar from "../Sidebar.jsx";

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("TEST_SIDEBAR_1: Renderiza el header con saludo al usuario", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText("Level-Up Admin")).to.exist;
    expect(screen.getByText("Panel de Control")).to.exist;
    expect(screen.getByText(/Hola/)).to.exist;
    expect(screen.getByText("Catalina")).to.exist;
  });

  it("TEST_SIDEBAR_2: Renderiza todos los items del menú", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard")).to.exist;
    expect(screen.getByText("Nuevo Producto")).to.exist;
    expect(screen.getByText("Reportes")).to.exist;
    expect(screen.getByText("Reportes Productos")).to.exist;
    expect(screen.getByText("Usuarios")).to.exist;
    expect(screen.getByText("Productos Críticos")).to.exist;
    expect(screen.getByText("Boletas")).to.exist;
  });

  it("TEST_SIDEBAR_3: Marca activo el item correspondiente a la ruta actual", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const activeLink = screen.getByRole("link", { name: /Dashboard/ });
    expect(activeLink.className).to.include("bg-azul-electrico");
  });

  it("TEST_SIDEBAR_4: Renderiza sección Vista Rápida", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText("Vista Rápida")).to.exist;
    expect(screen.getByText("Online")).to.exist;
    expect(screen.getByText("● Activo")).to.exist;
    expect(screen.getByText("Sesión")).to.exist;
    expect(screen.getByText("Admin")).to.exist;
  });

  it("TEST_SIDEBAR_5: Renderiza footer con link y botón de logout", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /Volver a Tienda/ })).to.exist;
    expect(screen.getByRole("button", { name: /Cerrar Sesión/ })).to.exist;
  });

  it("TEST_SIDEBAR_6: Ejecuta logout al hacer click en Cerrar Sesión", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Cerrar Sesión/ }));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("TEST_SIDEBAR_7: Muestra la versión en el footer", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(
      screen.getByText("v1.0.0 • Level-Up Gamer")
    ).to.exist;
  });
});