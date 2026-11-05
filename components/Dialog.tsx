'use client';
import { useEffect, useRef } from 'react';

/** Native modal <dialog>, opened and closed from React state. Closes on Escape or a click on the backdrop. */
export function Dialog({ id, open, onClose, className, children }: { id: string; open: boolean; onClose: () => void; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const onClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target !== e.currentTarget) return;
    const r = e.currentTarget.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose();
  };

  return (
    <dialog ref={ref} id={id} className={className} aria-labelledby={`${id}-title`} onClose={onClose} onClick={onClick}>
      {children}
    </dialog>
  );
}
