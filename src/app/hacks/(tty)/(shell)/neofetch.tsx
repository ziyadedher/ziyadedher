import { ReactNode } from "react";

const MACHINE_NAME = "ziyadscorner";

const getArchAscii = () => [
  `                   -\`                    `,
  `                  .o+\`                   `,
  `                 \`ooo/                   `,
  `                \`+oooo:                  `,
  `               \`+oooooo:                 `,
  `               -+oooooo+:                `,
  `             \`/:-:++oooo+:               `,
  `            \`/++++/+++++++:              `,
  `           \`/++++++++++++++:             `,
  `          \`/+++ooooooooooooo/\`           `,
  `         ./ooosssso++osssssso+\`          `,
  `        .oossssso-\`\`\`\`/ossssss+\`         `,
  `       -osssssso.      :ssssssso.        `,
  `      :osssssss/        osssso+++.       `,
  `     /ossssssss/        +ssssooo/-       `,
  `   \`/ossssso+/:-        -:/+osssso+-     `,
  `  \`+sso+:-\`                 \`.-/+oso:    `,
  ` \`++:.                           \`-/+/   `,
  ` .\`                                 \`/   `,
];

const getSystemStats = () => [
  { label: "OS", value: "Arch Linux x86_64" },
  { label: "Kernel", value: "Linux 6.12.6-arch1-1" },
  { label: "Uptime", value: "4 hours, 20 mins" },
  { label: "Packages", value: "676 (pacman)" },
  { label: "Shell", value: "zsh 5.9" },
  {
    label: "Resolution",
    value: `${window.innerWidth}x${window.innerHeight}`,
  },
  { label: "WM", value: navigator.userAgent },
  { label: "Terminal", value: "tmux" },
  { label: "CPU", value: "Intel i9-14900K (32) @ 5.700GHz [52.0°C]" },
  { label: "GPU", value: "NVIDIA GeForce RTX 4070 Ti" },
  { label: "Memory", value: "19.58GiB / 62.53GiB (31%)" },
  { label: "GPU Driver", value: "NVIDIA 565.77" },
  { label: "CPU Usage", value: "8% [-==============]" },
  { label: "Disk (/)", value: "177G / 866G (22%) [---============]" },
  { label: "Font", value: "Fira Code 11 [GTK2/3]" },
];

export const generateNeofetch = (
  username: string,
  asciiArt: string[] = getArchAscii(),
  stats: { label: string; value: string | ReactNode }[] = getSystemStats(),
) => {
  const lines: ReactNode[] = [];
  const padding = 40;

  asciiArt.slice(2).forEach((line, index) => {
    const stat = index in stats ? stats[index] : null;
    lines.push(
      <span className="text-cyan-300">
        {line.padEnd(padding)}
        {stat && (
          <>
            <span className="text-cyan-300">{stat.label}: </span>
            <span className="text-white">{stat.value}</span>
          </>
        )}
      </span>,
    );
  });

  // Add header with username
  lines.unshift(
    <span className="text-cyan-300">
      {asciiArt[0].padEnd(padding)}
      {username}
      <span className="text-white">@</span>
      {MACHINE_NAME}
    </span>,
    <span className="text-cyan-300">
      {asciiArt[1].padEnd(padding)}
      <span className="text-white">
        {"-".repeat(`${username}@${MACHINE_NAME}`.length)}
      </span>
    </span>,
  );

  return lines;
};
