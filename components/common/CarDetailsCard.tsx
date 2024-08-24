import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Card from "@/components/common/Card";
import Avatar from "@/components/common/Avatar";
import Skeleton from "react-loading-skeleton";
import PlateNumber from "@/components/common/PlateNumber";
import Button from "@/components/ui/Button/Button";
import { useModalContext } from "@/contexts/ModalContext";
import TimesIconRed from "../icons/TimesIconRed";
import TextField from "../ui/Input/TextField/TextField";
import { useUpdateDriverDetailsMutation, useViewDriverQuery } from "@/api-services/driversService";
import { toast } from "react-toastify";
import CarImagesCard from "@/components/common/DeleteableImagesCardEdit";

function formatDateTime(inputTime: string) {
    const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedTime = new Date(inputTime).toLocaleDateString('en-US', options);
  
    // Extracting time part and formatting it
    const timePart = new Date(inputTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
  
    return `${formattedTime} at ${timePart}`;
}

interface Props {
  isLoading?: boolean;
  carImages?: string[];
  carModel?: string;
  carColor?: string;
  plateNumber?: string;
  carStatus?: string;
  bg?: string;
  hub?: string;
  inspector?: string;
  addedDateTime?: string;
  assignDriver?: boolean;
  hubId?: string;
  inspectorId?: string;
  showEdit?: boolean;
}

const EditBasicDriverDetails = () => {
  const router = useRouter();
  const { setModalContent } = useModalContext();
  const [carBrand, setCarBrand] = useState('');
  const [carYear, setCarYear] = useState('');
  const [carColor, setCarColor] = useState('');
  const [carModel, setCarModel] = useState<string>("");
  const [plateNumber, setPlateNumber] = useState<string>("");
  const [images, setImages] = useState<any>()
  
  const [updateDetails, { error, isLoading, isSuccess }] = useUpdateDriverDetailsMutation();
  
  const { id } = router.query;

  const { data: driverData, isLoading: driverLoading, isError: driverError, refetch: driverRefetch } = useViewDriverQuery(
    { id: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const handleUpdateSubmit = () => {
    const updateData = {
      carBrand,
      carYear,
      carModel,
      carColor,
      plateNumber,
      images
    }

    var data = new FormData();
    data.append('car_brand_name', carBrand);
    data.append('car_model', carModel);
    data.append('car_year', carYear);
    data.append('car_color', carColor);
    data.append('car_plate_number', plateNumber);
    images.forEach((img: string) => {
      data.append('car_images', img);
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

  useEffect(() => {
    if (driverData) {
      console.log({driverData});
      setCarBrand(driverData?.carDetails?.carBrand);
      setCarModel(driverData?.carDetails?.carModelOrd);
      setCarColor(driverData?.carDetails?.carColor);
      setCarYear(driverData?.carDetails?.carYear);
      setPlateNumber(driverData?.carDetails?.plateNumber)
      setImages(driverData?.carDetails?.carImages);
    }
  }, [driverData])

  return (
    <div className="mx-auto w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%]">
      <Card bg="#FFF">
        <div className="flex justify-end">
          <div className="w-auto cursor-pointer" onClick={() => {
            setModalContent(null)
          }}>
            <TimesIconRed />
          </div>
        </div>
        <div className="text-center">
          <p className="font-semibold">Update Car Details</p>
        </div>
        
        <CarImagesCard
          images={images}
          handleChange={(file) => {
            setImages([...images, file]);
          }}
          handleDelete={(id) => {
            setImages(images.filter((img: any) => img !== id));
          }}
        />

        <div className="flex flex-col gap-3">
          <TextField
            label="Car Brand"
            placeholder="Enter Car Brand"
            onChange={(e) =>
                setCarBrand(e.target.value)
            }
            value={carBrand}
          />

          <TextField
            label="Car Model"
            placeholder="Enter Car Model"
            onChange={(e) =>
                setCarModel(e.target.value)
            }
            value={carModel}
          />

          <TextField
            label="Car Year"
            placeholder="Enter Car Year"
            onChange={(e) =>
                setCarYear(e.target.value)
            }
            value={carYear}
          />
          
          <TextField
            label="Car Color"
            placeholder="Enter Car Color"
            onChange={(e) =>
                setCarColor(e.target.value)
            }
            value={carColor}
          />

          <TextField
            label="Plate Number"
            placeholder="Enter Plate Number"
            onChange={(e) =>
                setPlateNumber(e.target.value)
            }
            value={plateNumber}
          />
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

const CarDetailsCard: FC<Props> = ({
  carImages,
  carModel,
  isLoading,
  carColor,
  carStatus,
  plateNumber,
  bg='#FFFFFF',
  hub,
  inspector,
  addedDateTime,
  assignDriver,
  showEdit
}) => {
  const router = useRouter();
  const isDeleted = router.pathname.includes('deleted')
  const { setModalContent } = useModalContext();

  return (
    <Card bg={bg}>
      <div className={`flex flex-col gap-3 ${isDeleted ? '!text-[#9A9A9A]' : ''}`}>
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Car Details</p>
          
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
        
        <div className="flex max-w-[300px] overflow-x-auto scrollbar-none gap-2">
          {carImages?.map((image) => {
            return (
              <div>
                <Avatar imageUrl={image} fallBack="" shape="square" size="lg" />
              </div>
            );
          })}
        </div>
        <p className="text-lg font-semibold">
          {carModel || <Skeleton enableAnimation={isLoading} />}
        </p>
        <p className="text-sm text-[#9A9A9A]">
          {carColor || <Skeleton enableAnimation={isLoading} />}
        </p>
        {plateNumber ? (
          <PlateNumber plateNumber={plateNumber} />
        ) : (
          <Skeleton enableAnimation={isLoading} />
        )}
        <p className="text-sm text-[#9A9A9A]">
          {carStatus || <Skeleton enableAnimation={isLoading} />}
        </p>
        
        {hub && (
          <div className="flex gap-4">
            <p className="font-bold">Hub: {hub}</p>
            <p className="text-sm cursor-pointer">View Hub</p>
          </div>
        )}
        {inspector && (
          <div className="flex gap-4">
            <p className="font-bold">Inspector: {inspector}</p>
            <p className="text-sm cursor-pointer">View Inspector</p>
          </div>
        )}
        {addedDateTime && (
           <p className="font-bold">Added On: {formatDateTime(addedDateTime)}</p>
        )}
        {!assignDriver && 
        <Button
          title="View Location History"
          variant="text"
          color="tetiary"
          disabled={true}
          className={`w-fit ${isDeleted ? '!text-[#9A9A9A]' : ''}`}
        />}
      </div>
    </Card>
  );
};

export default CarDetailsCard;
