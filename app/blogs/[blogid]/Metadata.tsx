import { BlogPreview } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export default async function Metadata({
  metadata,
}: {
  metadata: BlogPreview;
}) {
  return (
    <div className="flex flex-col m-auto gap-4">
      <h1 className="text-5xl font-bold text-foreground">{metadata.title}</h1>
      <p className="text-xl text-gray-400">{metadata.overview}</p>
      <div className="flex gap-4 w-16">
        <Image
          className="rounded-full h-full w-full"
          src={metadata.userimg!}
          width={35}
          height={35}
          alt=""
        />
        <div className="flex flex-col m-auto">
          <span className="text-sm">{metadata.username}</span>
          <p className="text-sm text-gray-300">
            {formatDate(new Date(metadata.createdat))}
          </p>
        </div>
      </div>
      <div className="flex justify-center w-full overflow-hidden">
        {metadata.img && (
          <Image
            className="w-full h-[500px] object-cover"
            src={metadata.img}
            // fill={true}
            width={500}
            height={500}
            objectFit="contain"
            alt=""
          />
        )}
      </div>
    </div>
  );
}
