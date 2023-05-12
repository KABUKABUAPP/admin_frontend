import React, { FC } from "react";

import AppLayout from "@/layouts/AppLayout";
import ActionBar from "@/components/common/ActionBar";
import HubImagesCard from "@/components/modules/hubs/HubImagesCard";
import AddHubLayout from "@/components/modules/hubs/AddHubLayout";
import HubDetailsForm from "@/components/modules/hubs/HubDetailsForm";

const AddHub: FC = () => {
  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar backButtonText="Cancel" />

        <AddHubLayout>
          <p className="text-3xl font-semibold pb-8">New Hub</p>
          <div className="flex flex-col gap-4">
            <HubImagesCard
              images={[
                { image: "/testUser.jpg", imageId: "3" },
                { image: "/testUser.jpg", imageId: "3" },
                { image: "/testUser.jpg", imageId: "3" },
                { image: "/testUser.jpg", imageId: "3" },
                { image: "/testUser.jpg", imageId: "3" },
              ]}
            />
            <HubDetailsForm />
          </div>
        </AddHubLayout>
      </div>
    </AppLayout>
  );
};

export default AddHub;
