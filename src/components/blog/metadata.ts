interface BlogPostMetadata {
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly publishedAt: Date;
  readonly modifiedAt?: Date;
}

export default BlogPostMetadata;
