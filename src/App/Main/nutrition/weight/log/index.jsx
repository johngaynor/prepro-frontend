import React, { useEffect, useState } from "react";
import { Grid, Segment, Header, Button } from "semantic-ui-react";
import { editWeightLog, getWeightLogs } from "../../actions";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import Spinner from "../../../components/Spinner";
import { InputField } from "../../../components/FormFields";
import useDebounce from "../../../customHooks/useDebounce";
import HorizontalSlide from "../../../components/Motion/HorizontalSlide";

const WeightLog = ({
  weightLogs,
  logsLoading,
  getWeightLogs,
  editWeightLog,
  editLoading,
}) => {
  const [weight, setWeight] = useState("");

  useEffect(() => {
    if (!weightLogs && !logsLoading) getWeightLogs();
  }, [weightLogs, logsLoading]);

  const { date } = useParams();
  const navigate = useNavigate();

  const activeDate = weightLogs?.find((l) => l.date === date);

  useEffect(() => {
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const currentDate = DateTime.now().toFormat("yyyy-MM-dd");
      navigate(`/nutrition/weight/log/${currentDate}`);
    }
  });

  useEffect(() => {
    setWeight(activeDate?.weight || "");
  }, [date, activeDate]);

  function handleChangeDate(direction) {
    const currentDate = DateTime.fromISO(date);
    let newDate;

    if (direction === "left") {
      newDate = currentDate.minus({ days: 1 });
    } else if (direction === "right") {
      newDate = currentDate.plus({ days: 1 });
    }

    navigate(`/nutrition/weight/log/${newDate.toFormat("yyyy-MM-dd")}`);
  }

  useDebounce(
    async () => {
      // check to see if weight has changed
      const match = weightLogs.find((l) => l.date === date);
      if ((match && match.weight != weight) || (!match && weight !== ""))
        await editWeightLog(date, weight);
    },
    [weight],
    600
  );

  return (
    <Grid columns={1}>
      {(logsLoading || editLoading) && <Spinner />}
      <Grid.Column>
        <Header>Daily Weight Log</Header>
        <HorizontalSlide handleChangeDate={handleChangeDate} pageKey={date}>
          <Segment
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Grid
              columns={3}
              style={{
                width: "100%",
              }}
            >
              <Grid.Column
                width={2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Button
                  icon="arrow left"
                  onClick={() => handleChangeDate("left")}
                  style={{ margin: 0 }}
                  color="blue"
                />
              </Grid.Column>
              <Grid.Column width={12}>
                <InputField
                  type="date"
                  value={DateTime.fromISO(date).toFormat("yyyy-MM-dd")}
                  onChange={(e, { value }) =>
                    navigate(`/nutrition/weight/log/${value}`)
                  }
                />
              </Grid.Column>
              <Grid.Column
                width={2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Button
                  icon="arrow right"
                  onClick={() => handleChangeDate("right")}
                  style={{ margin: 0 }}
                  color="blue"
                />
              </Grid.Column>
            </Grid>
            <Grid
              columns={3}
              style={{
                width: "100%",
              }}
            >
              <Grid.Column width={2} />
              <Grid.Column width={12}>
                <InputField
                  placeholder="Weight (in LBS)"
                  type="number"
                  value={weight}
                  onChange={(e, { value }) => setWeight(value)}
                />
              </Grid.Column>
              <Grid.Column width={2} />
            </Grid>
          </Segment>
        </HorizontalSlide>
      </Grid.Column>
    </Grid>
  );
};

function mapStateToProps(state) {
  return {
    weightLogs: state.nutrition.weightLogs,
    logsLoading: state.nutrition.logsLoading,
    editLoading: state.nutrition.editLoading,
  };
}

export default connect(mapStateToProps, { getWeightLogs, editWeightLog })(
  WeightLog
);
