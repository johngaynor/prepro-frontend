import { Grid, Label, Dropdown, Input } from "semantic-ui-react";

const daysOfWeek = [
  { key: 1, text: "Sunday", value: 1 },
  { key: 2, text: "Monday", value: 2 },
  { key: 3, text: "Tuesday", value: 3 },
  { key: 4, text: "Wednesday", value: 4 },
  { key: 5, text: "Thursday", value: 5 },
  { key: 6, text: "Friday", value: 6 },
  { key: 7, text: "Saturday", value: 7 },
];

export function DropdownSelector({
  options,
  value,
  placeholder,
  onChange,
  label,
  days = false,
  name = "",
  onBlur = null,
}) {
  return (
    <Grid.Column
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Label
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          borderRadius: "4px 0 0 4px",
          fontWeight: "bold",
          border: "1px solid #ccc",
          borderRight: "none",
          height: 38,
          width: 140,
        }}
      >
        {label}:
      </Label>
      <Dropdown
        fluid
        selection
        options={days ? daysOfWeek : options}
        value={value || ""}
        placeholder={placeholder}
        onChange={(e, { value }) => onChange(name, value)}
        style={{
          borderRadius: "0 4px 4px 0",
        }}
        search
        onBlur={() => onBlur(name)}
      />
    </Grid.Column>
  );
}

export function InputSelector({
  value,
  placeholder,
  onChange,
  label,
  type = "text",
  name = "",
  onBlur = null,
}) {
  return (
    <Grid.Column
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Label
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          borderRadius: "4px 0 0 4px",
          fontWeight: "bold",
          border: "1px solid #ccc",
          borderRight: "none",
          height: 38,
          minWidth: 140,
        }}
      >
        {label}:
      </Label>
      <Input
        type={type}
        fluid
        value={value}
        placeholder={placeholder}
        onChange={(e, { value }) => onChange(name, value)}
        style={{
          borderRadius: "0 4px 4px 0",
          width: "100%",
        }}
        min={0}
        onBlur={() => onBlur(name)}
      />
    </Grid.Column>
  );
}
