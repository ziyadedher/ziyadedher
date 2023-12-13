import TextLink from "@/components/links/text";

import { metadata as securityDotTxtMetadata } from "@/app/blog/security_txt/metadata";

const entries = [securityDotTxtMetadata].sort(
  (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
);

const Page = () => (
  <div className="mx-auto flex w-full max-w-sm flex-col gap-12 pt-8 font-light">
    <div className="flex flex-col gap-4 self-center text-center">
      <h1 className="text-4xl">Ziyad&apos;s Blog</h1>
      <h2 className="text-lg text-gray-600">
        I write things sometimes about technology, security, software
        engineering, or whatever else.
      </h2>
    </div>
    <div>
      <ul className="flex flex-col gap-8">
        {entries.map((metadata) => (
          <li key={metadata.page}>
            <div className="flex flex-col gap-1">
              <h4 className="text-xs text-gray-500">
                {metadata.publishedAt.toDateString()}
              </h4>
              <TextLink href={metadata.page}>
                <h3 className="text-lg">{metadata.title}</h3>
              </TextLink>
              <p className="text-sm">{metadata.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Page;
