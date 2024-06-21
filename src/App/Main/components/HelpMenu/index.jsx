import { useState } from "react";
import {
  Modal,
  Button,
  Card,
  Grid,
  Form,
  Message,
  Label,
  Dropdown,
  TextArea,
  GridColumn,
} from "semantic-ui-react";
import Spinner from "../Spinner";
import { useSubmitSupportTicket } from "./actions";
import useAppStore from "../../../store";
import toast from "react-hot-toast";

const HelpMenu = ({ isOpen, setOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({ reason: "", details: "" });

  const submitSupportTicket = useSubmitSupportTicket();
  const { user } = useAppStore();

  const reasonOptions = [
    { key: 1, text: "Ask a Question", value: "Ask a Question" },
    { key: 2, text: "Report a Bug", value: "Report a Bug" },
    {
      key: 3,
      text: "Request a Feature",
      value: "Request a Feature",
    },
    {
      key: 4,
      text: "Information Request",
      value: "Information Request",
    },
    {
      key: 5,
      text: "Request Additional App Access",
      value: "Request Additional App Access",
    },
    { key: 7, text: "General", value: "General" },
    { key: 8, text: "Feedback", value: "Feedback" },
  ];

  function submitForm() {
    console.log("submitting form");
    submitSupportTicket(formValues.reason, formValues.details, user);
    setOpen(false);
  }

  return (
    <Modal
      closeIcon
      centered={false}
      open={isOpen}
      onClose={() => setOpen(false)}
    >
      <Modal.Header
        style={{
          backgroundColor: "#0099e0",
          fontWeight: "bold",
          color: "White",
        }}
      >
        Help Menu
      </Modal.Header>
      <Modal.Content style={{ backgroundColor: "#F0F0F0	" }}>
        {isLoading && <Spinner />}
        <Card fluid>
          <Card.Header
            textAlign="center"
            style={{
              backgroundColor: "#0099e0",
              fontWeight: "bold",
              color: "White",
            }}
          >
            Submit a Support Ticket
          </Card.Header>
          <Card.Content>
            <Grid columns={1}>
              <GridColumn style={{ display: "flex", flexDirection: "column" }}>
                <Label
                  color={null}
                  horizontal
                  style={{ maxWidth: "45%", textAlign: "center" }}
                >
                  Reason for Support Ticket:
                </Label>
                <Dropdown
                  clearable
                  options={reasonOptions}
                  selection
                  value={formValues.reason}
                  onChange={(e, { value }) =>
                    setFormValues({ ...formValues, reason: value })
                  }
                  placeholder="Please select a reason..."
                />
              </GridColumn>
              <GridColumn style={{ display: "flex", flexDirection: "column" }}>
                <Label
                  color={null}
                  horizontal
                  style={{ maxWidth: "45%", textAlign: "center" }}
                >
                  Label:
                </Label>
                <TextArea
                  value={formValues.details}
                  onChange={(e, { value }) =>
                    setFormValues({ ...formValues, details: value })
                  }
                  placeholder="Please provide as much detail as possible..."
                  style={{
                    padding: "10px",
                    resize: "none",
                    minHeight: "100px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }} // need to figure out how to make the :focus border lighter and the placeholder text lighter
                />
              </GridColumn>
            </Grid>
            {/* <Message error header="Please include ticket details" /> */}
            <Button
              style={{ marginTop: "10px" }}
              onClick={submitForm}
              color="green"
              floated="right"
            >
              Submit Support Ticket
            </Button>
          </Card.Content>
        </Card>
      </Modal.Content>
    </Modal>
  );
};

function validate(values) {
  const errors = {};
  if (!values.ticketReason) {
    errors.ticketReason = "Please select the reason you're submitting a ticket";
  }
  if (values.ticketDetails === "" || !values.ticketDetails) {
    errors.ticketDetails =
      "Please include details of why you're submitting a ticket";
  }

  return errors;
}

export default HelpMenu;

// function submitForm(values) {
//   setIsLoading(true);
//   navigator.browserSpecs = (function () {
//     var ua = navigator.userAgent,
//       tem,
//       M =
//         ua.match(
//           /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
//         ) || [];
//     if (/trident/i.test(M[1])) {
//       tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
//       return { name: "IE", version: tem[1] || "" };
//     }
//     if (M[1] === "Chrome") {
//       tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
//       if (tem != null)
//         return { name: tem[1].replace("OPR", "Opera"), version: tem[2] };
//     }
//     M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
//     if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
//     return { name: M[0], version: M[1] };
//   })();
//   submitSupportTicket(
//     values,
//     path,
//     navigator.browserSpecs.name,
//     navigator.browserSpecs.version
//   ).finally(() => {
//     setIsLoading(false);
//     closeMenu();
//   });
// }
