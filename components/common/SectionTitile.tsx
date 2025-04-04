import { Anek_Devanagari } from "next/font/google";

const anek = Anek_Devanagari({ subsets: ["devanagari"] });

export default function SectionTitle({
  title,
  highlight,
  className,
}: {
  title: string;
  highlight: string;
  className?: string;
}) {
  // Check if the highlight text exists in the title
  const highlightIndex = title.indexOf(highlight);

  if (highlightIndex === -1) {
    // If highlight text not found in title, render as is
    return <h1 className="text-[2.25rem] text-center text-white">{title}</h1>;
  }

  // Split the title into parts: before highlight, highlight, and after highlight
  const beforeHighlight = title.substring(0, highlightIndex);
  const afterHighlight = title.substring(highlightIndex + highlight.length);

  return (
    <h1
      className={`${anek.className} ${
        className ? className : "text-[2rem] text-center text-white"
      }`}
    >
      {beforeHighlight}
      <span
        className="mx-[0.35rem] bg-clip-text text-white"
        style={{
          backgroundImage: "linear-gradient(to right, #F93C52, #2B21F3)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {highlight}
      </span>
      {afterHighlight}
    </h1>
  );
}
