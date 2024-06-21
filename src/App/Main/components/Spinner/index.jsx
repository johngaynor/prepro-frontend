import { Loader } from "semantic-ui-react";

const Spinner = () => {
  return (
    <div
      style={{
        color: " #fff",
        backgroundColor: "#000",
        opacity: 0.6,
        minWidth: "100%",
        minHeight: "100%",
        position: "absolute",
        right: "0px",
        top: "0px",
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <Loader active={true} />
    </div>
  );
};

export default Spinner;
