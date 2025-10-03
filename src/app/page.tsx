import { StatisticCard } from "@/components/ui/statistic-card";

import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";

export default function Home() {
  const t = useTranslations();
  const locale = getLocale();
  return (
    <>
      <div className="flex flex-col gap-4 border-b pb-4">
        <h1 className="text-2xl font-semibold">
          {t("Dashboard.home")} {locale}
        </h1>
        <p className="text-slate-600">
          تعرض صفحة النظرة العامة لمحة سريعة عن جميع الأنشطة المهمة، مثل الطلبات
          المستحقة اليوم والفواتير والعملاء الجدد. تساعدك هذه الصفحة على متابعة
          الأعمال اليومية واتخاذ القرارات بسرعة وكفاءة.
        </p>
      </div>

      <div className="mt-8">
        <div className="grid lg:grid-cols-2 gap-4">
          <StatisticCard title="الطلبات المفترض إنجازها اليوم" href={"#"}>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-slate-600 mt-1">
              لا توجد طلبات مستحقة اليوم
            </p>
          </StatisticCard>
          <StatisticCard title="الفواتير القائمة" href={"#"}>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-slate-600 mt-1">
              لا توجد فواتير قائمة اليوم
            </p>
          </StatisticCard>
        </div>
      </div>
    </>
  );
}
