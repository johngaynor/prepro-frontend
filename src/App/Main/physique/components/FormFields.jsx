import { Grid, Label, Input } from "semantic-ui-react";

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
          minWidth: 100,
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
      />
    </Grid.Column>
  );
}
