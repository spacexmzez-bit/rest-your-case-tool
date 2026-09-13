const translations = {
  en: {
    // Top Bar & Navigation
    page_title: "Rest Your Case | Procedural Defense Simulator",
    app_brand: "Rest Your Case",
    btn_parse: "Parse State",
    btn_menu: "Menu",
    marquee_tip1: "⚖️ TIP: Click \"Parse State\" to sync the 3-line HUD or /log record into the board.",
    marquee_tip2: "⚖️ SUBPOENAS: 1 AP | FIELD CANVASSING: 2 AP | FORENSIC RE-TESTING: 3 AP",
    marquee_tip3: "⚖️ WARNING: Match tier logging to your actual LLM window (Free: Turn 12 | Paid: Turn 35).",
    
    // Tab 1: Overview
    overview_tag: "Tactical Companion Dashboard",
    overview_heading: "Rest Your Case",
    overview_desc: "The procedural criminal defense companion. Copy the master system directive to initialize your trial engine in any major LLM, and utilize this dashboard to log discovery, track judicial strikes, and parse game states in real time.",
    btn_view_directive: "1. View System Directive",
    btn_open_dashboard: "2. Open Trial Dashboard",

    // Tab 2: Prompt Setup
    setup_heading: "Master System Directive",
    setup_subheading: "Copy and paste this directive directly into your LLM chat session.",
    btn_copy_directive: "Copy Directive",
    prompt_loading: "Loading SYSTEM_PROMPT.md...",

    // Tab 3: Tracker Controls & Stats
    label_case_title: "Case Title & Client",
    placeholder_case_title: "State v. Unknown",
    label_phase: "Current Phase",
    phase_1: "Phase 1: Intake",
    phase_2: "Phase 2: Pre-Trial (Diaz)",
    phase_2_5: "Phase 2.5: Motions",
    phase_3: "Phase 3: Trial",
    phase_3_5: "Phase 3.5: Case-in-Chief",
    phase_4: "Phase 4: Verdict",
    stat_turn: "Turn",
    stat_ap: "AP",
    stat_strikes: "Strikes",
    stat_undos: "Undos",
    btn_reset: "Reset",

    // Roster Banner
    roster_judge: "Judge:",
    roster_pros: "Prosecution:",
    roster_inv: "Lead Investigator:",
    roster_client: "Client:",
    unassigned: "Unassigned",
    pending: "Pending",

    // Workspace: Evidence Docket
    docket_heading: "Evidence Docket",
    btn_add_exhibit: "+ Add Exhibit",
    empty_docket: "No evidence logged. Paste HUD to auto-populate.",
    btn_admit: "Admit",
    btn_mark: "Mark",
    btn_suppress: "Suppress",
    btn_del: "Del",

    // Workspace: Court Record & Notes
    facts_heading: "Court Record & Admissions",
    placeholder_add_fact: "Record admission, timestamp discrepancy, or fact...",
    btn_add_fact: "Add",
    empty_facts: "No facts logged.",
    notes_heading: "Work Notes",
    placeholder_notes: "Draft cross theories, impeachment points, or suppression grounds here...",

    // Tab 4: How to Play
    field_manual_heading: "Field Operations Manual",
    field_manual_subheading: "Procedural directives and resource expenditure rules.",
    ap_costs_heading: "Phase 2 AP Cost Ledger",
    ap_subpoena: "Subpoena Records (1 AP): Cell tower dumps, surveillance video, dispatch audio, medical logs, banking records.",
    ap_strategic: "Strategic Action (1 AP): Consult Senior Partner; compile an alibi timeline matrix.",
    ap_field: "Field Investigation (2 AP): Canvass crime scenes, interview witnesses, or re-interview uncooperative parties.",
    ap_forensic: "Forensic Re-examination (3 AP): Independent ballistics, DNA panels, toxicology, or autopsy margin reviews.",
    sync_heading: "Automated Synchronization",
    sync_desc1: "This web tool parses engine state directly. At any turn, copy the 3-line persistent HUD block or the complete /log dossier output from the chat model.",
    sync_desc2: "Click ⚡ Parse State on the top menu and paste the text. The engine updates turns, AP, strikes, undos, and evidence statuses immediately.",

    // Tab 5: Legal Library
    legal_library_heading: "Legal Library & Objections",
    legal_library_subheading: "Evidentiary grounds and Fourth Amendment suppression doctrine.",
    rules_heading: "Trial Rules of Evidence",
    fre_802_title: "FRE 802: Hearsay",
    fre_802_desc: "An out-of-court statement offered to prove the truth of the matter asserted.",
    fre_611_title: "FRE 611(c): Leading",
    fre_611_desc: "Suggestive questioning on direct examination. Permitted on cross-examination.",
    fre_602_title: "FRE 602: Speculation",
    fre_602_desc: "Witness testifying beyond their personal, sensory observations.",
    fourth_amend_title: "Fourth Amendment Suppression",
    fourth_amend_desc: "Warrant lacking probable cause, Franks violations, or broken custody chains.",

    // Modals
    sync_modal_title: "⚡ Parse Engine State",
    sync_modal_desc: "Paste either the persistent 3-line HUD or the full /log dossier block:",
    btn_cancel: "Cancel",
    btn_apply_state: "Apply State",
    exhibit_modal_title: "Log Discovery Exhibit",
    placeholder_ex_tag: "Ex. 1",
    placeholder_ex_title: "Title (e.g., Forensic Autopsy Report)",
    placeholder_ex_details: "Forensic findings, custody notes, or timestamp points...",
    btn_save: "Save",
    wipe_modal_title: "Wipe Tracker Data?",
    wipe_modal_desc: "This resets your current trial record, AP, strikes, and evidence entries. Cannot be undone.",
    btn_purge_data: "Purge Data",

    // Drawer Navigation
    nav_overview: "Overview",
    nav_setup: "1. Setup & Directive",
    nav_tracker: "2. Trial Tracker",
    nav_howtoplay: "How to Play",
    nav_legal: "Legal Library",
    footer_text: "Rest Your Case © 2026. Local tactical sync engine active."
  },
  ar: {
    // Top Bar & Navigation
    page_title: "Rest Your Case | محاكاة الدفاع الجنائي",
    app_brand: "Rest Your Case",
    btn_parse: "تحليل الحالة",
    btn_menu: "القائمة",
    marquee_tip1: "⚖️ تلميح: انقر على \"تحليل الحالة\" لمزامنة شريط HUD المكون من 3 أسطر أو سجل /log في اللوحة.",
    marquee_tip2: "⚖️ استدعاء السجلات: 1 AP | التحقيق الميداني: 2 AP | الفحص الجنائي: 3 AP",
    marquee_tip3: "⚖️ تنبيه: طابق فواصل التسجيل مع باقة حسابك الفعلية (المجاني: الجولة 12 | المدفوع: الجولة 35).",
    
    // Tab 1: Overview
    overview_tag: "لوحة التحكم التكتيكية المساعدة",
    overview_heading: "Rest Your Case",
    overview_desc: "المساعد الإجرائي للدفاع الجنائي. انسخ التوجيه الرئيسي لتشغيل محرك المحاكمة في أي نموذج ذكاء اصطناعي، واستخدم هذه اللوحة لأرشفة الأدلة، ومتابعة الإنذارات القضائية، وتحليل حالة الجلسات لحظياً.",
    btn_view_directive: "1. عرض التوجيه الرئيسي",
    btn_open_dashboard: "2. فتح لوحة المحاكمة",

    // Tab 2: Prompt Setup
    setup_heading: "التوجيه الرئيسي للنظام",
    setup_subheading: "انسخ هذا التوجيه والصقه مباشرة في نافذة المحادثة مع نموذج الذكاء الاصطناعي.",
    btn_copy_directive: "نسخ التوجيه",
    prompt_loading: "جارٍ تحميل ملف SYSTEM_PROMPT.md...",

    // Tab 3: Tracker Controls & Stats
    label_case_title: "اسم القضية والمتهم",
    placeholder_case_title: "الولاية ضد مجهول",
    label_phase: "المرحلة الحالية",
    phase_1: "المرحلة 1: استجواب الموكل",
    phase_2: "المرحلة 2: التحقيق الأولي (دياز)",
    phase_2_5: "المرحلة 2.5: الدفوع الشكلية",
    phase_3: "المرحلة 3: المحاكمة",
    phase_3_5: "المرحلة 3.5: مرافعة الدفاع ومناقشة الأدلة",
    phase_4: "المرحلة 4: الحُكم النهائي",
    stat_turn: "الجولة",
    stat_ap: "نقاط العمل (AP)",
    stat_strikes: "الإنذارات",
    stat_undos: "التراجعات",
    btn_reset: "إعادة ضبط",

    // Roster Banner
    roster_judge: "القاضي:",
    roster_pros: "المدعي العام:",
    roster_inv: "المحقق الرئيسي:",
    roster_client: "الموكل:",
    unassigned: "غير محدد",
    pending: "قيد الانتظار",

    // Workspace: Evidence Docket
    docket_heading: "سجل الأدلة والمستندات",
    btn_add_exhibit: "+ إضافة دليل",
    empty_docket: "لا توجد أدلة مسجلة. الصق كود HUD للتعبئة التلقائية.",
    btn_admit: "مقبول",
    btn_mark: "مؤشر",
    btn_suppress: "مستبعد",
    btn_del: "حذف",

    // Workspace: Court Record & Notes
    facts_heading: "محضر الجلسة والإقرارات",
    placeholder_add_fact: "سجل اعترافاً، أو تناقضاً زمنياً، أو واقعة مثبتة...",
    btn_add_fact: "إضافة",
    empty_facts: "لا توجد وقائع مسجلة.",
    notes_heading: "ملاحظات المحامي",
    placeholder_notes: "دوّن هنا استراتيجيات مناقشة الشهود، أو نقاط التناقض، أو أسباب استبعاد الأدلة...",

    // Tab 4: How to Play
    field_manual_heading: "دليل العمليات الميدانية والإجرائية",
    field_manual_subheading: "التوجيهات الإجرائية وقواعد استهلاك الموارد والنقاط.",
    ap_costs_heading: "جدول تكاليف نقاط العمل (AP) في المرحلة 2",
    ap_subpoena: "استدعاء السجلات (1 AP): بيانات أبراج الاتصال، تسجيلات المراقبة، التسجيلات الصوتية، السجلات الطبية أو المصرفية.",
    ap_strategic: "إجراء تكتيكي (1 AP): استشارة الشريك الرئيسي، أو بناء مصفوفة الجدول الزمني لتفنيد الادعاء.",
    ap_field: "التحقيق الميداني (2 AP): معاينة مسرح الجريمة، أو استجواب شهود جدد، أو إعادة مقابلة أطراف رافضة للتعاون.",
    ap_forensic: "إعادة الفحص الجنائي (3 AP): تكليف خبراء مستقلين لتحليل المقذوفات، أو عينات DNA، أو السموم، أو هوامش تقرير التشريح.",
    sync_heading: "المزامنة التلقائية مع المحرك",
    sync_desc1: "تتيح هذه اللوحة تحليل مخرجات المحاكمة مباشرة. في أي جولة، انسخ كود HUD المكون من 3 أسطر أو سجل الملف الكامل /log من المحادثة.",
    sync_desc2: "انقر على ⚡ تحليل الحالة في القائمة العلوية والصق النص لتحديث الجولات، والنقاط، والإنذارات، وحالة الأدلة على الفور.",

    // Tab 5: Legal Library
    legal_library_heading: "المكتبة القانونية والدفوع الإجرائية",
    legal_library_subheading: "القواعد الإثباتية وضوابط الاستبعاد بموجب التعديل الدستوري الرابع.",
    rules_heading: "قواعد الإثبات في المحاكمة",
    fre_802_title: "القاعدة 802: الشهادة السماعية [Hearsay]",
    fre_802_desc: "شهادة تتناول أقوالاً أُدلي بها خارج قاعة المحكمة وتُقدَّم كدليل لإثبات صحة مضمونها.",
    fre_611_title: "القاعدة 611(c): الأسئلة الإيحائية [Leading Questions]",
    fre_611_desc: "توجيه أسئلة تتضمن الإجابة عليها للشهود التابعين للادعاء أثناء الفحص المباشر (مسموح بها فقط في المناقشة المقابلة للدفاع).",
    fre_602_title: "القاعدة 602: التخمين والاستنتاج [Speculation]",
    fre_602_desc: "إدلاء الشاهد بآراء أو تكهنات خارج نطاق إدراكه الحسي والمباشر للواقعة.",
    fourth_amend_title: "الدفع باستبعاد الدليل [Motion to Suppress]",
    fourth_amend_desc: "استبعاد الدليل لغياب السبب المعقول في إذن التفتيش، أو تزوير الإفادات، أو وجود كسر في سلسلة حيازة الدليل.",

    // Modals
    sync_modal_title: "⚡ تحليل وتحديث حالة المحرك",
    sync_modal_desc: "الصق كود HUD المكون من 3 أسطر أو سجل الملف الكامل /log هنا:",
    btn_cancel: "إلغاء",
    btn_apply_state: "تطبيق الحالة",
    exhibit_modal_title: "تسجيل دليل مستخرج",
    placeholder_ex_tag: "دليل رقم 1",
    placeholder_ex_title: "عنوان الدليل (مثال: تقرير التشريح الجنائي)",
    placeholder_ex_details: "النتائج الجنائية، تفاصيل سلسلة الحيازة، أو نقاط التضارب الزمني...",
    btn_save: "حفظ الدليل",
    wipe_modal_title: "مسح بيانات اللوحة بالكامل؟",
    wipe_modal_desc: "سيؤدي هذا الإجراء إلى تصفير محضر الجلسة، ونقاط العمل، والإنذارات، وقائمة الأدلة المسجلة. لا يمكن التراجع عن هذا الإجراء.",
    btn_purge_data: "تأكيد مسح البيانات",

    // Drawer Navigation
    nav_overview: "نظرة عامة",
    nav_setup: "1. التوجيه والإعداد",
    nav_tracker: "2. لوحة المحاكمة",
    nav_howtoplay: "كيف تلعب؟",
    nav_legal: "المكتبة القانونية",
    footer_text: "Rest Your Case © 2026. محرك المزامنة التكتيكية المحلي نشط."
  }
};
