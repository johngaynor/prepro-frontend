import { Grid, Item, Label, Input, TextArea } from "semantic-ui-react";

/**
 * InputField global component
 *
 * @param {'text' | 'password' | 'email' | 'number' | 'date' | 'time' | 'file'} props.type - The HTML input type (e.g., "text", "email", "number", etc.)
 * @param {string} props.label - The label to be displayed above the input field
 * @param {string | number} props.value - The value of the input field
 * @param {function} props.onChange - The function to call when the value of the input field changes
 * @param {string} [props.placeholder] - The placeholder text for the input field. Defaults to the label if not provided
 * @param {boolean} [props.disabled=false] - Whether the input field should be disabled
 * @param {boolean} [props.loading=false] - Whether to show a loading indicator in the input field
 *
 * @returns {JSX.Element} The rendered InputField component
 */
export const InputField = ({
  type,
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  loading = false,
}) => {
  return (
    <Grid.Column>
      <Label horizontal style={{ minWidth: "45%", textAlign: "center" }}>
        {label}:
      </Label>
      <Input
        placeholder={placeholder ?? label}
        type={type}
        fluid
        value={value}
        onChange={onChange}
        disabled={disabled}
        loading={loading}
      >
        <input />
      </Input>
    </Grid.Column>
  );
};

/**
 * TextAreaField global component
 *
 * @param {string} props.label - The label to be displayed above the text area
 * @param {string | number} props.value - Value of the textarea
 * @param {function} props.onChange - Function to run when the value of the textarea changes
 * @param {string} [props.placeholder] - The placeholder text for the text area. Will be defaulted to "label" prop if none is provided
 * @param {number} [props.rows] - The number of rows for the text area
 * @param {number} [props.width] - Custom width of textarea. Default is half of container width (8)
 * @param {boolean} [props.fullWidth] - Textarea will take up the full container width
 * @param {boolean} [props.resizable] - Textarea will be resizable via the icon in the bottom right corner (users can choose size)
 * @param {boolean} [props.disabled] - Conditions for when the textarea should be disabled
 *
 * @returns {JSX.Element} The rendered TextAreaField component
 */
export const TextAreaField = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  width = 8,
  fullWidth,
  resizable = "none",
  disabled = false,
}) => {
  return (
    <Grid.Column width={fullWidth ? 16 : width}>
      <Label horizontal style={{ minWidth: "45%", textAlign: "center" }}>
        {label}:
      </Label>
      <TextArea
        placeholder={placeholder ?? label}
        rows={rows}
        style={{ display: "inline-block", resize: resizable }}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </Grid.Column>
  );
};
