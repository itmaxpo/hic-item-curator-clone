import { isEmpty } from 'lodash/fp'
// give shape to the suppliers to feed the supplier's dropdown
export const parseSuppliers = suppliers =>
  suppliers
    .filter(({ supplier_id }) => !isEmpty(supplier_id))
    .map(({ name, supplier_id }) => ({ value: supplier_id, label: name }))
