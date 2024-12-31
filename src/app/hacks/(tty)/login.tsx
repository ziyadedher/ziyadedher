import { useCallback, useEffect, useState, ReactNode } from "react";

import Terminal from "@/app/hacks/(tty)/terminal";

export default function Login({
  onLogin,
}: {
  onLogin: (username: string) => void;
}) {
  const [lines, setLines] = useState<ReactNode[]>([]);
  const [inputMode, setInputMode] = useState<null | "username" | "password">(
    null,
  );
  const [username, setUsername] = useState("");

  const resetToStart = useCallback(() => {
    setInputMode("username");
    setUsername("");
    setLines([
      <span>Arch Linux 6.12.6-arch1-1 (tty1)</span>,
      <br />,
      <br />,
      <span>ziyadscorner login: </span>,
    ]);
  }, []);

  useEffect(() => {
    resetToStart();
  }, [resetToStart]);

  const handleUsername = useCallback(
    (input: string) => {
      if (!/^[a-zA-Z0-9]+$/.exec(input)) {
        setLines([...lines, <br />, <span>Invalid username</span>]);
        setInputMode(null);
        setTimeout(() => {
          resetToStart();
        }, 1000);
        return;
      }
      setUsername(input);

      setInputMode("password");
      setLines([
        ...lines,
        <span>{input}</span>,
        <br />,
        <span>{input} password: </span>,
      ]);
    },
    [lines, resetToStart],
  );

  const handlePassword = useCallback(() => {
    onLogin(username);
  }, [username, onLogin]);

  return (
    <Terminal
      lines={lines}
      expectInput={
        inputMode === null
          ? null
          : inputMode === "username"
            ? "normal"
            : "password"
      }
      onInput={inputMode === "username" ? handleUsername : handlePassword}
      onCtrlC={resetToStart}
      enableHistory={false}
    />
  );
}
