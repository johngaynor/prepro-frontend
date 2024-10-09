import React, { useState } from "react";
import { Accordion, Button, Icon, List } from "semantic-ui-react";
import PhotoModal from "./PhotoModal";
import AssignPoseModal from "./AssignPoseModal";

const AttachmentsDisplay = ({
  photos,
  poses,
  deleteAttachment,
  checkInId,
  assignPose,
}) => {
  const [activePhoto, setActivePhoto] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);

  const missingPoses = photos.filter((p) => !p.poseId).length;

  return (
    <>
      <PhotoModal
        modalOpen={!!activePhoto}
        photo={activePhoto}
        handleCloseModal={() => setActivePhoto(false)}
        handleDeletePhoto={deleteAttachment}
      />
      <AssignPoseModal
        modalOpen={assignOpen}
        handleCloseModal={() => setAssignOpen(false)}
        photos={photos}
        poses={poses}
        assignPose={assignPose}
        checkInId={checkInId}
      />
      <Accordion
        fluid
        styled
        defaultActiveIndex={0}
        panels={[
          {
            key: "Photos",
            title: "Photos",
            content: (
              <Accordion.Content>
                {photos && photos.length ? (
                  <>
                    <List divided link relaxed animated>
                      {photos.map((p, i) => {
                        return (
                          <List.Item
                            key={i}
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => setActivePhoto(p)}
                          >
                            {p.s3Filename}
                            {!p.poseId && (
                              <Icon
                                name="exclamation triangle"
                                style={{ marginLeft: 5 }}
                              />
                            )}
                          </List.Item>
                        );
                      })}
                    </List>
                    <Button
                      color="blue"
                      icon="linkify"
                      content={`Assign Poses (${missingPoses} needed)`}
                      onClick={() => setAssignOpen(true)}
                    />
                  </>
                ) : (
                  "No photos have been added yet!"
                )}
              </Accordion.Content>
            ),
          },
        ]}
      />
    </>
  );
};

export default AttachmentsDisplay;
