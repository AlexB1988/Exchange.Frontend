'use client';

import Image, { ImageProps } from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

type Props = Omit<ImageProps, 'src'> & {
  srcLight: string;
  srcDark: string;
  className?: string;
};

export default function ThemeImage(props: Props) {
  const { srcLight, srcDark, alt, className, ...rest } = props;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className={cn('h-full w-full', className)} />;
  }

  return (
    <Image
      src={resolvedTheme === 'dark' ? srcDark : srcLight}
      alt={alt}
      className={className}
      {...rest}
    />
  );
}
