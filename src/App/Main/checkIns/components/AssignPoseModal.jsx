import React from "react";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Container,
  Header,
  Image,
  List,
  Icon,
  Grid,
  Popup,
} from "semantic-ui-react";
import { DropdownField } from "../../components/FormFields";

const AssignPoseModal = ({
  checkInId,
  photos,
  poses,
  modalOpen,
  handleCloseModal,
  assignPose,
}) => {
  return (
    <Modal onClose={handleCloseModal} open={modalOpen}>
      <ModalHeader>
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
          <Header>Assign Photo Poses</Header>
          <Button color="red" onClick={handleCloseModal} icon="cancel" />
        </Container>
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <List divided link relaxed>
            {photos.map((p, i) => {
              return (
                <List.Item key={"assign-photo-" + i}>
                  <Grid columns={2} stackable>
                    <Grid.Column
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: !p.poseId ? "red" : "black",
                      }}
                    >
                      {p.s3Filename}
                      <Popup
                        trigger={<Icon name="eye" style={{ marginLeft: 10 }} />}
                        content={<Image src={p.signedUrl} size="small" />}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <DropdownField
                        value={p.poseId}
                        options={
                          poses
                            ? poses.map((p) => ({
                                value: p.id,
                                text: p.name,
                              }))
                            : []
                        }
                        onChange={(e, { value }) =>
                          assignPose(checkInId, p.id, value)
                        }
                      />
                    </Grid.Column>
                  </Grid>
                </List.Item>
              );
            })}
          </List>
        </ModalDescription>
      </ModalContent>
      <ModalActions></ModalActions>
    </Modal>
  );
};

export default AssignPoseModal;
