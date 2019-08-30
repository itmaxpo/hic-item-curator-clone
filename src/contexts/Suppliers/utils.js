// give shape to the suppliers to feed the supplier's dropdown
export const parseSuppliers = suppliers =>
  suppliers.map(({ name }) => ({ value: name, label: name }))
