import React from "react";
import ReuseablePriorityPage from "../resusablePriorityPage/page";
import { Priority } from "@/src/state/api";

const Urgent = () => {
  return <ReuseablePriorityPage priority={Priority.Urgent} />;
};

export default Urgent;