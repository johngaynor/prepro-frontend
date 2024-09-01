import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Container, Form } from "semantic-ui-react";
import { InputField, TextAreaField } from "../../components/FormFields";
import CheckInContext from "../context/checkInContext";

const EditCheckIn = ({ selectedDay, template, setEditMode, date }) => {
  const [formValues, setFormValues] = useState(null);
  // const [formErrors, setFormErrors] = useState({});

  const { editCheckIns, deleteCheckIns } = useContext(CheckInContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedDay) {
      setFormValues(
        selectedDay.questions.map((q) => ({
          ...q, // had to create a shallow copy so original objects aren't mutated
        }))
      );
    } else if (template) {
      setFormValues(
        template.questions.map((q) => ({
          ...q,
          answer: "",
        }))
      );
    }
  }, [selectedDay, template]);

  function handleSubmit() {
    // handle validation
    editCheckIns({ ...selectedDay, questions: formValues, date });
    setEditMode(false);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Grid stackable columns={3} style={{ marginBottom: "10px" }}>
        <InputField
          type="date"
          label="Date"
          value={date || ""}
          onChange={(e, { value }) => navigate(`/checkins/${value}`)}
        />
        {formValues
          ?.sort((a, b) => a.orderId - b.orderId)
          .map((v, i) => {
            function handleChange(val) {
              const questions = [...formValues];
              const question = questions.splice(i, 1)[0];
              question.answer = val;
              questions.push(question);
              setFormValues(questions);
            }

            if (v.textArea) {
              return (
                <TextAreaField
                  label={v.question}
                  value={v.answer}
                  onChange={(e, { value }) => handleChange(value)}
                  key={"question-input-" + i}
                  fullWidth={v.fullWidth}
                />
              );
            } else {
              return (
                <InputField
                  label={v.question}
                  value={v.answer}
                  onChange={(e, { value }) => handleChange(value)}
                  key={"question-input-" + i}
                  type={v.type}
                />
              );
            }
          })}
      </Grid>
      <Container
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {selectedDay && (
          <>
            <Button
              type="button"
              content="Cancel"
              icon="cancel"
              color="red"
              onClick={() => {
                setFormValues(
                  selectedDay.questions.map((q) => ({
                    ...q, // had to create a shallow copy so original objects aren't mutated
                  }))
                );
                setEditMode(false);
              }}
            />
            <Button
              type="button"
              icon="trash"
              color="red"
              onClick={() => {
                deleteCheckIns(selectedDay.id);
                setFormValues(null);
              }}
            />
          </>
        )}
        <Button type="submit" content="Save" icon="save" color="blue" />
      </Container>
    </Form>
  );
};

export default EditCheckIn;
