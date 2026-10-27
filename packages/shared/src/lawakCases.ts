// Lawak Store test cases that a visitor can run in the QA Lab.
// Copied from Automations-Test-Preset demo/test-cases/catalog.json (id, title, tags). Copy again when the catalog changes.
// The backend accepts only these IDs, so a visitor cannot send free text to the workflow.

export type CaseKind = 'ui' | 'api';
export type RunSuite = 'smoke' | 'regression' | 'custom' | 'api';

export interface LabCase {
  id: string;
  title: string;
  module: string;
  kind: CaseKind;
  smoke: boolean;
}

export const LAB_MODULES: { code: string; name: { en: string; id: string } }[] = [
  { code: 'auth', name: { en: 'Auth', id: 'Auth' } },
  { code: 'cat', name: { en: 'Catalog', id: 'Katalog' } },
  { code: 'cart', name: { en: 'Cart', id: 'Keranjang' } },
  { code: 'chk', name: { en: 'Checkout', id: 'Checkout' } },
  { code: 'ord', name: { en: 'Orders', id: 'Pesanan' } },
  { code: 'prd', name: { en: 'Admin products', id: 'Admin produk' } },
  { code: 'aor', name: { en: 'Admin orders', id: 'Admin pesanan' } },
  { code: 'usr', name: { en: 'Admin users', id: 'Admin user' } },
  { code: 'dsh', name: { en: 'Dashboard', id: 'Dashboard' } },
];

export const RUN_SUITES: RunSuite[] = ['smoke', 'regression', 'custom', 'api'];

