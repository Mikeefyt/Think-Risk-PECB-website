'use client';
import { useEffect, useState } from 'react';
import { EMAIL } from '@/lib/courses';
import { Dialog } from './Dialog';

export function Year() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span id="year">{year}</span>;
}

export function PrivacyButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" id="privacy-open" onClick={() => setOpen(true)}>Enquiry privacy</button>
      <Dialog id="privacy-dialog" open={open} onClose={() => setOpen(false)}>
        <button className="dialog-close" aria-label="Close privacy information" onClick={() => setOpen(false)}>×</button>
        <span className="kicker">Website privacy</span>
        <h2 id="privacy-dialog-title">Your enquiry details</h2>
        <p>When you submit the enquiry form, this website emails your details to Think Risk International at {EMAIL}. The website does not keep a copy of the information you enter.</p>
        <p>If the form cannot send your enquiry, it prepares an email draft instead, which you can review and send through your own email provider. Include only information needed for your training enquiry.</p>
        <p>Your selected pricing currency and learning plan may be remembered in this browser. Contact <a href={`mailto:${EMAIL}`}>{EMAIL}</a> for questions about how Think Risk handles information received by email.</p>
      </Dialog>
    </>
  );
}
