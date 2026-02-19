import { LegalPageLayout } from "@/components/public/legal-page-layout";

export default function PrivacyPolicyPage() {
	return (
		<LegalPageLayout title="سياسة الخصوصية" updatedAt="19 فبراير 2026">
			<section>
				<h2 className="text-2xl font-semibold text-slate-900">
					1. البيانات التي نجمعها
				</h2>
				<p>
					قد نجمع بيانات تعريفية وتشغيلية مثل بيانات الحساب، بيانات العملاء
					المدخلة داخل النظام، وسجلات الاستخدام بهدف تشغيل الخدمة وتحسين جودتها.
				</p>
			</section>

			<section>
				<h2 className="text-2xl font-semibold text-slate-900">
					2. استخدام البيانات
				</h2>
				<p>
					تُستخدم البيانات لتقديم الخدمة، معالجة الطلبات، تحسين الأداء، وتعزيز
					الأمان. لا يتم استخدام بياناتك لأغراض غير مرتبطة بالخدمة دون أساس
					نظامي أو موافقة مناسبة.
				</p>
			</section>

			<section>
				<h2 className="text-2xl font-semibold text-slate-900">
					3. مشاركة البيانات
				</h2>
				<p>
					لا نبيع بيانات العملاء. قد تتم مشاركة الحد الأدنى الضروري من البيانات
					مع مزودي خدمات موثوقين (مثل الاستضافة أو الرسائل) فقط بما يخدم تشغيل
					المنصة وبضوابط تعاقدية.
				</p>
			</section>

			<section>
				<h2 className="text-2xl font-semibold text-slate-900">
					4. الحماية والأمان
				</h2>
				<p>
					نطبق إجراءات أمنية تقنية وتنظيمية معقولة لحماية البيانات من الوصول غير
					المصرح به أو الفقد أو التعديل. كما ننصح العملاء بتفعيل ممارسات أمان
					داخلية مناسبة.
				</p>
			</section>

			<section>
				<h2 className="text-2xl font-semibold text-slate-900">
					5. حقوق المستخدم
				</h2>
				<p>
					يمكن للمستخدم طلب تحديث أو تصحيح بياناته ضمن حدود الأنظمة المعمول بها.
					كما يمكن التواصل معنا للاستفسار حول معالجة البيانات أو طلبات الخصوصية.
				</p>
			</section>
		</LegalPageLayout>
	);
}
