import { TableRow, TableCell, Button } from "semantic-ui-react";
import React, { useState } from "react";

export function IntegrationRow({ name, description, value }) {
  const [showKey, setShowKey] = useState(false);

  return (
    <TableRow>
      <TableCell>{name || "--"}</TableCell>
      <TableCell>{description || "--"}</TableCell>
      <TableCell>
        {value ? (showKey ? value : "*".repeat(value.length)) : "--"}
      </TableCell>
      <TableCell>
        <Button icon="eye" onClick={() => setShowKey(!showKey)} />
      </TableCell>
    </TableRow>
  );
}
