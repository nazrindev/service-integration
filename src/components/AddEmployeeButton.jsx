import { Button } from "@material-tailwind/react";

export default function AddEmployeeButton({ setshowCreatePopUp }) {
  return (
    <div className="flex justify-end">
      <Button onClick={() => setshowCreatePopUp(true)}>Create Employee</Button>
    </div>
  );
}
