import React, { useState, useEffect } from 'react';
import { useCart, type Product } from '../context/CartContext';

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addItem } = useCart();

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/products.json');
        if (!res.ok) {
          throw new Error(`Failed to fetch catalog (HTTP ${res.status})`);
        }
        const data: Product[] = await res.json();
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Failed to load products';
          setError(message);
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div data-testid="loading-state" style={styles.stateContainer}>
        <p style={{ margin: 0, fontWeight: 500 }}>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="error-state" style={{ ...styles.stateContainer, borderColor: '#ef5350', color: '#c62828' }}>
        <p style={{ margin: '0 0 8px 0' }}>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          style={styles.retryBtn}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section style={styles.container}>
      <h2 style={styles.heading}>Available Products</h2>
      <div style={styles.grid}>
        {products.map(product => (
          <div
            key={product.id}
            data-testid={`product-card-${product.id}`}
            style={styles.card}
          >
            <div>
              <h3 data-testid={`product-name-${product.id}`} style={styles.productName}>
                {product.name}
              </h3>
              <p data-testid={`product-price-${product.id}`} style={styles.productPrice}>
                ${product.price.toFixed(2)}
              </p>
            </div>
            <button
              data-testid={`add-btn-${product.id}`}
              onClick={() => addItem(product)}
              style={styles.addBtn}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { marginBottom: '24px' },
  heading: {
    fontSize: '1.25rem',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '8px',
    marginBottom: '16px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '16px'
  },
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  productName: {
    margin: '0 0 8px 0',
    fontSize: '1.05rem',
    color: '#212121'
  },
  productPrice: {
    margin: '0 0 16px 0',
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#2e7d32'
  },
  addBtn: {
    backgroundColor: '#1976d2',
    color: '#ffffff',
    border: 'none',
    padding: '10px 14px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'background-color 0.2s ease'
  },
  stateContainer: {
    padding: '32px',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    border: '1px dashed #bdbdbd',
    borderRadius: '8px'
  },
  retryBtn: {
    padding: '6px 16px',
    backgroundColor: '#c62828',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
