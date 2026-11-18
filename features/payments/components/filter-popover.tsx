import { useCallback, useId, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/icons";
import { useDismissableLayer } from "@/features/payments/hooks/use-dismissable-layer";

const VIEWPORT_GAP = 16;

type FilterPopoverProps = {
  label: string;
  title: string;
  note?: string;
  icon?: "calendar" | "filter" | "plusCircle" | "settings";
  variant?: "chip" | "button";
  align?: "start" | "end";
  className?: string;
  children: ReactNode;
};

export function FilterPopover({
  label,
  title,
  note,
  icon,
  variant = "chip",
  align = "start",
  className,
  children,
}: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const content = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);
  const attachContent = useCallback((element: HTMLDivElement | null) => {
    content.current = element;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const leftOverflow = Math.max(0, VIEWPORT_GAP - rect.left);
    const rightOverflow = Math.max(0, rect.right - window.innerWidth + VIEWPORT_GAP);
    element.style.translate = `${leftOverflow - rightOverflow}px`;
  }, []);
  useDismissableLayer({
    open,
    trigger,
    content,
    onDismiss: close,
    focusSelector: "input, select, button",
  });

  return (
    <div className="filter-menu">
      <button
        ref={trigger}
        type="button"
        className={`button ${variant === "chip" ? "filter-chip" : ""}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {icon && <Icon name={icon} size={15} />}
        {label}
      </button>
      {open && (
        <div
          id={panelId}
          ref={attachContent}
          className={`popover ${align === "end" ? "popover-end" : ""} ${className ?? ""}`}
          role="group"
          aria-label={title}
        >
          <div className="popover-title">
            {title}
            {note && <span>{note}</span>}
          </div>
          {children}
        </div>
      )}
    </div>
  );
}
