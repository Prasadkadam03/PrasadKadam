import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();
    const prevPathname = useRef(pathname);
    const isRestoringScroll = useRef(false);

    useEffect(() => {
        // Save scroll position before unload
        const handleBeforeUnload = () => {
            sessionStorage.setItem('scrollPosition', window.scrollY.toString());
            sessionStorage.setItem('scrollPath', pathname);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [pathname]);

    useEffect(() => {
        // Check if this is a page refresh (scroll position exists in sessionStorage)
        const savedScrollPosition = sessionStorage.getItem('scrollPosition');
        const savedPath = sessionStorage.getItem('scrollPath');

        if (savedScrollPosition !== null && savedPath === pathname && !isRestoringScroll.current) {
            isRestoringScroll.current = true;

            // Restore scroll position after content is fully loaded
            const restoreScroll = () => {
                const position = parseInt(savedScrollPosition, 10);
                window.scrollTo({
                    top: position,
                    behavior: 'instant'
                });
                sessionStorage.removeItem('scrollPosition');
                sessionStorage.removeItem('scrollPath');
                isRestoringScroll.current = false;
            };

            // Use requestAnimationFrame to ensure DOM is ready
            requestAnimationFrame(() => {
                setTimeout(restoreScroll, 150);
            });
        } else if (prevPathname.current !== pathname && !isRestoringScroll.current) {
            // Only scroll to top if pathname actually changed (not a refresh)
            window.scrollTo(0, 0);
        }

        prevPathname.current = pathname;
    }, [pathname]);

    return null;
}
