import { useEffect, type RefObject } from "react";

type DismissableLayerOptions = {
  open: boolean;
  trigger: RefObject<HTMLElement | null>;
  content: RefObject<HTMLElement | null>;
  onDismiss: () => void;
  focusSelector: string;
  closeOnScroll?: boolean;
};

export function useDismissableLayer({
  open,
  trigger,
  content,
  onDismiss,
  focusSelector,
  closeOnScroll = false,
}: DismissableLayerOptions) {
  useEffect(() => {
    if (!open) return;
    content.current?.querySelector<HTMLElement>(focusSelector)?.focus();

    function dismissOutside(event: Event) {
      const target = event.target;
      if (
        target instanceof Node &&
        !content.current?.contains(target) &&
        !trigger.current?.contains(target)
      ) {
        onDismiss();
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onDismiss();
        trigger.current?.focus();
      }
    }
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("focusin", dismissOutside);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onDismiss);
    if (closeOnScroll) {
      window.addEventListener("scroll", onDismiss, true);
    }
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("focusin", dismissOutside);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onDismiss);
      if (closeOnScroll) {
        window.removeEventListener("scroll", onDismiss, true);
      }
    };
  }, [open, trigger, content, onDismiss, focusSelector, closeOnScroll]);
}
