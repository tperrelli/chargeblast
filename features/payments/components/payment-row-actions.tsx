import Link from "next/link";
import { useCallback, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/icons";
import { useCopyPaymentId } from "@/features/payments/hooks/use-copy-payment-id";
import { useDismissableLayer } from "@/features/payments/hooks/use-dismissable-layer";

const MENU_WIDTH = 180;
const MENU_HEIGHT = 100;
const MENU_GAP = 6;
type Position = { top: number; left: number };
type PaymentRowActionsProps = { id: string };

export function PaymentRowActions({ id }: PaymentRowActionsProps) {
  const [position, setPosition] = useState<Position | null>(null);
  const { copyId, message } = useCopyPaymentId(id);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const close = useCallback(() => setPosition(null), []);
  useDismissableLayer({
    open: Boolean(position),
    trigger,
    content: menu,
    onDismiss: close,
    focusSelector: "a, button",
    closeOnScroll: true,
  });

  function toggleMenu() {
    if (position) {
      setPosition(null);
      return;
    }
    const rect = trigger.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({
      top: Math.max(
        MENU_GAP,
        Math.min(rect.bottom + MENU_GAP, window.innerHeight - MENU_HEIGHT - MENU_GAP),
      ),
      left: Math.max(
        MENU_GAP,
        Math.min(rect.right - MENU_WIDTH, window.innerWidth - MENU_WIDTH - MENU_GAP),
      ),
    });
  }
  async function copyAndClose() {
    await copyId();
    close();
    trigger.current?.focus();
  }

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="row-action-trigger"
        aria-label={`Actions for payment ${id}`}
        aria-expanded={Boolean(position)}
        aria-controls={menuId}
        onClick={toggleMenu}
      >
        <Icon name="more" size={18} />
      </button>
      <span className="sr-only" role="status">
        {message}
      </span>
      {position &&
        createPortal(
          <div
            id={menuId}
            ref={menu}
            className="row-action-menu"
            role="group"
            aria-label="Payment actions"
            style={position}
          >
            <Link href={`/payments/${id}`}>View payment</Link>
            <button type="button" onClick={() => void copyAndClose()}>
              Copy payment ID
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
