import React from 'react'
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'outline' | 'solid'}) {
  const { className = '', variant='solid', ...rest } = props
  const base = 'inline-flex items-center justify-center gap-2 h-10 px-4 py-2 rounded-xl text-sm transition-colors'
  const styles = variant === 'outline' ? 'border border-stone-300 text-stone-800 bg-white hover:bg-stone-50' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
  return <button className={`${base} ${styles} ${className}`} {...rest} />
}
export function Card({ className='', children }: { className?: string, children: React.ReactNode }) {
  return <div className={`rounded-xl bg-white border border-stone-200 shadow-md ${className}`}>{children}</div>
}
export function CardContent({ className='', children }: { className?: string, children: React.ReactNode }) {
  return <div className={className}>{children}</div>
}