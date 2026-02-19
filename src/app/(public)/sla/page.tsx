import { LegalPageLayout } from "@/components/public/legal-page-layout";

export default function SlaPage() {
	return (
		<LegalPageLayout
			title="اتفاقية مستوى الخدمة (SLA)"
			updatedAt="19 فبراير 2026"
		>
			<section>
				<h2 className="text-2xl font-semibold text-slate-900">
					1. نطاق الخدمة
				</h2>
				<p>
					تحدد هذه الاتفاقية مستوى الخدمة المقدمة من منصة ثوبك لإدارة أعمال
					الخياطة، وتشمل الوصول للنظام، إدارة الطلبات، القياسات، والفوترة.
				</p>
			</section>

			<section>
				<h2 className="text-2xl font-semibold text-slate-900">
					2. التوفر والاستقرار
				</h2>
				<p>
					نسعى لتوفير الخدمة بنسبة تشغيل مرتفعة على مدار الشهر. قد تحدث توقفات
					مجدولة للصيانة أو تحديثات أمنية، ويتم تنفيذها قدر الإمكان خارج أوقات
					الذروة.
				</p>
			</section>

			<section>
				<h2 className="text-2xl font-semibold text-slate-900">
					3. الدعم الفني
				</h2>
				<p>
					يتم استقبال طلبات الدعم عبر قنوات التواصل الرسمية. تتم معالجة الطلبات
					وفق أولوية الحالة، ويُبذل جهد معقول لمعالجة الأعطال الحرجة في أسرع وقت.
				</p>
			</section>

			<section>
				<h2 className="text-2xl font-semibold text-slate-900">
					4. مسؤوليات العميل
				</h2>
				<p>
					يتحمل العميل مسؤولية صحة البيانات المدخلة، وإدارة صلاحيات المستخدمين
					الداخليين، والحفاظ على سرية بيانات الدخول وعدم مشاركتها مع أطراف غير
					مصرح لها.
				</p>
			</section>

			<section>
				<h2 className="text-2xl font-semibold text-slate-900">
					5. الاستثناءات
				</h2>
				<p>
					لا تشمل هذه الاتفاقية الانقطاعات الناتجة عن ظروف خارجة عن الإرادة مثل
					مشاكل مزود الإنترنت لدى العميل، أو الكوارث الطبيعية، أو الهجمات واسعة
					النطاق على البنية التحتية العامة.
				</p>
			</section>
		</LegalPageLayout>
	);
}
