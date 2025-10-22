import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, cartItems: action.payload || [] }
    case 'ADD_TO_CART': {
      const product = action.payload
      const existing = state.cartItems.find(item => item.id === product.id)
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === product.id ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) } : item
          )
        }
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...product, quantity: product.quantity || 1 }]
      }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ).filter(i => i.quantity > 0)
      }
    case 'CLEAR_CART':
      return { ...state, cartItems: [] }
    default:
      return state
  }
}

const initialState = {
  cartItems: []
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // initialize from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart_items')
      if (raw) {
        const parsed = JSON.parse(raw)
        dispatch({ type: 'INITIALIZE', payload: parsed })
      }
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e)
    }
  }, [])

  // persist on changes
  useEffect(() => {
    try {
      localStorage.setItem('cart_items', JSON.stringify(state.cartItems))
    } catch (e) {
      console.error('Failed to save cart to localStorage', e)
    }
  }, [state.cartItems])

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const getTotalItems = () => state.cartItems.reduce((s, i) => s + (i.quantity || 1), 0)

  return (
    <CartContext.Provider value={{
      cartItems: state.cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
