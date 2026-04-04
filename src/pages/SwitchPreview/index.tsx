import { useState } from "react";

function Test({ colors = ["red", "green", "blue", "yellow", "purple"] }: { colors: string[] }) {
  const [randomColor, setRandomColor] = useState<string | null>(null);

  function handleSelectRandomColor() {
    const randomIndex = Math.round(Math.random() * colors.length - 1);

    const newColor = colors[randomIndex];

    if (newColor !== randomColor && newColor) {
      setRandomColor(newColor);
    } else {
      handleSelectRandomColor();
    }
  }

  return (
    <div>
      <button onClick={handleSelectRandomColor}>Select Random Color</button>
      {randomColor && <div style={{ color: randomColor }}>{randomColor}</div>}
    </div>
  );
}

export default Test;
