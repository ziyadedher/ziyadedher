import coverImage from "@public/blog/security.txt/cover.png";

export const metadata = {
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
