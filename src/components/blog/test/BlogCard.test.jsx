// /src/components/common/__tests__/BlogCard.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import BlogCard from "../BlogCard";

describe("BlogCard", () => {
  const mockPost = {
    id: "123",
    gradient: "from-red-500 to-yellow-500",
    image: "🎮",
    category: "noticias",
    date: "2024-05-01",
    title: "Nuevo lanzamiento de consola",
    excerpt: "La nueva consola promete revolucionar la industria...",
    readTime: "5 min",
    likes: 42,
  };

  it("TEST_BLOGCARD_1: Renderiza el título, categoría, fecha y excerpt", () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockPost.title)).to.exist;
    expect(screen.getByText(mockPost.category)).to.exist;
    expect(screen.getByText(mockPost.date)).to.exist;
    expect(screen.getByText(mockPost.excerpt)).to.exist;
  });

  it("TEST_BLOGCARD_2: Muestra el ícono/imagen del post", () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockPost.image)).to.exist;
  });

  it("TEST_BLOGCARD_3: El link apunta a la ruta correcta", () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /leer más/i });
    expect(link.getAttribute("href")).to.equal(`/blog/${mockPost.id}`);
  });

  it("TEST_BLOGCARD_4: Muestra el tiempo de lectura y likes", () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByText(`⏱️ ${mockPost.readTime}`)).to.exist;
    expect(screen.getByText(`❤️ ${mockPost.likes}`)).to.exist;
  });
});