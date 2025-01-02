import { Highlight, themes } from "prism-react-renderer";
import { ReactNode } from "react";

interface ArticleProps {
  readonly category: string;
  readonly title: ReactNode;
  readonly subtitle: ReactNode;
  readonly date: Date;
}

export function Article({
  category,
  title,
  subtitle,
  date,
  children,
}: React.PropsWithChildren<ArticleProps>) {
  return (
    <article className="relative flex flex-col font-normal text-base text-slate-700 gap-8">
      <div className="max-w-4xl self-center flex flex-col items-center text-center">
        <p className="flex flex-row gap-4 text-sm font-light">
          <span>{category}</span>
          <span>·</span>
          <span>
            {date.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </p>
        <h1 className="text-2xl/10 font-serif">{title}</h1>
        <p className="text-base opacity-85 font-serif">{subtitle}</p>
      </div>
      <Divider />
      <div className="w-full lg:w-2/3 flex flex-col gap-8">{children}</div>
    </article>
  );
}

export function Divider() {
  return (
    <p className="text-center tracking-wide">&#65290; &#65290; &#65290;</p>
  );
}

interface SectionProps {
  readonly id: string;
  readonly title?: ReactNode | null;
}

export function Section({
  id,
  title = null,
  children,
}: React.PropsWithChildren<SectionProps>) {
  return (
    <section className="text-justify">
      {title && id && (
        <a href={`#${id}`} className="group">
          <h1
            id={id}
            className="mb-2 text-xl/8 font-medium font-serif group-hover:opacity-75"
          >
            {title}
            <span className="hidden float-right group-hover:inline-block">
              #
            </span>
          </h1>
        </a>
      )}
      {children}
    </section>
  );
}

interface AsideProps {
  readonly id: string;
}

export function Aside({ id, children }: React.PropsWithChildren<AsideProps>) {
  return (
    <>
      <span
        id={`aside-ref-${id}`}
        className="hidden lg:inline-block align-super text-xs text-slate-500 font-serif"
      >
        {id}
      </span>
      <aside
        id={`aside-${id}`}
        className="hidden lg:inline-block relative float-right clear-right mb-4 mr-[-50%] w-1/2 pl-16 text-xs text-left"
      >
        <span className="text-slate-500 font-serif">{id}.</span>{" "}
        <span className="font-serif">{children}</span>
      </aside>
    </>
  );
}

interface CodeInlineProps {
  language: string;
  children: string;
}

export function CodeInline({ language, children }: CodeInlineProps) {
  return (
    <Highlight theme={themes.nightOwl} code={children} language={language}>
      {({ className, style, tokens, getTokenProps }) => (
        <code className={`${className} px-2 rounded-md`} style={style}>
          {tokens[0].map((token, key) => (
            <span key={key} {...getTokenProps({ token })} />
          ))}
        </code>
      )}
    </Highlight>
  );
}

interface CodeBlockProps {
  language: string;
  showLineNumbers?: boolean;
  filename?: string;
  children: string;
}

export function CodeBlock({
  language,
  showLineNumbers = true,
  filename,
  children,
}: CodeBlockProps) {
  return (
    <Highlight theme={themes.nightOwl} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} group overflow-x-auto p-4 rounded-lg my-4`}
          style={style}
        >
          {filename && (
            <div className="mb-1 text-sm opacity-75 select-none">
              {filename}
            </div>
          )}
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {showLineNumbers && (
                <span className="mr-4 opacity-50 select-none">{i + 1}</span>
              )}
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
