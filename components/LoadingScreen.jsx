import React from "react";
import { Loader2 } from "lucide-react";

// import { SpinningIcon } from "./SpinningIcon";
import { Sparkles, Zap } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 backdrop-blur-sm"
      role="alert"
      aria-busy="true"
    >
      <div className="rounded-lg bg-white/80 p-8 shadow-lg text-center ">
        {/* <SpinningIcon /> */}
        <div className="flex justify-center items-center">
          <div className="relative w-24 h-24 ">
            <div className="absolute inset-0 flex items-center justify-center animate-ping">
              <div className="w-16 h-16 bg-primary/20 rounded-full" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center animate-spin">
              <Loader2 className="h-12 w-12 text-primary" />
            </div>
          </div>
        </div>
        <p className="mt-4 text-xl font-bold text-primary animate-pulse"></p>
        <div className="mt-4 flex justify-center space-x-4">
          {/* <Sparkles className="h-6 w-6 text-yellow-500 animate-bounce" /> */}
          {/* <Zap className="h-6 w-6 text-blue-500 animate-pulse" /> */}
        </div>
        <p className="mt-4 text-sm text-gray-600 max-w-xs mx-auto">
          Patience is not the ability to wait, but the ability to keep a good
          attitude while waiting.
        </p>
      </div>
    </div>
  );
}
