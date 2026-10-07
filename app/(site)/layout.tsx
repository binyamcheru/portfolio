import Sidebar from "@/components/layout/Sidebar";
import PersonaChat from "@/components/persona/PersonaChat";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="shell mx-auto max-w-[1200px] p-3 sm:p-5 lg:p-8">
        <div className="shell-card grid overflow-hidden rounded-2xl border border-line bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-24px_rgba(0,0,0,0.25)] lg:grid-cols-[232px_1fr]">
          <Sidebar />
          <main className="min-w-0">{children}</main>
        </div>
      </div>
      <div className="no-print">
        <PersonaChat />
      </div>
    </>
  );
}
