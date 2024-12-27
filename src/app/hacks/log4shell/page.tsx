import Link from "next/link";

import { getHitList } from "@/app/hacks/log4shell/data";
import Anchor from "@/logic/anchor";

import type { HitListItem } from "@/app/hacks/log4shell/data";

export const metadata = {
  title: "Log4Shell Public Bug Bounty Specials | Ziyad Edher",
  description:
    "List of companies with public bug bounty specials for Log4Shell (CVE-2021-44228). Log4Shell is an RCE vulnerability in the very popular Log4J logging library.",
};

const TableHeaderItem = ({ headerName }: { headerName: string }) => (
  <th
    scope="col"
    className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider"
  >
    {headerName}
  </th>
);

const TableRowItem = ({ children }: { children?: React.ReactNode }) => (
  <td className="whitespace-nowrap py-4 px-6 text-sm">{children}</td>
);

const TableRow = ({ item, isOdd }: { item: HitListItem; isOdd: boolean }) => (
  <tr className={isOdd ? "bg-gray-900" : "bg-gray-900"}>
    <TableRowItem>
      <span className="text-blue-600 transition-all hover:opacity-50">
        <Link href={item.companyUrl} passHref legacyBehavior>
          <Anchor shouldOpenInNewPage>{item.companyName}</Anchor>
        </Link>
      </span>
    </TableRowItem>
    <TableRowItem>
      <span className="text-blue-600 transition-all hover:opacity-50">
        <Link href={item.bugBountyUrl} passHref legacyBehavior>
          <Anchor shouldOpenInNewPage>{item.bugBountyProvider}</Anchor>
        </Link>
      </span>
    </TableRowItem>
    <TableRowItem>
      <span className="text-blue-600 transition-all hover:opacity-50">
        <Link href={item.bugBountySpecialSourceUrl}>
          ${item.bugBountySpecialAmount.toLocaleString()}
        </Link>
      </span>
    </TableRowItem>
    <TableRowItem>
      {item.bugBountySpecialStartDate.toDateString()} &mdash;{" "}
      {item.bugBountySpecialEndDate?.toDateString() ?? "no specified date"}
    </TableRowItem>
  </tr>
);

const Page = () => (
  <div className="flex w-full flex-col items-center gap-2 px-6 text-center text-sm font-light xl:mx-0">
    <h1 className="text-xl">Log4Shell Public Bug Bounty Specials</h1>
    <p className="max-w-xl text-sm">
      Log4Shell (
      <Link
        href="https://nvd.nist.gov/vuln/detail/CVE-2021-44228"
        passHref
        legacyBehavior
      >
        <Anchor shouldOpenInNewPage>CVE-2021-44228</Anchor>
      </Link>
      ) is an RCE 0day in Log4j, a popular Java logging framework. Many
      companies have put together bug bounty specials for anyone who can
      demonstrate that they are still vulnerable to Log4Shell.
    </p>

    <div className="my-8 flex max-w-full flex-col overflow-x-auto text-left">
      <table className="table-auto">
        <thead className="border-b border-green-500">
          <tr>
            <TableHeaderItem headerName="Company" />
            <TableHeaderItem headerName="Bug Bounty" />
            <TableHeaderItem headerName="Amount (USD)" />
            <TableHeaderItem headerName="Dates" />
          </tr>
        </thead>
        <tbody>
          {getHitList().map((item, i) => (
            <TableRow key={item.companyName} item={item} isOdd={i % 2 === 1} />
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="opacity-60 transition-all hover:opacity-90 active:opacity-100">
      <Link href="api" passHref legacyBehavior>
        <Anchor shouldOpenInNewPage>
          Click here for the data in the table as JSON.
        </Anchor>
      </Link>
    </h2>
    <p className="max-w-md text-sm opacity-40">
      If you have any questions or see anything missing from this list, please
      contact me on Twitter or however else you find me.
    </p>
  </div>
);

export default Page;
