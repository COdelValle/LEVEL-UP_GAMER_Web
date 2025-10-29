// /src/components/admin/__tests__/BasicAdminPage.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import BasicAdminPage from "../BasicAdminPage.jsx";

describe("Testing BasicAdminPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("TEST_BASICADMINPAGE_1: Renderiza título y descripción", () => {
    render(<BasicAdminPage title="Mi Título" description="Mi descripción" />);

    expect(screen.getByRole("heading", { level: 1 }).textContent).to.equal("Mi Título");
    expect(screen.getByText("Mi descripción")).to.exist;
  });

  it("TEST_BASICADMINPAGE_2: Muestra el mensaje de advertencia fijo", () => {
    render(<BasicAdminPage title="Test" description="Desc" />);

    expect(
      screen.getByText(/Esta sección está en desarrollo/i)
    ).to.exist;
  });

  it("TEST_BASICADMINPAGE_3: Botón 'Volver al Dashboard' llama a navigate('/admin')", () => {
    render(<BasicAdminPage title="Test" description="Desc" />);

    const btnDashboard = screen.getByRole("button", { name: /Volver al Dashboard/i });
    fireEvent.click(btnDashboard);

    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });

  it("TEST_BASICADMINPAGE_4: Botón 'Actualizar' llama a window.location.reload()", () => {
    const originalLocation = window.location;

    // Sobrescribimos window.location con un mock
    delete window.location;
    window.location = { ...originalLocation, reload: vi.fn() };

    render(<BasicAdminPage title="Test" description="Desc" />);

    const btnReload = screen.getByRole("button", { name: /Actualizar/i });
    fireEvent.click(btnReload);

    expect(window.location.reload).toHaveBeenCalled();

    // Restauramos el objeto original
    window.location = originalLocation;
  });
});