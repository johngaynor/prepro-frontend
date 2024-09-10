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
} from "semantic-ui-react";

const PhotoModal = ({
  photo,
  modalOpen,
  handleCloseModal,
  handleDeletePhoto,
}) => {
  return (
    <Modal onClose={handleCloseModal} open={modalOpen}>
      <ModalHeader>
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
          <Header>{photo?.s3Filename}</Header>
          <Button color="red" onClick={handleCloseModal} icon="cancel" />
        </Container>
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Image src={photo?.signedUrl} />
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button
          color="red"
          icon="trash"
          content="Delete Photo"
          onClick={() => {
            handleDeletePhoto(photo?.id);
            handleCloseModal();
          }}
        />
      </ModalActions>
    </Modal>
  );
};

export default PhotoModal;
