import React, { FC } from "react";

import AppLayout from "@/layouts/AppLayout";
import ActionBar from "@/components/common/ActionBar";
import ViewSharpCarLayout from "@/components/modules/sharp-cars/ViewSharpCarLayout";
import CarImagesCard from "@/components/modules/sharp-cars/CarImagesCard";
import CarDetailsCard from "@/components/modules/sharp-cars/CarDetailsCard";

const AddNew: FC = () => {
  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar backButtonText="Cancel" />

        <ViewSharpCarLayout
          firstRow={
            <>
              <p className="text-2xl font-semibold mb-2">Add New Car</p>
              <CarImagesCard
                images={[
                  { image: "/testUser.jpg", imageId: "3" },
                  { image: "/testUser.jpg", imageId: "3" },
                  { image: "/testUser.jpg", imageId: "3" },
                  { image: "/testUser.jpg", imageId: "3" },
                  { image: "/testUser.jpg", imageId: "3" },
                ]}
              />
              <CarDetailsCard />
            </>
          }
          secondRow={<></>}
        />
      </div>
    </AppLayout>
  );
};

export default AddNew;
