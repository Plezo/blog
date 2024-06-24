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

const SingleBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="flex justify-center">
      <Card
        key={blog.id}
        className="h-64 border-0 rounded-none w-[32rem] bg-transparent"
      >
        <a className="w-[32rem]" href={`/blogs/${blog.id}`}>
          <CardHeader>
            <div className="flex ">
              <CardTitle className="text-foreground">{blog.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-foreground">
            <div className="flex flex-row gap-0">
              <div className="w-80 h-32">
                <p>{blog.overview}</p>
              </div>
              <div className="flex justify-end w-32 h-32">
                {blog.img && (
                  <Image
                    src={blog.img}
                    width={100}
                    height={150}
                    alt=""
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex text-foreground justify-bottom pb-0">
            <p>{blog.createdat}</p>
          </CardFooter>
        </a>
      </Card>
    </div>
  );
};

export default SingleBlog;
