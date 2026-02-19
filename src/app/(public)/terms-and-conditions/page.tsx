import { LegalPageLayout } from "@/components/public/legal-page-layout";

export default function TermsAndConditionsPage() {
	return (
		<LegalPageLayout title="الشروط والأحكام" updatedAt="19 فبراير 2026">
			<section>
				<h2 className="text-2xl font-semibold text-slate-900">
					1. القبول والاستخدام
				</h2>
				<p>
					باستخدامك منصة ثوبك فإنك توافق على هذه الشروط والأحكام. يجب استخدام
					المنصة بشكل نظامي وعدم إساءة استخدامها أو محاولة تعطيلها.
				</p>
			</section>

			<section>
				<h2 className="text-2xl font-semibold text-slate-900">
					2. الحسابات والصلاحيات
				</h2>
				<p>
					العميل مسؤول عن بيانات الدخول وإدارة الصلاحيات داخل منشأته. أي إجراء
					يتم عبر حسابات المستخدمين المعتمدين يُعد ضمن مسؤولية العميل التشغيلية.
				</p>
			</section>

			<section>
				<h2 className="text-2xl font-semibold text-slate-900">
					3. الرسوم والاشتراك
				</h2>
				<p>
					تخضع الباقات والرسوم للعرض التجاري المعتمد. استمرار استخدام المزايا
					المدفوعة يتطلب اشتراكًا نشطًا وسداد المستحقات وفق المواعيد المحددة.
				</p>
			</section>

			<section>
				<h2 className="text-2xl font-semibold text-slate-900">
					4. الملكية الفكرية
				</h2>
				<p>
					جميع حقوق المنصة ومكوناتها محفوظة للجهة المالكة. لا يجوز نسخ أو إعادة
					نشر أي جزء من النظام دون تصريح خطي مسبق.
				</p>
			</section>

			<section>
				<h2 className="text-2xl font-semibold text-slate-900">
					5. التعديلات والإنهاء
				</h2>
				<p>
					يجوز تحديث هذه الشروط عند الحاجة، ويعد استمرار الاستخدام بعد التحديث
					موافقة ضمنية عليها. يمكن إيقاف الحسابات المخالفة وفق السياسات
					المعتمدة.
				</p>
			</section>
		</LegalPageLayout>
	);
}
