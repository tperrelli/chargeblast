import { useState } from "react";

export function useCopyPaymentId(id: string) {
  const [message, setMessage] = useState("");

  async function copyId() {
    try {
      await navigator.clipboard.writeText(id);
      setMessage(`Copied ${id}`);
    } catch {
      setMessage(`Could not copy payment ID: ${id}`);
    }
  }

  return { copyId, message };
}
