import { BlogPreview } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export default async function Metadata({
  metadata,
}: {
  metadata: BlogPreview;
}) {
  return (
    <div className="flex flex-col m-auto gap-4 w-full">
      <h1 className="text-5xl font-bold text-foreground">{metadata.title}</h1>
      <p className="text-xl text-gray-400">{metadata.overview}</p>
      <div className="flex w-32">
        <div className="h-12 w-12 relative">
          <Image
            className="rounded-full"
            src={metadata.userimg!}
            layout="fill"
            alt=""
          />
        </div>
        <div className="flex flex-col m-auto">
          <span className="text-sm">{metadata.username}</span>
          <p className="text-sm text-gray-300">
            {formatDate(new Date(metadata.createdat))}
          </p>
        </div>
      </div>
      <div className="flex justify-center w-full overflow-hidden">
        {metadata.img && (
          <div className="h-144 w-full relative">
            <Image src={metadata.img} layout="fill" objectFit="cover" alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
