import React, { useEffect, useState } from "react";
import { Header, Segment, Accordion, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { getPoses, getPhotos } from "./actions";

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
      <Accordion styled fluid>
        <Accordion.Title
          active={openFilter}
          onClick={() => setOpenFilter(!openFilter)}
        >
          <Icon name="dropdown" />
          {openFilter
            ? "Hide Filters"
            : `Open Filters (${activePoses.length} of ${poses.length} poses selected)`}
        </Accordion.Title>
        <Accordion.Content>
          <p>Poses</p>
        </Accordion.Content>
      </Accordion>
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
