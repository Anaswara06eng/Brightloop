/**
 * Brightloop Software — Unified Subscription Business Platform
 * Enterprise Architecture: Catalog, Quotation Engine, Billing Engine, Discount Engine,
 * Payments Ledger, Customer Self-Service Portal & Finance Executive Reporting.
 */

(function () {
  'use strict';

  // ==========================================
  // STORAGE KEYS & CONSTANTS
  // ==========================================
  const STORAGE_KEY = 'subx_brightloop_os_v3_data';
  const THEME_KEY = 'subx_theme_pref';

  // ==========================================
  // INITIAL RICH SEED DATABASE
  // ==========================================
  const DEFAULT_SEED_DATA = {
    simulationDate: '2026-10-31',
    currentUser: {
      id: 'usr-admin-1',
      name: 'System Admin',
      email: 'Admin@gmail.com',
      role: 'admin', // 'admin', 'staff', 'customer'
      avatar: 'AD'
    },
    users: [
      { id: 'usr-admin-1', name: 'System Admin', email: 'Admin@gmail.com', role: 'admin', dept: 'Executive Administration', status: 'Active', lastActive: 'Just now' },
      { id: 'usr-staff-1', name: 'Sarah Connor', email: 'sarahSUBX@gmail.com', role: 'staff', dept: 'Sales & Quoting', status: 'Active', lastActive: '10 mins ago' },
      { id: 'usr-staff-2', name: 'Anila Patel', email: 'anilaSUBX@gmail.com', role: 'staff', dept: 'Operations & Billing', status: 'Active', lastActive: '1 hour ago' },
      { id: 'usr-cust-1', name: 'Apex Retailers', email: 'apex@retail.com', role: 'customer', dept: 'Client', status: 'Active', lastActive: 'Yesterday' },
      { id: 'usr-cust-2', name: 'Nova Tech Labs', email: 'billing@novatech.io', role: 'customer', dept: 'Client', status: 'Active', lastActive: '3 days ago' },
      { id: 'usr-cust-3', name: 'Global Dynamics Inc.', email: 'finance@globaldynamics.com', role: 'customer', dept: 'Client', status: 'Active', lastActive: '5 days ago' }
    ],
    customers: [
      { id: 'cust-1', name: 'Apex Retailers', email: 'apex@retail.com', phone: '+1 (555) 234-5678', address: '742 Evergreen Terrace, Springfield, OR', tier: 'Mid-Market' },
      { id: 'cust-2', name: 'Nova Tech Labs', email: 'billing@novatech.io', phone: '+1 (555) 345-6789', address: '101 Cyber Way, Austin, TX', tier: 'Enterprise' },
      { id: 'cust-3', name: 'Global Dynamics Inc.', email: 'finance@globaldynamics.com', phone: '+1 (555) 456-7890', address: '500 Corporate Blvd, New York, NY', tier: 'Enterprise' },
      { id: 'cust-4', name: 'Bean & Leaf Specialty Cafe', email: 'hello@beanandleaf.co', phone: '+1 (555) 567-8901', address: '12 Pike Place, Seattle, WA', tier: 'Small Business' },
      { id: 'cust-5', name: 'Zenith Health Systems', email: 'accounts@zenithhealth.org', phone: '+1 (555) 678-9012', address: '88 Med Center Dr, Boston, MA', tier: 'Enterprise' }
    ],
    products: [
      {
        id: 'prod-1',
        name: 'Brightloop ERP Core',
        type: 'Software',
        salesPrice: 299.00,
        costPrice: 45.00,
        notes: 'Flagship enterprise resource planning module with multi-currency and real-time ledger.',
        variants: [
          { name: 'Standard Edition', extraPrice: 0 },
          { name: 'Odoo Brand Connector', extraPrice: 560.00 },
          { name: 'Enterprise Multi-Region', extraPrice: 1200.00 }
        ]
      },
      {
        id: 'prod-2',
        name: 'Cloud Storage Plus (1TB)',
        type: 'Add-on',
        salesPrice: 49.00,
        costPrice: 8.50,
        notes: 'High-speed distributed file vault with end-to-end encryption. Toggleable at will.',
        variants: [
          { name: 'Standard S3 Compatible', extraPrice: 0 },
          { name: 'Multi-Cloud Replica', extraPrice: 40.00 }
        ]
      },
      {
        id: 'prod-3',
        name: '24/7 Dedicated Support',
        type: 'Add-on',
        salesPrice: 150.00,
        costPrice: 35.00,
        notes: '15-minute guaranteed SLA response time with dedicated Slack channel and phone line.',
        variants: [
          { name: 'Global Follow-the-Sun', extraPrice: 0 }
        ]
      },
      {
        id: 'prod-4',
        name: 'Advanced Security Shield',
        type: 'Add-on',
        salesPrice: 89.00,
        costPrice: 12.00,
        notes: 'Automated SOC2 compliance auditing, continuous vulnerability scanning and IAM enforce.',
        variants: [
          { name: 'Standard WAF', extraPrice: 0 },
          { name: 'Zero-Trust Gateway', extraPrice: 110.00 }
        ]
      },
      {
        id: 'prod-5',
        name: 'Analytics Pro & AI Forecasting',
        type: 'Software',
        salesPrice: 199.00,
        costPrice: 28.00,
        notes: 'Predictive cohort churn analytics and ARR anomaly detection.',
        variants: [
          { name: 'Basic BI', extraPrice: 0 },
          { name: 'Odoo Brand Bi-Directional Sync', extraPrice: 560.00 }
        ]
      }
    ],
    plans: [
      {
        id: 'plan-1',
        name: 'Starter Monthly',
        cost: 99.00,
        frequency: 'Monthly',
        minQty: 1,
        startDate: '2025-01-01',
        endDate: '2028-12-31',
        autoCloseOnEnd: false,
        allowEarlyClose: true,
        allowPause: true,
        allowRenew: true
      },
      {
        id: 'plan-2',
        name: 'Growth Monthly',
        cost: 299.00,
        frequency: 'Monthly',
        minQty: 3,
        startDate: '2025-01-01',
        endDate: '2028-12-31',
        autoCloseOnEnd: false,
        allowEarlyClose: true,
        allowPause: true,
        allowRenew: true
      },
      {
        id: 'plan-3',
        name: 'Enterprise Annual',
        cost: 2990.00,
        frequency: 'Yearly',
        minQty: 5,
        startDate: '2025-01-01',
        endDate: '2029-12-31',
        autoCloseOnEnd: false,
        allowEarlyClose: false,
        allowPause: false,
        allowRenew: true
      },
      {
        id: 'plan-4',
        name: 'Custom Weekly Sprint',
        cost: 150.00,
        frequency: 'Weekly',
        minQty: 1,
        startDate: '2026-01-01',
        endDate: '2026-12-31',
        autoCloseOnEnd: true,
        allowEarlyClose: true,
        allowPause: true,
        allowRenew: false
      }
    ],
    quotationTemplates: [
      {
        id: 'tpl-1',
        title: 'Enterprise Odoo Integration Suite',
        description: 'Complete ERP package with Odoo connector brand variant and 24/7 dedicated support.',
        planId: 'plan-3',
        validityDays: 30,
        items: [
          { productId: 'prod-1', variantName: 'Odoo Brand Connector', qty: 5, unitPrice: 859.00, taxRate: 0.10 },
          { productId: 'prod-3', variantName: 'Global Follow-the-Sun', qty: 1, unitPrice: 150.00, taxRate: 0.10 }
        ]
      },
      {
        id: 'tpl-2',
        title: 'Growth SaaS Bundle with Storage',
        description: 'Standard ERP Core with 1TB cloud backup and security shield for scaling shops.',
        planId: 'plan-2',
        validityDays: 15,
        items: [
          { productId: 'prod-1', variantName: 'Standard Edition', qty: 3, unitPrice: 299.00, taxRate: 0.08 },
          { productId: 'prod-2', variantName: 'Standard S3 Compatible', qty: 1, unitPrice: 49.00, taxRate: 0.08 },
          { productId: 'prod-4', variantName: 'Standard WAF', qty: 1, unitPrice: 89.00, taxRate: 0.08 }
        ]
      },
      {
        id: 'tpl-3',
        title: 'Small Business Starter Package',
        description: 'Entry level lightweight software subscription billed monthly.',
        planId: 'plan-1',
        validityDays: 14,
        items: [
          { productId: 'prod-1', variantName: 'Standard Edition', qty: 1, unitPrice: 299.00, taxRate: 0.08 }
        ]
      }
    ],
    discounts: [
      {
        id: 'disc-1',
        code: 'SEATBOOST15',
        type: 'Percentage',
        value: 15,
        minQty: 5,
        minPurchase: 0,
        startDate: '2026-01-01',
        endDate: '2027-12-31',
        usageLimit: 100,
        usedCount: 14,
        scope: 'ALL',
        targetProductId: null,
        status: 'Active'
      },
      {
        id: 'disc-2',
        code: 'ENTERPRISE500',
        type: 'Fixed',
        value: 500.00,
        minQty: 1,
        minPurchase: 2500.00,
        startDate: '2026-01-01',
        endDate: '2027-06-30',
        usageLimit: 20,
        usedCount: 7,
        scope: 'ALL',
        targetProductId: null,
        status: 'Active'
      },
      {
        id: 'disc-3',
        code: 'FLASH50',
        type: 'Percentage',
        value: 50,
        minQty: 1,
        minPurchase: 0,
        startDate: '2026-01-01',
        endDate: '2026-06-01', // Expired to showcase rule enforcement
        usageLimit: 10,
        usedCount: 10,
        scope: 'ALL',
        targetProductId: null,
        status: 'Expired'
      }
    ],
    taxRules: [
      { name: 'Standard Sales Tax', rate: 0.0825 },
      { name: 'VAT Standard 10%', rate: 0.10 },
      { name: 'Zero Tax / Export', rate: 0.00 }
    ],
    subscriptions: [
      {
        id: 'sub-1',
        subNumber: 'SUBX-2026-001',
        customerId: 'cust-1', // Apex Retailers
        planId: 'plan-2', // Growth Monthly
        paymentTerms: 'Net 30',
        startDate: '2026-08-15',
        expiryDate: '2027-08-15',
        nextBillingDate: '2026-10-15', // Due for billing
        lastBilledDate: '2026-09-15',
        stage: 'Active', // Draft, Quotation, Confirmed, Active, Paused, Closed
        discountCode: 'SEATBOOST15',
        lines: [
          { productId: 'prod-1', variantName: 'Odoo Brand Connector', qty: 3, unitPrice: 859.00, taxRate: 0.0825 },
          { productId: 'prod-2', variantName: 'Standard S3 Compatible', qty: 1, unitPrice: 49.00, taxRate: 0.0825 },
          { productId: 'prod-4', variantName: 'Standard WAF', qty: 1, unitPrice: 89.00, taxRate: 0.0825 }
        ],
        logs: [
          { date: '2026-08-15', event: 'Created as Draft by Sarah Connor' },
          { date: '2026-08-16', event: 'Moved to Quotation and delivered to customer' },
          { date: '2026-08-18', event: 'Customer approved quotation -> Confirmed' },
          { date: '2026-08-18', event: 'Activated into production -> Active' }
        ]
      },
      {
        id: 'sub-2',
        subNumber: 'SUBX-2026-002',
        customerId: 'cust-2', // Nova Tech Labs
        planId: 'plan-3', // Enterprise Annual
        paymentTerms: 'Net 30',
        startDate: '2026-01-10',
        expiryDate: '2027-01-10',
        nextBillingDate: '2027-01-10',
        lastBilledDate: '2026-01-10',
        stage: 'Active',
        discountCode: 'ENTERPRISE500',
        lines: [
          { productId: 'prod-1', variantName: 'Enterprise Multi-Region', qty: 10, unitPrice: 1499.00, taxRate: 0.10 },
          { productId: 'prod-3', variantName: 'Global Follow-the-Sun', qty: 1, unitPrice: 150.00, taxRate: 0.10 }
        ],
        logs: [
          { date: '2026-01-10', event: 'Subscription Activated on Yearly Contract' }
        ]
      },
      {
        id: 'sub-3',
        subNumber: 'SUBX-2026-003',
        customerId: 'cust-3', // Global Dynamics
        planId: 'plan-3',
        paymentTerms: 'Net 60',
        startDate: '2026-09-01',
        expiryDate: '2027-09-01',
        nextBillingDate: '2026-10-01', // OVERDUE billing
        lastBilledDate: '2026-09-01',
        stage: 'Active',
        discountCode: null,
        lines: [
          { productId: 'prod-1', variantName: 'Odoo Brand Connector', qty: 8, unitPrice: 859.00, taxRate: 0.10 }
        ],
        logs: [
          { date: '2026-09-01', event: 'Contract finalized and activated' }
        ]
      },
      {
        id: 'sub-4',
        subNumber: 'SUBX-2026-004',
        customerId: 'cust-4', // Bean & Leaf Cafe
        planId: 'plan-1', // Starter Monthly
        paymentTerms: 'Immediate',
        startDate: '2026-10-01',
        expiryDate: '2027-10-01',
        nextBillingDate: '2026-11-01',
        lastBilledDate: '2026-10-01',
        stage: 'Active',
        discountCode: null,
        lines: [
          { productId: 'prod-1', variantName: 'Standard Edition', qty: 1, unitPrice: 299.00, taxRate: 0.0825 }
        ],
        logs: [
          { date: '2026-10-01', event: 'Small business plan activated' }
        ]
      },
      {
        id: 'sub-5',
        subNumber: 'SUBX-2026-005',
        customerId: 'cust-5', // Zenith Health Systems
        planId: 'plan-2',
        paymentTerms: 'Net 30',
        startDate: '2026-10-25',
        expiryDate: '2027-10-25',
        nextBillingDate: '2026-11-25',
        lastBilledDate: null,
        stage: 'Quotation',
        discountCode: null,
        lines: [
          { productId: 'prod-1', variantName: 'Standard Edition', qty: 4, unitPrice: 299.00, taxRate: 0.0825 },
          { productId: 'prod-4', variantName: 'Zero-Trust Gateway', qty: 1, unitPrice: 199.00, taxRate: 0.0825 }
        ],
        logs: [
          { date: '2026-10-25', event: 'Sales quote generated from Template' }
        ]
      }
    ],
    invoices: [
      {
        id: 'inv-1',
        invoiceNumber: 'INV-SUBX-001',
        subscriptionId: 'sub-1',
        subNumber: 'SUBX-2026-001',
        customerId: 'cust-1',
        issueDate: '2026-08-15',
        dueDate: '2026-09-15',
        lines: [
          { description: 'Brightloop ERP Core (Odoo Brand Connector)', qty: 3, unitPrice: 859.00, taxRate: 0.0825, amount: 2577.00 },
          { description: 'Cloud Storage Plus (1TB) (Standard S3 Compatible)', qty: 1, unitPrice: 49.00, taxRate: 0.0825, amount: 49.00 },
          { description: 'Advanced Security Shield (Standard WAF)', qty: 1, unitPrice: 89.00, taxRate: 0.0825, amount: 89.00 }
        ],
        subtotal: 2715.00,
        discountAmount: 407.25,
        taxAmount: 190.39,
        totalAmount: 2498.14,
        amountPaid: 2498.14,
        balanceDue: 0.00,
        status: 'Paid', // Draft, Confirmed, Paid, Cancelled
        paymentTerms: 'Net 30'
      },
      {
        id: 'inv-2',
        invoiceNumber: 'INV-SUBX-002',
        subscriptionId: 'sub-2',
        subNumber: 'SUBX-2026-002',
        customerId: 'cust-2',
        issueDate: '2026-01-10',
        dueDate: '2026-02-10',
        lines: [
          { description: 'Brightloop ERP Core (Enterprise Multi-Region)', qty: 10, unitPrice: 1499.00, taxRate: 0.10, amount: 14990.00 },
          { description: '24/7 Dedicated Support (Global Follow-the-Sun)', qty: 1, unitPrice: 150.00, taxRate: 0.10, amount: 150.00 }
        ],
        subtotal: 15140.00,
        discountAmount: 500.00,
        taxAmount: 1464.00,
        totalAmount: 16104.00,
        amountPaid: 16104.00,
        balanceDue: 0.00,
        status: 'Paid',
        paymentTerms: 'Net 30'
      },
      {
        id: 'inv-3',
        invoiceNumber: 'INV-SUBX-003',
        subscriptionId: 'sub-3',
        subNumber: 'SUBX-2026-003',
        customerId: 'cust-3',
        issueDate: '2026-09-01',
        dueDate: '2026-10-01', // Past due!
        lines: [
          { description: 'Brightloop ERP Core (Odoo Brand Connector)', qty: 8, unitPrice: 859.00, taxRate: 0.10, amount: 6872.00 }
        ],
        subtotal: 6872.00,
        discountAmount: 0.00,
        taxAmount: 687.20,
        totalAmount: 7559.20,
        amountPaid: 2500.00, // Partially paid
        balanceDue: 5059.20,
        status: 'Confirmed', // Unpaid/Partially paid
        paymentTerms: 'Net 30'
      },
      {
        id: 'inv-4',
        invoiceNumber: 'INV-SUBX-004',
        subscriptionId: 'sub-4',
        subNumber: 'SUBX-2026-004',
        customerId: 'cust-4',
        issueDate: '2026-10-01',
        dueDate: '2026-10-01',
        lines: [
          { description: 'Brightloop ERP Core (Standard Edition)', qty: 1, unitPrice: 299.00, taxRate: 0.0825, amount: 299.00 }
        ],
        subtotal: 299.00,
        discountAmount: 0.00,
        taxAmount: 24.67,
        totalAmount: 323.67,
        amountPaid: 323.67,
        balanceDue: 0.00,
        status: 'Paid',
        paymentTerms: 'Immediate'
      }
    ],
    payments: [
      {
        id: 'pay-1',
        paymentRef: 'PAY-2026-8801',
        invoiceId: 'inv-1',
        invoiceNumber: 'INV-SUBX-001',
        customerId: 'cust-1',
        amount: 2498.14,
        date: '2026-08-20',
        method: 'Credit Card',
        notes: 'Stripe charge ch_3Mxx78489 - settled successfully',
        recordedBy: 'Sarah Connor'
      },
      {
        id: 'pay-2',
        paymentRef: 'PAY-2026-8802',
        invoiceId: 'inv-2',
        invoiceNumber: 'INV-2026-002',
        customerId: 'cust-2',
        amount: 16104.00,
        date: '2026-01-22',
        method: 'Bank Wire',
        notes: 'Fedwire ref #FW-9921004 from JPMorgan Chase',
        recordedBy: 'Alex Vance'
      },
      {
        id: 'pay-3',
        paymentRef: 'PAY-2026-8803',
        invoiceId: 'inv-3',
        invoiceNumber: 'INV-2026-003',
        customerId: 'cust-3',
        amount: 2500.00,
        date: '2026-09-28',
        method: 'Direct Debit',
        notes: 'Partial payment retainer deposit',
        recordedBy: 'Dave Miller'
      },
      {
        id: 'pay-4',
        paymentRef: 'PAY-2026-8804',
        invoiceId: 'inv-4',
        invoiceNumber: 'INV-2026-004',
        customerId: 'cust-4',
        amount: 323.67,
        date: '2026-10-01',
        method: 'Credit Card',
        notes: 'Square card reader online payment',
        recordedBy: 'Sarah Connor'
      }
    ]
  };

  // State Container
  let DB = loadState();

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage load failed, using defaults', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DB));
    } catch (e) {
      console.error('LocalStorage save failed', e);
    }
  }

  // ==========================================
  // HELPER FORMATTERS & UTILITIES
  // ==========================================
  function formatCurrency(amount) {
    const val = Number(amount) || 0;
    return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function showToast(message, type = 'info', title = '') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
    } else if (type === 'danger') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    } else {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }

    toast.innerHTML = `
      <div>${iconSvg}</div>
      <div style="flex: 1;">
        ${title ? `<div style="font-weight: 700; font-size: 0.85rem; margin-bottom: 2px;">${title}</div>` : ''}
        <div style="font-size: 0.8rem;">${message}</div>
      </div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  function measureExecutionTime(label, fn) {
    const t0 = performance.now();
    const result = fn();
    const t1 = performance.now();
    const diff = (t1 - t0).toFixed(1);
    const ticker = document.getElementById('queryPerfTime');
    if (ticker) {
      ticker.textContent = `${diff}ms`;
    }
    return result;
  }

  // ==========================================
  // AUTHENTICATION & PASSWORD POLICY VALIDATION
  // ==========================================
  function validatePasswordPolicy(pass) {
    return {
      len: pass.length > 8,
      upper: /[A-Z]/.test(pass),
      lower: /[a-z]/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>_\-+=\\/\[\]~`]/.test(pass)
    };
  }

  function setupAuthForms() {
    const inputPass = document.getElementById('signUpPassword');
    const reqLen = document.getElementById('reqLen');
    const reqUpper = document.getElementById('reqUpper');
    const reqLower = document.getElementById('reqLower');
    const reqSpecial = document.getElementById('reqSpecial');

    if (inputPass) {
      inputPass.addEventListener('input', () => {
        const val = inputPass.value;
        const res = validatePasswordPolicy(val);
        reqLen.classList.toggle('valid', res.len);
        reqUpper.classList.toggle('valid', res.upper);
        reqLower.classList.toggle('valid', res.lower);
        reqSpecial.classList.toggle('valid', res.special);
      });
    }

    // Auth Tabs
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const mode = tab.dataset.authMode;
        document.querySelectorAll('.auth-form-pane').forEach(p => p.classList.remove('active'));
        if (mode === 'signup') document.getElementById('formSignUp').classList.add('active');
        if (mode === 'login') document.getElementById('formSignIn').classList.add('active');
        if (mode === 'reset') document.getElementById('formForgotPass').classList.add('active');
      });
    });

    // Sign Up submit
    const formSignUp = document.getElementById('formSignUp');
    if (formSignUp) {
      formSignUp.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signUpName').value.trim();
        const email = document.getElementById('signUpEmail').value.trim().toLowerCase();
        const pass = document.getElementById('signUpPassword').value;
        const role = document.getElementById('signUpRole').value;

        // Check password policy
        const policy = validatePasswordPolicy(pass);
        if (!policy.len || !policy.upper || !policy.lower || !policy.special) {
          showToast('Password must be >8 characters, with uppercase, lowercase, and special character.', 'danger', 'Password Policy Error');
          return;
        }

        // Email must be unique
        const exists = DB.users.find(u => u.email.toLowerCase() === email);
        if (exists) {
          showToast(`An account with email "${email}" already exists. Each email can belong to only one account.`, 'danger', 'Duplicate Email');
          return;
        }

        // Create user
        const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'US';
        const newUser = {
          id: 'usr-' + Date.now(),
          name,
          email,
          role,
          dept: role === 'customer' ? 'Client' : 'Sales / Staff',
          status: 'Active',
          lastActive: 'Just now'
        };

        // If customer, also create customer profile entry
        if (role === 'customer') {
          DB.customers.push({
            id: 'cust-' + Date.now(),
            name,
            email,
            phone: '+1 (555) 000-0000',
            address: 'Brightloop Registered Client',
            tier: 'Standard'
          });
        }

        DB.users.push(newUser);
        DB.currentUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          avatar: initials
        };
        saveState();

        showToast(`Account created for ${newUser.name} (${newUser.email}). Signed in!`, 'success', 'Welcome to Brightloop');
        closeModal('modalAuth');
        updatePersonaUI();
        renderAll();
      });
    }

    // Sign In submit
    const formSignIn = document.getElementById('formSignIn');
    if (formSignIn) {
      formSignIn.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signInEmail').value.trim().toLowerCase();
        const found = DB.users.find(u => u.email.toLowerCase() === email);
        if (!found) {
          showToast(`No account located with email "${email}". Please verify or sign up.`, 'danger', 'Login Failed');
          return;
        }

        const initials = found.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'US';
        DB.currentUser = {
          id: found.id,
          name: found.name,
          email: found.email,
          role: found.role,
          avatar: initials
        };
        saveState();

        showToast(`Welcome back, ${found.name}! Signed in as ${found.role.toUpperCase()}.`, 'success', 'Authenticated');
        closeModal('modalAuth');
        updatePersonaUI();
        renderAll();
      });
    }

    // Forgot Password submit (Simulate sending secure link)
    const formForgotPass = document.getElementById('formForgotPass');
    if (formForgotPass) {
      formForgotPass.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('resetEmail').value.trim().toLowerCase();
        const found = DB.users.find(u => u.email.toLowerCase() === email);
        if (!found) {
          showToast(`Email "${email}" not found in Brightloop registry.`, 'warning', 'Account Not Found');
          return;
        }

        const token = 'pwd_rst_' + Math.random().toString(36).substring(2, 12);
        showToast(`Reset link dispatched to ${email}! Token: [${token}]. Link valid for 15 minutes.`, 'info', 'Email Sent');
        closeModal('modalAuth');
      });
    }
  }

  // ==========================================
  // PERSONA & RBAC LOGIC
  // ==========================================
  function setupPersonaSwitching() {
    const btnAdmin = document.getElementById('btnRoleAdmin');
    const btnStaff = document.getElementById('btnRoleStaff');
    const btnCustomer = document.getElementById('btnRoleCustomer');

    btnAdmin.addEventListener('click', () => switchPersona('admin', 'usr-admin-1'));
    btnStaff.addEventListener('click', () => switchPersona('staff', 'usr-staff-1'));
    btnCustomer.addEventListener('click', () => switchPersona('customer', 'usr-cust-1'));
  }

  function switchPersona(role, targetUserId) {
    const targetUser = DB.users.find(u => u.id === targetUserId) || DB.users.find(u => u.role === role);
    if (!targetUser) return;

    const initials = targetUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'US';
    DB.currentUser = {
      id: targetUser.id,
      name: targetUser.name,
      email: targetUser.email,
      role: targetUser.role,
      avatar: initials
    };
    saveState();

    updatePersonaUI();
    showToast(`Switched active view to ${targetUser.name} (${targetUser.role.toUpperCase()})`, 'info', 'Role Switch');

    // Default view routing based on role
    if (role === 'customer') {
      navigateToView('customer-portal');
    } else {
      navigateToView('dashboard');
    }
    renderAll();
  }

  function updatePersonaUI() {
    const role = DB.currentUser.role;
    const userName = DB.currentUser.name;
    const userAvatar = DB.currentUser.avatar;

    // Header updates
    document.getElementById('headerUserName').textContent = userName;
    document.getElementById('headerUserAvatar').textContent = userAvatar;
    document.getElementById('headerUserRoleBadge').textContent = role.toUpperCase();

    // Persona Pills highlight
    document.querySelectorAll('.role-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.role === role);
    });

    // RBAC Sidebar elements visibility
    const adminSections = document.querySelectorAll('.admin-only-section, .admin-only-nav');
    const customerSections = document.querySelectorAll('.customer-only-section, .customer-only-nav');
    const platformCoreItems = document.querySelectorAll('#navDashboard, #navSubscriptions, #navInvoices, #navPayments');

    if (role === 'admin') {
      adminSections.forEach(el => el.classList.remove('hidden'));
      customerSections.forEach(el => el.classList.add('hidden'));
      platformCoreItems.forEach(el => el.classList.remove('hidden'));
    } else if (role === 'staff') {
      adminSections.forEach(el => el.classList.add('hidden'));
      customerSections.forEach(el => el.classList.add('hidden'));
      platformCoreItems.forEach(el => el.classList.remove('hidden'));
    } else if (role === 'customer') {
      adminSections.forEach(el => el.classList.add('hidden'));
      customerSections.forEach(el => el.classList.remove('hidden'));
      platformCoreItems.forEach(el => el.classList.add('hidden'));
    }
  }

  // ==========================================
  // NAVIGATION & VIEW CONTROLLER
  // ==========================================
  function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const view = item.dataset.view;
        navigateToView(view);
      });
    });
  }

  function navigateToView(viewId) {
    measureExecutionTime('navigate_' + viewId, () => {
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === viewId);
      });

      document.querySelectorAll('.view-pane').forEach(pane => {
        pane.classList.remove('active');
      });

      const activePane = document.getElementById(`pane-${viewId}`);
      if (activePane) {
        activePane.classList.add('active');
      }

      updateViewHeader(viewId);
      renderViewContent(viewId);
    });
  }

  function updateViewHeader(viewId) {
    const titleEl = document.getElementById('viewTitle');
    const descEl = document.getElementById('viewDescription');
    const actionsEl = document.getElementById('viewActions');
    actionsEl.innerHTML = '';

    switch (viewId) {
      case 'dashboard':
        titleEl.textContent = 'Finance & Executive Overview';
        descEl.textContent = 'Live metrics on active recurring revenue, cash collections, and overdue receivables.';
        actionsEl.innerHTML = `
          <button class="btn btn-outline btn-sm" id="btnExportSummaryReport">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export Finance Summary
          </button>
        `;
        document.getElementById('btnExportSummaryReport')?.addEventListener('click', exportFinanceReport);
        break;

      case 'subscriptions':
        titleEl.textContent = 'Subscriptions & Quotations Lifecycle';
        descEl.textContent = 'Draft, quote, confirm, activate, and manage recurring subscription contracts.';
        break;

      case 'invoices':
        titleEl.textContent = 'Invoices & Billing Hub';
        descEl.textContent = 'Automated billing ledger with tax calculation, discounts, and dispatch status.';
        break;

      case 'payments':
        titleEl.textContent = 'Incoming Payment Ledger';
        descEl.textContent = 'Record settlements across bank wire, credit card, and ACH with invoice balancing.';
        break;

      case 'products':
        titleEl.textContent = 'Product Catalog & Variant System';
        descEl.textContent = 'Admin controlled software licenses, switchable add-ons, and brand surcharge rules.';
        break;

      case 'plans':
        titleEl.textContent = 'Subscription Plans & Lifecycle Policies';
        descEl.textContent = 'Cadence rules (daily, weekly, monthly, yearly), minimums, and automated close/renew behavior.';
        break;

      case 'discounts':
        titleEl.textContent = 'Promotions & Volume Discount Rules';
        descEl.textContent = 'Admin rules for seat incentives, percentage/fixed savings, and automatic invoice application.';
        break;

      case 'staff':
        titleEl.textContent = 'Staff Team & Access Control (RBAC)';
        descEl.textContent = 'Admin authority: invite team members, assign operational permissions, and audit access.';
        break;

      case 'customer-portal':
        titleEl.textContent = 'Customer Self-Service Hub';
        descEl.textContent = 'Inspect your active software licenses, toggle modular add-ons without emailing support.';
        break;

      case 'customer-invoices':
        titleEl.textContent = 'Customer Billing & Tax Receipts';
        descEl.textContent = 'Official invoices, real-time balance payment, and printable tax receipts.';
        break;
    }
  }

  function renderViewContent(viewId) {
    if (viewId === 'dashboard') renderDashboard();
    if (viewId === 'subscriptions') renderSubscriptions();
    if (viewId === 'invoices') renderInvoices();
    if (viewId === 'payments') renderPayments();
    if (viewId === 'products') renderProducts();
    if (viewId === 'plans') renderPlans();
    if (viewId === 'discounts') renderDiscounts();
    if (viewId === 'staff') renderStaff();
    if (viewId === 'customer-portal') renderCustomerPortal();
    if (viewId === 'customer-invoices') renderCustomerInvoices();
  }

  function renderAll() {
    updateBadges();
    const activeNav = document.querySelector('.nav-item.active');
    const viewId = activeNav ? activeNav.dataset.view : 'dashboard';
    renderViewContent(viewId);
  }

  // ==========================================
  // 1. FINANCE & EXECUTIVE DASHBOARD
  // ==========================================
  function renderDashboard() {
    // 1. Active Subscriptions count
    const activeSubs = DB.subscriptions.filter(s => s.stage === 'Active');
    document.getElementById('kpiActiveCount').textContent = activeSubs.length;

    // 2. MRR & ARR Calculation
    let totalMRR = 0;
    activeSubs.forEach(sub => {
      const plan = DB.plans.find(p => p.id === sub.planId);
      let subRecurring = calculateSubscriptionTotal(sub);
      if (plan) {
        if (plan.frequency === 'Monthly') totalMRR += subRecurring;
        else if (plan.frequency === 'Yearly') totalMRR += (subRecurring / 12);
        else if (plan.frequency === 'Weekly') totalMRR += (subRecurring * 4.33);
        else if (plan.frequency === 'Daily') totalMRR += (subRecurring * 30);
      } else {
        totalMRR += subRecurring;
      }
    });

    const totalARR = totalMRR * 12;
    document.getElementById('kpiMRR').textContent = formatCurrency(totalMRR);
    document.getElementById('kpiARRValue').textContent = `ARR: ${formatCurrency(totalARR)}`;

    // 3. Total Cash Collected
    const totalCollected = DB.payments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);
    document.getElementById('kpiCollected').textContent = formatCurrency(totalCollected);
    document.getElementById('kpiPaymentCount').textContent = `${DB.payments.length} Payments`;

    // 4. Overdue Receivables
    const simDate = new Date(DB.simulationDate);
    const overdueInvoices = DB.invoices.filter(inv => {
      const due = new Date(inv.dueDate);
      return inv.status !== 'Paid' && inv.status !== 'Cancelled' && due < simDate && inv.balanceDue > 0;
    });

    const totalOverdue = overdueInvoices.reduce((acc, inv) => acc + (Number(inv.balanceDue) || 0), 0);
    document.getElementById('kpiOverdue').textContent = formatCurrency(totalOverdue);
    document.getElementById('kpiOverdueCount').textContent = `${overdueInvoices.length} Overdue`;

    // 5. Overdue Chasing Table
    const tbody = document.getElementById('tbodyOverdueInvoices');
    if (tbody) {
      if (overdueInvoices.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">✨ All accounts are current! No overdue invoices on file.</td></tr>`;
      } else {
        tbody.innerHTML = overdueInvoices.map(inv => {
          const cust = DB.customers.find(c => c.id === inv.customerId) || { name: 'Customer' };
          const daysOverdue = Math.max(1, Math.floor((simDate - new Date(inv.dueDate)) / (1000 * 60 * 60 * 24)));
          return `
            <tr>
              <td><strong>${inv.invoiceNumber}</strong></td>
              <td>${cust.name}</td>
              <td>${inv.dueDate}</td>
              <td><span class="badge badge-overdue">${daysOverdue} days late</span></td>
              <td>${formatCurrency(inv.totalAmount)}</td>
              <td><strong class="text-danger">${formatCurrency(inv.balanceDue)}</strong></td>
              <td><span class="badge badge-overdue">${inv.status}</span></td>
              <td>
                <button class="btn btn-primary btn-xs btn-chase-single" data-inv-id="${inv.id}">
                  Chase Reminder
                </button>
              </td>
            </tr>
          `;
        }).join('');

        tbody.querySelectorAll('.btn-chase-single').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const invId = e.currentTarget.dataset.invId;
            const targetInv = DB.invoices.find(i => i.id === invId);
            const targetCust = DB.customers.find(c => c.id === targetInv?.customerId);
            showToast(`Dunning notice dispatched to ${targetCust?.email || 'customer'} for ${targetInv?.invoiceNumber} ($${targetInv?.balanceDue.toFixed(2)} due).`, 'warning', 'Chase Sent');
          });
        });
      }
    }

    // 6. SVG Charts Rendering
    renderRevenueBarChart();
    renderPlanDistributionChart();
  }

  function renderRevenueBarChart() {
    const container = document.getElementById('revenueBarChart');
    if (!container) return;

    // Monthly aggregates: Aug, Sep, Oct, Nov
    const months = [
      { label: 'Aug 2026', invoiced: 2715, collected: 2498 },
      { label: 'Sep 2026', invoiced: 6872, collected: 2500 },
      { label: 'Oct 2026', invoiced: 8200, collected: 4500 },
      { label: 'Nov (Proj)', invoiced: 10400, collected: 8900 }
    ];

    const maxVal = 12000;
    const chartHeight = 180;
    const barWidth = 24;
    const groupGap = 80;
    const svgWidth = 420;

    let svgHtml = `<svg width="100%" height="${chartHeight + 40}" viewBox="0 0 ${svgWidth} ${chartHeight + 40}" preserveAspectRatio="xMidYMid meet">`;

    // Grid lines
    for (let i = 0; i <= 4; i++) {
      const y = chartHeight - (i * (chartHeight / 4));
      svgHtml += `
        <line x1="30" y1="${y}" x2="${svgWidth - 20}" y2="${y}" stroke="var(--border-color)" stroke-dasharray="3,3" />
        <text x="25" y="${y + 4}" font-size="9" fill="var(--text-muted)" text-anchor="end">$${(i * 3)}k</text>
      `;
    }

    months.forEach((m, idx) => {
      const startX = 65 + (idx * groupGap);
      const hInv = (m.invoiced / maxVal) * chartHeight;
      const hCol = (m.collected / maxVal) * chartHeight;
      const yInv = chartHeight - hInv;
      const yCol = chartHeight - hCol;

      svgHtml += `
        <!-- Invoiced Bar -->
        <rect x="${startX}" y="${yInv}" width="${barWidth}" height="${hInv}" rx="4" fill="var(--brand-primary)" opacity="0.85">
          <title>${m.label} Invoiced: $${m.invoiced.toLocaleString()}</title>
        </rect>
        <!-- Collected Bar -->
        <rect x="${startX + barWidth + 4}" y="${yCol}" width="${barWidth}" height="${hCol}" rx="4" fill="var(--color-success)" opacity="0.9">
          <title>${m.label} Collected: $${m.collected.toLocaleString()}</title>
        </rect>
        <text x="${startX + barWidth}" y="${chartHeight + 20}" font-size="10" fill="var(--text-muted)" text-anchor="middle" font-weight="600">${m.label}</text>
      `;
    });

    svgHtml += `</svg>`;
    container.innerHTML = svgHtml;
  }

  function renderPlanDistributionChart() {
    const container = document.getElementById('planDonutChart');
    if (!container) return;

    // Plan count tally
    const counts = { Monthly: 0, Yearly: 0, Weekly: 0 };
    DB.subscriptions.forEach(s => {
      const plan = DB.plans.find(p => p.id === s.planId);
      if (plan && counts[plan.frequency] !== undefined) {
        counts[plan.frequency]++;
      } else {
        counts.Monthly++;
      }
    });

    const total = DB.subscriptions.length || 1;
    const pMonthly = Math.round((counts.Monthly / total) * 100);
    const pYearly = Math.round((counts.Yearly / total) * 100);
    const pWeekly = 100 - pMonthly - pYearly;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 100%; padding: 0.5rem 1rem;">
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 4px;">
            <span><strong>Monthly Cadence</strong> (Mid-Market & Small Shops)</span>
            <span>${pMonthly}% (${counts.Monthly})</span>
          </div>
          <div style="height: 10px; background: var(--bg-secondary); border-radius: 99px; overflow: hidden;">
            <div style="width: ${pMonthly}%; height: 100%; background: var(--brand-primary);"></div>
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 4px;">
            <span><strong>Yearly Contracts</strong> (Enterprise Tier)</span>
            <span>${pYearly}% (${counts.Yearly})</span>
          </div>
          <div style="height: 10px; background: var(--bg-secondary); border-radius: 99px; overflow: hidden;">
            <div style="width: ${pYearly}%; height: 100%; background: var(--brand-cyan);"></div>
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 4px;">
            <span><strong>Weekly Sprints</strong> (Ad-Hoc Projects)</span>
            <span>${pWeekly}% (${counts.Weekly})</span>
          </div>
          <div style="height: 10px; background: var(--bg-secondary); border-radius: 99px; overflow: hidden;">
            <div style="width: ${Math.max(pWeekly, 0)}%; height: 100%; background: var(--color-purple);"></div>
          </div>
        </div>
      </div>
    `;
  }

  function exportFinanceReport() {
    const activeCount = DB.subscriptions.filter(s => s.stage === 'Active').length;
    const collected = DB.payments.reduce((a, b) => a + Number(b.amount || 0), 0);
    const invoicesTotal = DB.invoices.reduce((a, b) => a + Number(b.totalAmount || 0), 0);
    const overdue = DB.invoices.reduce((a, b) => a + Number(b.balanceDue || 0), 0);

    const reportContent = `Brightloop Software — Executive Financial Report
Date: ${DB.simulationDate}
--------------------------------------------------
Active Subscriptions: ${activeCount}
Total Invoiced: $${invoicesTotal.toFixed(2)}
Cash Collected: $${collected.toFixed(2)}
Outstanding / Overdue Balance: $${overdue.toFixed(2)}
--------------------------------------------------
Generated by: ${DB.currentUser.name} (${DB.currentUser.role.toUpperCase()})
System Status: Healthy | Engine v2.6`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Brightloop_Finance_Report_${DB.simulationDate}.txt`;
    a.click();
    showToast('Financial summary exported successfully.', 'success', 'Export Complete');
  }

  // ==========================================
  // 2. SUBSCRIPTIONS & QUOTATIONS LIFECYCLE
  // ==========================================
  function renderSubscriptions() {
    const tbody = document.getElementById('tbodySubscriptions');
    if (!tbody) return;

    // Populate Plan filter dropdown
    const planFilter = document.getElementById('subPlanFilter');
    if (planFilter && planFilter.children.length === 1) {
      DB.plans.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.name;
        planFilter.appendChild(opt);
      });
    }

    const searchQuery = (document.getElementById('subSearchInput')?.value || '').toLowerCase();
    const statusFilter = document.getElementById('subStatusFilter')?.value || 'ALL';
    const selPlan = planFilter?.value || 'ALL';

    const filtered = DB.subscriptions.filter(sub => {
      const cust = DB.customers.find(c => c.id === sub.customerId) || { name: '' };
      const plan = DB.plans.find(p => p.id === sub.planId) || { name: '' };
      const matchesSearch = sub.subNumber.toLowerCase().includes(searchQuery) ||
                            cust.name.toLowerCase().includes(searchQuery) ||
                            plan.name.toLowerCase().includes(searchQuery);
      const matchesStatus = statusFilter === 'ALL' || sub.stage === statusFilter;
      const matchesPlan = selPlan === 'ALL' || sub.planId === selPlan;
      return matchesSearch && matchesStatus && matchesPlan;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted); padding: 2rem;">No matching subscriptions or quotes found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(sub => {
      const cust = DB.customers.find(c => c.id === sub.customerId) || { name: 'Customer' };
      const plan = DB.plans.find(p => p.id === sub.planId) || { name: 'Plan', frequency: 'Monthly' };
      const total = calculateSubscriptionTotal(sub);
      const lineSummary = sub.lines.map(l => {
        const prod = DB.products.find(p => p.id === l.productId);
        return `${l.qty}x ${prod ? prod.name : 'Item'}${l.variantName ? ` (${l.variantName})` : ''}`;
      }).join(', ');

      const badgeClass = {
        Draft: 'badge-draft',
        Quotation: 'badge-quotation',
        Confirmed: 'badge-confirmed',
        Active: 'badge-active',
        Paused: 'badge-paused',
        Closed: 'badge-closed'
      }[sub.stage] || 'badge-draft';

      return `
        <tr>
          <td><strong>${sub.subNumber}</strong></td>
          <td>${cust.name}</td>
          <td>
            <div><strong>${plan.name}</strong></div>
            <div class="text-xs text-muted">${plan.frequency} • ${sub.paymentTerms}</div>
          </td>
          <td>${sub.startDate}</td>
          <td>
            <div>${sub.nextBillingDate || 'N/A'}</div>
            <div class="text-xs text-muted">Exp: ${sub.expiryDate || 'Open'}</div>
          </td>
          <td><span class="text-xs text-muted" title="${lineSummary}">${lineSummary.length > 38 ? lineSummary.substring(0, 38) + '...' : lineSummary}</span></td>
          <td><strong>${formatCurrency(total)}</strong><span class="text-xs text-muted">/${plan.frequency}</span></td>
          <td><span class="badge ${badgeClass}">${sub.stage}</span></td>
          <td>
            <button class="btn btn-outline btn-xs btn-view-sub" data-sub-id="${sub.id}">
              Manage
            </button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-view-sub').forEach(btn => {
      btn.addEventListener('click', (e) => {
        openSubscriptionDetailsModal(e.currentTarget.dataset.subId);
      });
    });
  }

  function calculateSubscriptionTotal(sub) {
    let subtotal = 0;
    let taxTotal = 0;

    sub.lines.forEach(line => {
      const amount = (line.qty || 1) * (line.unitPrice || 0);
      subtotal += amount;
      taxTotal += amount * (line.taxRate || 0);
    });

    // Discount check
    let discount = 0;
    if (sub.discountCode) {
      const disc = DB.discounts.find(d => d.code === sub.discountCode && d.status === 'Active');
      if (disc) {
        if (disc.type === 'Percentage') {
          discount = subtotal * (disc.value / 100);
        } else if (disc.type === 'Fixed') {
          discount = Math.min(disc.value, subtotal);
        }
      }
    }

    return Math.max(0, subtotal - discount + taxTotal);
  }

  function openSubscriptionDetailsModal(subId) {
    const sub = DB.subscriptions.find(s => s.id === subId);
    if (!sub) return;

    const cust = DB.customers.find(c => c.id === sub.customerId) || { name: 'Customer' };
    const plan = DB.plans.find(p => p.id === sub.planId) || { name: 'Plan', frequency: 'Monthly' };

    document.getElementById('viewSubNumber').textContent = sub.subNumber;
    const badge = document.getElementById('viewSubBadge');
    badge.textContent = sub.stage;
    badge.className = `badge badge-${sub.stage.toLowerCase()}`;

    const body = document.getElementById('viewSubModalBody');
    body.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
        <div>
          <h4 style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase;">Customer Information</h4>
          <div style="font-weight: 700; font-size: 1.05rem;">${cust.name}</div>
          <div class="text-sm text-muted">${cust.email} • ${cust.phone}</div>
          <div class="text-xs text-muted">${cust.address}</div>
        </div>
        <div>
          <h4 style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase;">Plan Terms & Policy</h4>
          <div style="font-weight: 700; font-size: 1.05rem;">${plan.name} (${plan.frequency})</div>
          <div class="text-sm">Payment Terms: <strong>${sub.paymentTerms}</strong></div>
          <div class="text-xs text-muted">Start: ${sub.startDate} | Next Billing: ${sub.nextBillingDate || 'N/A'} | End: ${sub.expiryDate || 'Open'}</div>
        </div>
      </div>

      <h4 style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Configured Products & Variants</h4>
      <table class="line-table" style="margin-bottom: 1.5rem;">
        <thead>
          <tr>
            <th>Product & Variant</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Tax</th>
            <th>Line Total</th>
          </tr>
        </thead>
        <tbody>
          ${sub.lines.map(l => {
            const p = DB.products.find(prod => prod.id === l.productId);
            const lineAmt = l.qty * l.unitPrice;
            return `
              <tr>
                <td><strong>${p ? p.name : 'Item'}</strong> <span class="text-xs text-muted">(${l.variantName || 'Base'})</span></td>
                <td>${l.qty}</td>
                <td>${formatCurrency(l.unitPrice)}</td>
                <td>${((l.taxRate || 0) * 100).toFixed(1)}%</td>
                <td><strong>${formatCurrency(lineAmt)}</strong></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>

      ${sub.discountCode ? `
        <div style="background: var(--color-success-bg); color: var(--color-success-text); padding: 0.5rem 0.85rem; border-radius: var(--radius-md); font-size: 0.82rem; margin-bottom: 1.25rem;">
          🎟️ Active Discount Applied: <strong>${sub.discountCode}</strong>
        </div>
      ` : ''}

      <h4 style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Lifecycle Audit Trail</h4>
      <div style="background: var(--bg-secondary); padding: 0.75rem 1rem; border-radius: var(--radius-md); font-size: 0.78rem; display: flex; flex-direction: column; gap: 4px;">
        ${(sub.logs || []).map(log => `<div><span class="text-muted">[${log.date}]</span> ${log.event}</div>`).join('')}
      </div>
    `;

    // Dynamic State Actions in Footer
    const footer = document.getElementById('viewSubModalFooter');
    let actionsHtml = `<button type="button" class="btn btn-ghost" id="btnCloseViewModal">Close</button>`;

    if (sub.stage === 'Draft') {
      actionsHtml += `<button type="button" class="btn btn-primary btn-advance-state" data-target-stage="Quotation">Send Quotation Offer</button>`;
    } else if (sub.stage === 'Quotation') {
      actionsHtml += `<button type="button" class="btn btn-primary btn-advance-state" data-target-stage="Confirmed">Customer Confirms Quote</button>`;
    } else if (sub.stage === 'Confirmed') {
      actionsHtml += `<button type="button" class="btn btn-primary btn-advance-state" data-target-stage="Active">Activate Subscription</button>`;
    } else if (sub.stage === 'Active') {
      if (plan.allowPause) {
        actionsHtml += `<button type="button" class="btn btn-warning btn-advance-state" data-target-stage="Paused">Pause Subscription</button>`;
      }
      if (plan.allowEarlyClose) {
        actionsHtml += `<button type="button" class="btn btn-danger btn-advance-state" data-target-stage="Closed">Terminate / Close Early</button>`;
      }
      actionsHtml += `<button type="button" class="btn btn-outline btn-force-bill" data-sub-id="${sub.id}">Generate Instant Invoice</button>`;
    } else if (sub.stage === 'Paused') {
      actionsHtml += `<button type="button" class="btn btn-primary btn-advance-state" data-target-stage="Active">Resume Active Status</button>`;
    }

    footer.innerHTML = actionsHtml;

    document.getElementById('btnCloseViewModal')?.addEventListener('click', () => closeModal('modalViewSubDetails'));

    footer.querySelectorAll('.btn-advance-state').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const nextStage = e.currentTarget.dataset.targetStage;
        transitionSubscriptionStage(sub.id, nextStage);
        closeModal('modalViewSubDetails');
      });
    });

    footer.querySelector('.btn-force-bill')?.addEventListener('click', (e) => {
      generateInvoiceForSubscription(sub, true);
      closeModal('modalViewSubDetails');
      navigateToView('invoices');
    });

    openModal('modalViewSubDetails');
  }

  function transitionSubscriptionStage(subId, nextStage) {
    const sub = DB.subscriptions.find(s => s.id === subId);
    if (!sub) return;

    const oldStage = sub.stage;
    sub.stage = nextStage;
    if (!sub.logs) sub.logs = [];
    sub.logs.push({
      date: DB.simulationDate,
      event: `Stage progressed from ${oldStage} to ${nextStage} by ${DB.currentUser.name}`
    });

    // If activated, trigger welcome invoice or next billing date setup
    if (nextStage === 'Active' && !sub.nextBillingDate) {
      sub.nextBillingDate = DB.simulationDate;
    }

    saveState();
    showToast(`Subscription ${sub.subNumber} transitioned to ${nextStage}.`, 'success', 'Lifecycle Updated');
    renderAll();
  }

  // New Subscription Modal setup
  function setupSubscriptionModal() {
    const btnCreate = document.getElementById('btnCreateSubscription');
    const modal = document.getElementById('modalSubscription');
    const btnClose = document.getElementById('btnCloseSubModal');
    const btnCancel = document.getElementById('btnCancelSubModal');
    const btnAddLine = document.getElementById('btnAddSubLine');

    btnCreate?.addEventListener('click', () => {
      openNewSubscriptionModal();
    });

    btnClose?.addEventListener('click', () => closeModal('modalSubscription'));
    btnCancel?.addEventListener('click', () => closeModal('modalSubscription'));

    btnAddLine?.addEventListener('click', () => {
      appendSubscriptionLineItem();
      recalculateModalTotals();
    });

    // Template Picker
    const btnFromTpl = document.getElementById('btnNewFromTemplate');
    btnFromTpl?.addEventListener('click', () => {
      openTemplatePickerModal();
    });

    document.getElementById('formSubscription')?.addEventListener('submit', (e) => {
      e.preventDefault();
      saveNewSubscriptionFromModal();
    });

    // Live search & filters
    document.getElementById('subSearchInput')?.addEventListener('input', renderSubscriptions);
    document.getElementById('subStatusFilter')?.addEventListener('change', renderSubscriptions);
    document.getElementById('subPlanFilter')?.addEventListener('change', renderSubscriptions);
  }

  function openNewSubscriptionModal(prefilled = null) {
    // Populate customers
    const custSelect = document.getElementById('subCustomerSelect');
    custSelect.innerHTML = DB.customers.map(c => `<option value="${c.id}">${c.name} (${c.tier})</option>`).join('');

    // Populate plans
    const planSelect = document.getElementById('subPlanSelect');
    planSelect.innerHTML = DB.plans.map(p => `<option value="${p.id}">${p.name} — $${p.cost}/${p.frequency} (Min Qty: ${p.minQty})</option>`).join('');

    // Populate discounts
    const discSelect = document.getElementById('subApplyDiscount');
    discSelect.innerHTML = `<option value="">-- No Discount Applied --</option>` +
      DB.discounts.filter(d => d.status === 'Active').map(d => `<option value="${d.code}">${d.code} (${d.type === 'Percentage' ? d.value + '%' : '$' + d.value} off)</option>`).join('');

    document.getElementById('subStartDate').value = DB.simulationDate;
    
    // Default expiry 1 year out
    const nextYear = new Date(DB.simulationDate);
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    document.getElementById('subExpiryDate').value = nextYear.toISOString().split('T')[0];

    const tbody = document.getElementById('tbodySubLines');
    tbody.innerHTML = '';

    if (prefilled && prefilled.items) {
      if (prefilled.planId) planSelect.value = prefilled.planId;
      prefilled.items.forEach(item => {
        appendSubscriptionLineItem(item);
      });
    } else {
      // Default line item
      appendSubscriptionLineItem();
    }

    recalculateModalTotals();
    openModal('modalSubscription');
  }

  function appendSubscriptionLineItem(lineData = null) {
    const tbody = document.getElementById('tbodySubLines');
    const tr = document.createElement('tr');

    // Build product options
    let prodOptions = '';
    DB.products.forEach(p => {
      // Base
      const isBaseSelected = lineData && lineData.productId === p.id && (!lineData.variantName || lineData.variantName === 'Standard Edition');
      prodOptions += `<option value="${p.id}::Standard" data-price="${p.salesPrice}" ${isBaseSelected ? 'selected' : ''}>${p.name} ($${p.salesPrice})</option>`;
      
      // Variants
      (p.variants || []).forEach(v => {
        if (v.extraPrice > 0) {
          const varPrice = p.salesPrice + v.extraPrice;
          const isVarSelected = lineData && lineData.productId === p.id && lineData.variantName === v.name;
          prodOptions += `<option value="${p.id}::${v.name}" data-price="${varPrice}" ${isVarSelected ? 'selected' : ''}>${p.name} [${v.name} +$${v.extraPrice}] ($${varPrice})</option>`;
        }
      });
    });

    const initQty = lineData ? lineData.qty : 1;
    const initPrice = lineData ? lineData.unitPrice : (DB.products[0]?.salesPrice || 100);
    const initTax = lineData ? lineData.taxRate : 0.0825;

    tr.innerHTML = `
      <td>
        <select class="form-control form-control-sm line-prod-select">${prodOptions}</select>
      </td>
      <td>
        <input type="number" min="1" class="form-control form-control-sm line-qty" value="${initQty}">
      </td>
      <td>
        <input type="number" step="0.01" class="form-control form-control-sm line-price" value="${initPrice.toFixed(2)}">
      </td>
      <td>
        <select class="form-control form-control-sm line-tax">
          <option value="0.0825" ${initTax === 0.0825 ? 'selected' : ''}>Sales Tax (8.25%)</option>
          <option value="0.10" ${initTax === 0.10 ? 'selected' : ''}>VAT (10%)</option>
          <option value="0.00" ${initTax === 0.00 ? 'selected' : ''}>Zero Tax (0%)</option>
        </select>
      </td>
      <td class="line-amount" style="font-weight: 700;">$0.00</td>
      <td>
        <button type="button" class="btn btn-ghost btn-xs btn-remove-line" style="color: var(--color-danger); font-weight: 800;">✕</button>
      </td>
    `;

    tbody.appendChild(tr);

    // Event hooks
    const prodSelect = tr.querySelector('.line-prod-select');
    const qtyInput = tr.querySelector('.line-qty');
    const priceInput = tr.querySelector('.line-price');
    const taxSelect = tr.querySelector('.line-tax');
    const btnRemove = tr.querySelector('.btn-remove-line');

    prodSelect.addEventListener('change', () => {
      const opt = prodSelect.options[prodSelect.selectedIndex];
      const p = parseFloat(opt.dataset.price);
      if (!isNaN(p)) priceInput.value = p.toFixed(2);
      recalculateModalTotals();
    });

    [qtyInput, priceInput, taxSelect].forEach(inp => {
      inp.addEventListener('input', recalculateModalTotals);
      inp.addEventListener('change', recalculateModalTotals);
    });

    btnRemove.addEventListener('click', () => {
      if (tbody.children.length > 1) {
        tr.remove();
        recalculateModalTotals();
      } else {
        showToast('At least one product line is required.', 'warning');
      }
    });

    recalculateModalTotals();
  }

  function recalculateModalTotals() {
    const rows = document.querySelectorAll('#tbodySubLines tr');
    let subtotal = 0;
    let tax = 0;

    rows.forEach(tr => {
      const qty = parseFloat(tr.querySelector('.line-qty').value) || 0;
      const price = parseFloat(tr.querySelector('.line-price').value) || 0;
      const taxRate = parseFloat(tr.querySelector('.line-tax').value) || 0;
      const lineAmt = qty * price;

      tr.querySelector('.line-amount').textContent = formatCurrency(lineAmt);
      subtotal += lineAmt;
      tax += lineAmt * taxRate;
    });

    // Discount
    let discount = 0;
    const discCode = document.getElementById('subApplyDiscount')?.value;
    if (discCode) {
      const disc = DB.discounts.find(d => d.code === discCode && d.status === 'Active');
      if (disc) {
        if (disc.type === 'Percentage') discount = subtotal * (disc.value / 100);
        else if (disc.type === 'Fixed') discount = Math.min(disc.value, subtotal);
      }
    }

    const total = Math.max(0, subtotal - discount + tax);

    document.getElementById('lblModalSubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('lblModalTax').textContent = formatCurrency(tax);
    document.getElementById('lblModalDiscount').textContent = `-${formatCurrency(discount)}`;
    document.getElementById('lblModalTotal').textContent = formatCurrency(total);
  }

  function saveNewSubscriptionFromModal() {
    const customerId = document.getElementById('subCustomerSelect').value;
    const planId = document.getElementById('subPlanSelect').value;
    const paymentTerms = document.getElementById('subPaymentTerms').value;
    const startDate = document.getElementById('subStartDate').value;
    const expiryDate = document.getElementById('subExpiryDate').value;
    const initialStage = document.getElementById('subInitialStage').value;
    const discountCode = document.getElementById('subApplyDiscount').value || null;

    // Check Plan Min Qty rule
    const plan = DB.plans.find(p => p.id === planId);
    const rows = document.querySelectorAll('#tbodySubLines tr');
    const lines = [];
    let totalQty = 0;

    rows.forEach(tr => {
      const [prodId, varName] = tr.querySelector('.line-prod-select').value.split('::');
      const qty = parseInt(tr.querySelector('.line-qty').value, 10) || 1;
      const unitPrice = parseFloat(tr.querySelector('.line-price').value) || 0;
      const taxRate = parseFloat(tr.querySelector('.line-tax').value) || 0;
      totalQty += qty;

      lines.push({
        productId: prodId,
        variantName: varName === 'Standard' ? null : varName,
        qty,
        unitPrice,
        taxRate
      });
    });

    if (plan && totalQty < plan.minQty) {
      showToast(`Selected plan "${plan.name}" requires a minimum quantity of ${plan.minQty} seats. Current total: ${totalQty}.`, 'danger', 'Minimum Quantity Rule');
      return;
    }

    const nextIdNum = DB.subscriptions.length + 1;
    const subNumber = `SUBX-2026-0${nextIdNum < 10 ? '0' + nextIdNum : nextIdNum}`;

    const newSub = {
      id: 'sub-' + Date.now(),
      subNumber,
      customerId,
      planId,
      paymentTerms,
      startDate,
      expiryDate,
      nextBillingDate: initialStage === 'Active' ? startDate : null,
      lastBilledDate: null,
      stage: initialStage,
      discountCode,
      lines,
      logs: [
        { date: DB.simulationDate, event: `Created in stage "${initialStage}" by ${DB.currentUser.name}` }
      ]
    };

    DB.subscriptions.unshift(newSub);
    saveState();
    closeModal('modalSubscription');
    showToast(`Subscription ${subNumber} successfully saved in ${initialStage} stage.`, 'success', 'Saved');
    renderAll();
  }

  function openTemplatePickerModal() {
    const list = document.getElementById('templateListCards');
    if (!list) return;

    list.innerHTML = DB.quotationTemplates.map(tpl => {
      const plan = DB.plans.find(p => p.id === tpl.planId);
      return `
        <div class="glass-card mb-2" style="padding: 1rem; cursor: pointer; transition: all 0.2s; border: 1px solid var(--border-color);" data-tpl-id="${tpl.id}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
            <strong style="font-size: 0.95rem; color: var(--brand-primary);">${tpl.title}</strong>
            <span class="badge badge-quotation">Valid ${tpl.validityDays} Days</span>
          </div>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">${tpl.description}</p>
          <div style="font-size: 0.75rem; color: var(--text-muted);">
            Plan: <strong>${plan ? plan.name : 'Standard'}</strong> • ${tpl.items.length} Product Lines pre-configured
          </div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('[data-tpl-id]').forEach(card => {
      card.addEventListener('click', () => {
        const tplId = card.dataset.tplId;
        const tpl = DB.quotationTemplates.find(t => t.id === tplId);
        if (tpl) {
          closeModal('modalTemplatePicker');
          openNewSubscriptionModal(tpl);
        }
      });
    });

    openModal('modalTemplatePicker');
    document.getElementById('btnCloseTemplateModal')?.addEventListener('click', () => closeModal('modalTemplatePicker'));
  }

  // ==========================================
  // 3. BILLING & INVOICING ENGINE ("BILLING DAY")
  // ==========================================
  function setupBillingEngine() {
    const btnRunBilling = document.getElementById('btnTriggerBillingDay');
    btnRunBilling?.addEventListener('click', () => {
      runBatchBillingEngine();
    });

    const btnSimDate = document.getElementById('btnSimulationDay');
    btnSimDate?.addEventListener('click', () => {
      advanceSimulationDay();
    });

    // Invoices search & filters
    document.getElementById('invSearchInput')?.addEventListener('input', renderInvoices);
    document.getElementById('invStatusFilter')?.addEventListener('change', renderInvoices);
    document.getElementById('btnExportInvoicesCSV')?.addEventListener('click', exportInvoicesCSV);

    document.getElementById('btnManualInvoice')?.addEventListener('click', () => {
      // Find first active subscription to invoice
      const active = DB.subscriptions.find(s => s.stage === 'Active');
      if (active) {
        generateInvoiceForSubscription(active, true);
      } else {
        showToast('No active subscriptions available to bill.', 'warning');
      }
    });

    // Batch chase all overdue
    document.getElementById('btnBatchChaseOverdue')?.addEventListener('click', () => {
      const simDate = new Date(DB.simulationDate);
      const overdue = DB.invoices.filter(i => i.status !== 'Paid' && i.status !== 'Cancelled' && new Date(i.dueDate) < simDate);
      if (overdue.length === 0) {
        showToast('No overdue accounts to chase.', 'info');
        return;
      }
      showToast(`Dispatched overdue dunning reminders to ${overdue.length} accounts.`, 'warning', 'Batch Dunning');
    });
  }

  function advanceSimulationDay() {
    const cur = new Date(DB.simulationDate);
    cur.setDate(cur.getDate() + 15); // Advance 15 days forward
    DB.simulationDate = cur.toISOString().split('T')[0];
    document.getElementById('currentSimDateLabel').textContent = `Today: ${DB.simulationDate}`;
    saveState();
    showToast(`Simulation calendar advanced to ${DB.simulationDate}. Running automated policy checks...`, 'info', 'Calendar Advanced');

    // Check Plan auto-close policies
    DB.subscriptions.forEach(sub => {
      if (sub.stage === 'Active' && sub.expiryDate) {
        const exp = new Date(sub.expiryDate);
        const plan = DB.plans.find(p => p.id === sub.planId);
        if (plan && plan.autoCloseOnEnd && exp <= cur) {
          sub.stage = 'Closed';
          sub.logs.push({ date: DB.simulationDate, event: 'Auto-closed upon reaching plan expiry date' });
          showToast(`Subscription ${sub.subNumber} automatically closed as term concluded.`, 'info');
        }
      }
    });

    renderAll();
  }

  function runBatchBillingEngine() {
    measureExecutionTime('batch_billing', () => {
      const simDate = new Date(DB.simulationDate);
      let billedCount = 0;
      let totalBilledAmount = 0;

      // Rule: "Nothing should be billed twice or skipped"
      // Scan active subscriptions whose nextBillingDate <= simulationDate
      DB.subscriptions.forEach(sub => {
        if (sub.stage !== 'Active') return;

        let shouldBill = false;
        if (sub.nextBillingDate) {
          const nextBill = new Date(sub.nextBillingDate);
          if (nextBill <= simDate) {
            shouldBill = true;
          }
        } else {
          // If no nextBillingDate set yet, bill today
          shouldBill = true;
        }

        if (shouldBill) {
          const inv = generateInvoiceForSubscription(sub, false);
          if (inv) {
            billedCount++;
            totalBilledAmount += inv.totalAmount;
          }
        }
      });

      if (billedCount > 0) {
        saveState();
        showToast(`Billing Engine processed ${billedCount} due subscriptions. Total Invoiced: ${formatCurrency(totalBilledAmount)}. Deduplication enforced.`, 'success', 'Billing Day Complete');
      } else {
        showToast('All active subscriptions are current. No subscriptions due for billing on or before today.', 'info', 'Billing Up to Date');
      }

      renderAll();
    });
  }

  function generateInvoiceForSubscription(sub, isManualAdHoc = false) {
    const cust = DB.customers.find(c => c.id === sub.customerId);
    const plan = DB.plans.find(p => p.id === sub.planId);

    // Build line items
    let subtotal = 0;
    let taxAmount = 0;
    const lines = [];

    sub.lines.forEach(l => {
      const prod = DB.products.find(p => p.id === l.productId);
      const lineAmt = l.qty * l.unitPrice;
      const desc = `${prod ? prod.name : 'Software License'}${l.variantName ? ` (${l.variantName})` : ''}`;
      
      lines.push({
        description: desc,
        qty: l.qty,
        unitPrice: l.unitPrice,
        taxRate: l.taxRate || 0.0825,
        amount: lineAmt
      });

      subtotal += lineAmt;
      taxAmount += lineAmt * (l.taxRate || 0.0825);
    });

    // Discount Engine evaluation
    let discountAmount = 0;
    if (sub.discountCode) {
      const disc = DB.discounts.find(d => d.code === sub.discountCode);
      if (disc && disc.status === 'Active') {
        // Check date validity
        const sim = new Date(DB.simulationDate);
        const startOk = !disc.startDate || new Date(disc.startDate) <= sim;
        const endOk = !disc.endDate || new Date(disc.endDate) >= sim;
        const usageOk = !disc.usageLimit || (disc.usedCount < disc.usageLimit);

        if (startOk && endOk && usageOk) {
          if (disc.type === 'Percentage') {
            discountAmount = subtotal * (disc.value / 100);
          } else if (disc.type === 'Fixed') {
            discountAmount = Math.min(disc.value, subtotal);
          }
          disc.usedCount++;
          if (disc.usageLimit && disc.usedCount >= disc.usageLimit) {
            disc.status = 'Exhausted';
          }
        } else {
          disc.status = 'Expired';
          showToast(`Discount ${disc.code} has expired and was not applied.`, 'warning');
        }
      }
    }

    const totalAmount = Math.max(0, subtotal - discountAmount + taxAmount);

    // Calculate Due Date based on payment terms
    const issueDate = DB.simulationDate;
    const dueObj = new Date(issueDate);
    if (sub.paymentTerms === 'Net 15') dueObj.setDate(dueObj.getDate() + 15);
    else if (sub.paymentTerms === 'Net 30') dueObj.setDate(dueObj.getDate() + 30);
    else if (sub.paymentTerms === 'Net 60') dueObj.setDate(dueObj.getDate() + 60);

    const nextInvNum = DB.invoices.length + 1;
    const invoiceNumber = `INV-SUBX-0${nextInvNum < 10 ? '0' + nextInvNum : nextInvNum}`;

    const newInvoice = {
      id: 'inv-' + Date.now(),
      invoiceNumber,
      subscriptionId: sub.id,
      subNumber: sub.subNumber,
      customerId: sub.customerId,
      issueDate,
      dueDate: dueObj.toISOString().split('T')[0],
      lines,
      subtotal,
      discountAmount,
      taxAmount,
      totalAmount,
      amountPaid: 0.00,
      balanceDue: totalAmount,
      status: 'Confirmed', // Draft -> Confirmed -> Paid
      paymentTerms: sub.paymentTerms
    };

    DB.invoices.unshift(newInvoice);

    // Advance nextBillingDate on the subscription to prevent duplicate billing
    sub.lastBilledDate = issueDate;
    const nextBillObj = new Date(issueDate);
    if (plan) {
      if (plan.frequency === 'Daily') nextBillObj.setDate(nextBillObj.getDate() + 1);
      else if (plan.frequency === 'Weekly') nextBillObj.setDate(nextBillObj.getDate() + 7);
      else if (plan.frequency === 'Monthly') nextBillObj.setMonth(nextBillObj.getMonth() + 1);
      else if (plan.frequency === 'Yearly') nextBillObj.setFullYear(nextBillObj.getFullYear() + 1);
    } else {
      nextBillObj.setMonth(nextBillObj.getMonth() + 1);
    }
    sub.nextBillingDate = nextBillObj.toISOString().split('T')[0];

    if (!sub.logs) sub.logs = [];
    sub.logs.push({
      date: issueDate,
      event: `Invoice ${invoiceNumber} issued for ${formatCurrency(totalAmount)} (Next billing: ${sub.nextBillingDate})`
    });

    if (isManualAdHoc) {
      saveState();
      showToast(`Ad-hoc invoice ${invoiceNumber} generated for ${sub.subNumber}.`, 'success');
      renderAll();
    }

    return newInvoice;
  }

  function renderInvoices() {
    const tbody = document.getElementById('tbodyInvoices');
    if (!tbody) return;

    const query = (document.getElementById('invSearchInput')?.value || '').toLowerCase();
    const status = document.getElementById('invStatusFilter')?.value || 'ALL';

    const filtered = DB.invoices.filter(inv => {
      const cust = DB.customers.find(c => c.id === inv.customerId) || { name: '' };
      const matchesSearch = inv.invoiceNumber.toLowerCase().includes(query) ||
                            cust.name.toLowerCase().includes(query) ||
                            inv.subNumber.toLowerCase().includes(query);
      const matchesStatus = status === 'ALL' || inv.status === status;
      return matchesSearch && matchesStatus;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="11" style="text-align: center; color: var(--text-muted); padding: 2rem;">No matching invoices found.</td></tr>`;
      return;
    }

    const simDate = new Date(DB.simulationDate);

    tbody.innerHTML = filtered.map(inv => {
      const cust = DB.customers.find(c => c.id === inv.customerId) || { name: 'Customer' };
      const isOverdue = inv.status !== 'Paid' && inv.status !== 'Cancelled' && new Date(inv.dueDate) < simDate;
      const statusBadge = isOverdue ? `<span class="badge badge-overdue">OVERDUE</span>` : `<span class="badge badge-${inv.status.toLowerCase()}">${inv.status}</span>`;

      return `
        <tr>
          <td><strong>${inv.invoiceNumber}</strong></td>
          <td>${cust.name}</td>
          <td><span class="text-xs text-muted">${inv.subNumber}</span></td>
          <td>${inv.issueDate}</td>
          <td>${inv.dueDate}</td>
          <td>${formatCurrency(inv.subtotal)}</td>
          <td>
            <div class="text-xs text-muted">Tax: +${formatCurrency(inv.taxAmount)}</div>
            ${inv.discountAmount > 0 ? `<div class="text-xs text-success">Disc: -${formatCurrency(inv.discountAmount)}</div>` : ''}
          </td>
          <td><strong>${formatCurrency(inv.totalAmount)}</strong></td>
          <td>
            <div>${formatCurrency(inv.amountPaid)}</div>
            ${inv.balanceDue > 0 ? `<div class="text-xs text-danger">Due: ${formatCurrency(inv.balanceDue)}</div>` : ''}
          </td>
          <td>${statusBadge}</td>
          <td>
            <button class="btn btn-outline btn-xs btn-view-invoice" data-inv-id="${inv.id}">
              Review / Print
            </button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-view-invoice').forEach(btn => {
      btn.addEventListener('click', (e) => {
        openInvoiceDetailsModal(e.currentTarget.dataset.invId);
      });
    });
  }

  function openInvoiceDetailsModal(invId) {
    const inv = DB.invoices.find(i => i.id === invId);
    if (!inv) return;

    const cust = DB.customers.find(c => c.id === inv.customerId) || { name: 'Customer', email: 'cust@mail.com', address: 'Unknown' };
    const area = document.getElementById('invoicePrintableArea');

    area.innerHTML = `
      <div class="printable-invoice-card">
        <div class="inv-doc-header">
          <div>
            <div class="inv-brand-h">Brightloop Software.</div>
            <div class="text-xs text-muted">100 Tech Enterprise Blvd, Suite 400 • San Francisco, CA 94105</div>
            <div class="text-xs text-muted">Tax ID: US-EIN-94-2849102 • billing@brightloop.io</div>
          </div>
          <div style="text-align: right;">
            <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 4px;">INVOICE</h2>
            <div style="font-family: var(--font-mono); font-weight: 700; color: var(--brand-primary);">${inv.invoiceNumber}</div>
            <div style="margin-top: 6px;"><span class="badge badge-${inv.status.toLowerCase()}">${inv.status}</span></div>
          </div>
        </div>

        <div class="inv-meta-grid">
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Billed To</h4>
            <div style="font-weight: 700; font-size: 1rem;">${cust.name}</div>
            <div class="text-sm text-muted">${cust.email}</div>
            <div class="text-xs text-muted">${cust.address}</div>
          </div>
          <div style="text-align: right;">
            <div class="text-sm"><strong>Issue Date:</strong> ${inv.issueDate}</div>
            <div class="text-sm"><strong>Due Date:</strong> ${inv.dueDate}</div>
            <div class="text-sm"><strong>Payment Terms:</strong> ${inv.paymentTerms}</div>
            <div class="text-xs text-muted">Subscription Ref: <strong>${inv.subNumber}</strong></div>
          </div>
        </div>

        <table class="inv-table">
          <thead>
            <tr>
              <th style="width: 50%;">Description</th>
              <th style="width: 12%;">Qty</th>
              <th style="width: 18%;">Unit Price</th>
              <th style="width: 20%; text-align: right;">Line Amount</th>
            </tr>
          </thead>
          <tbody>
            ${inv.lines.map(l => `
              <tr>
                <td><strong>${l.description}</strong></td>
                <td>${l.qty}</td>
                <td>${formatCurrency(l.unitPrice)}</td>
                <td style="text-align: right; font-weight: 700;">${formatCurrency(l.amount)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="display: flex; justify-content: flex-end;">
          <div style="min-width: 260px; font-size: 0.88rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span>Subtotal:</span>
              <strong>${formatCurrency(inv.subtotal)}</strong>
            </div>
            ${inv.discountAmount > 0 ? `
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: var(--color-success);">
                <span>Promotional Discount:</span>
                <strong>-${formatCurrency(inv.discountAmount)}</strong>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span>Tax Calculation:</span>
              <strong>+${formatCurrency(inv.taxAmount)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 8px; padding-top: 8px; border-top: 2px solid #cbd5e1; font-size: 1.15rem; font-weight: 800; color: var(--brand-primary);">
              <span>Invoice Total:</span>
              <span>${formatCurrency(inv.totalAmount)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 4px; font-size: 0.85rem;">
              <span>Amount Paid:</span>
              <span>${formatCurrency(inv.amountPaid)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 4px; font-size: 0.95rem; font-weight: 800; color: ${inv.balanceDue > 0 ? 'var(--color-danger)' : 'var(--color-success)'};">
              <span>Balance Due:</span>
              <span>${formatCurrency(inv.balanceDue)}</span>
            </div>
          </div>
        </div>

        <div style="margin-top: 2.5rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; font-size: 0.75rem; color: #64748b; text-align: center;">
          Thank you for subscribing with Brightloop Software. Inquiries: support@brightloop.io • Bank Wire: US-CITI-084920402
        </div>
      </div>
    `;

    // Footer actions
    const footer = document.getElementById('invoiceDetailsFooter');
    let fHtml = '';

    if (inv.status === 'Draft') {
      fHtml += `<button type="button" class="btn btn-primary btn-confirm-inv">Confirm Invoice</button>`;
    }

    if (inv.status !== 'Paid' && inv.status !== 'Cancelled') {
      fHtml += `
        <button type="button" class="btn btn-success btn-pay-inv-direct">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/></svg>
          Record Settlement ($${inv.balanceDue.toFixed(2)})
        </button>
      `;
    }

    if (inv.status !== 'Cancelled' && inv.status !== 'Paid') {
      fHtml += `<button type="button" class="btn btn-outline btn-cancel-inv" style="color: var(--color-danger);">Cancel Invoice</button>`;
    }

    footer.innerHTML = fHtml;

    // Button hooks
    footer.querySelector('.btn-confirm-inv')?.addEventListener('click', () => {
      inv.status = 'Confirmed';
      saveState();
      showToast(`Invoice ${inv.invoiceNumber} confirmed.`, 'success');
      closeModal('modalInvoiceDetails');
      renderAll();
    });

    footer.querySelector('.btn-pay-inv-direct')?.addEventListener('click', () => {
      closeModal('modalInvoiceDetails');
      openRecordPaymentModal(inv.id);
    });

    footer.querySelector('.btn-cancel-inv')?.addEventListener('click', () => {
      inv.status = 'Cancelled';
      inv.balanceDue = 0;
      saveState();
      showToast(`Invoice ${inv.invoiceNumber} cancelled.`, 'warning');
      closeModal('modalInvoiceDetails');
      renderAll();
    });

    // Send email simulation
    document.getElementById('btnSendInvoiceEmail').onclick = () => {
      showToast(`Official Tax Invoice ${inv.invoiceNumber} emailed to ${cust.email}. PDF receipt attached.`, 'success', 'Invoice Dispatched');
    };

    // Print
    document.getElementById('btnPrintInvoice').onclick = () => {
      window.print();
    };

    openModal('modalInvoiceDetails');
    document.getElementById('btnCloseInvoiceModal')?.addEventListener('click', () => closeModal('modalInvoiceDetails'));
  }

  function exportInvoicesCSV() {
    let csv = 'Invoice Number,Subscription,Customer,Issue Date,Due Date,Subtotal,Tax,Discount,Total,Paid,Balance Due,Status\n';
    DB.invoices.forEach(inv => {
      const cust = DB.customers.find(c => c.id === inv.customerId) || { name: 'Customer' };
      csv += `"${inv.invoiceNumber}","${inv.subNumber}","${cust.name}","${inv.issueDate}","${inv.dueDate}",${inv.subtotal.toFixed(2)},${inv.taxAmount.toFixed(2)},${inv.discountAmount.toFixed(2)},${inv.totalAmount.toFixed(2)},${inv.amountPaid.toFixed(2)},${inv.balanceDue.toFixed(2)},"${inv.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Brightloop_Invoices_${DB.simulationDate}.csv`;
    a.click();
    showToast('Invoices CSV export generated.', 'success');
  }

  // ==========================================
  // 4. PAYMENTS ENGINE ("THE MONEY COMES IN")
  // ==========================================
  function setupPaymentsEngine() {
    const btnRecord = document.getElementById('btnRecordPaymentModal');
    btnRecord?.addEventListener('click', () => {
      openRecordPaymentModal();
    });

    document.getElementById('btnClosePaymentModal')?.addEventListener('click', () => closeModal('modalRecordPayment'));
    document.getElementById('btnCancelPaymentModal')?.addEventListener('click', () => closeModal('modalRecordPayment'));

    document.getElementById('formRecordPayment')?.addEventListener('submit', (e) => {
      e.preventDefault();
      saveIncomingPayment();
    });

    // Live search
    document.getElementById('paySearchInput')?.addEventListener('input', renderPayments);

    // Target invoice dropdown change listener to update balance help
    const selInv = document.getElementById('payInvoiceSelect');
    selInv?.addEventListener('change', () => {
      const invId = selInv.value;
      const inv = DB.invoices.find(i => i.id === invId);
      if (inv) {
        document.getElementById('payAmount').value = inv.balanceDue.toFixed(2);
        document.getElementById('payAmountRemainingHelp').textContent = `Outstanding balance: $${inv.balanceDue.toFixed(2)}`;
      }
    });
  }

  function openRecordPaymentModal(preselectedInvId = null) {
    const selInv = document.getElementById('payInvoiceSelect');
    const unpaidInvoices = DB.invoices.filter(i => i.status !== 'Paid' && i.status !== 'Cancelled');

    if (unpaidInvoices.length === 0) {
      showToast('All invoices are already paid in full!', 'info');
      return;
    }

    selInv.innerHTML = unpaidInvoices.map(i => {
      const cust = DB.customers.find(c => c.id === i.customerId) || { name: 'Customer' };
      const isSel = preselectedInvId === i.id;
      return `<option value="${i.id}" ${isSel ? 'selected' : ''}>${i.invoiceNumber} — ${cust.name} (Balance: $${i.balanceDue.toFixed(2)})</option>`;
    }).join('');

    const targetInv = DB.invoices.find(i => i.id === (preselectedInvId || unpaidInvoices[0]?.id));
    if (targetInv) {
      document.getElementById('payAmount').value = targetInv.balanceDue.toFixed(2);
      document.getElementById('payAmountRemainingHelp').textContent = `Outstanding balance: $${targetInv.balanceDue.toFixed(2)}`;
    }

    document.getElementById('payDate').value = DB.simulationDate;
    document.getElementById('payNotes').value = `Settlement received via online portal`;

    openModal('modalRecordPayment');
  }

  function saveIncomingPayment() {
    const invoiceId = document.getElementById('payInvoiceSelect').value;
    const amount = parseFloat(document.getElementById('payAmount').value) || 0;
    const method = document.getElementById('payMethod').value;
    const date = document.getElementById('payDate').value;
    const notes = document.getElementById('payNotes').value;

    const inv = DB.invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    if (amount <= 0) {
      showToast('Payment amount must be greater than $0.00.', 'danger');
      return;
    }

    const nextPayNum = DB.payments.length + 1;
    const paymentRef = `PAY-2026-88${nextPayNum < 10 ? '0' + nextPayNum : nextPayNum}`;

    const newPayment = {
      id: 'pay-' + Date.now(),
      paymentRef,
      invoiceId: inv.id,
      invoiceNumber: inv.invoiceNumber,
      customerId: inv.customerId,
      amount,
      date,
      method,
      notes: notes || 'Direct settlement',
      recordedBy: DB.currentUser.name
    };

    DB.payments.unshift(newPayment);

    // Update Invoice balances
    inv.amountPaid = (inv.amountPaid || 0) + amount;
    inv.balanceDue = Math.max(0, inv.totalAmount - inv.amountPaid);
    if (inv.balanceDue <= 0.001) {
      inv.status = 'Paid';
    } else {
      inv.status = 'Confirmed'; // Partially paid
    }

    saveState();
    closeModal('modalRecordPayment');
    showToast(`Payment ${paymentRef} for ${formatCurrency(amount)} recorded against ${inv.invoiceNumber}.`, 'success', 'Payment Registered');
    renderAll();
  }

  function renderPayments() {
    const tbody = document.getElementById('tbodyPayments');
    if (!tbody) return;

    const query = (document.getElementById('paySearchInput')?.value || '').toLowerCase();
    const filtered = DB.payments.filter(p => {
      const cust = DB.customers.find(c => c.id === p.customerId) || { name: '' };
      return p.paymentRef.toLowerCase().includes(query) ||
             p.invoiceNumber.toLowerCase().includes(query) ||
             cust.name.toLowerCase().includes(query) ||
             p.method.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 2rem;">No matching payments found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(p => {
      const cust = DB.customers.find(c => c.id === p.customerId) || { name: 'Customer' };
      return `
        <tr>
          <td><strong>${p.paymentRef}</strong></td>
          <td>${p.date}</td>
          <td><strong>${p.invoiceNumber}</strong></td>
          <td>${cust.name}</td>
          <td><span class="badge badge-draft">${p.method}</span></td>
          <td><strong class="text-success">${formatCurrency(p.amount)}</strong></td>
          <td><span class="text-xs text-muted">${p.notes || '-'}</span></td>
          <td><span class="text-xs">${p.recordedBy || 'System'}</span></td>
        </tr>
      `;
    }).join('');
  }

  // ==========================================
  // 5. PRODUCTS & VARIANTS (ADMIN)
  // ==========================================
  function setupProductCatalog() {
    const btnAdd = document.getElementById('btnOpenNewProductModal');
    btnAdd?.addEventListener('click', () => {
      openProductModal();
    });

    document.getElementById('btnCloseProductModal')?.addEventListener('click', () => closeModal('modalProduct'));
    document.getElementById('btnCancelProductModal')?.addEventListener('click', () => closeModal('modalProduct'));

    document.getElementById('btnAddVariantItem')?.addEventListener('click', () => {
      appendVariantRow();
    });

    document.getElementById('formProduct')?.addEventListener('submit', (e) => {
      e.preventDefault();
      saveProductFromModal();
    });
  }

  function openProductModal(prod = null) {
    document.getElementById('prodName').value = prod ? prod.name : '';
    document.getElementById('prodType').value = prod ? prod.type : 'Software';
    document.getElementById('prodSalesPrice').value = prod ? prod.salesPrice : '';
    document.getElementById('prodCostPrice').value = prod ? prod.costPrice : '';
    document.getElementById('prodNotes').value = prod ? prod.notes : '';

    const list = document.getElementById('variantItemsList');
    list.innerHTML = '';

    if (prod && prod.variants) {
      prod.variants.forEach(v => appendVariantRow(v.name, v.extraPrice));
    } else {
      // Default sample variant
      appendVariantRow('Standard Edition', 0);
      appendVariantRow('Odoo Brand Surcharge', 560);
    }

    openModal('modalProduct');
  }

  function appendVariantRow(name = '', extra = 0) {
    const list = document.getElementById('variantItemsList');
    const div = document.createElement('div');
    div.className = 'variant-row form-grid-2 mb-2';
    div.innerHTML = `
      <input type="text" class="form-control form-control-sm var-name" placeholder="Variant Name (e.g. Odoo Brand)" value="${name}" required>
      <div style="display: flex; gap: 6px;">
        <input type="number" step="0.01" min="0" class="form-control form-control-sm var-extra" placeholder="Extra Price (+$)" value="${extra}" required>
        <button type="button" class="btn btn-ghost btn-xs var-remove" style="color: var(--color-danger);">✕</button>
      </div>
    `;
    list.appendChild(div);

    div.querySelector('.var-remove').addEventListener('click', () => div.remove());
  }

  function saveProductFromModal() {
    const name = document.getElementById('prodName').value.trim();
    const type = document.getElementById('prodType').value;
    const salesPrice = parseFloat(document.getElementById('prodSalesPrice').value) || 0;
    const costPrice = parseFloat(document.getElementById('prodCostPrice').value) || 0;
    const notes = document.getElementById('prodNotes').value.trim();

    const variants = [];
    document.querySelectorAll('#variantItemsList .variant-row').forEach(row => {
      const vName = row.querySelector('.var-name').value.trim();
      const vExtra = parseFloat(row.querySelector('.var-extra').value) || 0;
      if (vName) {
        variants.push({ name: vName, extraPrice: vExtra });
      }
    });

    const newProd = {
      id: 'prod-' + Date.now(),
      name,
      type,
      salesPrice,
      costPrice,
      notes,
      variants
    };

    DB.products.push(newProd);
    saveState();
    closeModal('modalProduct');
    showToast(`Product "${name}" with ${variants.length} variants added to catalog.`, 'success', 'Product Published');
    renderAll();
  }

  function renderProducts() {
    const container = document.getElementById('productGridCards');
    if (!container) return;

    container.innerHTML = DB.products.map(p => {
      const typeBadge = {
        Software: 'badge-quotation',
        'Add-on': 'badge-active',
        Service: 'badge-confirmed'
      }[p.type] || 'badge-draft';

      return `
        <div class="product-card">
          <div class="card-top-tag">
            <span class="badge ${typeBadge}">${p.type}</span>
            <span class="text-xs text-muted">Cost: ${formatCurrency(p.costPrice)}</span>
          </div>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 4px;">${p.name}</h3>
          <p class="text-xs text-muted" style="flex: 1; margin-bottom: 0.75rem;">${p.notes || 'No notes specified.'}</p>
          <div class="product-price">${formatCurrency(p.salesPrice)} <span class="price-period">base</span></div>
          
          <div class="product-variants-box">
            <div style="font-weight: 700; font-size: 0.72rem; text-transform: uppercase; margin-bottom: 4px; color: var(--text-muted);">Available Variants:</div>
            <div>
              ${(p.variants || []).map(v => `
                <span class="variant-pill">${v.name} ${v.extraPrice > 0 ? `(+$${v.extraPrice})` : ''}</span>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // 6. PLANS & LIFECYCLE POLICIES (ADMIN)
  // ==========================================
  function setupPlanManagement() {
    const btnAdd = document.getElementById('btnOpenNewPlanModal');
    btnAdd?.addEventListener('click', () => {
      openModal('modalPlan');
    });

    document.getElementById('btnClosePlanModal')?.addEventListener('click', () => closeModal('modalPlan'));
    document.getElementById('btnCancelPlanModal')?.addEventListener('click', () => closeModal('modalPlan'));

    document.getElementById('formPlan')?.addEventListener('submit', (e) => {
      e.preventDefault();
      savePlanFromModal();
    });
  }

  function savePlanFromModal() {
    const name = document.getElementById('planName').value.trim();
    const cost = parseFloat(document.getElementById('planCost').value) || 0;
    const frequency = document.getElementById('planFrequency').value;
    const minQty = parseInt(document.getElementById('planMinQty').value, 10) || 1;
    const startDate = document.getElementById('planAvailableStart').value;
    const endDate = document.getElementById('planAvailableEnd').value;

    const autoCloseOnEnd = document.getElementById('ruleAutoClose').checked;
    const allowEarlyClose = document.getElementById('ruleAllowEarlyClose').checked;
    const allowPause = document.getElementById('ruleAllowPause').checked;
    const allowRenew = document.getElementById('ruleAllowRenew').checked;

    const newPlan = {
      id: 'plan-' + Date.now(),
      name,
      cost,
      frequency,
      minQty,
      startDate: startDate || '2026-01-01',
      endDate: endDate || '2028-12-31',
      autoCloseOnEnd,
      allowEarlyClose,
      allowPause,
      allowRenew
    };

    DB.plans.push(newPlan);
    saveState();
    closeModal('modalPlan');
    showToast(`Plan "${name}" created with configured lifecycle rules.`, 'success', 'Plan Activated');
    renderAll();
  }

  function renderPlans() {
    const container = document.getElementById('plansGridCards');
    if (!container) return;

    container.innerHTML = DB.plans.map(p => {
      return `
        <div class="plan-card">
          <div class="card-top-tag">
            <span class="badge badge-quotation">${p.frequency} Cadence</span>
            <span class="text-xs text-muted">Min Qty: ${p.minQty}</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 2px;">${p.name}</h3>
          <div class="plan-price">${formatCurrency(p.cost)} <span class="price-period">/${p.frequency.toLowerCase()}</span></div>
          <div class="text-xs text-muted mb-2">Available: ${p.startDate} to ${p.endDate || 'Unlimited'}</div>

          <div style="background: var(--bg-secondary); border-radius: var(--radius-md); padding: 0.75rem; margin-top: auto; font-size: 0.75rem; display: flex; flex-direction: column; gap: 4px;">
            <div style="font-weight: 700; color: var(--text-muted); text-transform: uppercase; font-size: 0.7rem;">Admin Lifecycle Policies:</div>
            <div>${p.autoCloseOnEnd ? '🔒 Auto-closes when end date reached' : '🔄 Does not auto-close'}</div>
            <div>${p.allowEarlyClose ? '✓ Early cancellation permitted' : '✕ No early cancellation'}</div>
            <div>${p.allowPause ? '✓ Subscription pausing enabled' : '✕ Pausing prohibited'}</div>
            <div>${p.allowRenew ? '✓ Renewable for future terms' : '✕ Non-renewable'}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // 7. DISCOUNTS & PROMOTIONS (ADMIN)
  // ==========================================
  function setupDiscountManagement() {
    const btnAdd = document.getElementById('btnOpenNewDiscountModal');
    btnAdd?.addEventListener('click', () => {
      openDiscountModal();
    });

    document.getElementById('btnCloseDiscountModal')?.addEventListener('click', () => closeModal('modalDiscount'));
    document.getElementById('btnCancelDiscountModal')?.addEventListener('click', () => closeModal('modalDiscount'));

    document.getElementById('discScope')?.addEventListener('change', (e) => {
      const isSpecific = e.target.value === 'SPECIFIC';
      document.getElementById('discProductWrap')?.classList.toggle('hidden', !isSpecific);
    });

    document.getElementById('formDiscount')?.addEventListener('submit', (e) => {
      e.preventDefault();
      saveDiscountFromModal();
    });
  }

  function openDiscountModal() {
    // Populate products in target
    const targetSel = document.getElementById('discTargetProduct');
    targetSel.innerHTML = DB.products.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    document.getElementById('discStartDate').value = DB.simulationDate;
    openModal('modalDiscount');
  }

  function saveDiscountFromModal() {
    const code = document.getElementById('discCode').value.trim().toUpperCase();
    const type = document.getElementById('discType').value;
    const value = parseFloat(document.getElementById('discValue').value) || 0;
    const usageLimit = parseInt(document.getElementById('discUsageLimit').value, 10) || null;
    const minPurchase = parseFloat(document.getElementById('discMinPurchase').value) || 0;
    const minQty = parseInt(document.getElementById('discMinQty').value, 10) || 1;
    const startDate = document.getElementById('discStartDate').value;
    const endDate = document.getElementById('discEndDate').value;
    const scope = document.getElementById('discScope').value;
    const targetProductId = scope === 'SPECIFIC' ? document.getElementById('discTargetProduct').value : null;

    // Code uniqueness check
    if (DB.discounts.some(d => d.code === code)) {
      showToast(`Promo code "${code}" already exists.`, 'danger');
      return;
    }

    const newDisc = {
      id: 'disc-' + Date.now(),
      code,
      type,
      value,
      minPurchase,
      minQty,
      startDate: startDate || DB.simulationDate,
      endDate: endDate || null,
      usageLimit,
      usedCount: 0,
      scope,
      targetProductId,
      status: 'Active'
    };

    DB.discounts.push(newDisc);
    saveState();
    closeModal('modalDiscount');
    showToast(`Discount rule "${code}" created by Admin.`, 'success', 'Discount Live');
    renderAll();
  }

  function renderDiscounts() {
    const tbody = document.getElementById('tbodyDiscounts');
    if (!tbody) return;

    tbody.innerHTML = DB.discounts.map(d => {
      const typeText = d.type === 'Percentage' ? `${d.value}% Off` : `$${d.value.toFixed(2)} Off`;
      const validity = `${d.startDate || 'Any'} to ${d.endDate || 'Unlimited'}`;
      const usage = d.usageLimit ? `${d.usedCount} / ${d.usageLimit}` : `${d.usedCount} (No limit)`;
      const statusBadge = d.status === 'Active' ? 'badge-active' : 'badge-draft';

      return `
        <tr>
          <td><strong style="font-family: var(--font-mono); color: var(--brand-primary);">${d.code}</strong></td>
          <td><strong>${typeText}</strong></td>
          <td>
            <div class="text-xs">Min Seats: <strong>${d.minQty || 1}</strong></div>
            <div class="text-xs text-muted">Min Total: $${(d.minPurchase || 0).toFixed(2)}</div>
          </td>
          <td><span class="badge badge-draft">${d.scope === 'ALL' ? 'Whole Order' : 'Specific Product'}</span></td>
          <td><span class="text-xs text-muted">${validity}</span></td>
          <td>${usage}</td>
          <td><span class="badge ${statusBadge}">${d.status}</span></td>
          <td>
            <button class="btn btn-outline btn-xs btn-toggle-disc" data-disc-id="${d.id}">
              ${d.status === 'Active' ? 'Deactivate' : 'Activate'}
            </button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-toggle-disc').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const disc = DB.discounts.find(d => d.id === e.currentTarget.dataset.discId);
        if (disc) {
          disc.status = disc.status === 'Active' ? 'Expired' : 'Active';
          saveState();
          showToast(`Discount ${disc.code} status toggled to ${disc.status}.`, 'info');
          renderDiscounts();
        }
      });
    });
  }

  // ==========================================
  // 8. STAFF ACCESS CONTROL (ADMIN ONLY)
  // ==========================================
  function setupStaffManagement() {
    const btnAdd = document.getElementById('btnOpenNewStaffModal');
    btnAdd?.addEventListener('click', () => {
      openModal('modalStaff');
    });

    document.getElementById('btnCloseStaffModal')?.addEventListener('click', () => closeModal('modalStaff'));
    document.getElementById('btnCancelStaffModal')?.addEventListener('click', () => closeModal('modalStaff'));

    document.getElementById('formStaff')?.addEventListener('submit', (e) => {
      e.preventDefault();
      saveStaffFromModal();
    });
  }

  function saveStaffFromModal() {
    const name = document.getElementById('staffName').value.trim();
    const email = document.getElementById('staffEmail').value.trim().toLowerCase();
    const role = document.getElementById('staffRole').value;
    const dept = document.getElementById('staffDept').value;
    const pass = document.getElementById('staffTempPass').value;

    // Check email uniqueness
    if (DB.users.some(u => u.email.toLowerCase() === email)) {
      showToast(`User with email "${email}" already exists.`, 'danger', 'Duplicate Email');
      return;
    }

    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'ST';
    const newStaff = {
      id: 'usr-staff-' + Date.now(),
      name,
      email,
      role,
      dept,
      status: 'Active',
      lastActive: 'Just registered'
    };

    DB.users.push(newStaff);
    saveState();
    closeModal('modalStaff');
    showToast(`Staff member ${name} (${role.toUpperCase()}) provisioned with department ${dept}.`, 'success', 'Staff Added');
    renderAll();
  }

  function renderStaff() {
    const tbody = document.getElementById('tbodyStaff');
    if (!tbody) return;

    const staffMembers = DB.users.filter(u => u.role === 'admin' || u.role === 'staff');

    tbody.innerHTML = staffMembers.map(u => {
      const isSelf = u.id === DB.currentUser.id;
      const roleBadge = u.role === 'admin' ? 'badge-quotation' : 'badge-confirmed';

      return `
        <tr>
          <td><strong>${u.name}</strong> ${isSelf ? '<span class="badge badge-active">You</span>' : ''}</td>
          <td>${u.email}</td>
          <td><span class="badge ${roleBadge}">${u.role.toUpperCase()}</span></td>
          <td>${u.dept || 'Operations'}</td>
          <td><span class="badge badge-active">${u.status}</span></td>
          <td><span class="text-xs text-muted">${u.lastActive || 'Today'}</span></td>
          <td>
            ${!isSelf && u.role !== 'admin' ? `
              <button class="btn btn-ghost btn-xs btn-remove-staff" data-user-id="${u.id}" style="color: var(--color-danger);">
                Revoke Access
              </button>
            ` : '<span class="text-xs text-muted">Protected</span>'}
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-remove-staff').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const uId = e.currentTarget.dataset.userId;
        DB.users = DB.users.filter(u => u.id !== uId);
        saveState();
        showToast('Staff credentials revoked.', 'warning');
        renderStaff();
      });
    });
  }

  // ==========================================
  // 9. CUSTOMER SELF-SERVICE PORTAL
  // ==========================================
  function renderCustomerPortal() {
    // Current customer identity
    const custId = 'cust-1'; // Apex Retailers
    const cust = DB.customers.find(c => c.id === custId) || { name: 'Apex Retailers' };
    document.getElementById('customerPortalOrgName').textContent = cust.name;

    const custSubs = DB.subscriptions.filter(s => s.customerId === custId);
    const activeSub = custSubs.find(s => s.stage === 'Active') || custSubs[0];

    const plan = DB.plans.find(p => p.id === activeSub?.planId) || { name: 'Growth Monthly' };
    document.getElementById('custPortalPlanName').textContent = plan.name;
    document.getElementById('custPortalNextRenewal').textContent = activeSub?.nextBillingDate || '2026-11-15';

    // Pending invoices count
    const pendingInvs = DB.invoices.filter(i => i.customerId === custId && i.status !== 'Paid' && i.status !== 'Cancelled');
    document.getElementById('custPortalPendingInvoices').textContent = pendingInvs.length;

    // Subscriptions list
    const subsContainer = document.getElementById('customerSubsContainer');
    if (subsContainer) {
      if (custSubs.length === 0) {
        subsContainer.innerHTML = `<div class="p-4 text-muted">No subscriptions found for your account.</div>`;
      } else {
        subsContainer.innerHTML = custSubs.map(s => {
          const sPlan = DB.plans.find(p => p.id === s.planId) || { name: 'Plan', frequency: 'Monthly' };
          const sTotal = calculateSubscriptionTotal(s);
          return `
            <div style="padding: 1rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <strong style="font-size: 1rem;">${s.subNumber}</strong>
                  <span class="badge badge-${s.stage.toLowerCase()}">${s.stage}</span>
                </div>
                <div class="text-sm text-muted">${sPlan.name} • ${sPlan.frequency} Cadence</div>
                <div class="text-xs text-muted">Active lines: ${s.lines.length} products & add-ons</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 1.2rem; font-weight: 800; color: var(--brand-primary);">${formatCurrency(sTotal)}</div>
                <div class="text-xs text-muted">Renewing: ${s.nextBillingDate || 'N/A'}</div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Modular Add-ons Switchboard
    // Allows customers to toggle add-ons on or off directly!
    const switchboard = document.getElementById('customerAddonSwitchboard');
    if (switchboard && activeSub) {
      const addons = DB.products.filter(p => p.type === 'Add-on');

      switchboard.innerHTML = addons.map(addon => {
        // Is this addon present in activeSub.lines?
        const isEnabled = activeSub.lines.some(l => l.productId === addon.id);

        return `
          <div class="addon-switch-row">
            <div class="addon-info">
              <h4>${addon.name} <span class="text-xs text-muted">($${addon.salesPrice.toFixed(2)}/mo)</span></h4>
              <p>${addon.notes}</p>
            </div>
            <div>
              <label class="toggle-switch">
                <input type="checkbox" class="addon-toggle-input" data-addon-id="${addon.id}" ${isEnabled ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        `;
      }).join('');

      switchboard.querySelectorAll('.addon-toggle-input').forEach(input => {
        input.addEventListener('change', (e) => {
          const addonId = e.target.dataset.addonId;
          const isChecked = e.target.checked;
          const addon = DB.products.find(p => p.id === addonId);

          if (isChecked) {
            // Add to lines
            activeSub.lines.push({
              productId: addon.id,
              variantName: addon.variants?.[0]?.name || null,
              qty: 1,
              unitPrice: addon.salesPrice,
              taxRate: 0.0825
            });
            activeSub.logs.push({ date: DB.simulationDate, event: `Customer toggled ON add-on "${addon.name}" via portal` });
            showToast(`Add-on "${addon.name}" activated! Added to recurring subscription.`, 'success', 'Feature Enabled');
          } else {
            // Remove from lines
            activeSub.lines = activeSub.lines.filter(l => l.productId !== addonId);
            activeSub.logs.push({ date: DB.simulationDate, event: `Customer toggled OFF add-on "${addon.name}" via portal` });
            showToast(`Add-on "${addon.name}" switched off. Future billing adjusted.`, 'info', 'Feature Disabled');
          }

          saveState();
          renderCustomerPortal();
        });
      });
    }
  }

  function renderCustomerInvoices() {
    const tbody = document.getElementById('tbodyCustomerInvoices');
    if (!tbody) return;

    const custId = 'cust-1'; // Apex Retailers
    const custInvoices = DB.invoices.filter(i => i.customerId === custId);

    if (custInvoices.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">No invoices on record.</td></tr>`;
      return;
    }

    tbody.innerHTML = custInvoices.map(inv => {
      const isOverdue = inv.status !== 'Paid' && inv.status !== 'Cancelled' && new Date(inv.dueDate) < new Date(DB.simulationDate);
      const statusBadge = isOverdue ? `<span class="badge badge-overdue">OVERDUE</span>` : `<span class="badge badge-${inv.status.toLowerCase()}">${inv.status}</span>`;

      return `
        <tr>
          <td><strong>${inv.invoiceNumber}</strong></td>
          <td>${inv.issueDate}</td>
          <td>${inv.dueDate}</td>
          <td><strong>${formatCurrency(inv.totalAmount)}</strong></td>
          <td><strong class="${inv.balanceDue > 0 ? 'text-danger' : 'text-success'}">${formatCurrency(inv.balanceDue)}</strong></td>
          <td>${statusBadge}</td>
          <td>
            <button class="btn btn-outline btn-xs btn-cust-view-inv" data-inv-id="${inv.id}">View / Print</button>
            ${inv.balanceDue > 0 ? `
              <button class="btn btn-primary btn-xs btn-cust-pay-inv" data-inv-id="${inv.id}">Pay Now</button>
            ` : ''}
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-cust-view-inv').forEach(btn => {
      btn.addEventListener('click', (e) => openInvoiceDetailsModal(e.currentTarget.dataset.invId));
    });

    tbody.querySelectorAll('.btn-cust-pay-inv').forEach(btn => {
      btn.addEventListener('click', (e) => openRecordPaymentModal(e.currentTarget.dataset.invId));
    });
  }

  // ==========================================
  // GLOBAL MODAL CONTROLS & BADGES
  // ==========================================
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  // Backdrop click listener to dismiss modals
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
      }
    });
  });

  function updateBadges() {
    const activeCount = DB.subscriptions.filter(s => s.stage === 'Active').length;
    const quotesCount = DB.subscriptions.filter(s => s.stage === 'Quotation' || s.stage === 'Draft').length;
    const simDate = new Date(DB.simulationDate);
    const overdueCount = DB.invoices.filter(i => i.status !== 'Paid' && i.status !== 'Cancelled' && new Date(i.dueDate) < simDate).length;

    const bActive = document.getElementById('badgeActiveSubs');
    const bQuotes = document.getElementById('badgeDraftQuotes');
    const bOverdue = document.getElementById('badgeOverdueInvoices');

    if (bActive) bActive.textContent = activeCount;
    if (bQuotes) bQuotes.textContent = quotesCount;
    if (bOverdue) bOverdue.textContent = overdueCount;
  }

  function setupThemeToggle() {
    const btn = document.getElementById('btnThemeToggle');
    const iconSun = document.getElementById('themeIconSun');
    const iconMoon = document.getElementById('themeIconMoon');

    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    if (savedTheme === 'dark') {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      iconSun.classList.add('hidden');
      iconMoon.classList.remove('hidden');
    }

    btn?.addEventListener('click', () => {
      const isDark = document.body.classList.contains('theme-dark');
      if (isDark) {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
        iconSun.classList.remove('hidden');
        iconMoon.classList.add('hidden');
        localStorage.setItem(THEME_KEY, 'light');
      } else {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
        iconSun.classList.add('hidden');
        iconMoon.classList.remove('hidden');
        localStorage.setItem(THEME_KEY, 'dark');
      }
    });

    document.getElementById('btnAuthModalToggle')?.addEventListener('click', () => {
      openModal('modalAuth');
    });

    document.getElementById('btnCloseAuthModal')?.addEventListener('click', () => {
      closeModal('modalAuth');
    });
  }

  // ==========================================
  // PORTAL ENTRY & CREDENTIALS WORKFLOW
  // ==========================================
  let selectedLoginRole = 'admin'; // 'admin', 'staff', 'customer'

  function setupPortalEntryWorkflow() {
    const stepSelect = document.getElementById('entryStepSelectRole');
    const stepLogin = document.getElementById('entryStepLogin');

    const cardAdmin = document.getElementById('cardSelectAdmin');
    const cardStaff = document.getElementById('cardSelectStaff');
    const cardCustomer = document.getElementById('cardSelectCustomer');
    const btnBack = document.getElementById('btnBackToRoles');
    const btnLogout = document.getElementById('btnLogoutToPortal');

    const btnNewSignIn = document.getElementById('btnEntryNewSignIn');
    const btnOpenSignUp = document.getElementById('btnLoginOpenSignUp');
    const btnEntryTheme = document.getElementById('btnEntryThemeToggle');

    const formLogin = document.getElementById('formPortalLogin');
    const inputUsername = document.getElementById('portalUsername');
    const inputPassword = document.getElementById('portalPassword');
    const errorMsg = document.getElementById('portalLoginError');

    // Switch theme on entry screen
    btnEntryTheme?.addEventListener('click', () => {
      document.getElementById('btnThemeToggle')?.click();
    });

    // 1. Role Card Click handlers
    cardAdmin?.addEventListener('click', () => openRoleLogin('admin'));
    cardStaff?.addEventListener('click', () => openRoleLogin('staff'));
    cardCustomer?.addEventListener('click', () => openRoleLogin('customer'));

    // Back to 3 options
    btnBack?.addEventListener('click', () => {
      stepLogin.classList.add('hidden');
      stepSelect.classList.remove('hidden');
      errorMsg.classList.add('hidden');
    });

    // Log Out / Switch Portal from main app header
    btnLogout?.addEventListener('click', () => {
      document.body.classList.add('portal-active');
      stepLogin.classList.add('hidden');
      stepSelect.classList.remove('hidden');
      inputUsername.value = '';
      inputPassword.value = '';
      errorMsg.classList.add('hidden');
    });

    // Sign In / Register buttons for new businesses finding Brightloop online
    const openAuth = () => {
      openModal('modalAuth');
    };
    btnNewSignIn?.addEventListener('click', openAuth);
    btnOpenSignUp?.addEventListener('click', openAuth);

    // 2. Open Role Login view with dynamic customized rules
    function openRoleLogin(role) {
      selectedLoginRole = role;
      stepSelect.classList.add('hidden');
      stepLogin.classList.remove('hidden');
      errorMsg.classList.add('hidden');
      inputUsername.value = '';
      inputPassword.value = '';

      const iconWrap = document.getElementById('loginRoleIcon');
      const titleEl = document.getElementById('loginRoleTitle');
      const subEl = document.getElementById('loginRoleSubtitle');
      const ruleBox = document.getElementById('credentialRuleBox');

      if (role === 'admin') {
        iconWrap.className = 'login-role-icon-wrap icon-admin';
        iconWrap.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
        titleEl.textContent = 'Admin Portal Login';
        subEl.textContent = 'Single administrator authority over the entire SUBX system';
        ruleBox.innerHTML = `
          <div><strong>System Administrator Authentication:</strong></div>
          <div style="margin-top: 4px; color: var(--text-muted);">Please enter your authorized administrator username and password to proceed. Credentials are strictly verified.</div>
        `;
        inputUsername.placeholder = 'Admin Email Address';
        inputPassword.placeholder = '••••••••••••';
      } else if (role === 'staff') {
        iconWrap.className = 'login-role-icon-wrap icon-staff';
        iconWrap.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
        titleEl.textContent = 'Internal Staff Login';
        subEl.textContent = 'Day-to-day customer quotes, subscription lifecycles, billing and payments';
        ruleBox.innerHTML = `
          <div><strong>Staff Access Requirement:</strong></div>
          <div style="margin-top: 4px;">• Username format: <code>("NAME OF THE STAFF")SUBX@gmail.com</code> (e.g. <code>anilaSUBX@gmail.com</code>)</div>
          <div>• Password: Enter your staff access password</div>
        `;
        inputUsername.placeholder = 'e.g. anilaSUBX@gmail.com';
        inputPassword.placeholder = '••••••••••••';
      } else if (role === 'customer') {
        iconWrap.className = 'login-role-icon-wrap icon-customer';
        iconWrap.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;
        titleEl.textContent = 'Customer Self-Service Portal';
        subEl.textContent = 'Manage active subscriptions, toggle modular add-ons, and view/pay invoices';
        ruleBox.innerHTML = `
          <div><strong>Customer Account Security Requirements:</strong></div>
          <div style="margin-top: 4px;">• Username: must be your <strong>email address</strong> (each email belongs to only one account).</div>
          <div>• Password: must be <strong>more than 8 characters</strong>, with at least <strong>1 uppercase</strong>, <strong>1 lowercase</strong>, and <strong>1 special character</strong>.</div>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">If you forget your password, you can request a reset link to your registered email.</div>
        `;
        inputUsername.placeholder = 'name@business.com';
        inputPassword.placeholder = '••••••••••••';
      }

      setTimeout(() => inputUsername.focus(), 50);
    }

    // 3. Form Submission & Validation per User Rules
    formLogin?.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = inputUsername.value.trim();
      const p = inputPassword.value;

      errorMsg.classList.add('hidden');
      errorMsg.textContent = '';

      if (selectedLoginRole === 'admin') {
        // "there will be only one admin and the admin login password and username is preset for admin, as Admin@gmail.com and password as Admin@123 and it should be kept hidden.only we direct admins to the next page if they enter this usernasme and password ."
        if (u.toLowerCase() === 'admin@gmail.com' && p === 'Admin@123') {
          performSuccessfulLogin('admin', 'usr-admin-1', 'System Admin (Admin@gmail.com)');
        } else {
          showLoginError('Access Denied: Invalid administrator credentials.');
        }
      } else if (selectedLoginRole === 'staff') {
        // "for staff, username should be in the format ("NAME OF THE STAFF")SUBX@gmail.com . and the password for staff is set as Admin#power.it should also be hidden"
        const lowerU = u.toLowerCase();
        const suffix = 'subx@gmail.com';
        const hasValidFormat = lowerU.endsWith(suffix) && lowerU.length > suffix.length;

        if (hasValidFormat && p === 'Admin#power') {
          const rawName = u.slice(0, -suffix.length);
          const staffName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
          performSuccessfulLogin('staff', 'usr-staff-2', `${staffName} (${u})`);
        } else {
          showLoginError('Access Denied: Invalid staff username or password. Username must be in the format ("NAME OF THE STAFF")SUBX@gmail.com.');
        }
      } else if (selectedLoginRole === 'customer') {
        // "for customer, they can set whatever they like as pass and username (username should be an email address. Each email can belong to only one account, and the password must be more than eight characters, with an uppercase letter, a lowercase letter and a special character. If they forget it later, a reset link should arrive at their registered email."
        
        // 1. Email check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(u)) {
          showLoginError('Customer username must be a valid email address (e.g. client@business.com).');
          return;
        }

        // 2. Strong password policy check
        const policy = validatePasswordPolicy(p);
        if (!policy.len || !policy.upper || !policy.lower || !policy.special) {
          showLoginError('Password must be more than 8 characters, containing at least 1 uppercase letter, 1 lowercase letter, and 1 special character.');
          return;
        }

        // 3. Unique email account check / registration
        const lowerEmail = u.toLowerCase();
        let existingUser = DB.users.find(usr => usr.email.toLowerCase() === lowerEmail);

        if (!existingUser) {
          // Register this new customer account with their unique email & password
          const displayName = u.split('@')[0];
          const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1) + ' Ltd.';
          const newCustId = 'cust-' + Date.now();
          
          existingUser = {
            id: 'usr-cust-' + Date.now(),
            name: formattedName,
            email: u,
            password: p,
            role: 'customer',
            dept: 'Client Portal',
            status: 'Active',
            lastActive: 'Just now'
          };

          DB.users.push(existingUser);
          DB.customers.push({
            id: newCustId,
            name: formattedName,
            email: u,
            phone: '+1 (555) 800-SUBX',
            address: 'Online Registered Subscriber',
            tier: 'Standard'
          });

          // Create a starter subscription for this new customer
          DB.subscriptions.push({
            id: 'sub-' + Date.now(),
            subNumber: `SUBX-2026-0${DB.subscriptions.length + 1}`,
            customerId: newCustId,
            planId: 'plan-1',
            paymentTerms: 'Immediate',
            startDate: DB.simulationDate,
            expiryDate: '2027-10-31',
            nextBillingDate: '2026-11-30',
            lastBilledDate: DB.simulationDate,
            stage: 'Active',
            discountCode: null,
            lines: [
              { productId: 'prod-1', variantName: 'Standard Edition', qty: 1, unitPrice: 299.00, taxRate: 0.0825 }
            ],
            logs: [{ date: DB.simulationDate, event: 'Account self-registered via SUBX portal' }]
          });

          saveState();
          showToast(`New customer account created for ${u}! Unique email registered.`, 'success', 'Account Registered');
        } else {
          // If already belongs to non-customer (e.g. admin or staff)
          if (existingUser.role !== 'customer') {
            showLoginError(`Email "${u}" is registered as an internal ${existingUser.role.toUpperCase()} account and cannot be used for customer portal.`);
            return;
          }
        }

        performSuccessfulLogin('customer', existingUser.id, existingUser.name);
      }
    });

    function showLoginError(msg) {
      errorMsg.textContent = msg;
      errorMsg.classList.remove('hidden');
    }

    function performSuccessfulLogin(role, defaultUserId, displayName) {
      document.body.classList.remove('portal-active');

      let targetUser = DB.users.find(usr => usr.id === defaultUserId) || DB.users.find(usr => usr.role === role);
      if (!targetUser) {
        targetUser = {
          id: 'usr-' + Date.now(),
          name: displayName,
          email: `${role}@brightloop.io`,
          role: role,
          dept: role === 'admin' ? 'Executive' : (role === 'staff' ? 'Sales / Staff' : 'Client'),
          status: 'Active',
          lastActive: 'Just now'
        };
        DB.users.push(targetUser);
      } else if (displayName) {
        targetUser.name = displayName;
      }

      const initials = (targetUser.name || 'US').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'BL';
      DB.currentUser = {
        id: targetUser.id,
        name: targetUser.name,
        email: targetUser.email,
        role: role,
        avatar: initials
      };
      saveState();

      updatePersonaUI();
      if (role === 'customer') {
        navigateToView('customer-portal');
      } else if (role === 'staff') {
        navigateToView('subscriptions');
      } else {
        navigateToView('dashboard');
      }
      renderAll();

      showToast(`Welcome ${targetUser.name}! Signed into ${role.toUpperCase()} workspace.`, 'success', 'Login Successful');
    }
  }

  // ==========================================
  // INITIALIZATION ON DOM READY
  // ==========================================
  function init() {
    setupThemeToggle();
    setupPortalEntryWorkflow();
    setupPersonaSwitching();
    setupNavigation();
    setupAuthForms();
    setupSubscriptionModal();
    setupBillingEngine();
    setupPaymentsEngine();
    setupProductCatalog();
    setupPlanManagement();
    setupDiscountManagement();
    setupStaffManagement();

    updatePersonaUI();
    document.getElementById('currentSimDateLabel').textContent = `Today: ${DB.simulationDate}`;
    renderAll();

    console.log('⚡ Brightloop OS initialized successfully.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
