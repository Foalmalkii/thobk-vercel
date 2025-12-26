import React from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { useAtom } from "jotai";
import { neckInfoAtom } from "@/lib/atoms";
import { useTranslations } from "next-intl";

export const ThobeImage = () => {
  const { watch } = useFormContext();
  const [neckInfo] = useAtom(neckInfoAtom);
  const t = useTranslations("measurements");

  /**
   * Hide fields when default or empty.
   * Returns null if value is 0, undefined, null, or empty string.
   */
  const renderValue = (value: any) => {
    if (
      value === 0 ||
      value === undefined ||
      value === null ||
      value === "" ||
      Number.isNaN(value) // 🔥 hide NaN!
    ) {
      return null;
    }
    return value;
  };

  return (
    <div className="inline-block relative top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2">
      {/* FRONT LENGTH */}
      {renderValue(watch("general.thobeLength")) && (
        <div className="absolute top-[51.3%] w-auto -translate-y-1/2 right-[3.7%] font-bold translate-x-1/2 text-xs text-center">
          {watch("general.thobeLength")}
        </div>
      )}

      {/* SLEEVE LENGTH */}
      {renderValue(watch("general.sleeveLength")) && (
        <div className="absolute top-[29%] w-auto -translate-y-1/2 right-[8.9%] font-bold translate-x-1/2 text-xs text-center">
          {watch("general.sleeveLength")}
        </div>
      )}

      {/* UPPER SLEEVE WIDTH */}
      {renderValue(watch("general.upperSleeveWidth")) && (
        <div className="absolute top-[23%] w-auto -translate-y-1/2 right-[14.3%] font-bold translate-x-1/2 text-xs text-center">
          {watch("general.upperSleeveWidth")}
        </div>
      )}

      {/* BACK LENGTH */}
      {renderValue(watch("general.thobeBackLength")) && (
        <div className="absolute top-[51.3%] w-auto -translate-y-1/2 right-[47.3%] font-bold translate-x-1/2 text-xs text-center">
          {watch("general.thobeBackLength")}
        </div>
      )}

      {/* SHOULDER WIDTH */}
      {renderValue(watch("general.shoulderWidth")) && (
        <div className="absolute top-[11.3%] w-auto -translate-y-1/2 right-[62.9%] font-bold translate-x-1/2 text-xs text-center">
          {watch("general.shoulderWidth")}
        </div>
      )}

      {/* SHOULDER ROTATION */}
      {renderValue(watch("general.shoulderRotation")) && (
        <div className="absolute top-[8.8%] w-auto -translate-y-1/2 right-[34.4%] font-bold translate-x-1/2 text-xs text-center">
          {watch("general.shoulderRotation")}
        </div>
      )}

      {/* MIDDLE SLEEVE WIDTH */}
      {renderValue(watch("general.middleSleeveWidth")) && (
        <div className="absolute top-[23.3%] w-auto -translate-y-1/2 right-[40.8%] font-bold translate-x-1/2 text-xs text-center">
          {watch("general.middleSleeveWidth")}
        </div>
      )}

      {/* WRIST WIDTH */}
      {renderValue(watch("general.wristWidth")) && (
        <div className="absolute top-[39.8%] w-auto -translate-y-1/2 right-[13.5%] font-bold translate-x-1/2 text-xs text-center">
          {watch("general.wristWidth")}
        </div>
      )}

      {/* CHEST FRONT */}
      {renderValue(watch("general.chestFront")) && (
        <div className="absolute top-[15.8%] w-auto -translate-y-1/2 right-[29.5%] font-bold translate-x-1/2 text-xs text-center">
          {watch("general.chestFront")}
        </div>
      )}

      {/* CHEST BACK */}
      {renderValue(watch("general.chestBack")) && (
        <div className="absolute top-[15.8%] w-auto -translate-y-1/2 right-[62.9%] font-bold translate-x-1/2 text-xs text-center">
          {watch("general.chestBack")}
        </div>
      )}

      {/* CHEST FULL */}
      {renderValue(watch("general.chestFull")) && (
        <div className="absolute top-[20.5%] w-auto -translate-y-1/2 right-[29.4%] font-bold translate-x-1/2 text-xs text-center">
          {watch("general.chestFull")}
        </div>
      )}

      {/* BOTTOM WIDTH */}
      {renderValue(watch("general.bottomWidth")) && (
        <div className="absolute top-[95%] w-auto -translate-y-1/2 right-[26%] font-bold translate-x-1/2 text-xs text-center">
          {watch("general.bottomWidth")}
        </div>
      )}

      {/* CUFF BOTTOM WIDTH */}
      {renderValue(watch("general.cuffBottomWidth")) && (
        <div className="absolute top-[89%] w-auto -translate-y-1/2 right-[39.9%] font-bold translate-x-1/2 text-xs text-center">
          {watch("general.cuffBottomWidth")}
        </div>
      )}

      {/* WAIST WIDTH */}
      {renderValue(watch("general.waistWidth")) && (
        <div className="absolute top-[35%] w-auto -translate-y-1/2 right-[25.4%] font-bold translate-x-1/2 text-xs text-center">
          {watch("general.waistWidth")}
        </div>
      )}

      {/* HIP WIDTH */}
      {renderValue(watch("general.hipWidth")) && (
        <div className="absolute top-[54.3%] w-auto -translate-y-1/2 right-[25.4%] font-bold translate-x-1/2 text-xs text-center">
          {watch("general.hipWidth")}
        </div>
      )}

      {/* NECK LENGTH */}
      {renderValue(watch("neck.neckLength")) && (
        <div className="absolute top-[12%] w-auto -translate-y-1/2 right-[83.5%] font-bold translate-x-1/2 text-xs text-center">
          {watch("neck.neckLength")}
        </div>
      )}

      {/* NECK BACK LENGTH */}
      {renderValue(watch("neck.neckBackLength")) && (
        <div className="absolute top-[4.2%] w-auto -translate-y-1/2 right-[66.3%] font-bold translate-x-1/2 text-xs text-center">
          {watch("neck.neckBackLength")}
        </div>
      )}

      {/* NECK WIDTH */}
      {renderValue(watch("neck.neckWidth")) && (
        <div className="absolute top-[4.1%] w-auto -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 text-xs text-center">
          {watch("neck.neckWidth")}
        </div>
      )}

      {/* NECK INFO ENUMS */}
      {Object.values(neckInfo).some((v) => renderValue(v)) && (
        <div className="absolute top-[20%] w-[24.5%] -translate-y-1/2 right-[87.4%] font-bold translate-x-1/2 text-xs text-center">
          {Object.entries(neckInfo).map(([key, value], index) => (
            <span className="text-[10px] font-normal" key={key}>
              {value && t(`neck_${key}_${value}`)}
              {index !== Object.entries(neckInfo).length - 1 && value && " | "}
            </span>
          ))}
        </div>
      )}

      {/* IMAGE */}
      <Image
        alt="thobe"
        width={987.18}
        height={1278.5}
        src="/images/thobe.svg"
      />
    </div>
  );
};
