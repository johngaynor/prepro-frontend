import React, { useEffect, useState } from "react";
import {
  Header,
  Segment,
  Accordion,
  Icon,
  List,
  Checkbox,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { getPoses, getPhotos } from "./actions";
import Filter from "../components/Filter";

const Physique = ({
  poses,
  posesLoading,
  getPoses,
  photos,
  photosLoading,
  getPhotos,
}) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [activePoses, setActivePoses] = useState([]);

  useEffect(() => {
    if (!poses && !posesLoading) getPoses();
    if (!photos && !photosLoading) getPhotos();
  }, [poses, posesLoading, photos, photosLoading]);

  return (
    <Segment>
      <Header as="h3">Physique Comparison</Header>
      <Filter
        itemName="poses"
        items={poses}
        filters={activePoses}
        setFilters={setActivePoses}
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
      />
    </Segment>
  );
};

function mapStateToProps(state) {
  return {
    poses: state.physique.poses,
    posesLoading: state.physique.posesLoading,
    photos: state.physique.photos,
    photosLoading: state.physique.photosLoading,
  };
}

export default connect(mapStateToProps, { getPoses, getPhotos })(Physique);
