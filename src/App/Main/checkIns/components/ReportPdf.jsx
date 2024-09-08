import {
  PDFViewer,
  Document,
  View,
  Text,
  Page,
  Image,
  usePDF,
  Link,
  Font,
} from "@react-pdf/renderer";
import { useEffect } from "react";

const font = {
  normal: "Helvetica",
  bold: "Helvetica-Bold",
  italic: "Helvetica-Oblique",
  boldItalic: "Helvetica-BoldOblique",
};

function FormQuestionBox(question) {
  return (
    <View style={{ margin: "10 0" }}>
      <Text>{question.question}:</Text>
      <Text style={{ marginTop: 5, fontStyle: "bold" }}>
        {question.answer || "N/a"}
      </Text>
    </View>
  );
}

export const CheckInDoc = ({ selectedDay }) => {
  //   console.log("props", props);
  return (
    <Document>
      <Page
        size="letter"
        style={{ padding: 100, fontSize: 10, fontFamily: font.normal }}
      >
        <View
          style={{
            marginTop: -30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text style={{ textDecoration: "underline", fontSize: 14 }}>
            Mandatory Client Check In Sheet
          </Text>
          <Text style={{ margin: "10 auto" }}>
            Fill this out and send to me with pictures every Friday/Saturday
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Delay in sending updates will result in delay of plan changes if
            necessary
          </Text>
        </View>
        <View></View>
        {/* Questions section */}
        <View>{selectedDay?.questions?.map((q) => FormQuestionBox(q))}</View>
      </Page>
    </Document>
  );
};

const ReportPdf = (props) => {
  const [pdf, update] = usePDF({ document: CheckInDoc({ ...props }) });

  useEffect(() => {
    if (!pdf.loading) update(CheckInDoc({ ...props }));
  });

  return (
    <PDFViewer showToolbar={true} style={{ width: "100%", height: 700 }}>
      <CheckInDoc {...props} />
    </PDFViewer>
  );
};

export default ReportPdf;
