import React, { FC, useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import ActionBar from "@/components/common/ActionBar";
import HubImagesCard from "@/components/modules/hubs/HubImagesCard";
import AddHubLayout from "@/components/modules/hubs/AddHubLayout";
import HubDetailsForm from "@/components/modules/hubs/HubDetailsForm";
import { toast } from "react-toastify";
import useUserPermissions from "@/hooks/useUserPermissions";

const AddHub: FC = () => {
  const [stagedImages, setStagedImages] = useState<
    { image: File; imageId: string }[]
  >([]);

  const [allowedMimeTypes, setAllowedMimeTypes] = useState([
    "image/jpeg",
    "image/jpg",
    "image/png",
  ]);

  const handleAddImage = (image: File) => {
    if (allowedMimeTypes.indexOf(image.type) !== -1) {
      const imageId = new Date().getTime().toString();
      setStagedImages([...stagedImages, { image: image, imageId }]);
    } else toast.error("Please upload an image file");
  };

  const handleDeleteImage = (imageId: string) => {
    const filteredImages = stagedImages.filter((img) => {
      return img.imageId !== imageId;
    });

    setStagedImages(filteredImages);
  };

  const { userPermissions } = useUserPermissions();

  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar backButtonText="Cancel" />

        <AddHubLayout>
          <p className="text-3xl font-semibold pb-8">New Hub</p>
          {userPermissions && userPermissions.hubs_permissions.write && (
            <div className="flex flex-col gap-4">
              <HubImagesCard
                images={stagedImages}
                handleChange={(file) => {
                  handleAddImage(file);
                }}
                handleDelete={handleDeleteImage}
              />
              <HubDetailsForm hubImages={stagedImages} />
            </div>
          )}
        </AddHubLayout>
      </div>
    </AppLayout>
  );
};

export default AddHub;
