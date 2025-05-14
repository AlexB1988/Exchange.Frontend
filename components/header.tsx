'use client';

import Image from 'next/image';
import Link from 'next/link';
import Form from 'next/form';
import useSession from '@/hooks/use-session';
import { useModalStore } from './stores/modal-store';
import { Input } from './ui/input';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { ThemeToggle } from './theme/theme-toggle';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function Header() {
  const { openLogin, openSignup } = useModalStore();
  const { session, isLoading, logout } = useSession();
  return (
    <header className="bg-primary h-18">
      <div className="container mx-auto grid grid-cols-6 grid-rows-1 items-center gap-x-6">
        <div className="col-start-1 flex items-center justify-between">
          <Image
            src="/logo.svg"
            width={72}
            height={72}
            alt="Логотип"
            className="ml-2"
          />
          <h1 className="text-primary-foreground mr-2">Фриланс биржа</h1>
        </div>
        <Form action="#" className="relative col-start-2 mx-6 flex">
          <Input
            type="search"
            className="bg-input text-primary-foreground dark:bg-input h-6 w-64 pr-7 focus-visible:border-none focus-visible:ring-0"
          />
          <Button
            type="submit"
            variant="secondary"
            className="absolute right-0 h-6 w-6"
          >
            <Search className="h-4 w-4" />
          </Button>
        </Form>
        <NavigationMenu
          viewport={false}
          className="col-span-4 col-start-3 max-w-full [&>div]:w-full"
        >
          <NavigationMenuList className="grid grid-cols-4 grid-rows-1 gap-6">
            <NavigationMenuItem className="col-start-1 mx-auto max-w-max">
              <Link
                href="/"
                className="text-primary-foreground transition-colors hover:text-white"
              >
                Главная
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="col-start-2 mx-auto max-w-max">
              <Link
                href="#"
                className="text-primary-foreground transition-colors hover:text-white"
              >
                Каталог фрилансеров
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="col-start-3 mx-auto max-w-max">
              <Link
                href="#"
                className="text-primary-foreground transition-colors hover:text-white"
              >
                Заказы
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="col-start-4">
              <div className="flex items-center justify-end">
                {isLoading ? (
                  <Skeleton className="mr-6 h-4 w-38 bg-cyan-300" />
                ) : session.isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-primary-foreground mr-8 flex items-center outline-none">
                      <span className="mr-2 transition-colors hover:text-white">
                        Настройки
                      </span>
                      <Avatar>
                        <AvatarImage src="manDark.png" />
                        <AvatarFallback className="bg-stone-300">
                          A
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-46 space-y-2 px-6 py-4">
                      <DropdownMenuLabel className="p-0 text-base hover:bg-none focus:bg-none">
                        Баланс
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="p-0 text-base">
                        Мои заказы
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-0 text-base">
                        Сообщения
                        <DropdownMenuShortcut>500</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-0 text-base">
                        Профиль
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-0 text-base">
                        Портфолио
                      </DropdownMenuItem>
                      <DropdownMenuItem className="mb-4 p-0 text-base">
                        Помощь
                      </DropdownMenuItem>
                      <DropdownMenuItem className="justify-center p-0">
                        <Button
                          className="h-6 w-35 text-base"
                          onClick={() => logout()}
                        >
                          Выйти
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <a
                      className="text-primary-foreground mr-4 transition-colors hover:text-white"
                      href={''}
                      onClick={(e) => {
                        e.preventDefault();
                        openLogin();
                      }}
                    >
                      Вход
                    </a>
                    <a
                      className="text-primary-foreground mr-6 transition-colors hover:text-white"
                      href={''}
                      onClick={(e) => {
                        e.preventDefault();
                        openSignup();
                      }}
                    >
                      Регистрация
                    </a>
                  </>
                )}
                <ThemeToggle />
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
