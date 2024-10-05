import React from "react";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  Button,
  Modal,
  Container,
  Header,
  List,
  ListHeader,
  ListItem,
  ListDescription,
} from "semantic-ui-react";
import { DateTime } from "luxon";

const ItemsModal = ({ handleClose, activeItems }) => {
  const date =
    activeItems &&
    DateTime.fromISO(activeItems[0]?.date).toFormat("MMMM d, yyyy");

  return (
    <Modal onClose={handleClose} open={activeItems ? true : false}>
      <ModalHeader>
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
          <Header>Supplements for {date}</Header>
          <Button color="red" onClick={handleClose} icon="cancel" />
        </Container>
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <List relaxed>
            {activeItems?.map((i, index) => (
              <ListItem key={"active-item-" + index}>
                <ListHeader>{i.title}</ListHeader>
                <ListDescription>{i.description}</ListDescription>
              </ListItem>
            ))}
          </List>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default ItemsModal;
