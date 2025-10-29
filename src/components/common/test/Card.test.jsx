import { render, screen } from '@testing-library/react';
import { Card } from './../Card.jsx';
import { describe, it, expect } from 'vitest';

describe('Testing Card', () => {
    it('renders the Card component', () => {
        render(<Card>Contenido de prueba</Card>);
        const el = screen.getByTestId('card-component');
        expect(el).toBeTruthy();
        expect(el).toHaveTextContent('Contenido de prueba');
    });
});