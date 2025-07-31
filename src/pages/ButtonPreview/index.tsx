import Button from "@/components/Button";
import CodeBlock from "@/components/CodeBlock";
import Switch from "@/components/Switch";
import { useState } from "react";
import { IoCloudUploadOutline, IoSendSharp } from "react-icons/io5";

const variantsCodeString = `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>`;

const sizesCodeString = `<Button size="sm" variant="outline">Small</Button>
<Button size="md" variant="secondary">Medium</Button>
<Button size="lg">Large</Button>`;

const colorsCodeString = `<Button color="error">Primary</Button>
<Button variant="secondary" color="#7E60BF">Secondary</Button>
<Button variant="outline" color="success">Outline</Button>`;

const disabledCodeString = `<Button disabled>Primary</Button>`;

const withIconCodeString = `import { IoCloudUploadOutline, IoSendSharp } from "react-icons/io5";

<Button><IoCloudUploadOutline size={20} /> Upload</Button>
<Button variant="secondary" color="success">Send <IoSendSharp /></Button>`;

function ButtonPreview() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1>Button</h1>
      <p>Button allow users to take actions.</p>

      <h3>Variants</h3>
      <p>
        The Button component comes with three variants: primary (default), secondary, and outline.
      </p>

      <div className="preview-container">
        <div className="preview">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>

        <CodeBlock>{variantsCodeString}</CodeBlock>
      </div>

      <h3>Sizes</h3>
      <p>Size props: small, medium (default), large. Applies for all variants</p>

      <div className="preview-container">
        <div className="preview">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>

        <div className="preview" style={{ padding: "0px 20px" }}>
          <Button size="small" variant="secondary">
            Small
          </Button>
          <Button size="medium" variant="secondary">
            Medium
          </Button>
          <Button size="large" variant="secondary">
            Large
          </Button>
        </div>

        <div className="preview">
          <Button size="small" variant="outline">
            Small
          </Button>
          <Button size="medium" variant="outline">
            Medium
          </Button>
          <Button size="large" variant="outline">
            Large
          </Button>
        </div>

        <CodeBlock>{sizesCodeString}</CodeBlock>
      </div>

      <h3>Colors</h3>
      <div className="preview-container">
        <div className="preview">
          <Button color="error">Primary</Button>
          <Button variant="secondary" color="#7E60BF">
            Secondary
          </Button>
          <Button variant="outline" color="success">
            Outline
          </Button>
        </div>

        <CodeBlock>{colorsCodeString}</CodeBlock>
      </div>

      <h3>Disabled</h3>
      <div className="preview-container">
        <div className="preview">
          <Button disabled>Primary</Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
        </div>

        <CodeBlock>{disabledCodeString}</CodeBlock>
      </div>

      <h3 id="with-icon">With Icon</h3>
      <div className="preview-container">
        <div className="preview">
          <Button>
            <IoCloudUploadOutline size={20} />
            Upload
          </Button>

          <Button variant="secondary" color="success">
            Send
            <IoSendSharp />
          </Button>
        </div>

        <CodeBlock>{withIconCodeString}</CodeBlock>
      </div>

      <h3 id="loading">Loading</h3>
      <div className="preview-container">
        <div className="preview">
          <Switch
            label="Is loading"
            checked={loading}
            size="medium"
            onChange={(val) => setLoading(val)}
          />
        </div>

        <div className="preview">
          <Button isLoading={loading}>Primary</Button>
          <Button variant="secondary" color="primary" isLoading={loading}>
            Secondary
          </Button>
          <Button variant="outline" color="primary" isLoading={loading}>
            Outline
          </Button>
        </div>

        <CodeBlock>{`<Button isLoading={true}>Primary</Button>`}</CodeBlock>
      </div>
    </div>
  );
}

export default ButtonPreview;
