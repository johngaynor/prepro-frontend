import { Grid, Label, Input, TextArea, Dropdown } from "semantic-ui-react";

/**
 * InputField global component
 *
 * @param {'text' | 'password' | 'email' | 'number' | 'date' | 'time' | 'file'} props.type - The HTML input type (e.g., "text", "email", "number", etc.)
 * @param {string} props.label - The label to be displayed above the input field
 * @param {string | number} props.value - The value of the input field
 * @param {function} props.onChange - The function to call when the value of the input field changes
 * @param {string} [props.placeholder] - The placeholder text for the input field. Defaults to the label if not provided
 * @param {boolean} [props.disabled] - Whether the input field should be disabled
 * @param {boolean} [props.loading] - Whether to show a loading indicator in the input field
 * @param {boolean|string} [props.error=false] - Error message or flag to display error state
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
  error = false,
}) => {
  return (
    <Grid.Column>
      <Label
        horizontal
        style={{ minWidth: "45%", textAlign: "center" }}
        color={error ? "red" : null}
      >
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
        error={error ? true : false}
      />
      {error && (
        <div>
          <div className="ui red pointing label">{error}</div>
        </div>
      )}
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

/**
 * DropdownField global component
 *
 * @param {string} props.label - The label for the dropdown field
 * @param {string | number} props.value - The selected value(s) of the dropdown
 * @param {Function} props.onChange - The callback function triggered on value change
 * @param {string} [props.placeholder] - The placeholder text for the dropdown
 * @param {Array<Object>} props.options - The options to display in the dropdown
 * @param {boolean} [props.multiple=false] - Flag to allow multiple selections
 * @param {boolean} [props.search=false] - Flag to allow searching within the dropdown options
 * @param {boolean} [props.allowAdditions=false] - Flag to allow adding new options
 * @param {boolean|string} [props.error=false] - Error message or flag to display error state
 *
 * @returns {JSX.Element} The rendered DropdownField component.
 */
export const DropdownField = ({
  label,
  value,
  onChange,
  placeholder,
  options,
  multiple = false,
  search = false,
  allowAdditions = false,
  error = false,
}) => {
  return (
    <Grid.Column>
      <Label
        horizontal
        style={{ minWidth: "45%", textAlign: "center" }}
        color={error ? "red" : null}
      >
        {label}:
      </Label>
      <Dropdown
        clearable
        selection
        fluid
        placeholder={placeholder ?? label}
        options={options}
        value={value}
        onChange={onChange}
        multiple={multiple}
        search={search}
        allowAdditions={allowAdditions}
      />
      {error && (
        <div>
          <div className="ui red pointing label">{error}</div>
        </div>
      )}
    </Grid.Column>
  );
};
