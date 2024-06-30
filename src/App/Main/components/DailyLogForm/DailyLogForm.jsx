import React, { useEffect } from "react";
import { LogContext } from "../Context/logContext";
import { Form, Button, Segment, Header } from "semantic-ui-react";

const DailyLogForm = () => {
  const { logType, formData, setFormData, date, setDate } =
    React.useContext(LogContext);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, [setDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = { ...formData, date };
      const response = await fetch("/api/logs/submit-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderForm = () => {
    if (logType === "morning") {
      return (
        <Segment>
          <Form onSubmit={handleSubmit}>
            <Header as="h3">Morning Log</Header>
            <Form.Field>
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Bodyweight</label>
              <input
                name="amWeight"
                value={formData.amWeight}
                onChange={handleChange}
                type="text"
              />
            </Form.Field>
            {/* <Form.Field>
              <label>Check-in photos (optional)</label>
              <input type="file" />
            </Form.Field> */}
            <Form.Field>
              <label>Sleep Quality</label>
              <input
                name="sleepQuality"
                value={formData.sleepQuality}
                onChange={handleChange}
                type="number"
                placeholder="Quality of sleep"
              />
            </Form.Field>
            <Form.Field>
              <label># of Hours</label>
              <input
                name="sleepHours"
                value={formData.sleepHours}
                onChange={handleChange}
                type="number"
                placeholder="# of hours"
              />
            </Form.Field>
            <Form.Field>
              <label>Stress Level</label>
              <input
                name="stress"
                value={formData.stress}
                onChange={handleChange}
                type="number"
                placeholder="Stress"
              />
            </Form.Field>
            <Form.Field>
              <label>Soreness</label>
              <input
                name="soreness"
                value={formData.soreness}
                onChange={handleChange}
                type="number"
                placeholder="Soreness"
              />
            </Form.Field>
            <Form.Field>
              <label>Mood</label>
              <input
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                type="text"
                placeholder="Mood"
              />
            </Form.Field>
            <Form.Field>
              <label>Energy Level</label>
              <input
                name="energy"
                value={formData.energy}
                onChange={handleChange}
                type="number"
                placeholder="Energy"
              />
            </Form.Field>
            {/* <Form.Field>
              <label>Workout Comments</label>
              <input
                name="workoutComments"
                value={formData.workoutComments}
                onChange={handleChange}
                type="text"
                placeholder="Workout Comments"
              />
            </Form.Field> */}
            <Button type="submit">Submit</Button>
          </Form>
        </Segment>
      );
    } else if (logType === "night") {
      return (
        <Segment>
          <Form onSubmit={handleSubmit}>
            <Header as="h3">Night Log</Header>
            {/* <Form.Field>
              <label>Bodyweight</label>
              <input
                placeholder="Bodyweight"
                onChange={handleChange}
                value={formData.pmWeight}
                name="amWeight"
                type="number"
              />
            </Form.Field> */}
            <Form.Field>
              <label>Workout Summary</label>
              <input
                placeholder="How was your workout?"
                name="workoutComments"
                value={formData.workoutComments}
                onChange={handleChange}
                type="text"
              />
            </Form.Field>
            <Form.Field>
              <label>Day Summary</label>
              <input
                placeholder="How was your day?"
                name="dayComments"
                value={formData.dayComments}
                onChange={handleChange}
                type="text"
              />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
        </Segment>
      );
    } else {
      return <div>Invalid log type</div>; // Fallback for invalid log type
    }
  };

  return (
    <div>
      <h1>{logType.charAt(0).toUpperCase() + logType.slice(1)} Log Form</h1>
      {renderForm()}
    </div>
  );
};
// };

export default DailyLogForm;
