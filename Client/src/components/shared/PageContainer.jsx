export function PageContainer({ children, className = '' }) {
  return (
    <div className={`w-[85%] mx-auto py-5 sm:py-6 ${className}`}>
      {children}
    </div>
  );
}
