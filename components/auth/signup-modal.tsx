'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignupFormSchema } from '@/lib/definitions';
import { useModalStore } from '@/components/stores/modal-store';
import { signup } from '@/components/actions/auth';
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
  FormMessage,
} from '@/components/ui/form';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Eye, EyeOff, Info, Loader } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function SignupForm() {
  const { login } = useSession();
  const { isSignupOpen, closeAll } = useModalStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    const { success, message } = await signup(values);
    if (success) {
      login(values.email, {
        optimisticData: {
          email: values.email,
          isLoggedIn: true,
          isVerified: false,
        },
      });

      toast.success('Регистрация прошла успешно');

      closeAll();
    } else {
      toast.error(message);
    }
  }

  return (
    <Dialog open={isSignupOpen} onOpenChange={(open) => !open && closeAll()}>
      <DialogContent aria-describedby={undefined} className="w-100 gap-0">
        <DialogHeader className="mb-6">
          <DialogTitle>Регистрация</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mb-8 space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      className="h-8"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="h-8"
                      {...field}
                    />
                  </FormControl>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        asChild
                        className="absolute right-0 h-4 w-4"
                      >
                        <Info />
                      </TooltipTrigger>
                      <TooltipContent className="rounded-sm px-3 py-2">
                        <p className="mb-1 font-extrabold">
                          Пароль должен содержать:
                        </p>
                        <ul className="list-inside list-disc">
                          <li>Минимум 8 символов</li>
                          <li>Латинские буквы</li>
                          <li>Заглавную букву</li>
                          <li>Строчную букву</li>
                          <li>Цифру</li>
                          <li>Спецсимвол</li>
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="relative mb-8">
                  <FormLabel>Подтверждение пароля</FormLabel>
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="h-8"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    tabIndex={-1}
                    className="absolute top-5.5 right-0 size-8 hover:bg-transparent focus-visible:border-none focus-visible:ring-0 dark:hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                  <FormMessage />
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
                  Регистрация
                </>
              ) : (
                'Зарегистрироваться'
              )}
            </Button>
          </form>
        </Form>

        <DialogFooter>
          <p className="text-xs">
            Нажимая «Зарегистрироваться» вы подтверждаете, что полностью
            принимаете <br />
            <a
              href="#"
              className="text-blue-400 transition-colors hover:text-blue-400/80"
            >
              условия соглашения
            </a>{' '}
            и ознакомились с<br />
            <a
              href="#"
              className="text-blue-400 transition-colors hover:text-blue-400/80"
            >
              политикой конфиденциальности
            </a>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
