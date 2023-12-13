import Post from "@/app/blog/_components/post";
import { constructNextMetadata } from "@/app/blog/_components/metadata";
import {
  metadata as internalMetadata,
  coverImageWithAlt,
} from "@/app/blog/security_txt/metadata";

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
