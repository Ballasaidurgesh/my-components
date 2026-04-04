import { Select, Textarea, TextInput } from "@/components/Inputs";
import { TFormValidations, validateFormDataOnChange } from "@/helpers/validations";
import { useState } from "react";
import { IoMailOutline } from "react-icons/io5";

const formValidations: TFormValidations = [
  { name: "email", validations: { isRequired: true, isEmail: true } },
  { name: "mobile", validations: { isRequired: true } },
];

const dropdownOptions = [
  { label: "India", value: "IN" },
  { label: "USA", value: "US" },
  { label: "UK", value: "UK" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Japan", value: "JP" },
  { label: "China", value: "CN" },
  { label: "Brazil", value: "BR" },
];

function InputPreview() {
  const [inputs, setInputs] = useState<{ [key: string]: any }>({});
  const [error, setError] = useState<{ [key: string]: string }>({});

  function handleChange(name: string, value: string) {
    setInputs((prev) => ({ ...prev, [name]: value }));
    validateFormDataOnChange(name, value, formValidations, error, setError);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0 1rem" }}>
      <TextInput
        label="Email"
        name="email"
        value={inputs}
        onChange={handleChange}
        error={error}
        leftIcon={<IoMailOutline size={20} />}
      />
      <TextInput
        label="Mobile"
        name="mobile"
        value={inputs}
        onChange={handleChange}
        error={error}
      />
      <TextInput
        label="Password"
        name="password"
        type="password"
        value={inputs}
        onChange={handleChange}
      />
      <TextInput
        label="First Name"
        name="first"
        value={inputs}
        onChange={handleChange}
        error={error}
      />
      <TextInput label="Last Name" name="last" value={inputs} onChange={handleChange} />

      <Select
        label="Country"
        name="country"
        value={inputs?.country}
        options={dropdownOptions}
        onChange={handleChange}
      />

      <TextInput
        label="Amount"
        name="amount"
        value={inputs}
        onChange={handleChange}
        textFormat="currency"
        disabled
      />

      <Textarea
        label="Address"
        name="address"
        value={inputs?.address}
        onChange={handleChange}
        error={error?.address}
        maxLength={100}
      />
    </div>
  );
}

export default InputPreview;
