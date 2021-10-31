import React, { useEffect, useState } from "react";

const ALPHABET =
  "abcdefghijklmnopqrstuvwxyz" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "0123456789" +
  "`-=[]\\;',./" +
  '~!@#$%^&*()_+{}|:"<>?';

interface AnimatedHackerTextProps {
  readonly text: string;
  readonly delay?: number;
}

const generateHackerText = (text: string): string =>
  Array(text.length)
    .fill(0)
    .map(() => ALPHABET[Math.floor(Math.random() * ALPHABET.length)])
    .join("");

const AnimatedHackerText: React.FunctionComponent<AnimatedHackerTextProps> = ({
  text,
  delay = 500,
}: AnimatedHackerTextProps) => {
  window.performance.now();
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const startTime = window.performance.now();
    const interval = setInterval(() => {
      const currentTime = window.performance.now();
      if (currentTime - startTime < delay) {
        setCurrentText(generateHackerText(text));
      } else {
        setCurrentText(text);
        clearInterval(interval);
      }
    }, 10);

    return (): void => {
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{currentText}</span>;
};

export default AnimatedHackerText;
