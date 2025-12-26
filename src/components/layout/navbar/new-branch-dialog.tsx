import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Input } from "@/components/ui/input";
import { InputWrapper } from "@/components/ui/input-wrapper";
import { Label } from "@/components/ui/label";
import { branchRequest, useBranches } from "@/hooks/branches";
import axios from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Asterisk } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import z from "zod";

export const NewBranchDialog = ({
  isAdmin,
  open,
  setOpen,
}: {
  isAdmin: boolean;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const t = useTranslations("messages");

  const { register, errors, handleSubmit, addBranch } = useBranches();
  const submitBranch = async (data: branchRequest) => {
    const resultBranch = await addBranch(data);
    if (resultBranch) setOpen(false);
    else return;
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <Dialog open={open && isAdmin} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit(submitBranch)}>
        <DialogContent className="gap-6">
          <DialogHeader>
            <DialogTitle>{t("add_branch")}</DialogTitle>
          </DialogHeader>

          <FormWrapper>
            <InputWrapper>
              <Label className="flex ">
                <Asterisk className="w-2 h-2 text-red-600" />
                {t("branch_name")}
              </Label>
              <Input
                error={errors?.name && true}
                {...register("name")}
                placeholder={t("branch_name_placeholder")}
              />
            </InputWrapper>

            <InputWrapper>
              <Label>{t("address")}</Label>
              <Input error={errors?.address && true} {...register("address")} />
            </InputWrapper>
            <InputWrapper>
              <Label>{t("phone")}</Label>
              <Input error={errors?.phone && true} {...register("phone")} />
            </InputWrapper>
            <InputWrapper>
              <Label>{t("email")}</Label>
              <Input
                error={errors?.email && true}
                type="email"
                {...register("email")}
              />
            </InputWrapper>
          </FormWrapper>
          <DialogFooter>
            <Button onClick={handleSubmit(submitBranch)} type="submit">
              {t("add_branch")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
