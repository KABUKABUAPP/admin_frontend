import Avatar from "@/components/common/Avatar";
import Card from "@/components/common/Card";
import PlateNumber from "@/components/common/PlateNumber";
import { capitalizeAllFirstLetters } from "@/utils";
import { useRouter } from "next/router";
import React, { FC } from "react";

interface Props {
    cars: any;
}

const CarsList:FC<Props> = ({ cars }) => {
    const router = useRouter();

    return (
        <Card>
            <>
                <div className="flex justify-between">
                    <p className="text-lg font-bold">Cars ({cars.length})</p>
                </div>
                {
                    cars.map((car: any) => (
                        <div className="bg-[#F5F5F5] rounded-lg w-full p-2 my-4 cursor-pointer" onClick={() => router.push(`/car-owners/car/${car._id}?fallbackUrl=${router.asPath}`)}>
                            <p className="text-[#9A9A9A] text-xs border-b border-b-[#D4D4D4]">#{car._id}</p>
                            
                            <div className="flex my-4 gap-3">
                                <Avatar
                                    imageUrl={car.images[0]}
                                    fallBack={`${car.brand_name && car.brand_name[0]}`}
                                    size="lg"
                                    shape="square"
                                />
                                <div className="flex flex-col gap-2">
                                    <p className="text-md font-bold">{`${capitalizeAllFirstLetters(car.brand_name)} ${capitalizeAllFirstLetters(car.model)} ${car.year}`}</p>
                                    <p className="text-[#9A9A9A] text-sm">{capitalizeAllFirstLetters(car.color)}</p>
                                    <PlateNumber plateNumber={car.plate_number} />
                                    <p className="text-md font-bold">{car.active ? 'Active' : 'Not Active'}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </>
        </Card>
    )
}

export default CarsList;