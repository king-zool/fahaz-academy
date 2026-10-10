import { useEffect, useState } from 'react';
type Theme = 'light' | 'dark';
const storageKey = 'fahaz-theme';
function savedTheme(): Theme | null {
 try { const value = localStorage.getItem(storageKey); return value === 'light' || value === 'dark' ? value : null; }
 catch { return null; }
}
export function ThemeToggle() {
 const [theme, setTheme] = useState<Theme>(() => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
 const [explicit, setExplicit] = useState(() => savedTheme() !== null);
 useEffect(() => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#141e22' : '#faf9f6');
 }, [theme]);
 useEffect(() => {
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const syncSystem = () => { if (!explicit) setTheme(system.matches ? 'dark' : 'light'); };
  syncSystem();
  system.addEventListener('change', syncSystem);
  const syncStorage = (event: StorageEvent) => {
   if (event.key !== storageKey && event.key !== null) return;
   const saved = savedTheme();
   setExplicit(saved !== null);
   setTheme(saved ?? (system.matches ? 'dark' : 'light'));
  };
  window.addEventListener('storage', syncStorage);
  return () => { system.removeEventListener('change', syncSystem); window.removeEventListener('storage', syncStorage); };
 }, [explicit]);
 function toggle() {
  const next = theme === 'dark' ? 'light' : 'dark';
  setTheme(next); setExplicit(true);
  try { localStorage.setItem(storageKey, next); } catch { /* Works for this visit when storage is unavailable. */ }
 }
 return <button type="button" className="theme-toggle" onClick={toggle} aria-label="Dark mode" aria-pressed={theme === 'dark'} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
   {theme === 'dark' ? <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/></> : <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z"/>}
  </svg><span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
 </button>;
}
