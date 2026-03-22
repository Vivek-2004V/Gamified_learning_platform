'use client';
import Link from 'next/link';
import { Globe, LogOut, LayoutDashboard, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LogoIcon } from '@/components/icons/logo-icon';
import { useLanguage } from '@/context/language-context';
import { useUser, useAuth } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useOnlineStatus } from '@/hooks/use-online-status';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState, useEffect } from 'react';

export function Header() {
  const { setLanguage, t } = useLanguage();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const isOnline = useOnlineStatus();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <LogoIcon className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground transition-all duration-300 group-hover:animate-glitch">
              {t('appName')}
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          {isClient && !isOnline && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <WifiOff className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>You are currently offline.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t('selectLanguage')}
                className="group"
              >
                <Globe className="h-5 w-5 text-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                {t('languageEnglish')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('hi')}>
                {t('languageHindi')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('bn')}>
                {t('languageBengali')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ta')}>
                {t('languageTamil')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('te')}>
                {t('languageTelugu')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isUserLoading ? (
             <Skeleton className="h-8 w-8 rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.photoURL ?? ''}
                      alt={user.displayName ?? user.email ?? ''}
                    />
                    <AvatarFallback>
                      {user.email?.[0].toUpperCase() ?? 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
