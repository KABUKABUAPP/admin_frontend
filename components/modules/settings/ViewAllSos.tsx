import React, { FC } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import SosContactItemContainer from "./SosContactItemContainer";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";

interface Props {
  setIsViewAllSos: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewAllSos: FC<Props> = ({ setIsViewAllSos }) => {
  const router = useRouter();

  useEffect(() => {
    router.push("/settings", undefined, { shallow: true });
  }, []);

  return (
    <div>
      <div className="flex justify-between gap-2 items-center mb-4">
        <h2 className="text-2xl font-semibold">5 SOS Contacts</h2>
        <Button title="New Contact" size="large" startIcon={<AddIcon />} />
      </div>
      <SosContactItemContainer
        data={mockSOS}
        handleView={(id) => {
          router.push(`/settings?contact_id=${id}`, undefined, {
            shallow: true,
          });
          setIsViewAllSos(false);
        }}
      />
    </div>
  );
};

export default ViewAllSos;

const mockSOS = [
  {
    location: "Lekki",
    phoneNumber: "090773889983",
    subLocation: "Lekki Phase One",
    id: "1",
  },
  {
    location: "Lekki",
    phoneNumber: "090773889983",
    subLocation: "Lekki Phase One",
    id: "2",
  },
  {
    location: "Lekki",
    phoneNumber: "090773889983",
    subLocation: "Lekki Phase One",
    id: "3",
  },
  {
    location: "Lekki",
    phoneNumber: "090773889983",
    subLocation: "Lekki Phase One",
    id: "4",
  },
  {
    location: "Lekki",
    phoneNumber: "090773889983",
    subLocation: "Lekki Phase One",
    id: "5",
  },
];
