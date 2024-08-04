import { useGetAllSurgeInStateQuery, useUpdateSurgeMutation } from "@/api-services/farePricesService";
import Card from "@/components/common/Card"
import TimesIconRed from "@/components/icons/TimesIconRed";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import { useModalContext } from "@/contexts/ModalContext"
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateMultiplerModal:FC<any> = ({surgeMultiplier, surgeDeets}) => {
    const { setModalContent } = useModalContext();
    const [newSurgeMultiplier, setNewSurgeMultiplier] = useState(surgeMultiplier)
        
    const router = useRouter();

    const { id } = router.query;

    const [updateSurgeOp, { isSuccess: updateSurgeSuccess, isError: updateSurgeError, error, isLoading: updateSurgeLoading }] =
    useUpdateSurgeMutation();


    const handleUpdateSurge = () => {
        const payload = {
            "surge_multiplier": newSurgeMultiplier,
            "active": surgeDeets.active,
            "surge_hours": surgeDeets.surge_hours
        }

        const surgeDeetsId = surgeDeets._id;

        updateSurgeOp({id: surgeDeetsId, payload})
    }

    useEffect(() => {
        if (updateSurgeSuccess) {
          toast.success("Surge Successfully Updated");
          setModalContent(null);
          window.location.reload();
        }
    }, [updateSurgeSuccess]);
    
    useEffect(() => {
        if (updateSurgeError) {
            console.log(error)
            toast.error("Error encountered");
        }
    }, [updateSurgeError]);

    return (
        <div className="mx-auto w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw]">
            <Card bg="#FFF">
                <p className="text-center font-semibold text-sm">Update Details</p>
                <div className="my-4">
                    <TextField
                        label="Surge Multiplier"
                        placeholder="Surge Multiplier Here"
                        value={newSurgeMultiplier}
                        onChange={(e) => {
                            setNewSurgeMultiplier(e?.target?.value)
                        }}
                    />
                </div>
                <div className="flex gap-3 w-full">
                    <div className="w-1/2">
                        <Button
                            title="Cancel"
                            className="!text-[16px] mt-6 w-full"
                            size="large"
                            disabled={false}
                            loading={false}
                            color="tetiary"
                            onClick={() => setModalContent(null)}
                        />
                    </div>
                    <div className="w-1/2">
                        <Button
                            title="Save Changes"
                            className="!text-[16px] mt-6 w-full"
                            size="large"
                            type="submit"
                            disabled={updateSurgeLoading}
                            loading={updateSurgeLoading}
                            onClick={handleUpdateSurge}
                        />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default UpdateMultiplerModal;