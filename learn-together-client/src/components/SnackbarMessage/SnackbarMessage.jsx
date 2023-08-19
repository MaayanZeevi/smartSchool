import { Snackbar } from "react-native-paper";

const SnackbarMessage = ({
  errorMessage,
  successMessage,
  setErrorMessage,
  setSuccessMessage,
}) => {
  return (
    <Snackbar
      visible={successMessage || errorMessage}
      onDismiss={() => {
        setErrorMessage(undefined);
        setSuccessMessage(undefined);
      }}
      duration={3000}
      style={{
        backgroundColor: errorMessage ? "red" : "green",
        position: "absolute",
        bottom: 0,
        textAlign: "left",
      }}
    >
      {errorMessage || successMessage}
    </Snackbar>
  );
};

export default SnackbarMessage;
