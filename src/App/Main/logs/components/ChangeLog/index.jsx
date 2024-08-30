import React from "react";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Modal,
  Container,
} from "semantic-ui-react";
import AppContext from "../../../components/Context/appContext";

const ChangeLog = ({ logOpen, setLogOpen, changeLog }) => {
  const { clearLog } = React.useContext(AppContext);
  const logObj = changeLog.reduce((acc, val) => {
    const retObj = { ...acc };

    if (!retObj[val.version]) retObj[val.version] = { versionId: val.id }; // add version key to obj
    if (!retObj[val.version][val.name]) retObj[val.version][val.name] = []; // add app name to version

    retObj[val.version][val.name].push({ order: val.textId, text: val.text });

    return retObj;
  }, {});

  const handleConfirmLog = () => {
    const versions = Object.keys(logObj);
    const versionIds = versions.map((v) => logObj[v].versionId);
    clearLog(versionIds);
    setLogOpen(false);
  };

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
                {Object.keys(logObj[version])
                  .filter((a) => a !== "versionId")
                  .map((app, i) => (
                    <Container key={"app-" + i}>
                      <Header as="h4">{app}</Header>
                      {logObj[version][app].map((text) => (
                        <p>{text.text}</p>
                      ))}
                    </Container>
                  ))}
              </>
            ))}
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button
          content="Confirm"
          labelPosition="right"
          icon="checkmark"
          onClick={handleConfirmLog}
          positive
        />
      </ModalActions>
    </Modal>
  );
};

export default ChangeLog;
