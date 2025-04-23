import React from "react";

const ErrorMessage = ({ message }) => (
  <div className="text-center text-red-500 mt-10 text-lg font-medium">
    {message}
  </div>
);

export default ErrorMessage;
