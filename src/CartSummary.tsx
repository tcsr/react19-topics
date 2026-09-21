import React from 'react';
import { useCart } from '../context/CartContext';

export const CartSummary: React.FC = () => {
  const {
    cart,
    totalItems,
    totalAmount,
    purchase,
    clearCart,
    purchaseSuccess,
    lastOrderSummary
  } = useCart();

  const handlePurchase = () => {
    if (cart.length === 0) return;
    purchase();
  };

  return (
    <aside style={styles.container}>
      {purchaseSuccess && lastOrderSummary && (
        <div data-testid="order-success-msg" style={styles.successBanner}>
          <h4 style={{ margin: '0 0 6px 0', color: '#1b5e20' }}>Order Confirmed Successfully!</h4>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>
            Purchased <strong>{lastOrderSummary.totalItems}</strong> items for a grand total of{' '}
            <strong>${lastOrderSummary.totalAmount.toFixed(2)}</strong> at {lastOrderSummary.timestamp}.
          </p>
        </div>
      )}

      <div style={styles.card}>
        <h3 style={styles.title}>Cart Summary</h3>

        <div style={styles.row}>
          <span>Unique Products:</span>
          <span style={styles.bold}>{cart.length}</span>
        </div>

        <div style={styles.row}>
          <span>Total Quantity:</span>
          <span data-testid="total-items-count" style={styles.bold}>
            {totalItems}
          </span>
        </div>

        <div style={{ ...styles.row, borderTop: '2px solid #e0e0e0', paddingTop: '12px', marginTop: '12px' }}>
          <span style={styles.totalLabel}>Total Payable:</span>
          <span data-testid="total-amount-val" style={styles.totalValue}>
            ${totalAmount.toFixed(2)}
          </span>
        </div>

        <div style={styles.actions}>
          <button
            data-testid="purchase-action-btn"
            onClick={handlePurchase}
            disabled={cart.length === 0}
            style={{
              ...styles.purchaseBtn,
              backgroundColor: cart.length === 0 ? '#b0bec5' : '#2e7d32',
              cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Purchase Order
          </button>

          <button
            onClick={clearCart}
            disabled={cart.length === 0}
            style={{
              ...styles.resetBtn,
              cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
              opacity: cart.length === 0 ? 0.5 : 1
            }}
          >
            Reset Cart
          </button>
        </div>
      </div>
    </aside>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { marginTop: '24px' },
  successBanner: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    border: '1px solid #a5d6a7',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#fafafa',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  title: {
    margin: '0 0 16px 0',
    fontSize: '1.2rem',
    borderBottom: '1px solid #eeeeee',
    paddingBottom: '8px'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '0.95rem',
    color: '#424242'
  },
  bold: {
    fontWeight: 600
  },
  totalLabel: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: '#212121'
  },
  totalValue: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#1565c0'
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginTop: '20px'
  },
  purchaseBtn: {
    flex: 2,
    color: '#ffffff',
    border: 'none',
    padding: '12px 16px',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 600,
    transition: 'background-color 0.2s ease'
  },
  resetBtn: {
    flex: 1,
    backgroundColor: '#757575',
    color: '#ffffff',
    border: 'none',
    padding: '12px 16px',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: 500
  }
};
