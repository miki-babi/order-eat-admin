import { useEffect } from 'react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { useAppearance } from '@/hooks/use-appearance';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    const { updateAppearance } = useAppearance();

    useEffect(() => {
        const hasStoredAppearance = window.localStorage.getItem('appearance');
        const hasAppearanceCookie = document.cookie
            .split('; ')
            .some((cookie) => cookie.startsWith('appearance='));

        if (hasStoredAppearance || hasAppearanceCookie) {
            return;
        }

        updateAppearance('light');
    }, [updateAppearance]);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
