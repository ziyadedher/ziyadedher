"use client";

import { useCallback, useState } from "react";

import Shell from "@/app/hacks/(tty)/(shell)";
import Login from "@/app/hacks/(tty)/login";
import Startup from "@/app/hacks/(tty)/startup";

export default function Page() {
  const [isStartupCompleted, setIsStartupCompleted] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const onStartupCompleted = useCallback(() => {
    setTimeout(() => {
      setIsStartupCompleted(true);
    }, 0);
  }, []);

  return (
    <div className="min-h-svh flex w-full flex-col items-center bg-slate-950">
      <div className="h-full w-full p-4">
        {isStartupCompleted || <Startup onDone={onStartupCompleted} />}
        {isStartupCompleted &&
          (username === null ? <Login onLogin={setUsername} /> : null)}
        {isStartupCompleted && username !== null && (
          <Shell username={username} />
        )}
      </div>
    </div>
  );
}