export const LAB_CASES: LabCase[] = [
  {id: "TC-AUTH-001", title: "Sign in with the demo admin account", module: "auth", kind: "ui", smoke: true},
  {id: "TC-AUTH-002", title: "Wrong password shows an error", module: "auth", kind: "ui", smoke: true},
  {id: "TC-AUTH-003", title: "Invalid email format is rejected", module: "auth", kind: "ui", smoke: false},
  {id: "TC-AUTH-004", title: "Disabled account cannot sign in", module: "auth", kind: "ui", smoke: false},
  {id: "TC-AUTH-005", title: "Register a new customer account", module: "auth", kind: "ui", smoke: true},
  {id: "TC-AUTH-006", title: "Register with an existing email is rejected", module: "auth", kind: "ui", smoke: false},
  {id: "TC-AUTH-007", title: "Weak password is rejected", module: "auth", kind: "ui", smoke: false},
  {id: "TC-AUTH-008", title: "Sign out ends the session", module: "auth", kind: "ui", smoke: true},
  {id: "TC-AUTH-009", title: "A protected page asks for sign in, then returns to it", module: "auth", kind: "ui", smoke: false},
  {id: "TC-CAT-001", title: "Shop lists all active products and hides drafts", module: "cat", kind: "ui", smoke: true},
  {id: "TC-CAT-002", title: "Search finds a product by name", module: "cat", kind: "ui", smoke: false},
  {id: "TC-CAT-003", title: "Category filter shows only that category", module: "cat", kind: "ui", smoke: false},
  {id: "TC-CAT-004", title: "Sort by price from low to high", module: "cat", kind: "ui", smoke: false},
  {id: "TC-CAT-005", title: "Search with no result shows an empty state", module: "cat", kind: "ui", smoke: false},
  {id: "TC-CAT-006", title: "Product detail shows the price and stock", module: "cat", kind: "ui", smoke: false},
  {id: "TC-CAT-007", title: "Out-of-stock product cannot be added to the cart", module: "cat", kind: "ui", smoke: false},
  {id: "TC-CART-001", title: "Add a product to the cart", module: "cart", kind: "ui", smoke: true},
  {id: "TC-CART-002", title: "Changing the quantity updates the totals", module: "cart", kind: "ui", smoke: false},
  {id: "TC-CART-003", title: "Shipping is free from Rp 300.000", module: "cart", kind: "ui", smoke: false},
  {id: "TC-CART-004", title: "Removing the last item shows an empty cart", module: "cart", kind: "ui", smoke: false},
  {id: "TC-CART-005", title: "Quantity limit of 10 is enforced", module: "cart", kind: "ui", smoke: false},
  {id: "TC-CHK-001", title: "Checkout with the test card creates an order", module: "chk", kind: "ui", smoke: true},
  {id: "TC-CHK-002", title: "Empty required fields are reported", module: "chk", kind: "ui", smoke: false},
  {id: "TC-CHK-003", title: "Declined card shows a payment error", module: "chk", kind: "ui", smoke: true},
  {id: "TC-CHK-004", title: "Invalid card number is rejected", module: "chk", kind: "ui", smoke: false},
  {id: "TC-CHK-005", title: "Expired card is rejected", module: "chk", kind: "ui", smoke: false},
  {id: "TC-CHK-006", title: "Postal code must have exactly 5 digits", module: "chk", kind: "ui", smoke: false},
  {id: "TC-ORD-001", title: "A new order shows in My orders", module: "ord", kind: "ui", smoke: false},
  {id: "TC-ORD-002", title: "A customer cannot open another customer's order", module: "ord", kind: "ui", smoke: true},
  {id: "TC-PRD-001", title: "Admin creates a product", module: "prd", kind: "ui", smoke: true},
  {id: "TC-PRD-002", title: "Admin edits a product price", module: "prd", kind: "ui", smoke: false},
  {id: "TC-PRD-003", title: "Admin deletes a product", module: "prd", kind: "ui", smoke: false},
  {id: "TC-PRD-004", title: "Product form rejects invalid data", module: "prd", kind: "ui", smoke: false},
  {id: "TC-PRD-005", title: "A draft product is hidden from the shop", module: "prd", kind: "ui", smoke: false},
  {id: "TC-AOR-001", title: "A new customer order shows in admin Orders", module: "aor", kind: "ui", smoke: true},
  {id: "TC-AOR-002", title: "Admin moves an order from Paid to Processing", module: "aor", kind: "ui", smoke: false},
  {id: "TC-AOR-003", title: "Cancelling an order puts the stock back", module: "aor", kind: "ui", smoke: false},
  {id: "TC-USR-001", title: "A customer cannot open admin pages", module: "usr", kind: "ui", smoke: true},
  {id: "TC-USR-002", title: "A disabled customer cannot sign in", module: "usr", kind: "ui", smoke: false},
  {id: "TC-USR-003", title: "Admin cannot change their own role or status", module: "usr", kind: "ui", smoke: false},
  {id: "TC-DSH-001", title: "Admin dashboard shows the KPIs", module: "dsh", kind: "ui", smoke: true},
  {id: "TC-AUTH-101", title: "API: valid sign in returns a token", module: "auth", kind: "api", smoke: true},
  {id: "TC-AUTH-102", title: "API: wrong password returns 401", module: "auth", kind: "api", smoke: false},
  {id: "TC-CAT-101", title: "API: product list returns 11 active products", module: "cat", kind: "api", smoke: true},
  {id: "TC-CART-101", title: "API: out-of-stock product returns 409", module: "cart", kind: "api", smoke: false},
  {id: "TC-CHK-101", title: "API: declined card returns 402", module: "chk", kind: "api", smoke: false},
  {id: "TC-AOR-101", title: "API: invalid status change returns 409", module: "aor", kind: "api", smoke: false},
  {id: "TC-USR-101", title: "API: admin endpoint without a token returns 401", module: "usr", kind: "api", smoke: true},
  {id: "TC-USR-102", title: "API: admin endpoint as a customer returns 403", module: "usr", kind: "api", smoke: true},
  {id: "TC-USR-103", title: "API: admin cannot change their own role", module: "usr", kind: "api", smoke: false},
];
