import {fireEvent, render,screen} from "@testing-library/react"
import Button from "../Button"
import { beforeEach, describe, expect, vi } from "vitest"

describe("Testing Button", () => {
    it("TEST_BTN_1: renderiza el contenido de children", () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole("button");
        expect(button.textContent).toBe("Click me");
    });

    it("TEST_BTN_2: usa la variante primaria por defecto", () => {
        render(<Button>Primary</Button>);
        const button = screen.getByRole("button");
        expect(button.className).toContain("from-azul-electrico");
        expect(button.className).toContain("to-azul-claro");
    });

    it("TEST_BTN_3: aplica la variante outline", () => {
        render(<Button variant="outline">Outline</Button>);
        const button = screen.getByRole("button");
        expect(button.className).toContain("border-gray-600");
        expect(button.className).toContain("text-gray-300");
    });

    it("TEST_BTN_4: aplica la variante secondary", () => {
        render(<Button variant="secondary">Secondary</Button>);
        const button = screen.getByRole("button");
        expect(button.className).toContain("border-azul-electrico");
        expect(button.className).toContain("text-azul-electrico");
    });

    it("TEST_BTN_5: se deshabilita cuando disabled es true", () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByRole("button");
        expect(button.disabled).toBe(true);
        expect(button.className).toContain("opacity-50");
        expect(button.className).toContain("cursor-not-allowed");
    });

    it("TEST_BTN_6: aplica tamaño large", () => {
        render(<Button size="large">Large</Button>);
        const button = screen.getByRole("button");
        expect(button.className).toContain("text-lg");
        expect(button.className).toContain("px-8 py-4");
    });

    it("TEST_BTN_7: concatena className adicional", () => {
        render(<Button className="extra-class">Custom</Button>);
        const button = screen.getByRole("button");
        expect(button.className).toContain("extra-class");
    });

    it("TEST_BTN_8: ejecuta onClick correctamente", () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
