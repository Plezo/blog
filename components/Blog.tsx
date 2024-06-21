// Render the list of blogs
import { Blog } from "@/lib/types";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "@radix-ui/react-separator";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  return (
    <a href={`/blogs/${blog.id}`}>
      <Card key={blog.id} className="bg-primary h-64 border-0 rounded-none">
        <CardHeader>
          <div className="flex ">
            <CardTitle className="text-foreground">{blog.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-foreground">
          <div className="flex flex-row gap-8">
            <div className="w-64 h-32">
              <p>{blog.overview}</p>
            </div>
            <div>
              {blog.img && (
                <Image src={blog.img} width={100} height={100} alt="" />
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex text-foreground justify-bottom pb-0">
          <p>{blog.createdat}</p>
        </CardFooter>
        <Separator className="my-2 w-full bg-red h-1" />
      </Card>
    </a>
  );
};

export default SingleBlog;
