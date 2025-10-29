import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// Import the hook directly from context file
import { useCart } from '../CartContext';

// A small component that calls useCart during render
function ComponentUsingCart() {
  // calling the hook outside of provider should throw (as implemented)
  useCart();
  return <div>should not render</div>;
}

describe('CartContext / useCart', () => {
  it('throws when used outside CartProvider', () => {
    expect(() => render(<ComponentUsingCart />)).toThrow('useCart must be used within a CartProvider');
  });
});
