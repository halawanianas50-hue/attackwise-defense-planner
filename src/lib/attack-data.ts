// Curated subset of MITRE ATT&CK Enterprise v14 techniques and official mitigations.
export type Lang = "en" | "ar";

export interface Mitigation { id: string; en: string; ar: string; howEn: string; howAr: string }
export interface Technique { id: string; en: string; ar: string; platforms: string[]; mitigations: string[]; severity: 1 | 2 | 3 }
export interface Tactic { id: string; emoji: string; en: string; ar: string; techniques: Technique[] }

export const MITIGATIONS: Record<string, Mitigation> = {
  M1013: { id: "M1013", en: "Application Developer Guidance", ar: "إرشادات مطوري التطبيقات", howEn: "Secure-coding practices remove the weaknesses the attacker relies on before release.", howAr: "ممارسات البرمجة الآمنة تزيل الثغرات التي يعتمد عليها المهاجم قبل الإطلاق." },
  M1016: { id: "M1016", en: "Vulnerability Scanning", ar: "فحص الثغرات", howEn: "Regular scanning finds exploitable flaws so they can be fixed before attackers find them.", howAr: "الفحص الدوري يكشف الثغرات القابلة للاستغلال لإصلاحها قبل أن يجدها المهاجم." },
  M1017: { id: "M1017", en: "User Training", ar: "توعية المستخدمين", howEn: "Trained users recognise and report lures instead of opening or executing them.", howAr: "المستخدم المدرَّب يميّز الطُعم ويبلّغ عنه بدلاً من فتحه أو تشغيله." },
  M1018: { id: "M1018", en: "User Account Management", ar: "إدارة حسابات المستخدمين", howEn: "Limiting what each account can do restricts what an attacker gains after compromise.", howAr: "تقييد صلاحيات كل حساب يحدّ مما يكسبه المهاجم بعد الاختراق." },
  M1021: { id: "M1021", en: "Restrict Web-Based Content", ar: "تقييد المحتوى عبر الويب", howEn: "Blocking risky sites, scripts and file types stops malicious content reaching the user.", howAr: "حظر المواقع والسكربتات وأنواع الملفات الخطرة يمنع وصول المحتوى الخبيث للمستخدم." },
  M1022: { id: "M1022", en: "Restrict File and Directory Permissions", ar: "تقييد صلاحيات الملفات والمجلدات", howEn: "Tight permissions prevent attackers writing or modifying files they need for the technique.", howAr: "الصلاحيات المحكمة تمنع المهاجم من كتابة أو تعديل الملفات اللازمة للهجوم." },
  M1024: { id: "M1024", en: "Restrict Registry Permissions", ar: "تقييد صلاحيات السجل", howEn: "Locked registry keys stop attackers planting autostart or configuration changes.", howAr: "قفل مفاتيح السجل يمنع المهاجم من زرع التشغيل التلقائي أو تعديل الإعدادات." },
  M1026: { id: "M1026", en: "Privileged Account Management", ar: "إدارة الحسابات المميزة", howEn: "Minimising and monitoring admin accounts removes the high-value credentials attackers seek.", howAr: "تقليل الحسابات الإدارية ومراقبتها يزيل بيانات الاعتماد الثمينة التي يسعى إليها المهاجم." },
  M1027: { id: "M1027", en: "Password Policies", ar: "سياسات كلمات المرور", howEn: "Long, unique passwords make guessing and cracking impractical.", howAr: "كلمات المرور الطويلة والفريدة تجعل التخمين والكسر غير عملي." },
  M1028: { id: "M1028", en: "Operating System Configuration", ar: "تهيئة نظام التشغيل", howEn: "Hardened OS settings disable the features the technique abuses.", howAr: "إعدادات النظام المحصّنة تعطّل الخصائص التي يستغلها الهجوم." },
  M1029: { id: "M1029", en: "Remote Data Storage", ar: "التخزين البعيد للبيانات", howEn: "Off-host logs and data cannot be wiped by an attacker on the endpoint.", howAr: "السجلات والبيانات المخزنة خارج الجهاز لا يستطيع المهاجم محوها." },
  M1030: { id: "M1030", en: "Network Segmentation", ar: "تقسيم الشبكة", howEn: "Segments contain the attacker and block movement between critical zones.", howAr: "تقسيم الشبكة يحصر المهاجم ويمنع تنقله بين المناطق الحساسة." },
  M1031: { id: "M1031", en: "Network Intrusion Prevention", ar: "منع التسلل الشبكي (IPS)", howEn: "Signatures and anomaly detection drop malicious traffic in transit.", howAr: "التواقيع وكشف الشذوذ يُسقطان حركة المرور الخبيثة أثناء العبور." },
  M1032: { id: "M1032", en: "Multi-factor Authentication", ar: "المصادقة متعددة العوامل (MFA)", howEn: "A stolen password alone is no longer enough to log in.", howAr: "كلمة المرور المسروقة وحدها لم تعد كافية لتسجيل الدخول." },
  M1035: { id: "M1035", en: "Limit Access to Resource Over Network", ar: "تقييد الوصول للموارد عبر الشبكة", howEn: "Only approved hosts can reach the service, shrinking the attack surface.", howAr: "لا يصل إلى الخدمة إلا المضيفون المعتمدون، مما يقلّص سطح الهجوم." },
  M1036: { id: "M1036", en: "Account Use Policies", ar: "سياسات استخدام الحسابات", howEn: "Lockouts and login restrictions halt brute-force and misuse.", howAr: "قفل الحساب وقيود الدخول توقف التخمين وإساءة الاستخدام." },
  M1037: { id: "M1037", en: "Filter Network Traffic", ar: "تصفية حركة الشبكة", howEn: "Firewall and proxy rules block the protocols and destinations the attacker needs.", howAr: "قواعد الجدار الناري والوكيل تحظر البروتوكولات والوجهات التي يحتاجها المهاجم." },
  M1038: { id: "M1038", en: "Execution Prevention", ar: "منع التنفيذ", howEn: "Application allow-listing blocks unapproved binaries and scripts from running.", howAr: "القوائم البيضاء للتطبيقات تمنع تشغيل البرامج والسكربتات غير المعتمدة." },
  M1040: { id: "M1040", en: "Behavior Prevention on Endpoint", ar: "منع السلوك على الأجهزة الطرفية (EDR)", howEn: "EDR rules detect and stop suspicious process behaviour in real time.", howAr: "قواعد EDR تكشف سلوك العمليات المشبوه وتوقفه لحظياً." },
  M1041: { id: "M1041", en: "Encrypt Sensitive Information", ar: "تشفير المعلومات الحساسة", howEn: "Encrypted data is useless to an attacker who steals or intercepts it.", howAr: "البيانات المشفرة عديمة الفائدة للمهاجم الذي يسرقها أو يعترضها." },
  M1042: { id: "M1042", en: "Disable or Remove Feature or Program", ar: "تعطيل أو إزالة الخصائص والبرامج", howEn: "Removing unneeded tools denies the attacker built-in capabilities.", howAr: "إزالة الأدوات غير الضرورية تحرم المهاجم من القدرات المدمجة." },
  M1043: { id: "M1043", en: "Credential Access Protection", ar: "حماية الوصول لبيانات الاعتماد", howEn: "Credential Guard / LSA protection keeps secrets out of reach of memory dumping.", howAr: "حماية LSA و Credential Guard تُبعد الأسرار عن أدوات تفريغ الذاكرة." },
  M1045: { id: "M1045", en: "Code Signing", ar: "توقيع الشيفرة", howEn: "Only trusted, signed code is permitted to run or load.", howAr: "لا يُسمح بتشغيل أو تحميل إلا الشيفرة الموقّعة والموثوقة." },
  M1047: { id: "M1047", en: "Audit", ar: "التدقيق", howEn: "Regular audits surface misconfigurations and abuse early.", howAr: "التدقيق الدوري يكشف الإعدادات الخاطئة وإساءة الاستخدام مبكراً." },
  M1048: { id: "M1048", en: "Application Isolation and Sandboxing", ar: "عزل التطبيقات (Sandbox)", howEn: "Exploited code stays trapped in a sandbox away from the system.", howAr: "الشيفرة المستغَلة تبقى محصورة داخل بيئة معزولة بعيداً عن النظام." },
  M1049: { id: "M1049", en: "Antivirus/Antimalware", ar: "مكافحة الفيروسات والبرمجيات الخبيثة", howEn: "Known malicious files are detected and quarantined on arrival.", howAr: "تُكتشف الملفات الخبيثة المعروفة وتُعزل فور وصولها." },
  M1050: { id: "M1050", en: "Exploit Protection", ar: "الحماية من الاستغلال", howEn: "Memory protections (ASLR, DEP, CFG) break common exploit chains.", howAr: "حمايات الذاكرة (ASLR, DEP, CFG) تكسر سلاسل الاستغلال الشائعة." },
  M1051: { id: "M1051", en: "Update Software", ar: "تحديث البرمجيات", howEn: "Patching closes the vulnerability the exploit targets.", howAr: "التحديث يغلق الثغرة التي يستهدفها الاستغلال." },
  M1053: { id: "M1053", en: "Data Backup", ar: "النسخ الاحتياطي", howEn: "Offline backups let you restore without paying or losing data.", howAr: "النسخ الاحتياطية غير المتصلة تتيح الاستعادة دون دفع فدية أو فقدان البيانات." },
  M1054: { id: "M1054", en: "Software Configuration", ar: "تهيئة البرمجيات", howEn: "Secure configuration (e.g. SPF/DKIM/DMARC) removes abusable defaults.", howAr: "التهيئة الآمنة (مثل SPF/DKIM/DMARC) تزيل الإعدادات الافتراضية القابلة للاستغلال." },
  M1056: { id: "M1056", en: "Pre-compromise", ar: "ما قبل الاختراق", howEn: "Minimising public exposure limits what attackers can learn or acquire.", howAr: "تقليل الانكشاف العام يحدّ مما يمكن للمهاجم معرفته أو اقتناؤه." },
  M1057: { id: "M1057", en: "Data Loss Prevention", ar: "منع تسرب البيانات (DLP)", howEn: "DLP inspects outbound data and blocks sensitive content leaving.", howAr: "DLP يفحص البيانات الصادرة ويمنع خروج المحتوى الحساس." },
};

