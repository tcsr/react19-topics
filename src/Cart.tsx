import React from 'react';
import { CartProvider } from '../context/CartContext';
import { ProductList } from './ProductList';
import { ShoppingCart } from './ShoppingCart';
import { CartSummary } from './CartSummary';

export const Cart: React.FC = () => {
    return (
        <CartProvider>
            <div style={styles.container}>
                <header style={styles.header}>
                    <h1 style={styles.title}>E-Commerce Storefront</h1>
                    <p style={styles.subtitle}>
                        React 19 + TypeScript Assessment • Context API &amp; useReducer
                    </p>
                </header>

                <main style={styles.layout}>
                    <div style={styles.leftPane}>
                        <ProductList />
                    </div>
                    <div style={styles.rightPane}>
                        <ShoppingCart />
                        <CartSummary />
                    </div>
                </main>
            </div>
        </CartProvider>
    );
};

export default Cart;

// Re-export subcomponents and Context for flexible modular usage
export { ProductList } from './ProductList';
export { ShoppingCart } from './ShoppingCart';
export { CartSummary } from './CartSummary';
export { CartProvider, useCart } from '../context/CartContext';
export type { Product, CartItem, CartState, CartAction, CartContextType } from '../context/CartContext';

const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#212121'
    },
    header: {
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '16px',
        marginBottom: '24px'
    },
    title: {
        margin: 0,
        fontSize: '1.8rem',
        fontWeight: 700,
        color: '#1565c0'
    },
    subtitle: {
        margin: '4px 0 0 0',
        color: '#616161',
        fontSize: '0.95rem'
    },
    layout: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '32px',
        alignItems: 'start'
    },
    leftPane: {
        borderRight: '1px solid #eeeeee',
        paddingRight: '16px'
    },
    rightPane: {
        display: 'flex',
        flexDirection: 'column'
    }
};
