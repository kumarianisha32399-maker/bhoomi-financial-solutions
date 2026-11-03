// Default demo content. Everything here can be edited from the admin panel (persisted in localStorage).
import accountingWorkspace from "@/assets/accounting-workspace.jpg";
import taxReview from "@/assets/tax-review.jpg";
import accountingOffice from "@/assets/accounting-office.jpg";
import financialDiscussion from "@/assets/financial-discussion.jpg";

export const u = (id: string, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

const slug = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const svc = (title: string, icon: string, img: string, desc: string, points: string[]) => ({
  id: slug(title), slug: slug(title), title, icon, image: u(img, 1000), desc,
  body: `${desc} Our team works closely with business owners, startups and professionals to understand their financial requirements before preparing any record or filing. Every engagement is structured around clear deliverables, agreed timelines and transparent working, so you always know what is being prepared and when it is due.`,
  points,
});

export const defaultData = {
  settings: {
    siteName: "Bhoomi Business Solutions",
    tagline: "Your Trusted Partner for Accounting, Taxation & Financial Compliance",
    phone: "+91 00000 00000",
    email: "info@yourdomain.com",
    address: "Office address placeholder, City, State, India",
    hours: "Mon – Sat, 10:00 AM – 7:00 PM",
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://x.com/",
    footerAbout: "Bhoomi Business Solutions provides accounting, taxation, GST-related assistance and financial documentation services to individuals, startups and businesses — with organized records, reliable support and a transparent working process.",
    logoUrl: "",
  },
  hero: [
    { id: "h1", eyebrow: "Professional Accounting Services", title: "Complete Accounting & Financial Solutions for Your Business.", text: "From accounting and taxation to GST compliance and financial documentation, Bhoomi Business Solutions helps businesses manage their financial responsibilities with confidence.", image: accountingWorkspace },
    { id: "h2", eyebrow: "GST & Taxation Solutions", title: "GST Returns and Tax Filings, Prepared Correctly and On Time.", text: "GST registration support, GSTR-1 and GSTR-3B preparation, income tax returns and TDS filings — organised, reconciled and submitted before every due date.", image: taxReview },
    { id: "h3", eyebrow: "Business Financial Management", title: "Your Business Finances, Managed with Care.", text: "Bookkeeping, financial statements, reconciliation and payroll handled with accuracy and attention to detail, so your records stay decision-ready all year.", image: accountingOffice },
  ],
  highlights: [
    { id: "b1", icon: "Calculator", title: "Accounting Accuracy", text: "Books, ledgers and statements prepared with attention to every entry." },
    { id: "b2", icon: "CalendarCheck", title: "Timely Tax Filing", text: "GST, income tax and TDS filings tracked and completed before deadlines." },
    { id: "b3", icon: "FileCheck2", title: "Reliable Documentation", text: "Financial and business documentation kept organised and audit-ready." },
    { id: "b4", icon: "Handshake", title: "Trusted Support", text: "A dependable point of contact for every accounting and compliance need." },
  ],
  careFeatures: [
    { id: "c1", icon: "Crosshair", title: "Accounting Accuracy", text: "Every transaction is recorded, classified and verified so your books always reflect the true position of your business." },
    { id: "c2", icon: "CalendarClock", title: "Timely Tax Filing", text: "Due-date tracking for GST, income tax and TDS obligations, with returns prepared well ahead of every deadline." },
    { id: "c3", icon: "FileSpreadsheet", title: "GST Compliance Support", text: "Registration assistance, GSTR-1 and GSTR-3B preparation, reconciliation and documentation support throughout the year." },
    { id: "c4", icon: "FolderOpen", title: "Financial Documentation", text: "Statements, computations and supporting papers prepared in an organised, presentable format for banks and authorities." },
    { id: "c5", icon: "Archive", title: "Organized Business Records", text: "Ledgers, registers and financial records maintained systematically, so information is easy to find when you need it." },
    { id: "c6", icon: "Users", title: "Reliable Professional Assistance", text: "Responsive, transparent support for day-to-day accounting questions and year-end requirements alike." },
  ],
  about: {
    intro: "Bhoomi Business Solutions is focused on providing accounting, taxation, GST-related assistance and financial documentation services to individuals, startups and businesses. Our goal is to make financial processes easier through organized records, professional support and reliable service.",
    who: "We are a team of accounting and finance professionals who work with small businesses, startups, traders and self-employed individuals on their day-to-day accounts, taxes and documentation.",
    mission: "To make accounting, tax and compliance processes simple, accurate and affordable for every business we serve.",
    vision: "To be the dependable financial back-office that growing Indian businesses rely on, year after year.",
    values: "Accuracy, transparency, confidentiality and a commitment to completing every record and filing on time.",
    image: financialDiscussion,
  },
  stats: [
    { id: "s1", label: "Years of Experience", value: 12, suffix: "+" },
    { id: "s2", label: "Businesses Supported", value: 350, suffix: "+" },
    { id: "s3", label: "Returns Prepared", value: 800, suffix: "+" },
    { id: "s4", label: "Service Categories", value: 6, suffix: "" },
  ],
  services: [
    svc("Accounting Services", "BookOpen", "1554224155-6726b3ff858f", "Bookkeeping, day-to-day and monthly accounting and complete financial record management for your business.", ["Bookkeeping", "Daily Accounting", "Monthly Accounting", "Financial Statement Preparation", "Profit & Loss Statements", "Balance Sheet Preparation", "Accounts Reconciliation", "Financial Record Management"]),
    svc("GST Services", "Receipt", "1434626881859-194d67b2b86f", "GST registration assistance, return preparation, reconciliation and compliance support under the GST regime.", ["GST Registration Assistance", "GST Return Filing", "GSTR-1 Preparation", "GSTR-3B Preparation", "GST Reconciliation", "GST Documentation", "GST Compliance Support"]),
    svc("Income Tax Services", "FileText", "1450101499163-c8848c66ca85", "Income tax return filing and documentation support for individuals, firms and businesses.", ["Individual ITR Filing", "Business ITR Filing", "Tax Documentation", "Tax Computation Assistance", "TDS Return Filing", "Tax Compliance Support"]),
    svc("Business Registration & Compliance", "Building2", "1497366216548-37526070297c", "Documentation and filing assistance for business registration and ongoing annual compliance.", ["Company Registration Assistance", "LLP Registration Assistance", "Partnership Firm Documentation", "MSME / Udyam Registration Assistance", "Business PAN and TAN Assistance", "Annual Compliance Support"]),
    svc("Financial & Documentation Services", "Landmark", "1579532537598-459ecdaf39cc", "Preparation of financial statements, reports and business documentation in an organised, presentable format.", ["Financial Statement Preparation", "Financial Documentation", "Bank Documentation Assistance", "Financial Reports", "Business Documentation", "Accounting Data Management"]),
    svc("Payroll & Other Services", "Wallet", "1589829545856-d10d557cf95f", "Salary processing, payroll management and employee records handled accurately every month.", ["Salary Processing", "Payroll Management", "Employee Records", "TDS on Salary", "Professional Tax Assistance (where applicable)"]),
  ],
  industries: [
    { id: "small-businesses", title: "Small Businesses", image: u("1556761175-5973dc0f32e7", 900), desc: "Bookkeeping, GST and year-end accounts for shops, agencies and family-run businesses." },
    { id: "startups", title: "Startups", image: u("1519389950473-47ba0277781c", 900), desc: "Entity registration, monthly accounting and clean records from day one." },
    { id: "retail-shops", title: "Retail Shops", image: u("1441986300917-64674bd600d8", 900), desc: "Sales recording, GST returns and stock-linked accounting for retailers." },
    { id: "traders-wholesalers", title: "Traders & Wholesalers", image: u("1503387762-592deb58ef4e", 900), desc: "Purchase-sale records, GST reconciliation and receivables tracking." },
    { id: "manufacturers", title: "Manufacturers", image: u("1581091226825-a6a2a5aee158", 900), desc: "Cost records, inventory accounting and compliance for production units." },
    { id: "service-providers", title: "Service Providers", image: u("1521791136064-7986c2920216", 900), desc: "Invoicing, TDS on payments and clean books for service businesses." },
    { id: "private-limited-companies", title: "Private Limited Companies", image: u("1560518883-ce09059eeffa", 900), desc: "Statutory books, annual filings and board-ready financial statements." },
    { id: "llps", title: "LLPs", image: u("1568992687947-868a62a9f521", 900), desc: "Partnership accounting, Form 11 filings and annual compliance support." },
    { id: "freelancers-professionals", title: "Freelancers & Professionals", image: u("1522071820081-009f0129c71c", 900), desc: "ITR filing, advance tax and simple bookkeeping for independent professionals." },
    { id: "self-employed-individuals", title: "Self-Employed Individuals", image: u("1486312338219-ce68d2c6f44d", 900), desc: "Income recording, tax computation and return filing without the paperwork burden." },
  ],
  testimonials: [
    { id: "t1", name: "Rohan Mehta", company: "Director, Mehta Industries (sample)", text: "Our monthly books, GST returns and payroll now run like clockwork. Everything is prepared on time and clearly explained.", avatar: u("1507003211169-0a1dd7228f2b", 200) },
    { id: "t2", name: "Ananya Iyer", company: "Founder, Bloomleaf Retail (sample)", text: "From company registration to our first GST year, every filing was handled smoothly. We always knew what was due and when.", avatar: u("1494790108377-be9c29b29330", 200) },
    { id: "t3", name: "Vikram Singh", company: "Proprietor, Northstar Traders (sample)", text: "Bank documentation and reconciliation support were excellent. Our records are finally organised and loan-ready.", avatar: u("1500648767791-00dcc994a43e", 200) },
    { id: "t4", name: "Priya Nair", company: "Consultant (sample)", text: "Accurate, responsive and transparent with fees. My ITR and books have never been in better shape.", avatar: u("1438761681033-6461ffad8d80", 200) },
  ],
  blogs: [
    { id: "gst-filing-basics", slug: "gst-filing-basics", title: "GST Filing Basics Every Business Should Know", category: "GST", date: "2026-10-12", image: u("1460925895917-afdab827c52f", 1000), excerpt: "GSTR-1, GSTR-3B, due dates and reconciliation — a plain-language starting guide for GST-registered businesses.", body: "Every GST-registered business must file periodic returns, most commonly GSTR-1 for outward supplies and GSTR-3B for the summary self-assessment.\n\nGSTR-1 reports the invoices you raised during the period, so accurate sales records are essential before you begin. GSTR-3B consolidates your taxable value, tax liability and input tax credit for payment.\n\nThe most common issues are mismatched invoices, missed due dates and un-reconciled input credit. A monthly habit of matching purchase records against sales data keeps filings accurate and reduces notices.\n\nIf you are unsure about a transaction — inter-state supply, reverse charge or composition scheme treatment — get it clarified before filing rather than after." },
    { id: "income-tax-return-filing-guide", slug: "income-tax-return-filing-guide", title: "Income Tax Return Filing: Getting Your Documents Ready", category: "Income Tax", date: "2026-09-28", image: u("1542744173-8e7e53415bb0", 1000), excerpt: "The forms, papers and computations that make ITR filing smooth for individuals and businesses.", body: "Filing an income tax return becomes simple when the groundwork is ready. Start by collecting Form 26AS and AIS, bank statements, interest certificates, investment proofs and details of any property or capital asset transactions.\n\nFor businesses, reconcile your books of account, prepare the profit and loss summary and compute advance tax instalments already paid. The right ITR form depends on your income sources — salary, business, capital gains or presumptive taxation.\n\nReconciling TDS credits against Form 26AS before filing avoids refund delays. Filing well before the due date also leaves time to correct genuine mistakes through a revised return." },
    { id: "why-bookkeeping-matters", slug: "why-bookkeeping-matters", title: "Why Bookkeeping Is the Backbone of a Healthy Business", category: "Bookkeeping & Accounting", date: "2026-09-05", image: u("1611974789855-9c2a0a7236a3", 1000), excerpt: "Small, consistent record-keeping habits that keep your accounts accurate and decisions informed.", body: "Bookkeeping is the daily recording of your sales, purchases, receipts and payments. When it is current, every other financial task — GST filing, ITR, bank loans — becomes faster and cheaper.\n\nConsistent bookkeeping shows your real margins, flags unpaid invoices early and keeps input tax credit from slipping away. It also protects you during assessments, because every entry can be traced to a supporting document.\n\nA practical routine is simple: record transactions weekly, reconcile bank accounts monthly, and review receivables and payables before month-end. If volume makes this difficult, outsourced bookkeeping keeps the habit alive without hiring in-house staff." },
    { id: "tds-compliance-for-businesses", slug: "tds-compliance-for-businesses", title: "TDS Compliance: Deduct, Deposit and File on Time", category: "TDS & Compliance", date: "2026-08-22", image: u("1553877522-43269d4ea984", 1000), excerpt: "A quick tour of TDS obligations — thresholds, quarterly returns and Form 16/16A issuance.", body: "Tax Deducted at Source applies when a business makes specified payments — salaries, contractor payments, professional fees, rent and interest, among others — above prescribed thresholds.\n\nThe obligation has three parts: deduct the correct rate at the time of payment, deposit it with the government by the prescribed date, and file the quarterly return. After filing, issue Form 16 for salaries and Form 16A for other payments so recipients can claim their credit.\n\nCommon pitfalls include deducting at the wrong rate, missing deposit deadlines and not reconciling deductions against the quarterly statement. A compliance calendar with monthly reminders prevents all three." },
    { id: "financial-year-end-preparation", slug: "financial-year-end-preparation", title: "Financial Year-End Preparation Checklist", category: "Business Finance", date: "2026-08-05", image: u("1559136555-9303baea8ebd", 1000), excerpt: "Close the year cleanly: reconciliations, schedules and statements that make year-end stress-free.", body: "A smooth financial year-end is the result of preparation that starts well before 31 March.\n\nComplete bank and ledger reconciliations, confirm outstanding receivables and payables, and verify fixed asset registers. Collect pending bills and supporting documents while vendors and banks can still respond.\n\nNext, prepare depreciation schedules, provisions and accruals, and review stock valuation for trading and manufacturing businesses. Finally, draft the profit and loss statement and balance sheet so that audits, ITR filing and annual filings can proceed without delay.\n\nBusinesses that follow this checklist in February and March avoid the year-end scramble entirely." },
    { id: "maintaining-business-accounts", slug: "maintaining-business-accounts", title: "Maintaining Business Accounts Without the Hassle", category: "Bookkeeping & Accounting", date: "2026-07-18", image: u("1600880292203-757bb62b4baf", 1000), excerpt: "A simple system of records, tools and monthly reviews that keeps any small business audit-ready.", body: "Maintaining business accounts does not require a finance department — it requires a system.\n\nSeparate business and personal accounts, keep every invoice and voucher filed in date order, and use accounting software or a well-structured ledger to record transactions regularly.\n\nAdd three monthly rituals: reconcile the bank statement, review unpaid invoices, and check that GST and TDS records match your books. Twelve disciplined months produce clean financial statements, painless tax filings and credible documentation for banks and buyers." },
  ],
  blogCategories: ["GST", "Income Tax", "Bookkeeping & Accounting", "TDS & Compliance", "Business Finance"],
  gallery: [
    { id: "g1", image: u("1517245386807-bb43f82c33c4", 900), caption: "Reviewing financial statements with a client" },
    { id: "g2", image: u("1497215728101-856f4ea42174", 900), caption: "Our accounting workspace" },
    { id: "g3", image: u("1551836022-d5d88e9218df", 900), caption: "Preparing GST returns and tax computations" },
    { id: "g4", image: u("1531973576160-7125cd663d86", 900), caption: "Team working on client bookkeeping" },
  ],
  inquiries: [
    { id: "q1", name: "Sample Client", email: "client@example.com", phone: "+91 90000 00000", businessType: "Retail Shops", service: "GST Return Filing", message: "Need monthly GSTR-1 and GSTR-3B filing support for my store.", status: "New", date: "2026-11-01" },
    { id: "q2", name: "Demo Enterprises", email: "demo@example.com", phone: "+91 90000 00001", businessType: "Private Limited Companies", service: "Accounting Services", message: "Looking for monthly bookkeeping and financial statement preparation.", status: "In Progress", date: "2026-10-29" },
  ],
  faqs: [
    { q: "What accounting services do you provide?", a: "Bookkeeping, daily and monthly accounting, financial statement preparation, profit & loss and balance sheet preparation, accounts reconciliation and ongoing financial record management." },
    { q: "Can you help with GST registration and return filing?", a: "Yes. We assist with GST registration, prepare GSTR-1 and GSTR-3B returns, perform input tax credit reconciliation and provide GST documentation and compliance support." },
    { q: "Do you file income tax returns for individuals and businesses?", a: "We prepare and file individual ITRs, business ITRs and TDS returns, with tax computation and documentation support for each." },
    { q: "Can you assist with company or LLP registration?", a: "We provide documentation and filing assistance for company and LLP registration, partnership firm documentation, MSME/Udyam registration, PAN and TAN applications, and annual compliance support." },
    { q: "Do you handle payroll for small teams?", a: "Yes. We process salaries, maintain employee records, handle TDS on salary and assist with professional tax where applicable." },
    { q: "How do you keep my financial data confidential?", a: "Your records are handled with strict confidentiality, shared only for the purpose of preparing your accounts and filings, and never used for any other purpose." },
  ],
  updates: [{ id: "u1", text: "Demo content initialised", date: "2026-11-01" }],
};

export type SiteData = typeof defaultData;

export const processSteps = [
  { n: "01", icon: "Search", title: "Understand Your Requirements", text: "We listen first — your business, its financial activities, deadlines and what you need prepared." },
  { n: "02", icon: "FolderInput", title: "Collect Financial Documents", text: "We gather invoices, bank statements, purchase records and supporting papers in one organised place." },
  { n: "03", icon: "FileSearch", title: "Review & Prepare Records", text: "We record, reconcile and verify every entry, then prepare the required statements or returns." },
  { n: "04", icon: "SendCheck", title: "Complete the Required Filing or Documentation", text: "Filings and documents are completed before their due dates and copies are shared with you." },
];

export const whyCards = [
  { icon: "Crosshair", title: "Accuracy & Attention to Detail", text: "Every entry, computation and filing is checked carefully before it reaches you or an authority." },
  { icon: "Archive", title: "Organized Financial Records", text: "Ledgers, registers and documentation maintained systematically all year — never a last-minute scramble." },
  { icon: "AlarmClock", title: "Timely Assistance", text: "Due-date tracking for GST, TDS and income tax obligations, with support available when you need it." },
  { icon: "Eye", title: "Transparent Working Process", text: "Clear scope, clear timelines and clear fees — you always know what is being done and why." },
  { icon: "Briefcase", title: "Business-Focused Solutions", text: "Accounting and tax support shaped around your industry, size and the way your business actually operates." },
  { icon: "FileCheck2", title: "Reliable Documentation Support", text: "Statements, computations and papers prepared in a clean, presentable format for banks and authorities." },
];

export const careers = [
  { title: "Accountant", type: "Full-time", location: "Office location", exp: "1–3 years", desc: "Handle client bookkeeping, ledger entries, reconciliations and monthly accounting work." },
  { title: "Tax Executive", type: "Full-time", location: "Office location", exp: "2–4 years", desc: "Prepare GST returns, ITRs and TDS filings, and maintain client compliance calendars." },
  { title: "Documentation & Compliance Assistant", type: "Full-time", location: "Office location", exp: "0–2 years", desc: "Organise client financial records, prepare documentation and support registration filings." },
  { title: "Client Relationship Associate", type: "Full-time", location: "Office location", exp: "1–3 years", desc: "Coordinate with clients, track document requirements and keep engagements on schedule." },
];
