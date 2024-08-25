import React, { FC, useEffect, useState } from "react";

import Card from "@/components/common/Card";
import Document from "./Document";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "next/router";
import { useUpdateDriverDetailsMutation, useViewDriverQuery } from "@/api-services/driversService";
import { useModalContext } from "@/contexts/ModalContext";
import { toast } from "react-toastify";
import TimesIconRed from "../icons/TimesIconRed";
import TextField from "../ui/Input/TextField/TextField";
import CarDocumentUpload from "./CarDocumentUpload";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  documents?: { title?: string; docImage?: string; docId?: string }[];
  totalDocs: number;
  bg?:string
  showEdit: boolean;
}

const EditBasicDriverDetails = () => {
  const router = useRouter();
  const { setModalContent } = useModalContext();
  const [images, setImages] = useState<any>([]);
  const [docArray, setDocArray] = useState<any>([]);
  const [vehicleLicenseNumber, setVehicleLicenseNumber] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [proofOfOwnershipNumber, setProofOfOwnershipNumber] = useState('');
  const [roadWorthinessCertificateNumber, setRoadWorthinessCertificateNumber] = useState('');
  const [hackneyPermitNumber, setHackneyPermitNumber] = useState('');
  
  const [updateDetails, { error, isLoading, isSuccess }] = useUpdateDriverDetailsMutation();
  
  const { id } = router.query;

  const { data: driverData, isLoading: driverLoading, isError: driverError, refetch: driverRefetch } = useViewDriverQuery(
    { id: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const handleUpdateSubmit = () => {
    var data = new FormData()

    docArray.forEach(async (doc: any) => {
      data.append(doc.docType.toLowerCase(), doc.fileUrl);
    });

    updateDetails({driverId: String(id), body: data});
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Successfully updated');
      window.location.reload();
    }
  }, [isSuccess]);

  
  useEffect(() => {
    if (error) toast.error('Error encountered');
  }, [error])


  const handleDocChange = (doc: any) => {
    setDocArray([...docArray, doc]);
  }

  return (
    <div className="mx-auto w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] max-h-screen overflow-y-scroll">
      <Card bg="#FFF">
        <div className="flex justify-end">
          <div className="w-auto cursor-pointer" onClick={() => {
            setModalContent(null)
          }}>
            <TimesIconRed />
          </div>
        </div>
        <div className="text-center">
          <p className="font-semibold">Update Car Documents</p>
        </div>

        {
          driverData?.carDocs?.documents.map((doc: any) => (
            <CarDocumentUpload title={capitalizeAllFirstLetters(doc.title.replace(/_/g, ' '))} handleChange={handleDocChange} docImage={doc.docImage} docType={doc.title} />
          ))
        }
        <div className="flex flex-col gap-3">
            <div className="flex justify-end">
              <Button
                title="Save Changes"
                className="!text-[16px] mt-6"
                size="large"
                type="submit"
                disabled={isLoading}
                loading={isLoading}
                onClick={handleUpdateSubmit}
              />
            </div>
        </div>
      </Card>
    </div>
  )
} 

const CarDocuments: FC<Props> = ({ documents, totalDocs, bg='#FFFFFF', showEdit }) => {
  const router = useRouter();
  const isDeleted = router.pathname.includes('deleted');
  const { setModalContent } = useModalContext();

  return (
    <Card bg={bg} maxHeight="750px">
      <div className="flex justify-between">
        <p className={`text-lg font-semibold ${isDeleted ? '!text-[#9A9A9A]' : ''}`}>Car Documents</p>
        
        {
          showEdit &&
          <div className="w-auto">
            <p className="bg-[#FFF5D8] py-1 px-4 rounded-md cursor-pointer" onClick={() => {
              setModalContent(
                <EditBasicDriverDetails />
              )
            }}>Edit</p>
          </div>
        }
      </div>
      
      <div className="my-2">
        {documents?.map((doc, idx) => (
          <Document {...doc} key={idx} />
        ))}
      </div>
    </Card>
  );
};

export default CarDocuments;
