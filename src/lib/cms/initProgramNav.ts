function findScope(nav: HTMLElement, root: HTMLElement) {
    let el = nav.parentElement;
    while (el && el !== root.parentElement) {
        if (el.querySelector('.program_section_bx')) return el;
        el = el.parentElement;
    }

    return root;
}

function initSingleNav(nav: HTMLElement, root: HTMLElement) {
    const scope = findScope(nav, root);
    const links = nav.querySelectorAll<HTMLAnchorElement>("a");
    const sections = scope.querySelectorAll<HTMLElement>(".program_section_bx");
    const navItems = nav.querySelectorAll<HTMLLIElement>("li");

    if (!links.length || !sections.length) return () => { };

    navItems.forEach((item, index) => {
        item.setAttribute("data-number", String(index + 1).padStart(2, "0"));
    });

    function setActive(link: HTMLAnchorElement) {
        links.forEach((a) => a.classList.remove("active"));
        navItems.forEach((li) => li.classList.remove("active"));
        link.classList.add("active");
        link.parentElement?.classList.add("active");
        updateProgress(link);
    }

    function updateProgress(link: HTMLAnchorElement) {
        const activeLi = link.parentElement as HTMLElement | null;
        if (!activeLi) return;
        const fillHeight = activeLi.offsetTop + activeLi.offsetHeight / 2;
        nav.style.setProperty("--fill-height", `${fillHeight}px`);
    }

    const OFFSET = 120;

    function getActiveSection() {
        let current: HTMLElement | null = null;
        for (const section of Array.from(sections)) {
            const rect = section.getBoundingClientRect();
            if (rect.top - OFFSET <= 0) {
                current = section;
            } else {
                break;
            }
        }
        return current ?? sections[0] ?? null;
    }

    function findLinkFor(section: HTMLElement): HTMLAnchorElement | null {
        // match by href="#id" scoped to THIS nav's own links only
        for (const link of Array.from(links)) {
            if (link.getAttribute("href") === `#${section.id}`) return link;
        }
        return null;
    }

    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const active = getActiveSection();
            if (active) {
                const link = findLinkFor(active);
                if (link && !link.classList.contains("active")) {
                    setActive(link);
                }
            }
            ticking = false;
        });
    }

    function onNavClick(e: Event) {
        const target = (e.target as HTMLElement).closest("a");
        if (!target || !nav.contains(target)) return;
        e.preventDefault();

        setActive(target as HTMLAnchorElement);

        const href = target.getAttribute("href");
        if (href) {
            scope.querySelector(href)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }

    nav.addEventListener("click", onNavClick);
    window.addEventListener("scroll", onScroll, { passive: true });

    setActive(links[0]);
    onScroll();

    return () => {
        nav.removeEventListener("click", onNavClick);
        window.removeEventListener("scroll", onScroll);
    };
}

export function InitProgramNav(root: HTMLElement) {
    const navs = root.querySelectorAll<HTMLElement>('.program_nav');
    const cleanups = Array.from(navs).map((nav) => initSingleNav(nav, root));
    return () => cleanups.forEach((fn) => fn());
}