import React from "react";

const PdfTemplate = React.forwardRef(
  ({ initialStatus, desiredStatus }, ref) => {
    const renderTeethStatus = (status) => {
      return Object.keys(status).map((key) => (
        <div key={key}>
          Tooth {key}: {status[key]}
        </div>
      ));
    };

    return (
      <div ref={ref} className="pdf-template p-4">
        <h1 className="text-xl font-medium mb-4">Treatment Plan</h1>
        <h2 className="text-lg font-medium mb-2">Patient: Inna Sergeeva</h2>
        <div className="mb-4">
          <h3 className="text-md font-medium mb-2">Initial Dental Formula</h3>
          {renderTeethStatus(initialStatus)}
        </div>
        <div>
          <h3 className="text-md font-medium mb-2">Desired Treatment Plan</h3>
          {renderTeethStatus(desiredStatus)}
        </div>
      </div>
    );
  }
);

export default PdfTemplate;
