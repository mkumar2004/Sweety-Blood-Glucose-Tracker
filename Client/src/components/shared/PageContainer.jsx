export function PageContainer({ children, className = '' }) {
  return (
    <div className={`w-[85%] mx-auto py-4 ${className}`}>
      {children}
    </div>
  );
}
