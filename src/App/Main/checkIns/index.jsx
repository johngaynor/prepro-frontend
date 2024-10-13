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
}) => {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!checkIns && !checkInsLoading) getCheckIns();
    if (!poses && !posesLoading) getPoses();
    if (!photos && !photosLoading) getPhotos();
  }, [checkIns, checkInsLoading, poses, posesLoading, photos, photosLoading]);

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
      {(checkInsLoading || posesLoading || photosLoading || pdfLoading) && (
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

function mapStateToProps(state) {
  return {
    poses: state.physique.poses,
    posesLoading: state.physique.posesLoading,
    photos: state.physique.photos,
    photosLoading: state.physique.photosLoading,
    checkIns: state.checkIns.checkIns,
    checkInsLoading: state.checkIns.checkInsLoading,
    pdfLoading: state.checkIns.pdfLoading,
  };
}

export default connect(mapStateToProps, {
  getPoses,
  getPhotos,
  getCheckIns,
})(CheckInLog);
