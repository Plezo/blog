type Props = {
  data: {
    lines: number;
    words: number;
    characters: number;
  };
};

export default function WordCount({ data }: Props) {
  return (
    <div className="w-full flex justify-center my-8">
      <div className="text-xl font-semibold flex space-x-3">
        <span>Lines: {data.lines}</span>
        <span>Characters: {data.characters}</span>
        <span>Words: {data.words}</span>
      </div>
    </div>
  );
}
