import React, { useContext, useEffect, useState } from "react";
import CheckInContext, { CheckInProvider } from "./context/checkInContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DateTime } from "luxon";
import Spinner from "../components/Spinner";
import ViewCheckIn from "./components/ViewCheckIn";
import EditCheckIn from "./components/EditCheckIn";
import ReportModal from "./components/ReportModal";
import { connect } from "react-redux";
import { getPoses, getPhotos } from "../physique/actions";
import { getWeightLogs } from "../nutrition/actions";

const CheckInLog = ({
  poses,
  posesLoading,
  getPoses,
  photos,
  photosLoading,
  getPhotos,
  weightLogs,
  logsLoading,
  getWeightLogs,
}) => {
  const [editMode, setEditMode] = useState(false);
  const { checkIns, checkInsLoading, getCheckIns, editLoading } =
    useContext(CheckInContext);

  useEffect(() => {
    if (!checkIns && !checkInsLoading) getCheckIns();
    if (!weightLogs && !logsLoading) getWeightLogs();
    if (!poses && !posesLoading) getPoses();
    if (!photos && !photosLoading) getPhotos();
  }, [
    checkIns,
    checkInsLoading,
    weightLogs,
    logsLoading,
    poses,
    posesLoading,
    photos,
    photosLoading,
  ]);

  const { date } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const report = searchParams.get("report");

  // set the date in params if there isn't one given or if the date is invalid
  useEffect(() => {
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const currentDate = DateTime.now().toFormat("yyyy-MM-dd");
      navigate(`/checkins/${currentDate}?report=false`); // change these back to false
    }

    if (date && report !== "false" && report !== "true") {
      navigate(`/checkins/${date}?report=false`);
    }
  });

  const selectedDay = checkIns?.find((c) => c.date === date);
  const lastCheckIn = checkIns
    ?.filter((c) => {
      const today = DateTime.fromISO(date).startOf("day");
      const checkInDate = DateTime.fromISO(c.date).startOf("day");
      return checkInDate < today;
    })
    .sort((a, b) => {
      const dateA = DateTime.fromISO(a.date);
      const dateB = DateTime.fromISO(b.date);
      return dateB - dateA;
    })[0];

  function handleCloseReport() {
    navigate(`/checkins/${date}?report=false`);
  }

  return (
    <>
      {(checkInsLoading || logsLoading || editLoading || posesLoading) && (
        <Spinner />
      )}
      <ReportModal
        handleCloseModal={handleCloseReport}
        selectedDay={selectedDay}
        modalOpen={report}
        lastCheckIn={lastCheckIn}
      />
      {selectedDay && !editMode ? (
        <ViewCheckIn selectedDay={selectedDay} setEditMode={setEditMode} />
      ) : (
        <EditCheckIn
          selectedDay={selectedDay}
          setEditMode={setEditMode}
          date={date}
          lastCheckIn={lastCheckIn}
        />
      )}
    </>
  );
};

const CheckInLogs = (props) => {
  return (
    <CheckInProvider>
      <CheckInLog {...props} />
    </CheckInProvider>
  );
};

function mapStateToProps(state) {
  return {
    poses: state.physique.poses,
    posesLoading: state.physique.posesLoading,
    photos: state.physique.photos,
    photosLoading: state.physique.photosLoading,
    weightLogs: state.nutrition.weightLogs,
    logsLoading: state.nutrition.logsLoading,
  };
}

export default connect(mapStateToProps, { getPoses, getPhotos, getWeightLogs })(
  CheckInLogs
);
