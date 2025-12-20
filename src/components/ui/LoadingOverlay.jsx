import { Loader2 } from "lucide-react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="size-12 animate-spin text-violet-500" />

        {/* 4. O Texto Pulsante */}
        <p className="text-lg font-medium text-cyan-400 animate-pulse tracking-wide">
          Um momento...
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
