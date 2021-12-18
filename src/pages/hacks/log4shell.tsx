import Head from "next/head";
import Link from "next/link";
import React from "react";

import PageContainer, { PageStyle } from "../../components/page_container";
import Anchor from "../../logic/anchor";
import { HIT_LIST } from "../api/hacks/log4shell";

import type { HitListItem } from "../api/hacks/log4shell";
import type { NextPage } from "next";

interface TableHeaderItemProps {
  readonly headerName: string;
}

const TableHeaderItem: React.FunctionComponent<TableHeaderItemProps> = ({
  headerName,
}: TableHeaderItemProps) => (
  <th
    scope="col"
    className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase"
  >
    {headerName}
  </th>
);

interface TableRowItemProps {
  readonly children?: React.ReactNode;
}

const TableRowItem: React.FunctionComponent<TableRowItemProps> = ({
  children,
}: TableRowItemProps) => (
  <td className="py-4 px-6 text-sm whitespace-nowrap">{children}</td>
);

interface TableRowProps {
  readonly item: HitListItem;
  readonly isOdd: boolean;
}

const TableRow: React.FunctionComponent<TableRowProps> = ({
  item,
  isOdd,
}: TableRowProps) => (
  <tr className={isOdd ? "bg-gray-900" : "bg-gray-900"}>
    <TableRowItem>
      <span className="text-blue-600 hover:opacity-50 transition-all">
        <Link href={item.companyUrl} passHref>
          <Anchor shouldOpenInNewPage>{item.companyName}</Anchor>
        </Link>
      </span>
    </TableRowItem>
    <TableRowItem>
      <span className="text-blue-600 hover:opacity-50 transition-all">
        <Link href={item.bugBountyUrl} passHref>
          <Anchor shouldOpenInNewPage>{item.bugBountyProvider}</Anchor>
        </Link>
      </span>
    </TableRowItem>
    <TableRowItem>
      <span className="text-blue-600 hover:opacity-50 transition-all">
        <Link href={item.bugBountySpecialSourceUrl} passHref>
          <Anchor>${item.bugBountySpecialAmount.toLocaleString()}</Anchor>
        </Link>
      </span>
    </TableRowItem>
    <TableRowItem>
      {item.bugBountySpecialStartDate.toDateString()} &mdash;{" "}
      {item.bugBountySpecialEndDate?.toDateString() ?? "no specified date"}
    </TableRowItem>
  </tr>
);

const Index: NextPage = () => (
  <>
    <Head>
      <title>Log4Shell Public Bug Bounty Specials</title>
      <meta
        name="description"
        content="List of companies with public bug bounty specials for Log4Shell (CVE-2021-44228). Log4Shell is an RCE vulnerability in the very popular Log4J logging library."
      />
    </Head>

    <PageContainer
      hasNavbar
      hasHeader
      navbarPage={null}
      pageStyle={PageStyle.HACKER}
    >
      <div className="flex flex-col flex-1 gap-2 items-center px-6 xl:mx-0 w-full text-sm font-light text-center">
        <h1 className="text-xl">Log4Shell Public Bug Bounty Specials</h1>
        <p className="max-w-xl text-sm">
          Log4Shell (
          <Link href="https://nvd.nist.gov/vuln/detail/CVE-2021-44228" passHref>
            <Anchor shouldOpenInNewPage>CVE-2021-44228</Anchor>
          </Link>
          ) is an RCE 0day in Log4j, a popular Java logging framework. Many
          companies have put together bug bounty specials for anyone who can
          demonstrate that they are still vulnerable to Log4Shell.
        </p>

        <div className="flex overflow-x-auto flex-col flex-1 my-8 max-w-full text-left">
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
              {HIT_LIST.map((item, i) => (
                <TableRow
                  key={item.companyName}
                  item={item}
                  isOdd={i % 2 === 1}
                />
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="opacity-60 hover:opacity-90 active:opacity-100 transition-all">
          <Link href="/api/hacks/log4shell" passHref>
            <Anchor shouldOpenInNewPage>
              Click here for the data in the table as JSON.
            </Anchor>
          </Link>
        </h2>
        <p className="max-w-md text-sm opacity-40">
          If you have any questions or see anything missing from this list,
          please contact me on Twitter or however else you find me.
        </p>
      </div>
    </PageContainer>
  </>
);

export default Index;
