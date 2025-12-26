import { CreateMeasurementDialog } from "@/app/(app)/customers/[customerId]/measurements/create/_components/create-measurement";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { PencilRulerIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

export const OrderItemCard = ({ index, onRemove, params }) => {
  const { register, watch } = useFormContext();
  const customerId = Number(params?.customerId);
  const qty = watch(`items.${index}.quantity`);
  const price = watch(`items.${index}.unitPrice`);

  const [openMeasurement, setOpenMeasurement] = useState<boolean>(false);

  return (
    <>
      <CreateMeasurementDialog
        open={openMeasurement}
        setOpen={setOpenMeasurement}
        customerId={customerId}
      />
      <TableRow>
        <TableCell>
          <Input {...register(`items.${index}.fabricType`)} />
        </TableCell>

        <TableCell>
          <Input {...register(`items.${index}.color`)} />
        </TableCell>

        <TableCell className="text-center">
          <Button
            onClick={() => setOpenMeasurement(true)}
            type="button"
            variant={"outline"}
            className="w-full"
          >
            <span>القياسات</span>
            <PencilRulerIcon />
          </Button>
        </TableCell>

        <TableCell>
          <Input
            type="number"
            {...register(`items.${index}.quantity`, {
              valueAsNumber: true,
            })}
          />
        </TableCell>

        <TableCell>
          <Input
            type="number"
            {...register(`items.${index}.unitPrice`, {
              valueAsNumber: true,
            })}
          />
        </TableCell>

        <TableCell className="text-center">
          {qty && price ? qty * price : 0}
        </TableCell>

        <TableCell>
          <Button
            type="button"
            onClick={onRemove}
            className=" aspect-square h-auto w-auto p-2 bg-transparent border border-red-400 hover:bg-transparent"
          >
            <XIcon className="text-red-400" />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};
