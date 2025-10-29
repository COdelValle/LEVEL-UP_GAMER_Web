// /src/components/blog/__tests__/BlogGrid.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("BlogGrid", () => {
  beforeEach(() => {
    vi.resetModules(); // Limpia la caché de imports entre tests
  });

  it("TEST_BLOGGRID_1: Muestra mensaje cuando no hay posts", async () => {
    vi.doMock("../../../assets/data/blogData.js", () => ({
      blogPosts: [],
    }));

    const { default: BlogGrid } = await import("../BlogGrid.jsx");

    render(
      <MemoryRouter>
        <BlogGrid activeCategory="otra" searchTerm="zzz" sortBy="newest" />
      </MemoryRouter>
    );

    expect(screen.getByText("No se encontraron posts")).to.exist;
    expect(
      screen.getByText("Intenta con otros términos de búsqueda o categoría")
    ).to.exist;
  });

  it("TEST_BLOGGRID_2: Renderiza posts filtrados por categoría", async () => {
    vi.doMock("../../../assets/data/blogData.js", () => ({
      blogPosts: [
        { id: "1", category: "noticias", date: "2024-05-01", title: "Post A", excerpt: "Resumen A" },
        { id: "2", category: "reviews", date: "2023-01-01", title: "Post B", excerpt: "Resumen B" },
      ],
    }));

    const { default: BlogGrid } = await import("../BlogGrid.jsx");

    render(
      <MemoryRouter>
        <BlogGrid activeCategory="noticias" searchTerm="" sortBy="newest" />
      </MemoryRouter>
    );

    expect(screen.getByText("Post A")).to.exist;
    expect(screen.queryByText("Post B")).to.be.null;
  });

  it("TEST_BLOGGRID_3: Renderiza posts filtrados por búsqueda", async () => {
    vi.doMock("../../../assets/data/blogData.js", () => ({
      blogPosts: [
        { id: "1", category: "noticias", date: "2024-05-01", title: "Post A", excerpt: "Resumen A" },
        { id: "2", category: "reviews", date: "2023-01-01", title: "Post B", excerpt: "Resumen B" },
      ],
    }));

    const { default: BlogGrid } = await import("../BlogGrid.jsx");

    render(
      <MemoryRouter>
        <BlogGrid activeCategory="todas" searchTerm="Post B" sortBy="newest" />
      </MemoryRouter>
    );

    expect(screen.getByText("Post B")).to.exist;
    expect(screen.queryByText("Post A")).to.be.null;
  });

  it("TEST_BLOGGRID_4: Ordena posts por fecha (newest)", async () => {
    vi.doMock("../../../assets/data/blogData.js", () => ({
      blogPosts: [
        { id: "1", category: "noticias", date: "2024-05-01", title: "Post A", excerpt: "Resumen A" },
        { id: "2", category: "reviews", date: "2023-01-01", title: "Post B", excerpt: "Resumen B" },
      ],
    }));

    const { default: BlogGrid } = await import("../BlogGrid.jsx");

    render(
      <MemoryRouter>
        <BlogGrid activeCategory="todas" searchTerm="" sortBy="newest" />
      </MemoryRouter>
    );

    const titles = screen.getAllByRole("heading", { level: 3 });
    expect(titles[0].textContent).to.equal("Post A"); // más nuevo
    expect(titles[1].textContent).to.equal("Post B");
  });

  it("TEST_BLOGGRID_5: Paginación funciona correctamente", async () => {
    const manyPosts = Array.from({ length: 7 }, (_, i) => ({
      id: String(i + 1),
      category: "noticias",
      date: "2024-01-01",
      title: `Post ${i + 1}`,
      excerpt: "Resumen",
    }));

    vi.doMock("../../../assets/data/blogData.js", () => ({
      blogPosts: manyPosts,
    }));

    const { default: BlogGrid } = await import("../BlogGrid.jsx");

    render(
      <MemoryRouter>
        <BlogGrid activeCategory="todas" searchTerm="" sortBy="newest" />
      </MemoryRouter>
    );

    // Primera página: 6 posts
    expect(screen.getAllByRole("heading", { level: 3 })).to.have.length(6);

    // Cambiar a página 2
    fireEvent.click(screen.getByRole("button", { name: "2" }));

    // Ahora debe mostrar solo 1 post
    expect(screen.getAllByRole("heading", { level: 3 })).to.have.length(1);
  });
});