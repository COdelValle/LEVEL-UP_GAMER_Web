import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "../BackButton";
import { describe, it, expect, vi } from "vitest";

// Mock de react-router-dom
const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));


describe("Testing BackButton", () => {
    it("TEST_BACK_1: Renderiza el texto correctamente", () => {
        render(<BackButton />);
        const button = screen.getByRole("button");
        expect(button.textContent).toBe("← Volver");
    });

    it("TEST_BACK_2: Aplica las clases de estilo", () => {
        render(<BackButton />);
        const button = screen.getByRole("button");
        expect(button.className).toContain("bg-gray-700");
        expect(button.className).toContain("hover:bg-gray-600");
        expect(button.className).toContain("rounded-lg");
    });

    it("TEST_BACK_3: Llama a navigate(-1) al hacer click", () => {
        render(<BackButton />);
        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(mockNavigate).toHaveBeenCalledWith(-1);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
});