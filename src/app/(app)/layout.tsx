import { VerificiationWarning } from "./_components/verificiation-warning";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="container min-h-[calc(100vh-180px)] px-2 pt-6 md:px-4">
      <main className="w-full space-y-4">
        <VerificiationWarning />
        <div>{children}</div>
      </main>
    </div>
  );
}
