import React from 'react';
import { useCart } from '../context/CartContext';

export const ShoppingCart: React.FC = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeItem, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <section
        data-testid="empty-cart"
        style={styles.emptyContainer}
      >
        <h3 style={{ margin: '0 0 8px 0', color: '#616161' }}>Your Shopping Cart is Empty</h3>
        <p style={{ margin: 0, color: '#757575', fontSize: '0.95rem' }}>
          Select items from the product catalog to add them to your cart.
        </p>
      </section>
    );
  }

  return (
    <section style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={styles.heading}>Cart Items ({cart.length})</h2>
        <button
          data-testid="clear-cart-btn"
          onClick={clearCart}
          style={styles.clearBtn}
        >
          Clear All
        </button>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Unit Price</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Subtotal</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => {
              const subtotal = (item.price * item.quantity).toFixed(2);
              return (
                <tr
                  key={item.id}
                  data-testid={`cart-row-${item.id}`}
                  style={styles.tr}
                >
                  <td data-testid={`cart-item-name-${item.id}`} style={styles.td}>
                    <strong>{item.name}</strong>
                  </td>
                  <td data-testid={`cart-item-price-${item.id}`} style={styles.td}>
                    ${item.price.toFixed(2)}
                  </td>
                  <td style={styles.td}>
                    <div style={styles.qtyContainer}>
                      <button
                        data-testid={`decrease-btn-${item.id}`}
                        onClick={() => decreaseQuantity(item.id)}
                        style={styles.qtyBtn}
                        title="Decrease quantity"
                      >
                        -
                      </button>
                      <span
                        data-testid={`cart-qty-${item.id}`}
                        style={styles.qtyText}
                      >
                        {item.quantity}
                      </span>
                      <button
                        data-testid={`increase-btn-${item.id}`}
                        onClick={() => increaseQuantity(item.id)}
                        style={styles.qtyBtn}
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td
                    data-testid={`cart-item-subtotal-${item.id}`}
                    style={{ ...styles.td, fontWeight: 600, color: '#1b5e20' }}
                  >
                    ${subtotal}
                  </td>
                  <td style={styles.td}>
                    <button
                      data-testid={`remove-btn-${item.id}`}
                      onClick={() => removeItem(item.id)}
                      style={styles.removeBtn}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { marginTop: '20px' },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  heading: {
    margin: 0,
    fontSize: '1.25rem'
  },
  emptyContainer: {
    padding: '36px 20px',
    textAlign: 'center',
    backgroundColor: '#fafafa',
    border: '1px dashed #cfd8dc',
    borderRadius: '8px',
    marginTop: '20px'
  },
  clearBtn: {
    backgroundColor: '#d32f2f',
    color: '#fff',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '6px'
  },
  tableHeader: {
    backgroundColor: '#f5f5f5'
  },
  th: {
    padding: '12px 14px',
    textAlign: 'left',
    fontSize: '0.9rem',
    color: '#424242',
    borderBottom: '1px solid #e0e0e0'
  },
  tr: {
    borderBottom: '1px solid #eeeeee'
  },
  td: {
    padding: '12px 14px',
    fontSize: '0.95rem'
  },
  qtyContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    border: '1px solid #bdbdbd',
    borderRadius: '4px',
    backgroundColor: '#eeeeee',
    cursor: 'pointer',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qtyText: {
    minWidth: '24px',
    textAlign: 'center',
    fontWeight: 600
  },
  removeBtn: {
    backgroundColor: 'transparent',
    color: '#c62828',
    border: '1px solid #c62828',
    padding: '4px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem'
  }
};
