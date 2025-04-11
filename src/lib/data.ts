
// Sample data for the application
import { v4 as uuidv4 } from 'uuid';

// Types
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  image?: string;
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  orderId: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: 'unpaid' | 'paid' | 'overdue';
  dueDate: Date;
  issuedDate: Date;
}

// Initial sample data
export const products: Product[] = [
  {
    id: '1',
    name: 'لابتوب إتش بي',
    category: 'الكترونيات',
    price: 3599,
    cost: 2800,
    stock: 15,
    createdAt: new Date('2023-09-15')
  },
  {
    id: '2',
    name: 'آيفون 14 برو',
    category: 'هواتف',
    price: 4999,
    cost: 4200,
    stock: 8,
    createdAt: new Date('2023-10-01')
  },
  {
    id: '3',
    name: 'سماعات سوني',
    category: 'الكترونيات',
    price: 899,
    cost: 650,
    stock: 20,
    createdAt: new Date('2023-10-10')
  },
  {
    id: '4',
    name: 'طابعة كانون',
    category: 'مكتبية',
    price: 1299,
    cost: 950,
    stock: 7,
    createdAt: new Date('2023-11-05')
  },
  {
    id: '5',
    name: 'شاشة سامسونج',
    category: 'الكترونيات',
    price: 2499,
    cost: 1900,
    stock: 12,
    createdAt: new Date('2023-11-20')
  }
];

export const customers: Customer[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '05xxxxxxxx',
    address: 'الرياض، السعودية'
  },
  {
    id: '2',
    name: 'سارة خالد',
    email: 'sara@example.com',
    phone: '05xxxxxxxx',
    address: 'جدة، السعودية'
  },
  {
    id: '3',
    name: 'محمد عبدالله',
    email: 'mohammad@example.com',
    phone: '05xxxxxxxx',
    address: 'الدمام، السعودية'
  }
];

export const orders: Order[] = [
  {
    id: '1',
    customerId: '1',
    items: [
      { productId: '1', quantity: 1, price: 3599 },
      { productId: '3', quantity: 2, price: 899 }
    ],
    total: 5397,
    status: 'completed',
    date: new Date('2023-12-05')
  },
  {
    id: '2',
    customerId: '2',
    items: [
      { productId: '2', quantity: 1, price: 4999 }
    ],
    total: 4999,
    status: 'completed',
    date: new Date('2023-12-10')
  },
  {
    id: '3',
    customerId: '3',
    items: [
      { productId: '4', quantity: 2, price: 1299 },
      { productId: '5', quantity: 1, price: 2499 }
    ],
    total: 5097,
    status: 'pending',
    date: new Date('2023-12-15')
  }
];

export const invoices: Invoice[] = [
  {
    id: '1',
    orderId: '1',
    customerId: '1',
    items: [
      { productId: '1', quantity: 1, price: 3599 },
      { productId: '3', quantity: 2, price: 899 }
    ],
    total: 5397,
    status: 'paid',
    issuedDate: new Date('2023-12-05'),
    dueDate: new Date('2023-12-20')
  },
  {
    id: '2',
    orderId: '2',
    customerId: '2',
    items: [
      { productId: '2', quantity: 1, price: 4999 }
    ],
    total: 4999,
    status: 'paid',
    issuedDate: new Date('2023-12-10'),
    dueDate: new Date('2023-12-25')
  },
  {
    id: '3',
    orderId: '3',
    customerId: '3',
    items: [
      { productId: '4', quantity: 2, price: 1299 },
      { productId: '5', quantity: 1, price: 2499 }
    ],
    total: 5097,
    status: 'unpaid',
    issuedDate: new Date('2023-12-15'),
    dueDate: new Date('2023-12-30')
  }
];

// Helper functions to manipulate data
export const getProduct = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getCustomer = (id: string): Customer | undefined => {
  return customers.find(customer => customer.id === id);
};

export const getOrder = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};

export const getInvoice = (id: string): Invoice | undefined => {
  return invoices.find(invoice => invoice.id === id);
};

export const addProduct = (product: Omit<Product, 'id' | 'createdAt'>): Product => {
  const newProduct: Product = {
    ...product,
    id: uuidv4(),
    createdAt: new Date()
  };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): Product | undefined => {
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    return products[index];
  }
  return undefined;
};

export const deleteProduct = (id: string): boolean => {
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    return true;
  }
  return false;
};

export const addOrder = (order: Omit<Order, 'id' | 'date'>): Order => {
  const newOrder: Order = {
    ...order,
    id: uuidv4(),
    date: new Date()
  };
  orders.push(newOrder);
  return newOrder;
};

export const addInvoice = (invoice: Omit<Invoice, 'id' | 'issuedDate'>): Invoice => {
  const newInvoice: Invoice = {
    ...invoice,
    id: uuidv4(),
    issuedDate: new Date()
  };
  invoices.push(newInvoice);
  return newInvoice;
};

export const updateInvoiceStatus = (id: string, status: Invoice['status']): Invoice | undefined => {
  const index = invoices.findIndex(invoice => invoice.id === id);
  if (index !== -1) {
    invoices[index].status = status;
    return invoices[index];
  }
  return undefined;
};

// Analytics helpers
export const getInventoryValue = (): number => {
  return products.reduce((total, product) => total + (product.cost * product.stock), 0);
};

export const getLowStockItems = (threshold: number = 5): Product[] => {
  return products.filter(product => product.stock <= threshold);
};

export const getRevenueByCategory = (): Record<string, number> => {
  const categoryRevenue: Record<string, number> = {};
  
  orders.filter(order => order.status === 'completed').forEach(order => {
    order.items.forEach(item => {
      const product = getProduct(item.productId);
      if (product) {
        const category = product.category;
        if (!categoryRevenue[category]) {
          categoryRevenue[category] = 0;
        }
        categoryRevenue[category] += item.price * item.quantity;
      }
    });
  });
  
  return categoryRevenue;
};

export const getTotalRevenue = (): number => {
  return orders
    .filter(order => order.status === 'completed')
    .reduce((total, order) => total + order.total, 0);
};

export const getPendingInvoicesValue = (): number => {
  return invoices
    .filter(invoice => invoice.status === 'unpaid')
    .reduce((total, invoice) => total + invoice.total, 0);
};

export const getOrdersByDateRange = (startDate: Date, endDate: Date): Order[] => {
  return orders.filter(order => {
    return order.date >= startDate && order.date <= endDate;
  });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR'
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ar-SA').format(date);
};
