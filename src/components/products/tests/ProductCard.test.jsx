import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// mock useCart from CartContext to control addToCart behaviour
const addToCartMock = vi.fn();
vi.mock('../../../context/CartContext', () => ({
	useCart: () => ({ addToCart: addToCartMock })
}));

import ProductCard from '../ProductCard';

describe('ProductCard', () => {
	beforeEach(() => {
		addToCartMock.mockReset();
		// mock alert to avoid noisy dialogs during tests
		vi.spyOn(window, 'alert').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	const sampleProduct = {
		id: 'p1',
		nombre: 'Test Producto',
		descripcion: 'Descripción de prueba',
		precio: 19990,
		imagen: 'test.jpg',
		categoria: 'accesorios',
		stock: 5,
		nuevo: false,
		destacado: false,
		oferta: false
	};

	test('renderiza nombre, precio y permite agregar al carrito cuando hay stock', () => {
		render(
			<MemoryRouter>
				<ProductCard product={sampleProduct} />
			</MemoryRouter>
		);

		// nombre
		expect(screen.getByText(sampleProduct.nombre)).toBeTruthy();

		// precio formateado (formatters.formatPrice devuelve string con símbolo)
		// comprobamos que aparece el número/formato aproximado
		expect(screen.getByText(/19.990|19990|19,990/)).toBeTruthy();

		// botón pequeño tiene title "Agregar al carrito"
		const addBtn = screen.getByTitle('Agregar al carrito');
		expect(addBtn).toBeEnabled();

		fireEvent.click(addBtn);

		expect(addToCartMock).toHaveBeenCalledWith(sampleProduct);
		expect(window.alert).toHaveBeenCalledWith(`¡${sampleProduct.nombre} agregado al carrito!`);
	});

	test('deshabilita el botón cuando stock es 0', () => {
		const outOfStock = { ...sampleProduct, id: 'p2', stock: 0 };
		render(
			<MemoryRouter>
				<ProductCard product={outOfStock} />
			</MemoryRouter>
		);

		const addBtn = screen.getByTitle('Agregar al carrito');
		expect(addBtn).toBeDisabled();
	});
});

