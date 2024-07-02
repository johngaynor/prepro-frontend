import React from "react";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Image,
  Modal,
} from "semantic-ui-react";

const ChangeLog = ({ logOpen, setLogOpen, changeLog }) => {
  const logObj = changeLog.reduce((acc, val) => {
    const retObj = { ...acc };

    if (!retObj[val.version]) retObj[val.version] = {}; // add version key to obj
    if (!retObj[val.version][val.name]) retObj[val.version][val.name] = []; // add app name to version

    retObj[val.version][val.name].push({ order: val.textId, text: val.text });

    return retObj;
  }, {});

  console.log(changeLog);
  return (
    <Modal onClose={() => setLogOpen(false)} open={logOpen}>
      <ModalHeader>Change Log</ModalHeader>
      <ModalContent>
        <ModalDescription>
          {Object.keys(logObj)
            .sort((a, b) => a - b)
            .map((version) => (
              <>
                <Header as="h3">{version}</Header>
                {Object.keys(logObj[version]).map((app) => (
                  <>
                    <Header as="h4">{app}</Header>
                    {logObj[version][app].map((text) => (
                      <p>{text.text}</p>
                    ))}
                  </>
                ))}
              </>
            ))}
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button color="black" onClick={() => setLogOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setLogOpen(false)}
          positive
        />
      </ModalActions>
    </Modal>
  );
};

export default ChangeLog;
