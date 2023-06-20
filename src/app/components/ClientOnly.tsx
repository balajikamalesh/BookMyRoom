"use client";
import React, { useEffect, useState } from "react";

type ClientOnlyTypes = {
  children: React.ReactNode;
};

const ClientOnly = ({ children }: ClientOnlyTypes) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
