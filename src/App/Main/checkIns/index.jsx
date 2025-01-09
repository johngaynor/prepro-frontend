import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DateTime } from "luxon";
import Spinner from "../components/Spinner";
import ViewCheckIn from "./components/ViewCheckIn";
import EditCheckIn from "./components/EditCheckIn";
import ReportModal from "./components/ReportModal";
import { connect } from "react-redux";
import { getCheckIns } from "./actions";
import { getPoses, getPhotos } from "../physique/actions";
import { getDietLogs } from "../nutrition/actions";

const CheckInLog = ({
  poses,
  posesLoading,
  getPoses,
  photos,
  photosLoading,
  getPhotos,
  checkIns,
  checkInsLoading,
  getCheckIns,
  pdfLoading,
  editLoading,
  dietLogs,
  dietLogsLoading,
  getDietLogs,
}) => {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!checkIns && !checkInsLoading) getCheckIns();
    if (!poses && !posesLoading) getPoses();
    if (!photos && !photosLoading) getPhotos();
    if (!dietLogs && !dietLogsLoading) getDietLogs();
  }, [
    checkIns,
    checkInsLoading,
    poses,
    posesLoading,
    photos,
    photosLoading,
    dietLogs,
    dietLogsLoading,
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

  const activeDietLog = dietLogs
    ?.filter((l) => {
      const today = DateTime.fromISO(date).startOf("day");
      const dietLogDate = DateTime.fromISO(l.effectiveDate).startOf("day");
      return dietLogDate < today;
    })
    .sort((a, b) => {
      const dateA = DateTime.fromISO(a.effectiveDate);
      const dateB = DateTime.fromISO(b.effectiveDate);
      return dateB - dateA;
    })[0];

  function handleCloseReport() {
    navigate(`/checkins/${date}?report=false`);
  }

  return (
    <>
      {(checkInsLoading ||
        posesLoading ||
        photosLoading ||
        pdfLoading ||
        editLoading) && <Spinner />}
      <ReportModal
        handleCloseModal={handleCloseReport}
        selectedDay={selectedDay}
        modalOpen={report}
        lastCheckIn={lastCheckIn}
      />
      {selectedDay && !editMode ? (
        <ViewCheckIn
          selectedDay={selectedDay}
          setEditMode={setEditMode}
          activeDietLog={activeDietLog}
        />
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

function mapStateToProps(state) {
  return {
    poses: state.physique.poses,
    posesLoading: state.physique.posesLoading,
    photos: state.physique.photos,
    photosLoading: state.physique.photosLoading,
    checkIns: state.checkIns.checkIns,
    checkInsLoading: state.checkIns.checkInsLoading,
    pdfLoading: state.checkIns.pdfLoading,
    editLoading: state.checkIns.editLoading,
    dietLogs: state.nutrition.dietLogs,
    dietLogsLoading: state.nutrition.dietLogsLoading,
  };
}

export default connect(mapStateToProps, {
  getPoses,
  getPhotos,
  getCheckIns,
  getDietLogs,
})(CheckInLog);
