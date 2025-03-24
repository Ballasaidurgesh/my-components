import "./styles.scss";
import { BsClipboard2, BsClipboard2CheckFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 1000);
    }
  }, [copied]);

  useEffect(() => {
    const initializeHighlighter = async () => {
      // Create a highlighter instance
      const highlighter = await createHighlighter({
        themes: ["github-dark"], // Add themes you want to use
        langs: ["tsx"], // Add languages you want to support
      });

      // Highlight the code
      const html = highlighter.codeToHtml(children, {
        lang: "tsx",
        theme: "github-dark", // Use the desired theme
      });

      setHighlightedCode(html);
    };

    initializeHighlighter();
  }, [children]);

  return (
    <div className="code-block">
      {copied ? (
        <BsClipboard2CheckFill className="code-block__copy-icon" />
      ) : (
        <BsClipboard2
          className="code-block__copy-icon"
          onClick={() => {
            navigator.clipboard.writeText(children);
            setCopied(true);
          }}
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </div>
  );
}

export default CodeBlock;
