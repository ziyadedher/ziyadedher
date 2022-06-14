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
  readonly tickDelay?: number;
}

const generateHackerText = (text: string): string =>
  Array(text.length)
    .fill(0)
    .map(() => ALPHABET[Math.floor(Math.random() * ALPHABET.length)])
    .join("");

const AnimatedHackerText: React.FunctionComponent<AnimatedHackerTextProps> = ({
  text,
  delay = 500,
  tickDelay = 10,
}: AnimatedHackerTextProps) => {
  const [currentText, setCurrentText] = useState(text);

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
    }, tickDelay);

    return (): void => {
      clearInterval(interval);
    };
  }, [text, delay, tickDelay]);

  return <span>{currentText}</span>;
};

export default AnimatedHackerText;
