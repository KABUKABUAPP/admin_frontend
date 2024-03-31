import React, { FC, useState, useEffect } from "react";

import Card from "@/components/common/Card";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";
import Avatar from "@/components/common/Avatar";
import { capitalizeAllFirstLetters } from "@/utils";
import { useModalContext } from "@/contexts/ModalContext";
import useClickOutside from '@/hooks/useClickOutside';
import { useRouter } from "next/router";
import CloseIcon from "@/components/icons/CloseIcon";
import Select from 'react-select';
import { toast } from "react-toastify";
import { useGetAllDriversQuery } from "@/api-services/driversService";
import { useAssignSharpCarMutation } from "@/api-services/sharpCarsService";
import { useDashboardState } from "@/contexts/StateSegmentationContext";

interface Props {
  assignDriver: boolean;
  driverData?: any;
}

interface AssignDriverModalProps {
  handleClose: () => void;
  handleChooseDriver: (driver: string, id: string) => void;
}

const AssignDriverModal : React.FC<AssignDriverModalProps> = ({ handleClose, handleChooseDriver }) => {
  const ref = useClickOutside<HTMLDivElement>(() => handleClose());
  const router = useRouter();
  const [tags, setTags] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [theDrivers, setTheDrivers] = useState<any>([]);
  const { dashboardState, setDashboardState } = useDashboardState();

  const {
    data: drivers,
    isLoading: driversLoading,
    isError: driversError,
    refetch: reloadDrivers,
    error,
  } = useGetAllDriversQuery(
    {
      carOwner: false,
      driverStatus: "pending",
      limit: 10,
      page: 1,
      search: search,
      order: 'newest_first',
      status: 'active',
      sharpApprovalStatus: 'approved',
      dashboard_state: dashboardState
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    if (drivers) {
      const theDriversFilter = drivers?.data?.filter((d) => {
        if (!d.currentCar) return d;
      })

      setTheDrivers(theDriversFilter)
    }
  }, [drivers])

  const handleTagDelete = (i: any) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const handleTagAddition = (tag: any) => {
    const findDup = tags.find((tagI: any) => {return tagI.value === tag.value});
    if (findDup || tags.length >= 1) return toast.error('Driver has already been chosen');
    handleChooseDriver(tag.label, tag.value)
    setTags([...tags, tag]);
  };

  return (
    <Card elevation={true} maxWidth="400px" maxHeight="95vh">
      <div className="p-4 overflow-x-hidden relative h-[70vh]" ref={ref}>
        <div className="flex justify-between">
          <p className="text-xl font-bold">Assign Driver</p>
          <p><span
            className="absolute top-4 right-4 cursor-pointer"
            onClick={handleClose}
          >
            <CloseIcon />
          </span></p>
        </div>
        <div className="text-center mt-3">
          <p>Assign Driver To This Car</p>
        </div>
        <Select
          options={theDrivers?.map((driver: any) => {
            return {
              value: driver.userId,
              label: capitalizeAllFirstLetters(driver.fullName)
            }
          })}
          onKeyDown={(e: any) => {
            setSearch(e.target.value)
          }}
          onChange={(optX: any) => {
            handleTagAddition(optX)
          }}
        />

        {
          tags.length > 0 && 
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {tags?.map((t: any) => (
              <>
                {
                  !t.currentCar &&
                  <div className="mx-2 bg-[#F8F8F8] rounded-md p-3 mt-2 mb-3 flex w-full justify-between">
                    <span className="mx-1">{capitalizeAllFirstLetters(t.label)}</span>
                    <span className="mx-1 mt-1 cursor-pointer" onClick={() => {handleTagDelete(t)}}><CloseIcon /></span>
                  </div>
                }
              </>
            ))}
          </div>
        }
      </div>
    </Card>
  )
}

const CarAssignedCard: FC<Props> = ({ assignDriver, driverData }) => {
  const { setModalContent } = useModalContext();
  const router = useRouter();
  const [assignedDriverValue, setAssignedDriverValue] = useState('No Driver Yet')
  const [assignedDriverId, setAssignedDriverId] = useState('')

  const { id } = router.query;
  const [assignSharpCar, { isLoading, isError, isSuccess, error }] = useAssignSharpCarMutation();

  useEffect(() => {
    if (isSuccess) toast.success('Car assigned to ' + assignedDriverValue)
    setModalContent(null);
  }, [isSuccess])

  useEffect(() => {
    if (isError) toast.error('Car assignment failed')
  }, [isError])

  const handleChooseDriver = (driver: string, driverId: string) => {
    setAssignedDriverValue(driver);
    setAssignedDriverId(driverId);
    assignSharpCar({carId: String(id), driverId: driverId})
  }

  return (
    <div className="mt-4">
      {!assignDriver && 
      <Card>
        <p className="text-md font-semibold pt-2">Assigned Driver</p>
        <div className="flex flex-col mt-6">
          <p className="text-md text-[#9A9A9A]">{assignedDriverValue}</p>
          <div className="flex justify-start mt-2">
            <Button title="Assign Driver" size="medium" onClick={() => {
              setModalContent(
                <AssignDriverModal handleClose={() => setModalContent(null)} handleChooseDriver={handleChooseDriver} />
              )
            }} />
          </div>
        </div>
      </Card>}

      {assignDriver && 
      <Card>
        <p className="text-md font-semibold pt-2">Assigned Driver</p>
        <div className="flex mt-6 gap-4">
          <Avatar imageUrl={driverData?.profile_image} fallBack={driverData?.full_name ? driverData?.full_name[0] : 'A'} size="md" />
          <div className="flex flex-col justify-start">
            <p className="font-bold text-lg">{capitalizeAllFirstLetters(driverData?.full_name)}</p>
            <p className="text-md text-[#9A9A9A]">{driverData?.email}</p>
            <p className="text-md text-[#9A9A9A]">{capitalizeAllFirstLetters(driverData?.house_address)}</p>
            <p className="text-md text-[#9A9A9A]">{driverData?.phone_number}</p>
          </div>
        </div>
      </Card>}
    </div>
  );
};

export default CarAssignedCard;
