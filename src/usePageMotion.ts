import { useEffect } from 'react';

/** Progressive enhancement: content stays visible if motion APIs are unavailable. */
export function usePageMotion() {
 useEffect(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let cleanup = () => {};
  function setup() {
   cleanup();
   if (preference.matches) return;
   const hero = document.querySelector<HTMLElement>('.hero-image-window');
   const animations = new Set<Animation>();
   let frame = 0;
   function draw() {
    frame = 0;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const limit = window.innerWidth < 650 ? 20 : 36;
    const offset = Math.max(-limit, Math.min(limit, (window.innerHeight / 2 - rect.top - rect.height / 2) * .12));
    hero.style.setProperty('--parallax-y', `${offset}px`);
   }
   function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
   window.addEventListener('scroll', schedule, { passive: true });
   window.addEventListener('resize', schedule, { passive: true });
   draw();
   let observer: IntersectionObserver | undefined;
   if ('IntersectionObserver' in window && typeof Element.prototype.animate === 'function') {
    observer = new IntersectionObserver(entries => {
     entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer?.unobserve(entry.target);
      // Never animate a currently focused form or link out of view.
      if (entry.target.contains(document.activeElement)) return;
      const animation = entry.target.animate([
       { opacity: .15, transform: 'translateY(18px)' },
       { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 650, easing: 'cubic-bezier(.2,.65,.3,1)' });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
     });
    }, { threshold: .08 });
    document.querySelectorAll('.section-heading, .service-card, .fee-card, .about-grid > div, .enquiry-copy, .enquiry-form, .faq-list, .contact-grid, .security-note').forEach(element => observer?.observe(element));
   }
   function revealFocusedContent() { animations.forEach(animation => animation.finish()); }
   document.addEventListener('focusin', revealFocusedContent);
   cleanup = () => {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    document.removeEventListener('focusin', revealFocusedContent);
    cancelAnimationFrame(frame);
    observer?.disconnect();
    animations.forEach(animation => animation.cancel());
    animations.clear();
    hero?.style.removeProperty('--parallax-y');
   };
  }
  setup();
  preference.addEventListener('change', setup);
  return () => { cleanup(); preference.removeEventListener('change', setup); };
 }, []);
}
