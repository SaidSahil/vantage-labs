export interface NodeAxisMarkProps {
  /** Pixel size (square). Default 22. */
  size?: number
  /** Stroke/fill colour. Default 'currentColor' (inherits text colour). */
  color?: string
}

/** The NodeAxis hex "N" logo mark (decorative; pair with visible or aria text). */
export function NodeAxisMark({ size = 22, color = 'currentColor' }: NodeAxisMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <polygon
        points="11,1.5 19.5,6.25 19.5,15.75 11,20.5 2.5,15.75 2.5,6.25"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round"
      />
      <line x1="7" y1="7" x2="7" y2="15" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
      <line x1="7" y1="7" x2="15" y2="15" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
      <line x1="15" y1="7" x2="15" y2="15" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="7" cy="7" r="1.2" fill={color} />
      <circle cx="15" cy="7" r="1.2" fill={color} />
      <circle cx="7" cy="15" r="1.2" fill={color} />
      <circle cx="15" cy="15" r="1.2" fill={color} />
    </svg>
  )
}
