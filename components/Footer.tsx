type Props = {
  data: {
    lines: number;
    words: number;
    characters: number;
  };
};

export default function Footer({ data }: Props) {
  return (
    <div className="h-10 z-10 bg-[#253237] fixed bottom-0 w-full pr-10 flex justify-between">
      <div className="text-xl font-semibold flex space-x-3">
        <span>Lines: {data.lines}</span>
        <span>Characters: {data.characters}</span>
        <span>Words: {data.words}</span>
      </div>
    </div>
  );
}
