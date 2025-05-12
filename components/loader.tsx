'use client';

import useSession from '@/hooks/use-session';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { isLoading } = useSession();

  if (isLoading) {
    return <Skeleton className={className} />;
  } else {
    return <>{children}</>;
  }
}
