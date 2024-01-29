import React, { FC, useRef, useEffect } from "react";

import Card from "@/components/common/Card";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";
import CarDocumentUpload from "./CarDocumentUpload";

interface Props {
  handleDocChange: (fileUrl: any, docType: string) => void;
  handleSubmit: () => void;
  loading: boolean;
}

const CarDocumentsCard: FC<Props> = ({ handleDocChange, handleSubmit, loading }) => {
  
  return (
    <div className="lg:mt-14">
      <Card>
        <p className="text-lg font-semibold pb-2">Car Documents</p>
        
        <CarDocumentUpload title="Vehicle License" docType="vehicle_licence" handleChange={handleDocChange} />
        <CarDocumentUpload title="Insurance Certificate" docType="insurance_certificate" handleChange={handleDocChange} />
        <CarDocumentUpload title="Proof Of Ownership" docType="proof_of_ownership" handleChange={handleDocChange} />
        <CarDocumentUpload title="Road Worthiness Certificate" docType="road_worthiness_certificate" handleChange={handleDocChange} />
        <CarDocumentUpload title="Hackney Permit" docType="hackney_permit" handleChange={handleDocChange} />

      </Card>
      <div className="flex justify-end mt-6">
        <Button title="Add Car" size="large" startIcon={<AddIcon />} onClick={handleSubmit} loading={loading} disabled={loading} />
      </div>
    </div>
  );
};

export default CarDocumentsCard;
