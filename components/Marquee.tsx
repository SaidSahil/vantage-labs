const items = [
  'Web Design',
  'Landing Pages',
  'Custom Systems',
  'Dashboards',
  'BC, Canada',
  'Booking Systems',
  'Local Businesses',
  'Starting at $399',
]

function Dot() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: '#3D5A80',
        flexShrink: 0,
        display: 'inline-block',
      }}
    />
  )
}

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div
      role="region"
      aria-label="Services and pricing overview"
      style={{
        overflow: 'hidden',
        background: '#1C1C1E',
        padding: '14px 0',
        borderTop: '1px solid #2a2a2c',
        borderBottom: '1px solid #2a2a2c',
      }}
    >
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '0 32px',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
              whiteSpace: 'nowrap',
            }}
          >
            <Dot />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
