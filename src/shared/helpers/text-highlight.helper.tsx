// TODO: UT
export const highlightText = (text: string, highlight: string) => {
  if (!text) return null;

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={index} style={{ backgroundColor: 'yellow' }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};
