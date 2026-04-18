// src/components/layout/footer.tsx
export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-8 text-center">
      <p className="text-slate-500 text-sm">
        © {new Date().getFullYear()} Annisa Mardhotila. All rights reserved.
      </p>
    </footer>
  );
}