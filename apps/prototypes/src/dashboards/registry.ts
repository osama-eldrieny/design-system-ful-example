/** The 19 demo dashboards: id (route #/dashboards/{id}), title and sidebar group. */
export const dashboards = [
  { id: '01', title: 'Membership', group: 'Analytics' },
  { id: '02', title: 'Site traffic', group: 'Analytics' },
  { id: '04', title: 'Store revenue', group: 'Analytics' },
  { id: '05', title: 'Recently active', group: 'Analytics' },
  { id: '17', title: 'Website analytics', group: 'Analytics' },
  { id: '18', title: 'Ad performance', group: 'Analytics' },
  { id: '06', title: 'Customer growth', group: 'Customers' },
  { id: '07', title: 'Customer health', group: 'Customers' },
  { id: '08', title: 'Organization overview', group: 'Vendors' },
  { id: '09', title: 'Vendor monitoring', group: 'Vendors' },
  { id: '03', title: 'Ecommerce', group: 'Sales' },
  { id: '10', title: 'Sales overview', group: 'Sales' },
  { id: '11', title: 'Sales activity', group: 'Sales' },
  { id: '12', title: 'Personal finance', group: 'Finance' },
  { id: '13', title: 'Banking', group: 'Finance' },
  { id: '14', title: 'Card spending', group: 'Finance' },
  { id: '15', title: 'Card receipts', group: 'Finance' },
  { id: '16', title: 'Savings goals', group: 'Finance' },
  { id: '19', title: 'Creator stats', group: 'Profile' },
] as const;

export type DashboardId = (typeof dashboards)[number]['id'];
