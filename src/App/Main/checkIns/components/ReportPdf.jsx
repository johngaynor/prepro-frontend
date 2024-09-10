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
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { useEffect } from "react";

const font = {
  normal: "Helvetica",
  bold: "Helvetica-Bold",
  italic: "Helvetica-Oblique",
  boldItalic: "Helvetica-BoldOblique",
};

const FormQuestionBox = ({ question }) => {
  return (
    <View style={{ margin: "10 0" }}>
      <Text>{question.question}:</Text>
      <Text style={{ marginTop: 5, fontStyle: "bold" }}>
        {question.answer || "N/a"}
      </Text>
    </View>
  );
};

const CheckInDoc = ({ selectedDay }) => {
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
        {/* Images section */}
        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {selectedDay?.photos?.map((p, i) => (
            <Image
              src={{
                uri: p.signedUrl,
                method: "GET",
                headers: { "Cache-Control": "no-cache" },
                body: "",
              }}
              key={"checkin-photo-report-" + i}
              style={{ height: 500 }}
            />
          ))}
        </View>
      </Page>
      {/* Questions section */}
      <Page
        size="letter"
        style={{ padding: 100, fontSize: 10, fontFamily: font.normal }}
      >
        <View>
          {selectedDay?.questions?.map((q, i) => (
            <FormQuestionBox question={q} key={"form-question-" + i} />
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CheckInDoc;
