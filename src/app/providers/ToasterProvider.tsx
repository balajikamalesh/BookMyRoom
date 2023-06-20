"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return <Toaster />;
};

export default ToasterProvider;
//to follow dependency inversion, created a wrapper around toast component
