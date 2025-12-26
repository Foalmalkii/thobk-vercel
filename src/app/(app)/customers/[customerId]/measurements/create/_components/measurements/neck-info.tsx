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
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import z from "zod";
import { useTranslations } from "next-intl";
import { useAtom } from "jotai";
import { neckInfoAtom } from "@/lib/atoms";
import { measurementSchema } from "./schema";
import { InputsGrid } from "../layout/inputs-grid";

export const NeckMeasurementInfo = () => {
  const { register, watch } = useFormContext();
  const neckValues = watch("neck") || {};
  const t = useTranslations("measurements");
  const [_, setNeckInfo] = useAtom(neckInfoAtom);

  useEffect(() => {
    console.log(_);
  }, [_]);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-medium">مواصفات الرقبة</h1>
      <InputsGrid>
        {Object.keys(neckValues).map((key) => {
          const field =
            measurementSchema.shape.neck.shape[
              key as keyof typeof measurementSchema.shape.neck.shape
            ];

          // If it's a ZodEnum, render a Select
          if (field instanceof z.ZodEnum) {
            return (
              <InputWrapper className="w-full" key={key}>
                <Label>{t(`neck_${key}`)}</Label>
                <Select
                  onValueChange={(value) => {
                    setNeckInfo((prev) => ({ ...prev, [key]: value })); // update jotai
                  }}
                  {...register(`neck.${key}`)}
                >
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
                          {t(`neck_${key}_${option}`)}
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
              <Label>{t(`neck_${key}`)}</Label>
              <Input {...register(`neck.${key}`)} />
            </InputWrapper>
          );
        })}
      </InputsGrid>
    </div>
  );
};
