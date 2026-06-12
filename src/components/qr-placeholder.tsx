import { QrCode } from "lucide-react";

type Props = {
  label: string;
};

export function QrPlaceholder({ label }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex size-32 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40">
        <QrCode className="size-10 text-muted-foreground" aria-hidden />
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
