import { Navbar } from './Navbar';
import { PageContainer } from '../shared/PageContainer';

export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#090909] text-neutral-900 dark:text-neutral-100 flex flex-col font-sans selection:bg-neutral-200 dark:selection:bg-neutral-800 selection:text-neutral-900 dark:selection:text-white transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <PageContainer>{children}</PageContainer>
      </main>
    </div>
  );
}

