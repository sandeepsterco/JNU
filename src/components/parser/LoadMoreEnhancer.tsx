
"use client";

import { useEffect } from "react";

interface LoadMoreEnhancerProps {
    containerId: string;
}

export default function LoadMoreEnhancer({
    containerId,
}: LoadMoreEnhancerProps): null {
    useEffect(() => {
        const root = document.getElementById(containerId);

        if (!root) return;

        const cleanups: Array<() => void> = [];

        // Support multiple sections with different existing classes
        const containers = root.querySelectorAll<HTMLElement>(
            "[data-load-more]"
        );

        containers.forEach((container) => {
            const items = Array.from(
                container.querySelectorAll<HTMLElement>(
                    "[data-load-item]"
                )
            );

            const visibleCount =
                Number.parseInt(container.dataset.visible ?? "6", 10) || 6;

            // Button wrapper must immediately follow the container
            const buttonWrapper = container.nextElementSibling as
                | HTMLElement
                | null;

            const button =
                buttonWrapper?.querySelector<HTMLAnchorElement>(
                    "[data-load-trigger]"
                );

            if (!button || !buttonWrapper) return;

            items.forEach((item, index) => {
                item.hidden = index >= visibleCount;
            });

            buttonWrapper.hidden = items.length <= visibleCount;

            const handleClick = (event: MouseEvent): void => {
                event.preventDefault();

                items.forEach((item) => {
                    item.hidden = false;
                });

                buttonWrapper.hidden = true;
            };

            button.addEventListener("click", handleClick);

            cleanups.push(() => {
                button.removeEventListener("click", handleClick);
            });
        });

        return () => {
            cleanups.forEach((cleanup) => cleanup());
        };
    }, [containerId]);

    return null;
}
