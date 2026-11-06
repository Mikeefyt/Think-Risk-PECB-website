'use client';
/* Small building blocks used inside page content: prices that follow the
   AUD/MYR/USD switch, "add to learning plan" buttons and "open learning plan" buttons. */
import { catalogue, money } from '@/lib/courses';
import { useSite } from './SiteProvider';

/** Listed fee for a catalogue item, in the selected currency */
export function Price({ item }: { item: string }) {
  const { market } = useSite();
  const p = catalogue[item];
  return <>{p?.price ? money(p.price[market], market) : ''}</>;
}

/** Adds an item to the learning plan; shows the "added" style once it is in the plan */
export function AddButton({ item, className = '', children, ...rest }: { item: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { add, inBasket } = useSite();
  const cls = [className, inBasket(item) ? 'added' : ''].filter(Boolean).join(' ');
  return <button type="button" className={cls || undefined} data-add={item} onClick={() => add(item)} {...rest}>{children}</button>;
}

/** Opens the learning plan drawer */
export function OpenPlanButton({ className, children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { openDrawer } = useSite();
  return <button type="button" className={className} data-basket-open="" onClick={openDrawer} {...rest}>{children}</button>;
}
