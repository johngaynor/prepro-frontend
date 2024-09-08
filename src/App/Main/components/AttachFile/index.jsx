import React, { useState } from "react";
import { Modal, Icon, Form, Button, Grid, Image } from "semantic-ui-react";
import { InputField, DropdownField, FileField } from "../FormFields";

const AttachFile = ({
  //   acceptFileType,
  toggleFormOpen,
  headerText,
  editMode,
  onSubmit,
}) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Generate preview URLs
    const newPreviews = newFiles.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });

    // Wait for all previews to be generated
    Promise.all(newPreviews).then((newPreviewUrls) => {
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviewUrls]);
    });
  };

  const handleClearFiles = () => {
    setFiles([]);
    setPreviews([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file); // Use 'images' as the field name for all files
    });

    onSubmit(formData);
    toggleFormOpen();
  };

  // console.log(files);
  return (
    <Modal open={true} onClose={toggleFormOpen} closeIcon>
      <Modal.Header>
        <Icon name="attach" />
        {headerText}
      </Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Grid columns="2" stackable verticalAlign="middle">
            {!editMode ? (
              <FileField value={files} onChange={handleFileChange} multiple />
            ) : null}

            <Grid.Column>
              <Button type="submit" color="green" fluid>
                <Icon name="attach" />
                {/* {!editMode ? "Attach File" : "Edit Attachment"} */}
                Attach File
              </Button>
            </Grid.Column>
          </Grid>
          <Grid>
            {previews.map((preview, index) => (
              <Grid.Column key={index} width={4}>
                <Image src={preview} alt={`file preview ${index}`} fluid />
              </Grid.Column>
            ))}
          </Grid>
          {files.length ? (
            <Button onClick={handleClearFiles} color="red" icon="trash" />
          ) : null}
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default AttachFile;
