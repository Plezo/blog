import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-5xl">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg">{children}</h4>,
    img: (props) => (
      <Image
        height={500}
        width={500}
        className="w-full h-144"
        {...(props as ImageProps)}
      />
    ),
    ...components,
  };
}
