import StatisticCardWrapper from "@/components/ui/statistic-wrapper";

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
            <StatisticCardWrapper.Title>
              <span>الطلبات المفترض تسليمها اليوم</span>
              <span></span>
            </StatisticCardWrapper.Title>
          </StatisticCardWrapper>
        </div>
      </div>
    </>
  );
}
