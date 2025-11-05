
import React,{ useEffect, useMemo, useRef, useState } from "react"
import styles from "./odometer-counter.module.css"

/**
 * OdometerCounter
 * Props:
 * - value: number (required) - current value to display
 * - prefix?: string - e.g., "Delivered "
 * - suffix?: string - e.g., " items"
 * - minDigits?: number - pad with leading zeros to at least this length
 * - durationMs?: number - animation duration per digit (default 600)
 * - easing?: string - CSS timing function (default cubic-bezier(0.22, 1, 0.36, 1))
 * - groupSeparator?: string | null - thousands separator, set to null to disable (default ',')
 * - className?: string - extra class for wrapper
 */
export default function OdometerCounter({
  value,
  prefix,
  suffix,
  minDigits = 1,
  durationMs = 600,
  easing = "cubic-bezier(0.22, 1, 0.36, 1)",
  groupSeparator = ",",
  className = "",
}) {
  const safeVal = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0

  const parts = useMemo(() => {
    const s = safeVal.toString()
    const padded = s.padStart(Math.max(minDigits, s.length), "0")
    if (!groupSeparator) return padded.split("")
    // insert thousands separators
    const chars = padded.split("")
    const out = []
    let count = 0
    for (let i = chars.length - 1; i >= 0; i--) {
      out.unshift(chars[i])
      count++
      if (count % 3 === 0 && i !== 0) {
        out.unshift(groupSeparator)
      }
    }
    return out
  }, [safeVal, minDigits, groupSeparator])

  return (
    <div
      className={[styles.odometer, className].filter(Boolean).join(" ")}
      style={{
        "--odometer-duration": `${durationMs}ms`,
        "--odometer-easing": easing,
      }}
      aria-label={`${prefix ?? ""}${safeVal}${suffix ?? ""}`}
      role="status"
    >
      {prefix ? (
        <span className={styles.affix} aria-hidden="true">
          {prefix}
        </span>
      ) : null}

      <div className={styles.digits} aria-hidden="true">
        {parts.map((ch, idx) =>
          /\d/.test(ch) ? (
            <Digit key={`${idx}-${ch}`} digit={Number.parseInt(ch, 10)} />
          ) : (
            <span key={`${idx}-${ch}`} className={styles.separator}>
              {ch}
            </span>
          ),
        )}
      </div>

      {suffix ? (
        <span className={styles.affix} aria-hidden="true">
          {suffix}
        </span>
      ) : null}

      <span className="sr-only">{`${prefix ?? ""}${safeVal.toLocaleString()}${suffix ?? ""}`}</span>
    </div>
  )
}

function Digit({ digit }) {
  // We keep track of previous digit to always roll forward
  const [prev, setPrev] = useState(digit)
  const [height, setHeight] = useState(0)
  const itemRef = useRef(null)
  const mountedRef = useRef(false)

  useEffect(() => {
    // Measure digit height after mount to compute translateY
    if (itemRef.current) {
      const el = itemRef.current
      const h = el.getBoundingClientRect().height
      if (h > 0) setHeight(h)
    }
  }, [])

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      setPrev(digit)
      return
    }
    setPrev((p) => p)
  }, [digit])

  // Build three loops of 0..9 so we can roll forward across boundaries smoothly
  const ring = useMemo(() => {
    const base = Array.from({ length: 10 }, (_, i) => i)
    return [...base, ...base, ...base]
  }, [])

  // choose indices so we always move forward from middle loop
  const fromIdx = 10 + (prev % 10)
  const toIdx = 10 + ((prev + ((digit - prev + 10) % 10)) % 10)

  // If height is unknown (SSR or first paint), fall back to 1em estimate via CSS
  const translateY = height ? -(toIdx * height) : undefined

  useEffect(() => {
    // After animating to target, set prev to current digit
    const t = setTimeout(() => setPrev(digit), 0)
    return () => clearTimeout(t)
  }, [digit])

  return (
    <span className={styles.digit}>
      <span
        className={styles.column}
        style={{
          transform: translateY !== undefined ? `translateY(${translateY}px)` : undefined,
        }}
      >
        {ring.map((n, i) => (
          <span
            // Use a fixed template element to measure height
            ref={i === fromIdx ? itemRef : null}
            key={i}
            className={styles.slot}
          >
            {n}
          </span>
        ))}
      </span>
    </span>
  )
}
