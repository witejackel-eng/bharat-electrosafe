/**
 * Inline pre-hydration script that applies the saved locale to `<html lang>`
 * before the React tree mounts. Prevents a brief flash where screen readers
 * and search crawlers see `lang="en"` while the page is actually Hindi.
 *
 * Rendered inside <head> in src/app/layout.tsx, right after the theme init
 * script. Tiny on purpose (no dependencies, runs synchronously before paint).
 */
export function LanguageInitScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `try{var l=localStorage.getItem('be-locale');if(l){document.documentElement.lang=l==='hi'?'hi':'en';}}catch(e){}`,
      }}
    />
  );
}
