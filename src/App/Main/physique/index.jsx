import React, { useEffect, useState } from "react";
import {
  Header,
  Segment,
  Icon,
  Grid,
  Pagination,
  Image,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { getPoses, getPhotos } from "./actions";
import PhysiqueFilters from "./components/Filters";
import { DateTime } from "luxon";

const Physique = ({
  poses,
  posesLoading,
  getPoses,
  photos,
  photosLoading,
  getPhotos,
}) => {
  const [openFilter, setOpenFilter] = useState(true);
  const [filters, setFilters] = useState({
    poses: [1],
    date: { start: "", end: "" },
    weight: { min: "", max: "" },
  });
  const [pages, setPages] = useState({ left: 1, right: 1 });

  useEffect(() => {
    if (!poses && !posesLoading) getPoses();
    if (!photos && !photosLoading) getPhotos();
  }, [poses, posesLoading, photos, photosLoading]);

  // setting initial filter values
  useEffect(() => {
    if (photos?.length) {
      const initialValues = photos.reduce(
        (acc, val) => {
          const retObj = { ...acc };
          const { date, weight } = val;

          if (!retObj.minWeight || parseFloat(weight) <= retObj.minWeight)
            retObj.minWeight = parseFloat(weight);

          if (!retObj.maxWeight || parseFloat(weight) >= retObj.maxWeight)
            retObj.maxWeight = parseFloat(weight);

          if (!retObj.startDate || date <= retObj.startDate)
            retObj.startDate = date;

          if (!retObj.endDate || date >= retObj.endDate) retObj.endDate = date;

          return retObj;
        },
        {
          minWeight: null,
          maxWeight: null,
          startDate: null,
          endDate: null,
        }
      );

      setFilters({
        poses: [1],
        date: { start: initialValues.startDate, end: initialValues.endDate },
        weight: { min: initialValues.minWeight, max: initialValues.maxWeight },
      });
    }
  }, [photos]);

  const filteredPhotos = photos
    ?.filter((p) => filters.poses.includes(p.poseId))
    .filter(
      (p) =>
        parseFloat(p.weight) >= parseFloat(filters.weight.min) &&
        parseFloat(p.weight) <= parseFloat(filters.weight.max)
    )
    .filter((p) => p.date >= filters.date.start && p.date <= filters.date.end)
    .sort((a, b) => {
      const dateComparison = a.date.localeCompare(b.date);
      if (dateComparison !== 0) return dateComparison;

      // if dates are the same, compare by pose
      return a.poseId - b.poseId;
    });

  return (
    <Segment>
      <Header as="h3">Physique Comparison</Header>
      <PhysiqueFilters
        filters={filters}
        setFilters={setFilters}
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        poses={poses}
      />
      <Grid columns={2} style={{ marginTop: 10 }}>
        <Grid.Column>
          <Segment
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid columns={2} style={{ width: "100%" }}>
              <Grid.Column
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  flexDirection: "column",
                }}
              >
                <Header as="h1" style={{ textAlign: "right" }}>
                  {DateTime.fromISO(
                    filteredPhotos?.[pages.left - 1]?.date || ""
                  ).toFormat("MMM dd, yyyy")}
                </Header>
                <Header as="h2" style={{ textAlign: "right" }}>
                  {filteredPhotos?.[pages.left - 1]?.weight} lbs
                </Header>

                <Header as="h3" style={{ textAlign: "right" }}>
                  {
                    poses?.find(
                      (p) => p.id === filteredPhotos?.[pages.left - 1]?.poseId
                    )?.name
                  }
                </Header>
              </Grid.Column>
              <Grid.Column
                style={{
                  paddingRight: 0,
                }}
              >
                <div
                  style={{
                    overflow: "hidden",
                    height: 500,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Image
                    src={
                      filteredPhotos?.[pages.left - 1]?.signedUrl ||
                      "https://react.semantic-ui.com/images/wireframe/image.png"
                    }
                    style={{
                      height: "100%",
                      width: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Grid.Column>
            </Grid>

            <Pagination
              activePage={pages.left}
              onPageChange={(e, { activePage }) =>
                setPages({ ...pages, left: activePage })
              }
              totalPages={filteredPhotos?.length || 0}
              style={{ margin: "10px auto 0 auto" }}
              ellipsisItem={{
                content: <Icon name="ellipsis horizontal" />,
                icon: true,
              }}
              firstItem={{
                content: <Icon name="angle double left" />,
                icon: true,
              }}
              lastItem={{
                content: <Icon name="angle double right" />,
                icon: true,
              }}
              prevItem={{ content: <Icon name="angle left" />, icon: true }}
              nextItem={{ content: <Icon name="angle right" />, icon: true }}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid columns={2} style={{ width: "100%" }}>
              <Grid.Column
                style={{
                  paddingLeft: 0,
                }}
              >
                <div
                  style={{
                    overflow: "hidden",
                    height: 500,
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <Image
                    src={
                      filteredPhotos?.[pages.right - 1]?.signedUrl ||
                      "https://react.semantic-ui.com/images/wireframe/image.png"
                    }
                    style={{
                      height: "100%",
                      width: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Grid.Column>
              <Grid.Column
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Header as="h1">
                  {DateTime.fromISO(
                    filteredPhotos?.[pages.right - 1]?.date || ""
                  ).toFormat("MMM dd, yyyy")}
                </Header>
                <Header as="h2">
                  {filteredPhotos?.[pages.right - 1]?.weight} lbs
                </Header>

                <Header as="h3">
                  {
                    poses?.find(
                      (p) => p.id === filteredPhotos?.[pages.right - 1]?.poseId
                    )?.name
                  }
                </Header>
              </Grid.Column>
            </Grid>

            <Pagination
              activePage={pages.right}
              onPageChange={(e, { activePage }) =>
                setPages({ ...pages, right: activePage })
              }
              totalPages={filteredPhotos?.length || 0}
              style={{ margin: "10px auto 0 auto" }}
              ellipsisItem={{
                content: <Icon name="ellipsis horizontal" />,
                icon: true,
              }}
              firstItem={{
                content: <Icon name="angle double left" />,
                icon: true,
              }}
              lastItem={{
                content: <Icon name="angle double right" />,
                icon: true,
              }}
              prevItem={{ content: <Icon name="angle left" />, icon: true }}
              nextItem={{ content: <Icon name="angle right" />, icon: true }}
            />
          </Segment>
        </Grid.Column>
      </Grid>
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
