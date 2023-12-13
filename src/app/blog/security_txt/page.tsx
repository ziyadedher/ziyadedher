import { Chart } from "primereact/chart";

import { TextLink } from "@/components/links";

const TopNBreakdownChart = ({
  title,
  data,
}: {
  title: string;
  data: number[];
}) => (
  <Chart
    type="doughnut"
    data={{
      labels: ["Found", "Missing"],
      datasets: [
        {
          data,
          backgroundColor: ["#4ade80", "#f87171"],
          hoverBackgroundColor: ["#86efac", "#fca5a5"],
        },
      ],
    }}
    options={{
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: title,
        },
      },
    }}
  />
);

const Page = () => (
  <>
    <section>
      <p>
        <b>Got vulnz?</b> Cool. Don&apos;t know a way to report them? Uncool.
      </p>
      <p>
        That&apos;s where{" "}
        <TextLink href="https://securitytxt.org/" isExternal>
          security.txt
        </TextLink>{" "}
        files come in. The concept is very simple: put a file at a predictable
        location that tells folks exactly how to reach out to you regarding
        security concerns.
      </p>
      <p>
        The format has been around in some capacity since at least 2017 and was
        standardized as part of{" "}
        <TextLink href="https://www.rfc-editor.org/rfc/rfc9116" isExternal>
          RFC9116
        </TextLink>{" "}
        in 2022. It is easily machine-readable, that means folks can build
        security.txt tools like{" "}
        <TextLink href="https://findsecuritycontacts.com/" isExternal>
          findsecuritycontacts.com
        </TextLink>
        <sup>1</sup> which makes makes researchers&apos; lives easier and gets
        vulnz straight to you. Win-win!
      </p>
      <p>
        Sounds great, right? I think so! But apparently the internet generally
        doesn&apos;t.
      </p>
    </section>

    <section>
      <h3>Adoption</h3>
      <p>
        Only 737 of the top 10,000 sites
        <sup>2</sup> have a security.txt &mdash; 7.37%. The top 1,000 and 100
        predictably have progressively more adoption at 13.2% and 28%
        respectively.
      </p>
      <div className="mx-auto my-8 grid grid-cols-3">
        <TopNBreakdownChart title="Top 10k" data={[737, 10000 - 737]} />
        <TopNBreakdownChart title="Top 1k" data={[132, 1000 - 132]} />
        <TopNBreakdownChart title="Top 100" data={[28, 100 - 28]} />
      </div>
      <p>
        Also, it looks like Google contributes about 30% of those 737
        security.txts. Way to go. It&apos;s a bit cheap to note this since
        Google also happens to own the vast plurality of the top 10k sites, but
        it highlights that the general industry is not picking this standard up.
      </p>
      <div className="mx-auto my-8 w-1/2">
        <Chart
          type="bar"
          data={{
            labels: ["Google", "Everyone Else"],
            datasets: [
              {
                data: [216, 512],
                backgroundColor: ["#60a5fa", "#d6d3d1"],
                hoverBackgroundColor: ["#93c5fd", "#e7e5e4"],
              },
            ],
          }}
          options={{
            indexAxis: "y",
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: "Distribution of security.txt",
              },
            },
          }}
        />
      </div>
      <p>
        Of those security.txts, most are not spec-compliant (including all of
        Google&apos;s)! That&apos;s not a <i>huge</i> deal, these files are
        meant for humans after all. It is a bit sad though, since it hurts
        machine parsability and also my feelings.
      </p>
      <p>
        Mostly, it&apos;s the either the lack of an expiry date or improper
        comments that breaks from the spec. Both relatively easy things to
        ignore and move on from, so that&apos;s good. I managed to parse the
        vast majority of security.txts I hit, with just a few code tweaks to
        handle non-compliance.
      </p>
      <p>
        Speaking of expiry dates, I was curious if folks are keeping their
        security.txt files up to date. Not having a security contact is bad, but
        being tossed a red herring is much, much worse.
      </p>
      <div className="mx-auto my-8 w-1/3">
        <Chart
          type="doughnut"
          data={{
            labels: ["Not Expired", "Expired", "No Expiry"],
            datasets: [
              {
                data: [161, 10, 565],
                backgroundColor: ["#4ade80", "#f87171", "#d6d3d1"],
                hoverBackgroundColor: ["#86efac", "#fca5a5", "#e7e5e4"],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: "Expiry Status",
              },
            },
          }}
        />
      </div>
      <p>
        Most deployments don&apos;t have expiry dates, but for those that do the
        vast majority are up to date! I reached out to the 10 domains with
        expired security.txts.
      </p>
      <p>
        It looks like most websites set long-ish expiry times on the order of
        months to a year and manually update them when the time comes, which is
        totally fine. Other websites like{" "}
        <TextLink href="https://hackerone.com/security.txt" isExternal>
          HackerOne
        </TextLink>{" "}
        (somewhat appropriately) automatically rotate their security.txt every
        week or so. To me, that instills confidence that I&apos;m going to be
        getting fresh and active contact info.
      </p>
    </section>

    <section>
      <h3>Criticism</h3>
      <p>
        <b>This encourages low-effort and spammy reports!</b> Most security.txt
        criticism I see (e.g. from the comments on{" "}
        <TextLink
          href="https://krebsonsecurity.com/2021/09/does-your-organization-have-a-security-txt-file/"
          isExternal
        >
          KrebsOnSecurity&apos;s post on the topic
        </TextLink>{" "}
        or{" "}
        <TextLink
          href="https://news.ycombinator.com/item?id=19151213"
          isExternal
        >
          HackerNews
        </TextLink>
        ) revolve around this accessibility opening the door for low-effort spam
        vulnerabilty reports.
      </p>
      <p>
        Now I can write a simple script that will scrape the internet (or a
        security.txt registry) for sites with security.txt files. Once I find
        one I launch some automated web vulnerability scanner and just forward
        the report to the security contact with a note that says &ldquo;You can
        send the bounty money to paypal@example.org&rdquo;. Something ought to
        stick.
      </p>
      <p>
        That totally happens. And it&apos;s can be annoying. But there&apos;s a
        sort-of reverse catch-22 here. If you&apos;re operating a small security
        program you probably won&apos;t have a lot of spam activity; worst comes
        to worst you drop the email and make it a bit harder to get in contact
        (but still have it be clear). If you&apos;re operating a larger security
        program, then not being able to handle low-effort vulnerability reports
        probably means you need to be investing more in your vulnerability
        intake and management processes.
      </p>
    </section>

    <section>
      <h3>Our Experience</h3>
      <p>
        <TextLink href="https://asana.com" isExternal>
          Asana
        </TextLink>{" "}
        (the company I work for at the time of writing) has an{" "}
        <TextLink href="https://www.rfc-editor.org/rfc/rfc9116" isExternal>
          RFC9116
        </TextLink>
        -compliant{" "}
        <TextLink href="https://asana.com/.well-known/security.txt" isExternal>
          security.txt
        </TextLink>{" "}
        as of a few months ago, so I&apos;m feeling pretty comfortable preaching
        off of my high horse.
      </p>
      <p>
        We have millions of daily active users, a fantastic customer support
        team, and a very active (and well-paying){" "}
        <TextLink href="https://bugcrowd.com/asana" isExternal>
          bug bounty program
        </TextLink>{" "}
        managed by BugCrowd. We get a lot of security reports both via our
        security contact email security@asana.com and our BugCrowd program, many
        of which are bogus.{" "}
        <b>
          But we don&apos;t deal with them on the security team, they never
          reach us!
        </b>
      </p>
      <p>
        When a security report comes in to our security@asana.com email address,
        it is triaged by our general customer support team. In most cases, folks
        are directed to BugCrowd. In particularly sensitive cases, the reports
        are escalated directly to the security team.
      </p>
      <p>
        When a BugCrowd submission comes in, BugCrowd triagers attempt to
        reproduce and validate the security report. If they are able to, it gets
        forwarded to the security team. Otherwise, the report is scrapped.
      </p>
      <p>
        Our security team only gets involved when the report is fully validated.
        The report gets automatically routed into the intake of our internal
        vulnerability management process and we respond to it like we respond to
        any other vulnerability that is discovered (with added communication to
        the reporter).
      </p>
      <p>
        <b>Less than 7.5% of reports reach the security team.</b>
      </p>
      <div className="mx-auto my-8 grid w-2/3 grid-cols-2">
        <Chart
          type="doughnut"
          data={{
            labels: ["Escalated", "Not Escalated"],
            datasets: [
              {
                data: [35, 414 + 96 - 35],
                backgroundColor: ["#f87171", "#d6d3d1"],
                hoverBackgroundColor: ["#fca5a5", "#e7e5e4"],
              },
            ],
          }}
          options={{
            indexAxis: "y",
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: "Past year",
              },
            },
          }}
        />
        <Chart
          type="doughnut"
          data={{
            labels: ["Escalated", "Not Escalated"],
            datasets: [
              {
                data: [14, 157 + 30 - 14],
                backgroundColor: ["#f87171", "#d6d3d1"],
                hoverBackgroundColor: ["#fca5a5", "#e7e5e4"],
              },
            ],
          }}
          options={{
            indexAxis: "y",
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: "Since deploying security.txt",
              },
            },
          }}
        />
      </div>
      <p>
        To me, this says that our vulnerability reporting and intake process is
        going pretty well.
      </p>
      <p>
        That said, if you&apos;re interested in helping us improve all this and
        more as part of a growing, collaborative, and well-supported team,
        we&apos;re hiring a{" "}
        <TextLink href="https://asana.com/jobs/apply/2596099" isExternal>
          Senior Application Security Engineer
        </TextLink>
        .
      </p>
    </section>

    <section>
      <h3>Conclusion</h3>
      Your organization should probably have a security.txt. If it&apos;s too
      much effort to maintain then that might be indicative of underinvestment
      in vulnerability management. I&apos;d be curious to here from you if you
      tried but ended up removing your security.txt. DM me on{" "}
      <TextLink href="https://twitter.com/ziyadedher" isExternal>
        Twitter
      </TextLink>{" "}
      or something.
    </section>

    <hr />

    <section className="text-xs">
      <p>
        Thanks for reading, I sometimes shitpost on{" "}
        <TextLink href="https://twitter.com/ziyadedher" isExternal>
          Twitter
        </TextLink>
        . The code I used to generate the adoption data is{" "}
        <TextLink
          href="https://github.com/ziyadedher/writing/tree/main/security.txt"
          isExternal
        >
          on GitHub
        </TextLink>
        . The code for this blog post is also{" "}
        <TextLink
          href="https://github.com/ziyadedher/ziyadedher/tree/main/src/pages/blog/security.txt.tsx"
          isExternal
        >
          on GitHub
        </TextLink>
        .
      </p>
      <p className="font-bold">Footnotes</p>
      <ol>
        <li>
          findsecuritycontacts.com also aggregates{" "}
          <TextLink href="https://dnssecuritytxt.org/" isExternal>
            DNS Security TXT
          </TextLink>
        </li>
        <li>
          according to{" "}
          <TextLink
            href="https://majestic.com/reports/majestic-million"
            isExternal
          >
            The Magestic Million
          </TextLink>{" "}
        </li>
      </ol>
    </section>
  </>
);

export default Page;
