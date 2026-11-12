import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { AuthProvider } from '@/context/AuthContext';
import { ReadingProvider } from '@/context/ReadingContext';
import { AppRoutes } from '@/routes/AppRoutes';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ReadingProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ReadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
