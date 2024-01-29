import React, { FC } from "react";

import Card from "@/components/common/Card";
import TextField from "@/components/ui/Input/TextField/TextField";

interface Props {
  handleChange: (deet: any) => void;
}

const CarDetailsCard: FC<Props> = ({ handleChange }) => {
  return (
    <Card>
      <div className="flex flex-col gap-4">
        <TextField label="Car Brand" placeholder="Toyota" onChange={(e) => {
          handleChange({value: e.target.value, name: 'brand'});
        }} />
        <TextField label="Car Model" placeholder="Corolla" onChange={(e) => {
          handleChange({value: e.target.value, name: 'model'});
        }} />
        <TextField label="Car Year" placeholder="2009" onChange={(e) => {
          handleChange({value: e.target.value, name: 'year'});
        }} />
        <TextField label="Car Colour" placeholder="Black" onChange={(e) => {
          handleChange({value: e.target.value, name: 'color'});
        }} />
        <TextField label="Plate Number" placeholder="ABC233 CVGG" onChange={(e) => {
          handleChange({value: e.target.value, name: 'plate_number'});
        }} />
        <TextField label="Vehicle License Number" placeholder="ABC233 CVGG" onChange={(e) => {
          handleChange({value: e.target.value, name: 'vehicle_license_number'});
        }} />
        <TextField label="Insurance Number" placeholder="ABC233 CVGG" onChange={(e) => {
          handleChange({value: e.target.value, name: 'insurance_number'});
        }} />
        <TextField label="Proof Of Ownership Number" placeholder="ABC233 CVGG" onChange={(e) => {
          handleChange({value: e.target.value, name: 'proof_of_ownership_number'});
        }} />
        <TextField label="Road Worthiness Certificate Number" placeholder="ABC233 CVGG" onChange={(e) => {
          handleChange({value: e.target.value, name: 'road_worthiness_certificate_number'});
        }} />
        <TextField label="Hackney Permit Number" placeholder="ABC233 CVGG" onChange={(e) => {
          handleChange({value: e.target.value, name: 'hackney_permit_number'});
        }} />
      </div>
    </Card>
  );
};

export default CarDetailsCard;
