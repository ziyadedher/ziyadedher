import type { NextApiRequest, NextApiResponse } from "next";

export type ReadonlyDate = Readonly<
  Omit<
    Date,
    | "setDate"
    | "setFullYear"
    | "setHours"
    | "setMilliseconds"
    | "setMinutes"
    | "setMonth"
    | "setSeconds"
    | "setTime"
    | "setUTCDate"
    | "setUTCFullYear"
    | "setUTCHours"
    | "setUTCMilliseconds"
    | "setUTCMinutes"
    | "setUTCMonth"
    | "setUTCSeconds"
  >
>;

export interface HitListItem {
  readonly companyName: string;
  readonly companyUrl: string;
  readonly companyField: string;
  readonly bugBountyProvider: string;
  readonly bugBountyUrl: string;
  readonly bugBountySpecialAmount: number;
  readonly bugBountySpecialStartDate: ReadonlyDate;
  readonly bugBountySpecialEndDate: ReadonlyDate | null;
  readonly bugBountySpecialSourceUrl: string;
}

export const HIT_LIST: HitListItem[] = [
  {
    companyName: "Asana",
    companyUrl: "https://asana.com",
    companyField: "SaaS - Work Management",
    bugBountyProvider: "BugCrowd",
    bugBountyUrl: "https://asana.com/bounty",
    bugBountySpecialAmount: 25000,
    bugBountySpecialStartDate: new Date("2021-12-14 21:22:15 UTC"),
    bugBountySpecialEndDate: null,
    bugBountySpecialSourceUrl:
      "https://bugcrowd.com/asana/updates/fec4276b-995d-4a11-8c20-dc293ebbd6d8",
  },
  {
    companyName: "Hyatt",
    companyUrl: "https://www.hyatt.com",
    companyField: "Hotels & Travel",
    bugBountyProvider: "HackerOne",
    bugBountyUrl: "https://hackerone.com/hyatt",
    bugBountySpecialAmount: 25000,
    bugBountySpecialStartDate: new Date("2021-12-13 17:59:01 UTC"),
    bugBountySpecialEndDate: new Date("2021-12-20"),
    bugBountySpecialSourceUrl:
      "https://hackerone.com/hyatt/bounty_table_versions?type=team&change=2021-12-13T17%3A59%3A01.832Z",
  },
  {
    companyName: "Glassdoor",
    companyUrl: "https://www.glassdoor.com",
    companyField: "Job Search",
    bugBountyProvider: "HackerOne",
    bugBountyUrl: "https://hackerone.com/glassdoor",
    bugBountySpecialAmount: 5000,
    bugBountySpecialStartDate: new Date("2021-12-14 01:27:44 UTC"),
    bugBountySpecialEndDate: null,
    bugBountySpecialSourceUrl:
      "https://hackerone.com/glassdoor/policy_versions?type=team&change=3662968",
  },
  {
    companyName: "Coinbase",
    companyUrl: "https://www.coinbase.com",
    companyField: "Finance - Crypto",
    bugBountyProvider: "HackerOne",
    bugBountyUrl: "https://hackerone.com/coinbase",
    bugBountySpecialAmount: 30000,
    bugBountySpecialStartDate: new Date("2021-12-15 17:50:29 UTC"),
    bugBountySpecialEndDate: null,
    bugBountySpecialSourceUrl:
      "https://hackerone.com/coinbase/policy_versions?type=team&change=3663055",
  },
].sort((a: HitListItem, b: HitListItem) =>
  a.companyName.localeCompare(b.companyName)
);

export default function handler(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/no-unused-vars -- Next.js API
  _: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Next.js API
  response: NextApiResponse<readonly HitListItem[]>
): void {
  response.status(200).json(HIT_LIST);
}
