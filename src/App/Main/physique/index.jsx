import React, { useEffect, useState } from "react";
import {
  Header,
  Segment,
  Accordion,
  Icon,
  List,
  Checkbox,
  Grid,
} from "semantic-ui-react";
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
  const [filters, setFilters] = useState({ poses: [] });

  useEffect(() => {
    if (!poses && !posesLoading) getPoses();
    if (!photos && !photosLoading) getPhotos();
  }, [poses, posesLoading, photos, photosLoading]);

  function onPoseChange(e, { checked, value }) {
    if (checked) {
      setFilters({ ...filters, poses: [...filters.poses, value] });
    } else {
      setFilters({
        ...filters,
        poses: filters.poses.filter((p) => p !== value),
      });
    }
  }

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
            : `Open Filters (${filters.poses.length} of ${poses?.length} poses selected)`}
        </Accordion.Title>
        <Accordion.Content active={openFilter}>
          <Grid columns="2" doubling stackable divided>
            <Grid.Column>
              <Header as="h3">Poses</Header>
              <Grid columns="2">
                <Grid.Column>
                  <List>
                    {poses?.slice(0, Math.ceil(poses.length / 2)).map((p) => {
                      return (
                        <List.Item key={"filter-pose-" + p.name}>
                          <Checkbox
                            value={p.name}
                            label={p.name}
                            checked={filters.poses.includes(p.name)}
                            onClick={onPoseChange}
                          />
                        </List.Item>
                      );
                    })}
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <List>
                    {poses?.slice(Math.ceil(poses.length / 2)).map((p) => {
                      return (
                        <List.Item key={"filter-pose-" + p.name}>
                          <Checkbox
                            value={p.name}
                            label={p.name}
                            checked={filters.poses.includes(p.name)}
                            onClick={onPoseChange}
                          />
                        </List.Item>
                      );
                    })}
                  </List>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">Date & Weight</Header>
            </Grid.Column>
          </Grid>
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
