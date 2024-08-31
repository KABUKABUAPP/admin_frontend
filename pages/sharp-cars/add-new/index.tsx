import React, { FC, useState, useEffect } from "react";

import AppLayout from "@/layouts/AppLayout";
import ActionBar from "@/components/common/ActionBar";
import ViewSharpCarLayout from "@/components/modules/sharp-cars/ViewSharpCarLayout";
import CarImagesCard from "@/components/common/DeleteableImagesCard";
import CarDetailsCard from "@/components/modules/sharp-cars/CarDetailsCard";
import CarDocumentsCard from "@/components/modules/sharp-cars/CarDocumentsCard";
import AppHead from "@/components/common/AppHead";
import { useCreateCarMutation } from "@/api-services/sharpCarsService";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AddNew: FC = () => {
  const router = useRouter();
  const [images, setImages] = useState<any>([]);
  const [docArray, setDocArray] = useState<any>([]);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [vehicleLicenseNumber, setVehicleLicenseNumber] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [proofOfOwnershipNumber, setProofOfOwnershipNumber] = useState('');
  const [roadWorthinessCertificateNumber, setRoadWorthinessCertificateNumber] = useState('');
  const [hackneyPermitNumber, setHackneyPermitNumber] = useState('');

  const [createCar, { isLoading: createCarLoading, isError: createCarIsError, isSuccess: createCarSuccess, error: createCarError }] = useCreateCarMutation();

  const handleDocChange = (fileUrl: string, docType: string) => {
    setDocArray([...docArray, {fileUrl, docType}]);
  }

  const handleDeetsChange = (deets: any) => {
    if (deets.name === 'brand') setBrand(deets.value);
    if (deets.name === 'model') setModel(deets.value);
    if (deets.name === 'year') setYear(deets.value);
    if (deets.name === 'color') setColor(deets.value);
    if (deets.name === 'plate_number') setPlateNumber(deets.value);
    if (deets.name === 'vehicle_license_number') setVehicleLicenseNumber(deets.value);
    if (deets.name === 'insurance_number') setInsuranceNumber(deets.value);
    if (deets.name === 'proof_of_ownership_number') setProofOfOwnershipNumber(deets.value);
    if (deets.name === 'road_worthiness_certificate_number') setRoadWorthinessCertificateNumber(deets.value);
    if (deets.name === 'hackney_permit_number') setHackneyPermitNumber(deets.value);
  }

  const handleSubmit = () => {
    var data = new FormData();
    data.append('brand', brand);
    data.append('model', model);
    data.append('year', year);
    data.append('color', color);
    data.append('plate_number', plateNumber);
    
    data.append('vehicle_licence_number', vehicleLicenseNumber);
    data.append('insurance_number', insuranceNumber);
    data.append('proof_of_ownership_number', proofOfOwnershipNumber);
    data.append('road_worthiness_certificate_number', roadWorthinessCertificateNumber);
    data.append('hackney_permit_number', hackneyPermitNumber);

    images.forEach((img: string) => {
      data.append('car_images', img);
    });

    docArray.forEach(async (doc: any) => {
      data.append(doc.docType, doc.fileUrl);
    });
    
    createCar(data);

    //data.append('hackney_permit', fs.createReadStream('/home/user/Pictures/ct.jpg'));
    //data.append('insurance_certificate', fs.createReadStream('/home/user/Pictures/rapid.png'));
    //data.append('proof_of_ownership', fs.createReadStream('/home/user/Pictures/nawa oo.png'));
    //data.append('road_worthiness_certificate', fs.createReadStream('/home/user/Pictures/for chimex.png'));
  }

  useEffect(() => {
    if (createCarSuccess) {
      toast.success('Car created successfully');
      router.push('/sharp-cars?tab=pending&currentPage=1&sub_tab=unassigned')
    }
  }, [createCarSuccess])

  
  useEffect(() => {
    if (createCarIsError) toast.error('Error encountered');
  }, [createCarIsError])

  return (
    <>
      <AppHead title="Kabukabu | Sharp Cars" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar backButtonText="Cancel" />

          <ViewSharpCarLayout
            firstRow={
              <>
                <p className="text-2xl font-semibold mb-2">Add New Car</p>
                <CarImagesCard
                  images={images}
                  handleChange={(file) => {
                    setImages([...images, file]);
                  }}
                  handleDelete={(id) => {
                    setImages(images.filter((img: any) => img !== id));
                  }}
                />
                <CarDetailsCard handleChange={handleDeetsChange} />
              </>
            }
            secondRow={<CarDocumentsCard handleDocChange={handleDocChange} handleSubmit={handleSubmit} loading={createCarLoading} />}
          />
        </div>
      </AppLayout>
    </>
  );
};

export default AddNew;
