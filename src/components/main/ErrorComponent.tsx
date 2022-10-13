import React from "react";
import { ServerError } from "../../model/sharedTypes";

type Props = {
  error?: Error | ServerError;
};

const ErrorComponent = (props: Props) => {
  return (
    <div>
      {" "}
      {props.error ? props.error.message : "Oops. Something went wrong"}{" "}
    </div>
  );
};

export default ErrorComponent;