const t = (id: string, en: string, ar: string, platforms: string, mitigations: string, severity: 1 | 2 | 3 = 2): Technique =>
  ({ id, en, ar, platforms: platforms.split(","), mitigations: mitigations.split(","), severity });

export const TACTICS: Tactic[] = [
  { id: "TA0043", emoji: "🔍", en: "Reconnaissance", ar: "الاستطلاع", techniques: [
    t("T1595", "Active Scanning", "المسح النشط", "PRE", "M1056", 1),
    t("T1592", "Gather Victim Host Information", "جمع معلومات أجهزة الضحية", "PRE", "M1056", 1),
    t("T1589", "Gather Victim Identity Information", "جمع معلومات هوية الضحية", "PRE", "M1056", 1),
    t("T1598", "Phishing for Information", "التصيد لجمع المعلومات", "PRE", "M1017,M1054", 2),
    t("T1593", "Search Open Websites/Domains", "البحث في المواقع المفتوحة", "PRE", "M1013", 1),
  ]},
  { id: "TA0042", emoji: "🛠️", en: "Resource Development", ar: "تطوير الموارد", techniques: [
    t("T1583", "Acquire Infrastructure", "الاستحواذ على بنية تحتية", "PRE", "M1056", 1),
    t("T1586", "Compromise Accounts", "اختراق الحسابات", "PRE", "M1056", 2),
    t("T1588", "Obtain Capabilities", "الحصول على قدرات", "PRE", "M1056", 1),
    t("T1608", "Stage Capabilities", "تجهيز القدرات", "PRE", "M1056", 1),
  ]},
  { id: "TA0001", emoji: "🎣", en: "Initial Access", ar: "الوصول الأولي", techniques: [
    t("T1566", "Phishing", "التصيد الاحتيالي", "Windows,macOS,Linux,SaaS", "M1049,M1017,M1021,M1054,M1031", 3),
    t("T1190", "Exploit Public-Facing Application", "استغلال تطبيق مكشوف للعامة", "Windows,Linux,Containers", "M1048,M1050,M1030,M1051,M1016", 3),
    t("T1133", "External Remote Services", "خدمات الوصول البعيد الخارجية", "Windows,Linux,Containers", "M1042,M1035,M1032,M1030", 3),
    t("T1078", "Valid Accounts", "الحسابات الصالحة", "Windows,Linux,Cloud,SaaS", "M1036,M1032,M1027,M1026,M1018", 3),
    t("T1195", "Supply Chain Compromise", "اختراق سلسلة الإمداد", "Windows,macOS,Linux", "M1051,M1016,M1013", 3),
    t("T1189", "Drive-by Compromise", "الاختراق بالتصفح", "Windows,macOS,Linux", "M1048,M1050,M1021,M1051", 2),
  ]},
  { id: "TA0002", emoji: "⚙️", en: "Execution", ar: "التنفيذ", techniques: [
    t("T1059", "Command and Scripting Interpreter", "مفسّر الأوامر والسكربتات", "Windows,macOS,Linux", "M1049,M1040,M1045,M1042,M1038,M1026", 3),
    t("T1204", "User Execution", "تنفيذ المستخدم", "Windows,macOS,Linux", "M1040,M1038,M1031,M1021,M1017", 2),
    t("T1053", "Scheduled Task/Job", "المهام المجدولة", "Windows,Linux,macOS", "M1047,M1028,M1026,M1018", 2),
    t("T1047", "Windows Management Instrumentation", "أداة إدارة ويندوز (WMI)", "Windows", "M1040,M1038,M1026", 2),
    t("T1203", "Exploitation for Client Execution", "الاستغلال لتنفيذ على العميل", "Windows,macOS,Linux", "M1048,M1050", 3),
  ]},
  { id: "TA0003", emoji: "📌", en: "Persistence", ar: "الاستمرارية", techniques: [
    t("T1547", "Boot or Logon Autostart Execution", "التشغيل التلقائي عند الإقلاع", "Windows,macOS,Linux", "M1024,M1022", 2),
    t("T1136", "Create Account", "إنشاء حساب", "Windows,Linux,Cloud", "M1032,M1030,M1026", 2),
    t("T1098", "Account Manipulation", "التلاعب بالحسابات", "Windows,Cloud,SaaS", "M1032,M1030,M1026,M1028", 2),
    t("T1505", "Server Software Component", "مكوّن برمجيات الخادم", "Windows,Linux", "M1047,M1042,M1026,M1045", 3),
    t("T1543", "Create or Modify System Process", "إنشاء أو تعديل عملية نظام", "Windows,macOS,Linux", "M1047,M1040,M1045,M1028,M1018", 2),
  ]},
  { id: "TA0004", emoji: "⬆️", en: "Privilege Escalation", ar: "تصعيد الصلاحيات", techniques: [
    t("T1068", "Exploitation for Privilege Escalation", "الاستغلال لتصعيد الصلاحيات", "Windows,macOS,Linux", "M1048,M1038,M1050,M1051", 3),
    t("T1548", "Abuse Elevation Control Mechanism", "إساءة آلية التحكم بالترقية", "Windows,macOS,Linux", "M1047,M1038,M1028,M1026,M1022", 2),
    t("T1134", "Access Token Manipulation", "التلاعب برموز الوصول", "Windows", "M1026,M1018", 2),
    t("T1055", "Process Injection", "حقن العمليات", "Windows,macOS,Linux", "M1040,M1026", 3),
  ]},
  { id: "TA0005", emoji: "🛡️", en: "Defense Evasion", ar: "التهرب من الدفاع", techniques: [
    t("T1562", "Impair Defenses", "إضعاف الدفاعات", "Windows,macOS,Linux,Cloud", "M1047,M1022,M1024,M1018", 3),
    t("T1070", "Indicator Removal", "إزالة المؤشرات", "Windows,macOS,Linux", "M1041,M1029,M1022", 2),
    t("T1027", "Obfuscated Files or Information", "تمويه الملفات والمعلومات", "Windows,macOS,Linux", "M1049,M1040", 2),
    t("T1218", "System Binary Proxy Execution", "التنفيذ عبر ملفات النظام", "Windows", "M1042,M1038,M1050,M1026", 2),
    t("T1036", "Masquerading", "التنكر", "Windows,macOS,Linux", "M1040,M1045,M1038,M1022", 2),
  ]},
  { id: "TA0006", emoji: "🔑", en: "Credential Access", ar: "الوصول لبيانات الاعتماد", techniques: [
    t("T1003", "OS Credential Dumping", "تفريغ بيانات اعتماد النظام", "Windows,Linux,macOS", "M1043,M1040,M1028,M1027,M1026", 3),
    t("T1110", "Brute Force", "التخمين", "Windows,Linux,Cloud,SaaS", "M1036,M1032,M1027", 2),
    t("T1555", "Credentials from Password Stores", "بيانات الاعتماد من مخازن كلمات المرور", "Windows,macOS,Linux", "M1027", 2),
    t("T1558", "Steal or Forge Kerberos Tickets", "سرقة أو تزوير تذاكر Kerberos", "Windows", "M1041,M1027,M1026", 3),
    t("T1056", "Input Capture", "التقاط الإدخال", "Windows,macOS,Linux", "M1040,M1032", 2),
  ]},
  { id: "TA0007", emoji: "🔎", en: "Discovery", ar: "الاستكشاف", techniques: [
    t("T1087", "Account Discovery", "اكتشاف الحسابات", "Windows,Linux,Cloud", "M1028", 1),
    t("T1046", "Network Service Discovery", "اكتشاف خدمات الشبكة", "Windows,Linux,Containers", "M1042,M1031,M1030", 1),
    t("T1082", "System Information Discovery", "اكتشاف معلومات النظام", "Windows,macOS,Linux", "M1028", 1),
    t("T1018", "Remote System Discovery", "اكتشاف الأنظمة البعيدة", "Windows,macOS,Linux", "M1030", 1),
  ]},
  { id: "TA0008", emoji: "🌐", en: "Lateral Movement", ar: "الحركة الجانبية", techniques: [
    t("T1021", "Remote Services", "الخدمات البعيدة", "Windows,macOS,Linux", "M1042,M1035,M1032,M1030,M1026", 3),
    t("T1570", "Lateral Tool Transfer", "نقل الأدوات جانبياً", "Windows,macOS,Linux", "M1037,M1031", 2),
    t("T1550", "Use Alternate Authentication Material", "استخدام مواد مصادقة بديلة", "Windows,Cloud,SaaS", "M1026,M1018,M1032", 3),
    t("T1210", "Exploitation of Remote Services", "استغلال الخدمات البعيدة", "Windows,Linux", "M1048,M1042,M1050,M1030,M1051,M1016", 3),
  ]},
  { id: "TA0009", emoji: "📦", en: "Collection", ar: "الجمع", techniques: [
    t("T1005", "Data from Local System", "بيانات من النظام المحلي", "Windows,macOS,Linux", "M1057", 2),
    t("T1114", "Email Collection", "جمع البريد الإلكتروني", "Windows,Office 365", "M1047,M1041,M1032", 2),
    t("T1560", "Archive Collected Data", "أرشفة البيانات المجمعة", "Windows,macOS,Linux", "M1047", 1),
    t("T1113", "Screen Capture", "التقاط الشاشة", "Windows,macOS,Linux", "M1040", 1),
  ]},
  { id: "TA0011", emoji: "📡", en: "Command and Control", ar: "القيادة والتحكم", techniques: [
    t("T1071", "Application Layer Protocol", "بروتوكول طبقة التطبيقات", "Windows,macOS,Linux", "M1037,M1031", 2),
    t("T1105", "Ingress Tool Transfer", "إدخال الأدوات", "Windows,macOS,Linux", "M1031", 2),
    t("T1572", "Protocol Tunneling", "أنفاق البروتوكولات", "Windows,macOS,Linux", "M1037,M1031", 2),
    t("T1219", "Remote Access Software", "برمجيات الوصول البعيد", "Windows,macOS,Linux", "M1042,M1038,M1037,M1031", 2),
  ]},
  { id: "TA0010", emoji: "📤", en: "Exfiltration", ar: "تسريب البيانات", techniques: [
    t("T1041", "Exfiltration Over C2 Channel", "التسريب عبر قناة التحكم", "Windows,macOS,Linux", "M1057,M1031", 3),
    t("T1567", "Exfiltration Over Web Service", "التسريب عبر خدمة ويب", "Windows,macOS,Linux", "M1057,M1021", 3),
    t("T1048", "Exfiltration Over Alternative Protocol", "التسريب عبر بروتوكول بديل", "Windows,macOS,Linux", "M1057,M1037,M1031,M1030", 2),
  ]},
  { id: "TA0040", emoji: "💥", en: "Impact", ar: "التأثير", techniques: [
    t("T1486", "Data Encrypted for Impact", "تشفير البيانات (فدية)", "Windows,macOS,Linux", "M1040,M1053", 3),
    t("T1490", "Inhibit System Recovery", "تعطيل استعادة النظام", "Windows,macOS,Linux", "M1053,M1028", 3),
    t("T1485", "Data Destruction", "إتلاف البيانات", "Windows,macOS,Linux", "M1053", 3),
    t("T1498", "Network Denial of Service", "حجب الخدمة الشبكي", "Windows,Linux,Cloud", "M1037", 2),
    t("T1489", "Service Stop", "إيقاف الخدمات", "Windows,macOS,Linux", "M1030,M1022,M1024,M1018", 2),
  ]},
];

export const ALL_TECHNIQUES = TACTICS.flatMap((tc) => tc.techniques.map((tq) => ({ ...tq, tactic: tc })));
export const findTechnique = (id: string) => ALL_TECHNIQUES.find((x) => x.id === id);
