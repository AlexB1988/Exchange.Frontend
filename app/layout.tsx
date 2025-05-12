import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Inter } from 'next/font/google';
import '@/components/globals.css';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/header';
import Footer from '@/components/footer';
import LoginForm from '@/components/auth/login-modal';
import SignupForm from '@/components/auth/signup-modal';

const interFont = Inter({
  subsets: ['cyrillic'],
});

export const metadata: Metadata = {
  title: 'Freelance',
  description: 'Место, где рождаются великие проекты.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${interFont.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* MODALS */}
          <LoginForm />
          <SignupForm />

          <Header />
          <main className="container mx-auto mt-8">{children}</main>
          <Footer />

          <Toaster
            /* expand // скрытие тостов */
            closeButton
            duration={5000}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
