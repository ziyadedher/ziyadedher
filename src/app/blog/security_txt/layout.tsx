import Post from "@/app/blog/_components/post";
import { constructNextMetadata } from "@/app/blog/_components/metadata";

import coverImage from "@public/blog/security.txt/cover.png";

export const internalMetadata = {
  page: "/blog/security_txt",
  title: "State of the Security.txt",
  description:
    "We have RFC9116, where is the security.txt? An analysis and overview of our experience deploying it to a site with millions of daily active users.",
  publishedAt: new Date(2022, 8, 5), // 2022-09-05
};

export const coverImageWithAlt = {
  ...coverImage,
  alt: "hand-drawn cartoon of a stick figure walking away sadly from a sign that reads, in all caps, 'absolutely no unauthorized hacking'",
};

export const metadata = constructNextMetadata(
  internalMetadata,
  coverImageWithAlt
);

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Post metadata={internalMetadata} coverImage={coverImageWithAlt}>
    {children}
  </Post>
);

export default Layout;
