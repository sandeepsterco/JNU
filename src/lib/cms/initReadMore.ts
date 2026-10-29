export function InitReadMore(root: HTMLElement): () => void {
  const buttons = root.querySelectorAll<HTMLElement>(".read-btn");
  const cleanups: (() => void)[] = [];

  buttons.forEach((btn) => {
    // find the text inside the same block as this button
    const block = btn.closest<HTMLElement>(".read-block") ?? btn.parentElement;
    const moreText = block?.querySelector<HTMLElement>(".more-text");
    if (!moreText) return;

    const MORE = btn.dataset.more ?? "+";
    const LESS = btn.dataset.less ?? "-";
    btn.textContent = MORE;

    const onClick = (e: Event) => {
      e.preventDefault();
      const active = moreText.classList.toggle("active");
      btn.classList.toggle("active", active);
      btn.textContent = active ? LESS : MORE;
      btn.setAttribute("aria-expanded", String(active));
    };

    btn.addEventListener("click", onClick);
    cleanups.push(() => {
      btn.removeEventListener("click", onClick);
      moreText.classList.remove("active");
      btn.classList.remove("active");
    });
  });

  return () => cleanups.forEach((fn) => fn());
}