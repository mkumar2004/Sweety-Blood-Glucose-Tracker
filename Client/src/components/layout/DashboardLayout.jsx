import { Navbar } from './Navbar';
import { PageContainer } from '../shared/PageContainer';

export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#090909] text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <PageContainer>{children}</PageContainer>
      </main>
    </div>
  );
}

