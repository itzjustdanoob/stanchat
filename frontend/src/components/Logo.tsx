import logoTop from "@/assets/stanchat-logo-top.png.asset.json";
import logoScript from "@/assets/stanchat-logo-script.png.asset.json";

type Variant = "block" | "script";

export function Logo({
  className = "h-8 w-auto",
  variant = "block",
}: {
  className?: string;
  variant?: Variant;
}) {
  const asset = variant === "script" ? logoScript : logoTop;
  return (
    <img
      src={asset.url}
      alt="StanChat"
      className={className}
      draggable={false}
    />
  );
}
