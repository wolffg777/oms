const STATUS_STYLES = {
  UPDATE_ORDER_ITEMS:               { background: '#e0e7ff', color: '#3730a3' },
  REVIEWS_ORDER:                    { background: '#fef3c7', color: '#92400e' },
  SOURCES_PRODUCTS:                 { background: '#fef3c7', color: '#92400e' },
  AWAITING_PAYMENT_CONFIRMATION:    { background: '#fee2e2', color: '#991b1b' },
  COORDINATES_SCHOOL_DELIVERY:      { background: '#d1fae5', color: '#065f46' },
  LOG_PACKING_SLIP:                 { background: '#d1fae5', color: '#065f46' },
  ALL_PARTIALS_CONFIRMED_DELIVERED: { background: '#f0fdf4', color: '#166534' },
}

const STATUS_LABELS = {
  UPDATE_ORDER_ITEMS:               'Update Order Items',
  REVIEWS_ORDER:                    'Reviews Order',
  SOURCES_PRODUCTS:                 'Sources Products',
  AWAITING_PAYMENT_CONFIRMATION:    'Awaiting Payment',
  COORDINATES_SCHOOL_DELIVERY:      'Coordinates Delivery',
  LOG_PACKING_SLIP:                 'Log Packing Slip',
  ALL_PARTIALS_CONFIRMED_DELIVERED: 'Delivered',
}

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || { background: '#f3f4f6', color: '#374151' }
  const label = STATUS_LABELS[status] || status

  return (
    <span style={{
      ...style,
      padding: '2px 10px',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 600,
      whiteSpace: 'nowrap'
    }}>
      {label}
    </span>
  )
}