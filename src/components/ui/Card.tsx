type CardProps = {
  children: React.ReactNode
  className?: string
}

function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-[#E7DFD0] bg-[#FFFCF5] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${className}`}
    >
      {children}
    </div>
  )
}

export default Card