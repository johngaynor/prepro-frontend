import { useNavigate } from "react-router-dom";
import { Grid, Button, Container } from "semantic-ui-react";
import { InputField } from "../../components/FormFields";
import { DateTime } from "luxon";
import { ViewInput } from "../../components/FormFields/view";

const ViewCheckIn = ({ selectedDay, setEditMode }) => {
  const navigate = useNavigate();
  return (
    <>
      <Grid stackable columns={3} style={{ marginBottom: "10px" }}>
        <InputField
          type="date"
          label="Date"
          value={DateTime.fromISO(selectedDay.date).toFormat("yyyy-MM-dd")}
          onChange={(e, { value }) => navigate(`/checkins/${value}`)}
        />
        <ViewInput value={selectedDay.weight} label="Weight" />
      </Grid>
      <Container
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="button"
          content="Edit"
          icon="pencil"
          color="orange"
          onClick={() => setEditMode(true)}
        />
      </Container>
    </>
  );
};

export default ViewCheckIn;
