import { MDXRemote } from "next-mdx-remote/rsc";

export default function PreviewMDX({ source }: { source: string }) {
  return <MDXRemote source={source} />;
}
