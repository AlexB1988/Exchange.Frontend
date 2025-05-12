'use client';

import { Moon, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle({ className }: React.ComponentProps<'button'>) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        onClick={() =>
          theme === 'dark' ? setTheme('light') : setTheme('dark')
        }
        className={className}
      >
        <Moon className="size-5 scale-100 rotate-0 transition-transform duration-500 dark:scale-0 dark:-rotate-90" />
        <SunMedium className="absolute size-5 scale-0 rotate-90 transition-transform duration-500 dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Переключение темы</span>
        {/* Только для роботов */}
      </Button>
    </>
  );
}
