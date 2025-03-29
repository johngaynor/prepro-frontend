import React, { useEffect, useState } from "react";
import { Segment, Header, Input } from "semantic-ui-react";
import { editWeightLog, getWeightLogs } from "../../actions";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import Spinner from "../../../components/Spinner";
import useDebounce from "../../../customHooks/useDebounce";
import HorizontalSlide from "../../../components/Motion/HorizontalSlide";
import toast from "react-hot-toast";

const WeightLog = ({
  weightLogs,
  logsLoading,
  getWeightLogs,
  editWeightLog,
}) => {
  const [weight, setWeight] = useState("");

  useEffect(() => {
    if (!weightLogs && !logsLoading) getWeightLogs();
  }, [weightLogs, logsLoading]);

  console.log(weightLogs?.length, logsLoading); // for some reason updating is setting logs to undefined

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
      if ((match && match.weight != weight) || (!match && weight !== "")) {
        const promise = editWeightLog(date, weight);
        toast.promise(promise, {
          loading: "Saving...",
          success: "Save Complete!",
          error: "Save failed. Please refresh.",
        });
        try {
          await promise;
        } catch (error) {
          console.error(error);
        }
      }
    },
    [weight],
    2000
  );

  return (
    <HorizontalSlide handleSwipe={handleChangeDate} pageKey={date}>
      {logsLoading && <Spinner />}
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Segment
          style={{
            height: "60vh",
            width: "90vw",
            maxWidth: 800,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Header as="h1" style={{ textAlign: "center" }}>
            {DateTime.fromISO(date).toFormat("MMMM dd, yyyy")}
          </Header>
          <Input
            value={weight}
            onChange={(e, { value }) => setWeight(value)}
            type="number"
            min={0}
            style={{
              width: "80%",
              maxWidth: 400,
              height: 100,
            }}
          >
            <input
              style={{
                fontSize: 70,
                textAlign: "center",
                borderRadius: 10,
                padding: 0,
                border: "1px solid gray",
              }}
            />
          </Input>
        </Segment>
      </div>
    </HorizontalSlide>
  );
};

function mapStateToProps(state) {
  return {
    weightLogs: state.nutrition.weightLogs,
    logsLoading: state.nutrition.logsLoading,
  };
}

export default connect(mapStateToProps, { getWeightLogs, editWeightLog })(
  WeightLog
);
