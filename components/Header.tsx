import { useUser } from "@/hooks/useUser";
import axios from "axios";
import Image from "next/image";

export default function Header({
  feedElement,
}: {
  feedElement: (syntax: string) => void;
}) {
  const user = useUser();

  const btns = [
    { name: "B", syntax: "**Bold**" },
    { name: "I", syntax: "*Italic*" },
    { name: "S", syntax: "~Strikethrough~" },
    { name: "H1", syntax: "# " },
    { name: "H2", syntax: "## " },
    { name: "H3", syntax: "### " },
    { name: "•", syntax: "- " },
    { name: "1.", syntax: "1. " },
    { name: "✓", syntax: "- [ ] " },
    { name: "a", syntax: "[text](url)" },
    { name: "Img", syntax: "![alt](url)" },
    { name: "C", syntax: "```language\n\n```" },
    { name: "--", syntax: "---\n" },
    {
      name: "T",
      syntax:
        "| Header | Title |\n| ----------- | ----------- |\n| Paragraph | Text |",
    },
  ];

  const handleSignOut = async () => {
    try {
      await axios.get("/api/auth/logout");
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  return (
    <header className="flex items-center justify-between h-14 sticky top-0 z-10 bg-[#253237]">
      <h1 className="text-3xl font-bold text-yellow-500">Blog Editor</h1>
      <section className="flex items-center mx-auto ml-16 space-x-5">
        {btns.map((btn) => (
          <button
            key={btn.syntax}
            className="flex items-center justify-center pt-2 w-8 h-8 text-xl text-yellow-300 rounded-md"
            onClick={() => feedElement(btn.syntax)}
          >
            {btn.name}
          </button>
        ))}
      </section>
      {user && (
        <div className="flex gap-4 pt-4">
          <span className="m-auto">{user?.username}</span>
          <Image
            className="rounded-full"
            src={user?.img}
            width={50}
            height={50}
            alt="User Profile"
          />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
      {!user && (
        <div>
          <span>Loading...</span>
        </div>
      )}
    </header>
  );
}
