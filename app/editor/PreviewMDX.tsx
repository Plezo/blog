import { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote/rsc";

export default function PreviewMDX({
  source,
  components,
}: {
  source: string;
  components: MDXComponents;
}) {
  return <MDXRemote source={source} components={components} />;
}
