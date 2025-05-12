'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginFormSchema } from '@/lib/definitions';
import { useModalStore } from '@/components/stores/modal-store';
import { checkEmailConfirmed, signin } from '@/components/actions/auth';
import useSession from '@/hooks/use-session';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Eye, EyeOff, Loader } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { redirect } from 'next/navigation';

export default function LoginForm() {
  const { login } = useSession();
  const { isLoginOpen, openSignup, closeAll } = useModalStore();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    const { success, message } = await signin(values);
    if (success) {
      const { checkEmail } = await checkEmailConfirmed();

      login(values.email, {
        optimisticData: {
          email: values.email,
          isLoggedIn: true,
          isVerified: checkEmail,
        },
      });

      closeAll();
      toast.success('Успешный вход');
      redirect('/profile');
    } else {
      toast.error(message);
    }
  }

  return (
    <Dialog open={isLoginOpen} onOpenChange={(open) => !open && closeAll()}>
      <DialogContent aria-describedby={undefined} className="w-100 gap-0">
        <DialogHeader className="mb-6">
          <DialogTitle>Вход</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="ml-2">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      className="bg-secondary dark:bg-secondary placeholder:text-stone-400"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative mb-8">
                  <FormLabel className="ml-2">Пароль</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="bg-secondary dark:bg-secondary h-8 placeholder:text-stone-400"
                      {...field}
                    />
                  </FormControl>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    tabIndex={-1}
                    className="absolute top-5.5 right-0 size-8 hover:bg-transparent focus-visible:border-none focus-visible:ring-0 dark:hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-8 w-full"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader className="animate-spin" />
                  Вход
                </>
              ) : (
                'Войти'
              )}
            </Button>
          </form>
        </Form>

        <div className="flex">
          <a
            href="#"
            className="text-foreground text-sm leading-none transition-opacity hover:opacity-80"
          >
            Забыли пароль?
          </a>
        </div>
        <div className="">
          Нет аккаунта?{' '}
          <a
            className="text-blue-700 hover:text-blue-700/80"
            href={''}
            onClick={(e) => {
              e.preventDefault();
              openSignup();
            }}
          >
            Зарегистрироваться
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
