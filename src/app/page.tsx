import StatisticCardWrapper from "@/components/ui/statistic-wrapper";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-4 border-b pb-4">
        <h1 className="text-2xl font-semibold">الرئيسية</h1>
        <p className="text-slate-600">
          تعرض صفحة النظرة العامة لمحة سريعة عن جميع الأنشطة المهمة، مثل الطلبات
          المستحقة اليوم والفواتير والعملاء الجدد. تساعدك هذه الصفحة على متابعة
          الأعمال اليومية واتخاذ القرارات بسرعة وكفاءة.
        </p>
      </div>

      <div className="mt-8">
        <div className="grid lg:grid-cols-2">
          <StatisticCardWrapper>
            <StatisticCardWrapper.Title className="flex justify-between items-center">
              <span>الطلبات المفترض تسليمها اليوم</span>
              <Link
                href={"#"}
                className="flex items-center text-sm text-blue-800 font-normal hover:underline max-md:hidden"
              >
                التفاصيل <ChevronLeft />
              </Link>
            </StatisticCardWrapper.Title>
            <StatisticCardWrapper.Container>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-slate-600 mt-1">
                لا توجد طلبات مستحقة اليوم
              </p>
            </StatisticCardWrapper.Container>
            <Link
              href={"#"}
              className="flex items-center justify-end text-sm text-blue-800 font-normal hover:underline md:hidden mt-8"
            >
              التفاصيل <ChevronLeft />
            </Link>
          </StatisticCardWrapper>
        </div>
      </div>
    </>
  );
}
