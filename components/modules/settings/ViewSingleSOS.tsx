import React, { FC, useState } from "react";
import { useRouter } from "next/router";

import ChevronLeft from "@/components/icons/ChevronLeft";
import Button from "@/components/ui/Button/Button";
import SosContactItem from "./SosContactItem";
import DropDown from "@/components/ui/DropDown";
import SosCallHistoryContainer from "./SosCallHistoryContainer";

interface Props {
  setIsViewAllSos: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewSingleSOS: FC<Props> = ({ setIsViewAllSos }) => {
  const router = useRouter();

  const filterOptions: {
    label: string;
    value: string;
    default: boolean;
  }[] = [
    { label: "All Status", value: "", default: true },
    { label: "Answered Calls", value: "", default: false },
    { label: "Unanswered Calls", value: "", default: false },
  ];

  const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
    filterOptions.find((opt) => opt.default === true)?.value || ""
  );

  return (
    <div>
      <div>
        <Button
          onClick={() => {
            router.push("/settings", undefined, { shallow: true });
            setIsViewAllSos(true);
          }}
          title="Back"
          variant="text"
          startIcon={<ChevronLeft />}
        />
      </div>
      <div className="my-4">
        <SosContactItem
          id="1"
          title="lekki"
          phoneNumber="0908887737"
          subLocation="Lekki Phase 2"
          isDeleteUpdateButtons={true}
        />
      </div>
      <div className="flex justify-between gap-2 items-center mb-4">
        <h2 className="text-lg font-semibold">SOS Call History</h2>
        <div className="flex gap-2 items-center">
          <p className="text-sm">Sort:</p>
          <DropDown
            placeholder="Newest First"
            options={filterOptions}
            value={selectedFilterOption}
            handleChange={(value) => {
              setSelectedFilterOption(String(value));
            }}
          />
        </div>
      </div>
      <SosCallHistoryContainer data={mockCallHistory}/>
    </div>
  );
};

export default ViewSingleSOS;

const mockCallHistory = [
  {
    date: "1 Jan 2023",
    time: "3:45pm",
    duration: "10:00",
  },
  {
    date: "3 Jan 2023",
    time: "3:45pm",
    duration: "10:00",
  },
  {
    date: "5 Jan 2023",
    time: "3:45pm",
    duration: "",
  },
];
