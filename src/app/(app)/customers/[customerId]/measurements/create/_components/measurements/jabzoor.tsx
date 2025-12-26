import { useTranslations } from "next-intl";
import React from "react";
import { useFormContext } from "react-hook-form";
import { CreateMeasurementSectionContainer } from "../layout/section-container";
import { InputsGrid } from "../layout/inputs-grid";

import { Input } from "@/components/ui/input";
import { InputWrapper } from "@/components/ui/input-wrapper";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { measurementSchema } from "./schema";
import z from "zod";

export const JabzoorMeasurementInfo = () => {
  const { watch, register } = useFormContext();
  const t = useTranslations("measurements");

  const jabzoorValues = watch("jabzoor");

  return (
    <CreateMeasurementSectionContainer>
      <h1 className="text-xl font-medium">تفاصيل الجبزور</h1>

      <InputsGrid>
        {Object.keys(jabzoorValues).map((key) => {
          const field =
            measurementSchema.shape.jabzoor.shape[
              key as keyof typeof measurementSchema.shape.jabzoor.shape
            ];

          // If it's a ZodEnum, render a Select
          if (field instanceof z.ZodEnum) {
            return (
              <InputWrapper className="w-full" key={key}>
                <Label>{t(`jabzoor_${key}`)}</Label>
                <Select {...register(`jabzoor.${key}`)}>
                  <SelectTrigger className="">
                    <SelectValue
                      className="truncate"
                      placeholder={`Select ${key}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {field.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {t(`jabzoor_${key}_${option}`)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </InputWrapper>
            );
          }

          // Otherwise, render a regular Input for numbers
          return (
            <InputWrapper className="w-full" key={key}>
              <Label>{t(`jabzoor_${key}`)}</Label>
              <Input {...register(`jabzoor.${key}`)} />
            </InputWrapper>
          );
        })}
      </InputsGrid>
    </CreateMeasurementSectionContainer>
  );
};
