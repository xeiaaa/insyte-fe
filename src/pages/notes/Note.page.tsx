import React from "react";
import { useParams } from "react-router-dom";

const NotePage = () => {
  const { noteId } = useParams<{ noteId: string }>();
  return (
    <div>
      <h1>{noteId}</h1>
    </div>
  );
};

export default NotePage;
