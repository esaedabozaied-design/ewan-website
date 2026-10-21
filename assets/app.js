/* ==========================================================================
   إيوان للمطابخ والخزائن — المحرك التفاعلي المعماري (Ewan Interactive Engine v4.0)
   يشمل: أنيميشن الستارة المعمارية (Mask Reveal)، التوازي البصري (Parallax)،
   تزامن استوديو خامات الـ PVC، عدسة المعاينة التفاعلية، خطوات العمل، مغير اللون،
   مصمم المطبخ، حاسبة المقارنة، الأسئلة الشائعة، المعرض الشامل، ونظام الحجز.
   ========================================================================== */

(function () {
  'use strict';

  const WA_CUSTOMERS = 'https://wa.me/966542178498';
  const WA_PROJECTS = 'https://wa.me/966504618348';

  // --- 1. بيانات خطوات العمل (كيف نشتغل) بلهجة سعودية احترافية ---
  const STEPS_DATA = [
    {
      title: 'نسمع منك',
      body: 'شاركنا فكرتك: صورة تصميم أعجبك، أو مخطط، أو مقاسات أولية، وطريقة استخدامك اليومية للمكان.',
      you: 'صورة أو مخطط أو مقاسات أولية',
      we: 'نفهم احتياجك ونقترح الحلول والخيارات الأنسب'
    },
    {
      title: 'نرفع المقاسات',
      body: 'نرفع المقاسات الدقيقة في موقعك؛ لأن التفصيل المتقن يبدأ من قياس هندسي مضبوط.',
      you: 'تحديد الموعد المناسب لرفع المقاسات',
      we: 'رفع مقاسات دقيق للمساحة ونقاط الكهرباء والسباكة'
    },
    {
      title: 'نصمّم 3D',
      body: 'نجهّز لك تصميمًا ثلاثي الأبعاد تشوف فيه مطبخك أو خزائنك بوضوح قبل التنفيذ، ونعدّل عليه معك حتى يرضيك.',
      you: 'ملاحظاتك واختياراتك على التصميم',
      we: 'تصميم 3D واقعي وتعديلات مرنة معك'
    },
    {
      title: 'نوضّح العرض',
      body: 'نقدّم لك عرض سعر مفصّل بندًا بندًا: خامة الهيكل والواجهات، السماكات، الإكسسوارات، ومدة الضمان.',
      you: 'مراجعة العرض واعتماد المواصفات',
      we: 'عرض رسمي مكتوب وواضح بدون أي بنود مبهمة'
    },
    {
      title: 'نصنّع آليًا',
      body: 'يتم التصنيع في مصنعنا بخطوط إنتاج آلية متكاملة، مع فحص كل قطعة وتغليفها بعناية قبل شحنها لموقعك.',
      you: 'حياك الله لزيارة المصنع بموعد ومتابعة مشروعك',
      we: 'تقطيع آلي وتخريم وكبس حواف وفحص جودة شامل'
    },
    {
      title: 'نوصّل ونركّب',
      body: 'فريقنا المختص يوصّل ويركّب ويضبط كافة التفاصيل في موقعك بجميع مناطق المملكة، وتستلم ضمانك مكتوبًا في العقد.',
      you: 'استلام المشروع ومراجعة التشغيل النهائي',
      we: 'توصيل آمن وتركيب متقن وضمان مكتوب'
    }
  ];

  // --- 2. بيانات تشطيبات المطبخ التفاعلية ---
  const FINISHES_DATA = [
    { name: 'بلوط فاتح', hex: '#c9a27a', src: 'assets/web/ai-c1-oak.jpg', desc: 'تشطيب بلوط طبيعي دافئ يمنح المساحة إشراقة واتساعًا' },
    { name: 'جوز فاخر', hex: '#5a3a2a', src: 'assets/web/ai-c1-walnut.jpg', desc: 'خشب جوز غني وفخم يبرز جمال التفاصيل والإضاءة المخفية' },
    { name: 'رمادي دافئ', hex: '#a39a90', src: 'assets/web/ai-c1-grey.jpg', desc: 'تشطيب مطفي عصري وهادئ يناسب التصاميم الحديثة' },
    { name: 'أبيض عاجي', hex: '#ede6da', src: 'assets/web/ai-c1-ivory.jpg', desc: 'لون عاجي صافٍ يضاعف الإحساس برحابة المطبخ' },
    { name: 'بيج رملي', hex: '#cdbfa9', src: 'assets/web/ai-c1-beige.jpg', desc: 'درجة رملية ناعمة متناسقة مع الأسطح الحجرية والإضاءة الدافئة' },
    { name: 'فحمي مطفي', hex: '#3b3531', src: 'assets/web/ai-c1-charcoal.jpg', desc: 'حضور عصري فخم يتكامل مع تفاصيل البلوط والكوارتز' }
  ];

  // --- 3. بيانات معرض الأعمال الشامل (الأعمال الـ 5 فئات) ---
  const GALLERY_ITEMS = [
    // المطابخ
    {
      id: 'k-ai-1',
      cat: 'kitchens',
      catName: 'المطابخ',
      title: 'مطبخ حرف U بجزيرة وسطية بتشطيب الجوز',
      desc: 'واجهات جوز ملساء مع جزيرة بحافة حجرية ممتدة ومقابض برونزية غاطسة.',
      src: 'assets/web/ai-k1-u-island-walnut.jpg',
      real: false
    },
    {
      id: 'k-ai-2',
      cat: 'kitchens',
      catName: 'المطابخ',
      title: 'مطبخ مفتوح على صالة الطعام (عاجي مع بلوط)',
      desc: 'انسيابية بين المطبخ وصالة الطعام مع أرفف مفتوحة من البلوط وشبه جزيرة عملية.',
      src: 'assets/web/ai-k2-open-dining-ivory.jpg',
      real: false,
      featured: true,
      wide: true
    },
    {
      id: 'k-ai-5',
      cat: 'kitchens',
      catName: 'المطابخ',
      title: 'مطبخ فحمي مطفي بإضاءة دافئة',
      desc: 'تباين أنيق بين الواجهات الفحمية وتجويف البلوط المضاء بـ LED دافئ 2700K.',
      src: 'assets/web/ai-k5-charcoal-dramatic.jpg',
      real: false,
      featured: true
    },
    {
      id: 'k-ai-6',
      cat: 'kitchens',
      catName: 'المطابخ',
      title: 'مطبخ بلوط فاتح مع ركن إفطار مدمج',
      desc: 'تصميم عائلي دافئ يدمج جلسة إفطار مريحة بجانب النافذة بنفس تشطيب الخزائن.',
      src: 'assets/web/ai-k6-oak-breakfast-nook.jpg',
      real: false
    },
    {
      id: 'k-ai-4',
      cat: 'kitchens',
      catName: 'المطابخ',
      title: 'مطبخ حرف L بخزائن مرتفعة وأعمدة تخزين (بيج)',
      desc: 'جدار كامل من وحدات التخزين المرتفعة للأفران والتموين مع خزائن سفلية من البلوط.',
      src: 'assets/web/ai-k4-l-tall-units-beige.jpg',
      real: false
    },
    {
      id: 'k-ai-3',
      cat: 'kitchens',
      catName: 'المطابخ',
      title: 'مطبخ مدمج بتوزيع ذكي (رمادي دافئ)',
      desc: 'استغلال أمثل للمساحات مع عمود تموين طولي وسطح عمل متصل.',
      src: 'assets/web/ai-k3-small-warm-grey.jpg',
      real: false
    },
    {
      id: 'k-real-3',
      cat: 'kitchens',
      catName: 'المطابخ',
      title: 'مطبخ رمادي دافئ مع خشب وإضاءة مخفية',
      desc: 'تصميم عصري بواجهات ملساء وتوزيع مدروس للأجهزة المدمجة ومناطق التحضير.',
      src: 'assets/kitchen-3.jpg',
      real: true
    },
    {
      id: 'k-real-2',
      cat: 'kitchens',
      catName: 'المطابخ',
      title: 'مطبخ بواجهات خشبية وإضاءة دافئة',
      desc: 'توزيع عملي يجمع بين دفء الخشب وسطح العمل الحجري مع إضاءة مدمجة تبرز التفاصيل.',
      src: 'assets/kitchen-4.jpg',
      real: true
    },
    {
      id: 'k-real-4',
      cat: 'kitchens',
      catName: 'المطابخ',
      title: 'مطبخ بيج مع تفاصيل الجوز',
      desc: 'استثمار كامل لارتفاع الجدار مع خزائن علوية ممتدة ووحدات تخزين عميقة.',
      src: 'assets/kitchen-2.jpg',
      real: true
    },
    {
      id: 'k-real-1',
      cat: 'kitchens',
      catName: 'المطابخ',
      title: 'مطبخ أبيض عاجي مع جزيرة وتفاصيل خشب فاتح',
      desc: 'تكامل وحدات التخزين السفلية والعلوية مع جزيرة وسطية وإضاءة مخفية تحت الخزائن.',
      src: 'assets/kitchen-1.jpg',
      real: true
    },

    // الخزائن
    {
      id: 'c-ai-2',
      cat: 'wardrobes',
      catName: 'الخزائن',
      title: 'خزانة مفصلية بواجهات جوز مخددة (Fluted)',
      desc: 'أبواب بتفاصيل طولية مخددة بالراوتر مع مقابض برونزية وركن أرفف جانبي مضاء.',
      src: 'assets/web/ai-c2-fluted-walnut.jpg',
      real: false,
      featured: true,
      arch: true
    },
    {
      id: 'c-ai-0',
      cat: 'wardrobes',
      catName: 'الخزائن',
      title: 'خزانة ملابس مدمجة بواجهات عاجية وأرفف مضاءة',
      desc: 'خزانة ممتدة للسقف تجمع الأبواب المغلقة مع عمود عرض مفتوح بإضاءة مخفية.',
      src: 'assets/web/ai-h1-wardrobe.jpg',
      real: false
    },
    {
      id: 'c-ai-1',
      cat: 'wardrobes',
      catName: 'الخزائن',
      title: 'خزانة أبواب سحّاب بواجهات عاجية وسكة برونزية',
      desc: 'حل عملي للغرف والممرات يوفر المساحة مع تقسيم داخلي من البلوط للتعليق والأرفف.',
      src: 'assets/web/ai-c1-sliding-ivory.jpg',
      real: false
    },
    {
      id: 'c-ai-3',
      cat: 'wardrobes',
      catName: 'الخزائن',
      title: 'وحدة تخزين غرفة أطفال من البلوط الفاتح',
      desc: 'وحدات سفلية بمتناول الطفل مع زوايا ناعمة وخزائن علوية للتخزين الموسمي.',
      src: 'assets/web/ai-c3-kids-oak.jpg',
      real: false
    },
    {
      id: 'c-ai-4',
      cat: 'wardrobes',
      catName: 'الخزائن',
      title: 'خزانة أحذية ومدخل بواجهات مهوّاة',
      desc: 'تصميم مدمج للمداخل والممرات مع أرفف مائلة ووحدة كونسول جانبية.',
      src: 'assets/web/ai-c4-shoe-cabinet.jpg',
      real: false
    },
    {
      id: 'c-ai-5',
      cat: 'wardrobes',
      catName: 'الخزائن',
      title: 'خزانة تخزين متعددة الاستخدامات (غسيل وتموين)',
      desc: 'تنظيم متكامل لأدوات المنزل والغسيل مع أرفف قابلة للتعديل وأدراج سحب.',
      src: 'assets/web/ai-c5-utility-storage.jpg',
      real: false
    },

    // غرف النوم
    {
      id: 'b-ai-1',
      cat: 'bedrooms',
      catName: 'غرف النوم',
      title: 'غرفة نوم رئيسية بجدار مدمج كامل من البلوط والعاجي',
      desc: 'تصميم فندقي هادئ مع إضاءة مخفية ووحدات تخزين جانبية متكاملة.',
      src: 'assets/web/ai-b1-master-wall.jpg',
      real: false,
      featured: true
    },
    {
      id: 'b-ai-0',
      cat: 'bedrooms',
      catName: 'غرف النوم',
      title: 'جدار غرفة نوم رئيسية بالجوز المخدد وخزائن جانبية',
      desc: 'تكوين متناسق يجمع خلفية السرير مع الكومودينو العائم وخزائن الملابس الجانبية.',
      src: 'assets/web/ai-h2-bedroom.jpg',
      real: false
    },
    {
      id: 'b-ai-2',
      cat: 'bedrooms',
      catName: 'غرف النوم',
      title: 'غرفة أطفال بسريرين مدمجين وأدراج تخزين',
      desc: 'استثمار ذكي للمساحة يجمع النوم والدراسة والتخزين في تكوين واحد آمن ومرتب.',
      src: 'assets/web/ai-b2-kids-bunk.jpg',
      real: false
    },
    {
      id: 'b-ai-3',
      cat: 'bedrooms',
      catName: 'غرف النوم',
      title: 'غرفة نوم شبابية مع مكتب دراسة وخزانة',
      desc: 'تشطيب رمادي دافئ مع الجوز يدمج مكتب عمل طويل وأرفف كتب مع السرير والخزانة.',
      src: 'assets/web/ai-b3-teen-desk.jpg',
      real: false
    },
    {
      id: 'b-ai-4',
      cat: 'bedrooms',
      catName: 'غرف النوم',
      title: 'غرفة ضيوف مدمجة بخزائن جانبية وجسر علوي',
      desc: 'حل عملي للغرف المتوسطة يوفر تخزينًا واسعًا دون التضحية براحة الحركة.',
      src: 'assets/web/ai-b4-guest-compact.jpg',
      real: false
    },
    {
      id: 'b-ai-5',
      cat: 'bedrooms',
      catName: 'غرف النوم',
      title: 'غرفة رئيسية مع ممر دريسنج مخفي خلف السرير',
      desc: 'فصل أنيق بين منطقة النوم ومنطقة الملابس عبر جدار خشبي بتفاصيل طولية.',
      src: 'assets/web/ai-b5-master-dressing.jpg',
      real: false
    },

    // الديكورات وأعمال CNC
    {
      id: 'n-ai-4',
      cat: 'cnc',
      catName: 'الديكورات وCNC',
      title: 'جدار تلفزيون بتخريم هندسي بارز (CNC Relief)',
      desc: 'تكسيات جدارية من الجوز بنقش هندسي هادئ مع رف عائم من البلوط وإضاءة مخفية.',
      src: 'assets/web/ai-n4-tv-wall-cnc.jpg',
      real: false,
      featured: true,
      arch: true
    },
    {
      id: 'n-ai-3',
      cat: 'cnc',
      catName: 'الديكورات وCNC',
      title: 'تكوين مدخل بقوس إيوان وتجاويف CNC',
      desc: 'واجهة مدخل منحوتة بنمط الأقواس المتكررة مع كونسول سفلي من الجوز وإضاءة دافئة.',
      src: 'assets/web/ai-n3-entry-arch-panel.jpg',
      real: false
    },
    {
      id: 'n-ai-1',
      cat: 'cnc',
      catName: 'الديكورات وCNC',
      title: 'مشربية فاصلة بين الصالة والمجلس أو منطقة الطعام',
      desc: 'قاطع خشبي من الجوز مخرّم بنقش هندسي معاصر يسمح بمرور الضوء ويحفظ الخصوصية.',
      src: 'assets/web/ai-n1-mashrabiya-partition.jpg',
      real: false
    },
    {
      id: 'n-ai-2',
      cat: 'cnc',
      catName: 'الديكورات وCNC',
      title: 'إطار نافذة مستوحى من الرواشين التراثية',
      desc: 'معالجة معاصرة للروشان بخشب البلوط الداكن وتخريم CNC دقيق مع قوس علوي.',
      src: 'assets/web/ai-n2-roshan-window.jpg',
      real: false
    },
    {
      id: 'n-ai-5',
      cat: 'cnc',
      catName: 'الديكورات وCNC',
      title: 'قاطع زخرفي بقوس مخرّم بجانب الدرج',
      desc: 'شاشة خشبية من البلوط الفاتح تجمع القوس المعماري مع تفاصيل التشكيل الآلي.',
      src: 'assets/web/ai-n5-arch-screen.jpg',
      real: false
    },
    {
      id: 'n-real-1',
      cat: 'cnc',
      catName: 'الديكورات وCNC',
      title: 'لوحة شعار إيوان الخشبية المنحوتة بماكينة CNC',
      desc: 'نحت بارز ودقيق على الخشب الطبيعي يظهر إمكانيات راوتر CNC في تشكيل التفاصيل.',
      src: 'assets/factory-sign.jpg',
      real: true
    },

    // الدريسنج والمساحات الصغيرة (الفئة الخامسة المستقلة)
    {
      id: 'd-ai-1',
      cat: 'dressing',
      catName: 'الدريسنج والمساحات الصغيرة',
      title: 'غرفة ملابس (دريسنج) واسعة بجزيرة وسطية وأرفف مضاءة',
      desc: 'خزائن ممتدة للسقف على ثلاث جهات مع جزيرة إكسسوارات وسطية وإضاءة تحت كل رف.',
      src: 'assets/web/ai-d1-walkin-island.jpg',
      real: false,
      featured: true
    },
    {
      id: 'd-ai-2',
      cat: 'dressing',
      catName: 'الدريسنج والمساحات الصغيرة',
      title: 'دريسنج مدمج على شكل حرف L للمساحات الصغيرة',
      desc: 'استغلال كل سنتيمتر في غرفة 2×2 متر مع الجمع بين الأبواب المغلقة والتعليق المفتوح.',
      src: 'assets/web/ai-d2-compact-l-shaped.jpg',
      real: false
    },
    {
      id: 'd-ai-3',
      cat: 'dressing',
      catName: 'الدريسنج والمساحات الصغيرة',
      title: 'ركن دريسنج مدمج مع تسريحة وإضاءة مرآة',
      desc: 'تصميم يجمع خزائن الملابس الجانبية مع تسريحة مدمجة وأدراج منظمة للإكسسوارات.',
      src: 'assets/web/ai-d3-dressing-vanity.jpg',
      real: false
    },
    {
      id: 'd-ai-4',
      cat: 'dressing',
      catName: 'الدريسنج والمساحات الصغيرة',
      title: 'وحدة مدخل بمقعد وتخزين أحذية للممرات الضيقة',
      desc: 'حل عملي للمداخل يجمع جلسة مريحة مع خزائن علوية مهوّاة وعلاقات.',
      src: 'assets/web/ai-d4-entry-bench.jpg',
      real: false
    },
    {
      id: 'd-ai-5',
      cat: 'dressing',
      catName: 'الدريسنج والمساحات الصغيرة',
      title: 'خزانة ركنية طويلة لاستغلال الزوايا الضيقة',
      desc: 'تفصيل بالمليمتر لتحويل الأركان الضيقة غير المستغلة إلى مساحة تخزين أنيقة.',
      src: 'assets/web/ai-d5-narrow-niche.jpg',
      real: false
    }
  ];

  // --- 4. بيانات عوامل السعر وقائمة المقارنة ---
  const FACTORS_DATA = [
    {
      title: 'الهيكل الداخلي',
      body: 'خامة الهيكل وسماكته هي أساس عمر المطبخ. في إيوان نعتمد هيكلًا داخليًا من PVC Foam Board المقاوم للماء في جميع باقاتنا.'
    },
    {
      title: 'الإكسسوارات والمفصلات',
      body: 'المفصلات والسكك وأنظمة الإغلاق الناعم؛ الفرق بين نوع وآخر يظهر مع الاستخدام اليومي، لذلك نوضّحها بالاسم في العرض.'
    },
    {
      title: 'التقسيمات الداخلية',
      body: 'عدد الوحدات والأدراج والسلال الدوّارة في كل متر. كل درج ووحدة سحب إضافية تعني إكسسوارات وتجهيزًا أكثر.'
    },
    {
      title: 'تشطيب الواجهات',
      body: 'واجهات خشبية، أو مطفية، أو لامعة، أو مع زجاج بإطارات ألمنيوم؛ نوع الواجهة وتشطيبها يحدد الطابع والتكلفة.'
    },
    {
      title: 'سطح العمل (الكوارتز والرخام الصناعي)',
      body: 'نوع السطح وسماكته وطريقة تشطيب حوافه، خصوصًا حول المغسلة ومنطقة الطبخ.'
    },
    {
      title: 'التجهيزات الإضافية',
      body: 'الإضاءة المخفية المدمجة، أعمدة التموين الطويلة، وتأسيس وحدات الأجهزة المدمجة.'
    }
  ];

  const CHECKS_DATA = [
    'خامة الهيكل الداخلي وسماكته، وليس الواجهة فقط',
    'نوع المفصلات والسكك ومصدرها بالاسم',
    'عرض سعر مفصّل بندًا بندًا بدون عموميات',
    'الضمان ومدته ونطاقه مكتوبة في العقد',
    'جدول التنفيذ والدفعات موثّق في العقد'
  ];

  // --- 5. بيانات الأسئلة الشائعة (نخدم جميع مناطق المملكة) ---
  const FAQ_CATS = ['عام', 'المطابخ', 'الخزائن وغرف النوم', 'الديكورات والمشاريع'];
  const FAQ_DATA = [
    [
      { q: 'هل تفصّلون على نفس صورة تصميم أعجبني؟', a: 'أكيد. أرسل لنا صورة أي تصميم أعجبك، ونفصّله لك بدقة على مقاس مساحتك، مع عرض واضح بالخامات والتفاصيل.' },
      { q: 'أقدر أزور المصنع وأشوف الخامات بنفسي؟', a: 'حياك الله، نستقبل الزيارات بموعد مسبق من السبت إلى الخميس (9 ص – 6 م). تطّلع بنفسك على الهيكل والواجهات وخطوط الإنتاج قبل ما تعتمد.' },
      { q: 'هل تخدمون جميع مناطق المملكة؟', a: 'نعم، نخدم كافة مناطق ومدن المملكة العربية السعودية، ويتم التصنيع والتجهيز الكامل في مصنعنا الرئيسي بعسفان بأعلى معايير الدقة والتغليف الآمن حتى التركيب في موقعك.' },
      { q: 'هل يوجد ضمان على الأعمال؟', a: 'نعم، نقدّم ضمانًا رسميًا مكتوبًا في العقد، يصل إلى 10 سنوات على الهيكل وحتى 25 سنة على الخامات المختارة وفق الشروط الموضحة في العرض.' },
      { q: 'كيف تكون طريقة الدفع؟', a: 'تكون الدفعات ميسّرة وموزعة حسب مراحل إنجاز المشروع، وموثقة بالكامل في العقد الرسمي.' }
    ],
    [
      { q: 'وش خامة الهيكل الداخلي للمطابخ؟', a: 'الهيكل الداخلي من ألواح PVC Foam Board في جميع باقاتنا؛ وهي خامة عالية المقاومة للماء والرطوبة وتمنح مطبخك عمرًا أطول خصوصًا حول منطقة المغسلة.' },
      { q: 'وش نوع الإكسسوارات والمفصلات المستخدمة؟', a: 'نعتمد مفصلات بإغلاق ناعم (Soft-Close)، وأدراجًا بسكك سحب مخفية، وحواف مكبوسة آليًا، ونوضّح النوع والمواصفات بالاسم في عرض السعر.' },
      { q: 'متى أشوف تصميم مطبخي قبل التنفيذ؟', a: 'بعد رفع المقاسات نجهّز لك تصميمًا ثلاثي الأبعاد (3D) مع عرض سعر مفصّل، وتراجعه وتعدّل عليه معنا قبل البدء بالتصنيع.' },
      { q: 'ليش ما تنشرون سعرًا ثابتًا للمتر؟', a: 'لأن التكلفة الحقيقية تعتمد على التقسيمات الداخلية ونوع الواجهات والإكسسوارات وعدد الأدراج؛ لذلك نفضّل نعطيك عرضًا صادقًا ومفصّلًا بندًا بندًا على مقاس مساحتك.' }
    ],
    [
      { q: 'الأفضل لخزائن الملابس: أبواب سحّاب ولا مفصلية؟', a: 'الأبواب السحّاب مثالية للغرف المدمجة والممرات لأنها توفر المساحة، بينما الأبواب المفصلية تكشف لك الخزانة بالكامل عند فتحها إذا كانت المساحة أمامها واسعة.' },
      { q: 'هل توفرون إضاءة داخلية للخزائن والدريسنج؟', a: 'نعم، نوفر إضاءة LED مخفية دافئة داخل الخزائن وتحت الأرفف كخيار يُدمج أثناء التصميم والتصنيع.' },
      { q: 'أقدر أبدأ بالخزانة وأكمّل باقي الغرفة لاحقًا؟', a: 'نعم بكل سهولة؛ نحفظ كود الخامة والتشطيب الخاص بمشروعك حتى تتطابق أي قطع تضيفها مستقبلًا.' },
      { q: 'هل تنفذون المطبخ والخزائن وغرف النوم بنفس الهوية؟', a: 'نعم، ننفّذ لك المطبخ والخزائن وغرف النوم والديكورات بتشطيب متناسق في كامل المنزل.' }
    ],
    [
      { q: 'وش تشمل أعمال الديكورات وCNC؟', a: 'تشمل تكسيات الجدران ووحدات التلفزيون، المكاتب والمكتبات، خزائن المداخل، والمشربيات والرواشين والقواطع الزخرفية المنفذة بماكينات CNC.' },
      { q: 'هل تتعاملون مع المهندسين والمصممين والمطورين العقاريين؟', a: 'نعم، ننفّذ مخططات المصممين والمكاتب الهندسية وشركات التطوير العقاري في كافة مناطق المملكة. يسعدنا تواصلكم عبر رقم المشاريع والشركاء 0504618348.' },
      { q: 'هل تنفذون مشاريع المجمعات السكنية والفنادق؟', a: 'نعم، لدينا خطوط إنتاج آلية مهيأة لتنفيذ الكميات الكبيرة بمواصفات موحّدة وجودة ثابتة في كل وحدة.' },
      { q: 'أقدر أطابق لون خشب موجود عندي في البيت؟', a: 'أرسل لنا صورًا واضحة في إضاءة طبيعية أو تفضّل بزيارة المصنع، ونختار معك أقرب درجة مطابقة من عيناتنا المعتمدة.' }
    ]
  ];

  // =========================================================================
  // التهيئة العامة عند تحميل الصفحة
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initHeaderAndScroll();
    initMobileDrawer();
    initScrollReveal();
    initPvcShowcase();
    initParallaxDepth();
    initProcessSteps();
    initColorChanger();
    initHomeGalleryPreview();
    initFullGalleryPage();
    initKitchenPlanner();
    initCompareSection();
    initFaqSection();
    initBookingForms();
    initLightbox();
    initCursorLens();
    initFloatingWhatsApp();
  });

  // --- الهيدر وشريط التقدم ---
  function initHeaderAndScroll() {
    const header = document.querySelector('.site-header');
    const progress = document.querySelector('.scroll-progress');

    function onScroll() {
      const y = window.scrollY || window.pageYOffset;
      if (header) {
        header.classList.toggle('scrolled', y > 24);
      }
      if (progress) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min(100, Math.max(0, (y / docHeight) * 100)) : 0;
        progress.style.width = pct + '%';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- قائمة الجوال (فتح الكبينة) ---
  function initMobileDrawer() {
    const toggleBtn = document.getElementById('menu-toggle');
    const closeBtn = document.getElementById('drawer-close');
    const drawer = document.getElementById('mobile-drawer');
    if (!toggleBtn || !drawer) return;

    function setOpen(isOpen) {
      drawer.classList.toggle('open', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    toggleBtn.addEventListener('click', () => setOpen(!drawer.classList.contains('open')));
    if (closeBtn) closeBtn.addEventListener('click', () => setOpen(false));
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) setOpen(false);
    });
    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) setOpen(false);
    });
  }

  // --- الكشف المعماري المتدرج عند السكرول (Staggered Reveal + Curtain Mask + Counter) ---
  function initScrollReveal() {
    // توزيع تأخير متتابع (Stagger) تلقائي على عناصر الشبكات والقوائم
    const staggerGroups = document.querySelectorAll('.g4, .g3, .g2, .pvc-specs, .factory-steps');
    staggerGroups.forEach((group) => {
      Array.from(group.children).forEach((child, idx) => {
        if (!child.style.getPropertyValue('--stagger-idx')) {
          child.style.setProperty('--stagger-idx', String(idx % 6));
        }
        if (child.classList.contains('aud') || child.classList.contains('card')) {
          child.classList.add('reveal');
        }
      });
    });

    const els = document.querySelectorAll('.reveal, .reveal-mask');
    if (!els.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || prefersReduced) {
      els.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // تشغيل عداد الأرقام المعماري عند دخول شريط الضمان في مجال الرؤية
            const counters = entry.target.querySelectorAll('[data-count-to]');
            counters.forEach(animateCounter);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -42px 0px' }
    );

    els.forEach((el) => obs.observe(el));
  }

  function animateCounter(el) {
    if (el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';
    const target = parseInt(el.getAttribute('data-count-to') || '0', 10);
    if (!target || isNaN(target)) return;

    const duration = 1150;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // منحنى تباطؤ فاخر (Ease Out Quart)
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = String(Math.round(target * eased));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = String(target);
      }
    }

    requestAnimationFrame(tick);
  }

  // --- استوديو خامة الـ PVC التفاعلي (تزامن النقاط 01/02/03 مع الصور الثلاث + معاينة) ---
  function initPvcShowcase() {
    const showcase = document.getElementById('pvc-showcase');
    if (!showcase) return;

    const items = Array.from(showcase.querySelectorAll('[data-pvc-idx]'));
    const figs = Array.from(showcase.querySelectorAll('[data-pvc-fig]'));
    if (!items.length || !figs.length) return;

    const pvcLightboxDetails = [
      {
        title: 'قلب PVC رغوي صلب خلف واجهة الجوز',
        desc: 'يجمع بين جمال وفخامة الواجهات الخشبية من الخارج، وصلابة هيكل PVC Foam Board المقاوم للماء والرطوبة من الداخل.',
        badge: '01 · المقطع الهندسي للخامة'
      },
      {
        title: 'مقاومة عالية للماء والرطوبة',
        desc: 'سطح وبنية غير مسامية لا تتشرب الماء ولا تنتفخ مع الرطوبة اليومية، مما يجعلها مثالية لمنطقة المغسلة والأجواء الرطبة.',
        badge: '02 · الحماية والعزل المائي'
      },
      {
        title: 'الخزانة من الداخل بسماكات موثّقة',
        desc: 'تشطيب داخلي ناصع ومرتب مع أرفف قابلة للتعديل وحواف مكبوسة آليًا، وتُوثّق كافة السماكات والمواصفات في عرض السعر.',
        badge: '03 · البنية الداخلية للخزانة'
      }
    ];

    let activeIdx = 0;
    let timer = null;
    let isHovered = false;

    function setActive(idx) {
      activeIdx = idx;
      items.forEach((it, i) => {
        it.classList.toggle('is-active', i === idx);
      });
      figs.forEach((fg, i) => {
        fg.classList.toggle('is-active', i === idx);
      });
    }

    items.forEach((item, idx) => {
      item.addEventListener('mouseenter', () => setActive(idx));
      item.addEventListener('focus', () => setActive(idx));
      item.addEventListener('click', () => setActive(idx));
    });

    figs.forEach((fig, idx) => {
      fig.addEventListener('mouseenter', () => setActive(idx));
      fig.addEventListener('click', () => {
        setActive(idx);
        const img = fig.querySelector('img');
        const info = pvcLightboxDetails[idx] || pvcLightboxDetails[0];
        if (img) {
          openCustomLightbox({
            title: info.title,
            desc: info.desc,
            src: img.src,
            badge: info.badge
          });
        }
      });
    });

    showcase.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    showcase.addEventListener('mouseleave', () => {
      isHovered = false;
    });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = setInterval(() => {
        if (!isHovered && document.visibilityState === 'visible') {
          setActive((activeIdx + 1) % items.length);
        }
      }, 4800);
    }
  }

  // --- التوازي البصري المعماري عند التمرير (Subtle Scroll-Linked Parallax) ---
  function initParallaxDepth() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    const parallaxImgs = Array.from(document.querySelectorAll('[data-parallax-img]'));
    if (!parallaxImgs.length) return;

    let ticking = false;

    function updateParallax() {
      const vh = window.innerHeight;
      parallaxImgs.forEach((img) => {
        const container = img.parentElement;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;

        const speed = parseFloat(img.getAttribute('data-parallax-img') || '0.04');
        const centerOffset = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
        const shiftY = Math.max(-18, Math.min(18, -centerOffset * speed * 260));
        img.style.transform = `scale(1.06) translate3d(0, ${shiftY.toFixed(1)}px, 0)`;
      });
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
    updateParallax();
  }

  // --- مؤشر عدسة المعاينة المخصص لسطح المكتب (Architectural Cursor Lens) ---
  function initCursorLens() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lens = document.createElement('div');
    lens.className = 'arch-cursor-lens';
    lens.setAttribute('aria-hidden', 'true');
    lens.textContent = 'معاينة ↗';
    document.body.appendChild(lens);

    let targetX = -100;
    let targetY = -100;
    let curX = -100;
    let curY = -100;
    let isVisible = false;
    let rafId = null;

    function renderLoop() {
      curX += (targetX - curX) * 0.22;
      curY += (targetY - curY) * 0.22;
      lens.style.left = `${curX}px`;
      lens.style.top = `${curY}px`;
      if (isVisible || Math.abs(targetX - curX) > 0.5) {
        rafId = requestAnimationFrame(renderLoop);
      } else {
        rafId = null;
      }
    }

    document.addEventListener(
      'mousemove',
      (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        const hoverInteractive = e.target.closest('.pvc-fig, .masonry figure, .tile');
        if (hoverInteractive) {
          if (!isVisible) {
            curX = targetX;
            curY = targetY;
            isVisible = true;
            lens.classList.add('active');
          }
          if (!rafId) rafId = requestAnimationFrame(renderLoop);
        } else if (isVisible) {
          isVisible = false;
          lens.classList.remove('active');
        }
      },
      { passive: true }
    );
  }

  // --- 1. قسم كيف نشتغل (6 خطوات تفاعلية بأنيميشن ناعم) ---
  function initProcessSteps() {
    const root = document.getElementById('process-widget');
    if (!root) return;

    let currentStep = 0;
    const tabsContainer = root.querySelector('[data-role="steps-tabs"]');
    const panelEl = root.querySelector('.panel');
    const stepCounter = root.querySelector('[data-role="step-counter"]');
    const numEl = root.querySelector('[data-role="step-num"]');
    const titleEl = root.querySelector('[data-role="step-title"]');
    const bodyEl = root.querySelector('[data-role="step-body"]');
    const youEl = root.querySelector('[data-role="step-you"]');
    const weEl = root.querySelector('[data-role="step-we"]');
    const prevBtn = root.querySelector('[data-role="step-prev"]');
    const nextBtn = root.querySelector('[data-role="step-next"]');

    function render(animatePanel) {
      if (stepCounter) stepCounter.textContent = `الخطوة ${currentStep + 1} من ${STEPS_DATA.length}`;
      const d = STEPS_DATA[currentStep];
      if (numEl) numEl.textContent = String(currentStep + 1).padStart(2, '0');
      if (titleEl) titleEl.textContent = d.title;
      if (bodyEl) bodyEl.textContent = d.body;
      if (youEl) youEl.textContent = d.you;
      if (weEl) weEl.textContent = d.we;

      if (animatePanel && panelEl) {
        panelEl.classList.remove('animate-in');
        void panelEl.offsetWidth;
        panelEl.classList.add('animate-in');
      }

      if (prevBtn) prevBtn.setAttribute('aria-disabled', currentStep === 0 ? 'true' : 'false');
      if (nextBtn) nextBtn.setAttribute('aria-disabled', currentStep === STEPS_DATA.length - 1 ? 'true' : 'false');

      if (tabsContainer) {
        tabsContainer.innerHTML = '';
        STEPS_DATA.forEach((s, idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.setAttribute('role', 'tab');
          btn.setAttribute('aria-selected', idx === currentStep ? 'true' : 'false');
          btn.className = 'stepb' + (idx === currentStep ? ' on' : idx < currentStep ? ' done' : '');
          btn.innerHTML = `<span class="sn">${String(idx + 1).padStart(2, '0')}</span><span>${s.title}</span>`;
          btn.addEventListener('click', () => {
            if (currentStep !== idx) {
              currentStep = idx;
              render(true);
            }
          });
          tabsContainer.appendChild(btn);
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
          currentStep--;
          render(true);
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentStep < STEPS_DATA.length - 1) {
          currentStep++;
          render(true);
        }
      });
    }

    render(false);
  }

  // --- 2. تجربة غيّر لون المطبخ بضغطة ---
  function initColorChanger() {
    const root = document.getElementById('color-changer');
    if (!root) return;

    let selectedIdx = 0;
    const swatchesContainer = root.querySelector('[data-role="swatches"]');
    const labelEl = root.querySelector('[data-role="finish-name"]');
    const descEl = root.querySelector('[data-role="finish-desc"]');
    const stageEl = root.querySelector('[data-role="kitchen-stage"]');

    if (stageEl) {
      const existingImgs = stageEl.querySelectorAll('img');
      if (!existingImgs.length) {
        FINISHES_DATA.forEach((f, idx) => {
          const img = document.createElement('img');
          img.src = f.src;
          img.alt = `مطبخ إيوان بتشطيب ${f.name} — ${f.desc}`;
          img.width = 1536;
          img.height = 1024;
          img.decoding = 'async';
          img.loading = idx === 0 ? 'eager' : 'lazy';
          img.style.cssText = `position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:${idx === 0 ? '1' : '0'};transform:${idx === 0 ? 'scale(1)' : 'scale(1.03)'};transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.16,1,0.3,1)`;
          img.dataset.finishIdx = idx;
          stageEl.insertBefore(img, stageEl.firstChild);
        });
      }
    }

    function render() {
      const current = FINISHES_DATA[selectedIdx];
      if (labelEl) labelEl.textContent = current.name;
      if (descEl) descEl.textContent = current.desc;
      if (stageEl) {
        stageEl.setAttribute('aria-label', `مطبخ بتشطيب ${current.name}`);
        stageEl.querySelectorAll('img[data-finish-idx]').forEach((img) => {
          const active = Number(img.dataset.finishIdx) === selectedIdx;
          img.style.opacity = active ? '1' : '0';
          img.style.transform = active ? 'scale(1)' : 'scale(1.03)';
        });
      }

      if (swatchesContainer) {
        swatchesContainer.innerHTML = '';
        FINISHES_DATA.forEach((f, idx) => {
          const isSel = idx === selectedIdx;
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.setAttribute('aria-label', f.name);
          btn.setAttribute('aria-pressed', isSel ? 'true' : 'false');
          btn.title = f.name;
          btn.style.cssText = `width:48px;height:48px;border-radius:6px;cursor:pointer;padding:0;background:${f.hex};border:1.5px solid rgba(46,33,26,0.28);box-shadow:${isSel ? '0 0 0 3px #f1e9dd, 0 0 0 5px #3d2418' : '0 2px 6px rgba(0,0,0,0.1)'};transform:${isSel ? 'translateY(-3px)' : 'none'};transition:transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease`;
          btn.addEventListener('click', () => {
            selectedIdx = idx;
            render();
          });
          swatchesContainer.appendChild(btn);
        });
      }
    }

    render();
  }

  // --- 3. معرض الصفحة الرئيسية التفاعلي (تصفية فورية بين الفئات الخمس) ---
  function initHomeGalleryPreview() {
    const root = document.getElementById('home-gallery');
    if (!root) return;

    const filterGroup = root.querySelector('[data-role="home-gal-filters"]');
    const grid = root.querySelector('[data-role="home-gal-grid"]');
    if (!filterGroup || !grid) return;

    const cats = [
      { id: 'all', label: 'مختارات من كل الفئات' },
      { id: 'kitchens', label: 'المطابخ' },
      { id: 'wardrobes', label: 'الخزائن' },
      { id: 'bedrooms', label: 'غرف النوم' },
      { id: 'cnc', label: 'الديكورات وCNC' },
      { id: 'dressing', label: 'الدريسنج والمساحات الصغيرة' }
    ];

    let activeCat = 'all';

    function renderFilters() {
      filterGroup.innerHTML = '';
      cats.forEach((c) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chip' + (c.id === activeCat ? ' chip-on' : '');
        btn.setAttribute('aria-pressed', c.id === activeCat ? 'true' : 'false');
        btn.textContent = c.label;
        btn.addEventListener('click', () => {
          activeCat = c.id;
          renderFilters();
          renderGrid();
        });
        filterGroup.appendChild(btn);
      });
    }

    function renderGrid() {
      grid.innerHTML = '';
      let list = [];
      if (activeCat === 'all') {
        list = GALLERY_ITEMS.filter((it) => it.featured).slice(0, 6);
      } else {
        list = GALLERY_ITEMS.filter((it) => it.cat === activeCat).slice(0, 5);
      }

      list.forEach((item, idx) => {
        const card = document.createElement('a');
        card.href = `gallery.html?cat=${item.cat}`;
        const isWide = idx === 0 && list.length >= 5;
        const isArch = idx === 1;
        card.className = 'tile animate-in' + (isWide ? ' gal-wide' : '') + (isArch ? ' tile-arch' : '');
        card.style.height = idx < 2 ? '400px' : '310px';
        card.style.animationDelay = `${idx * 65}ms`;
        card.dataset.lightboxId = item.id;

        card.innerHTML = `
          <img src="${item.src}" alt="${item.title} — ${item.catName} من مصنع إيوان" width="1536" height="1024" loading="lazy" decoding="async">
          <div class="tile-caption">
            <div>
              <span class="tile-tag">${item.catName}</span>
              <p class="tile-title-overlay">${item.title}</p>
            </div>
          </div>
        `;

        card.addEventListener('click', (e) => {
          e.preventDefault();
          openLightboxById(item.id);
        });

        grid.appendChild(card);
      });
    }

    renderFilters();
    renderGrid();
  }

  // --- 4. صفحة المعرض الكاملة (gallery.html) ---
  function initFullGalleryPage() {
    const root = document.getElementById('full-gallery-page');
    if (!root) return;

    const filterGroup = root.querySelector('[data-role="gallery-filters"]');
    const grid = root.querySelector('[data-role="gallery-grid"]');
    const countLabel = root.querySelector('[data-role="gallery-count"]');
    if (!filterGroup || !grid) return;

    const params = new URLSearchParams(window.location.search);
    let activeCat = params.get('cat') || 'all';

    const cats = [
      { id: 'all', label: 'كل الأعمال', count: GALLERY_ITEMS.length },
      { id: 'kitchens', label: 'المطابخ', count: GALLERY_ITEMS.filter((x) => x.cat === 'kitchens').length },
      { id: 'wardrobes', label: 'الخزائن', count: GALLERY_ITEMS.filter((x) => x.cat === 'wardrobes').length },
      { id: 'bedrooms', label: 'غرف النوم', count: GALLERY_ITEMS.filter((x) => x.cat === 'bedrooms').length },
      { id: 'cnc', label: 'الديكورات وأعمال CNC', count: GALLERY_ITEMS.filter((x) => x.cat === 'cnc').length },
      { id: 'dressing', label: 'الدريسنج والمساحات الصغيرة', count: GALLERY_ITEMS.filter((x) => x.cat === 'dressing').length }
    ];

    if (!cats.some((c) => c.id === activeCat)) activeCat = 'all';

    function renderFilters() {
      filterGroup.innerHTML = '';
      cats.forEach((c) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chip' + (c.id === activeCat ? ' chip-on' : '');
        btn.setAttribute('aria-pressed', c.id === activeCat ? 'true' : 'false');
        btn.innerHTML = `<span>${c.label}</span><span class="count">${c.count}</span>`;
        btn.addEventListener('click', () => {
          activeCat = c.id;
          renderFilters();
          renderGrid();
        });
        filterGroup.appendChild(btn);
      });
    }

    function renderGrid() {
      grid.innerHTML = '';
      const filtered = activeCat === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((x) => x.cat === activeCat);
      if (countLabel) {
        countLabel.textContent = `يعرض ${filtered.length} تصميمًا وعملًا في هذه الفئة`;
      }

      filtered.forEach((item, idx) => {
        const fig = document.createElement('article');
        fig.className = 'card animate-in';
        fig.style.cssText = `overflow:hidden;display:flex;flex-direction:column;cursor:pointer;animation-delay:${Math.min(idx * 45, 340)}ms`;
        const isArch = idx % 4 === 1;
        fig.innerHTML = `
          <div style="position:relative;aspect-ratio:3/2;overflow:hidden;background:#24140d;${isArch ? 'border-radius:999px 999px 0 0;margin:12px 12px 0' : ''}">
            <img src="${item.src}" alt="${item.title} — ${item.catName}" width="1536" height="1024" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;transition:transform 0.75s cubic-bezier(0.16,1,0.3,1)">
            <span class="badge-illustrative">${item.catName}</span>
          </div>
          <div style="padding:22px 24px;display:flex;flex-direction:column;gap:6px;flex:1">
            <p style="font:600 0.78rem/1.4 var(--font-sans);color:var(--bronze)">${item.catName}</p>
            <h3 style="font:700 1.15rem/1.45 var(--font-display);color:var(--ink)">${item.title}</h3>
            <p style="font:400 0.9rem/1.65 var(--font-sans);color:var(--ink-muted);margin-top:2px">${item.desc}</p>
            <span style="margin-top:auto;padding-top:14px;font:600 0.85rem/1.4 var(--font-sans);color:var(--walnut)">معاينة وتفاصيل ←</span>
          </div>
        `;
        fig.addEventListener('click', () => openLightboxById(item.id));
        grid.appendChild(fig);
      });
    }

    renderFilters();
    renderGrid();
  }

  // --- 5. أداة صمّم مطبخك معنا (3 خطوات بدون أسعار) ---
  function initKitchenPlanner() {
    const root = document.getElementById('planner-widget');
    if (!root) return;

    const useData = [
      { label: 'طبخ يومي مستمر', hint: 'اعتماد يومي كامل على المطبخ' },
      { label: 'طبخ خفيف وسريع', hint: 'وجبات يومية سريعة وقهوة' },
      { label: 'عائلة كبيرة وعزايم', hint: 'مساحات تحضير واسعة وضيافة' },
      { label: 'مطبخ تحضيري أنيق (ديرتي / مفتوح)', hint: 'تركيز على المظهر العصري والترتيب' }
    ];
    const storeData = ['صحون وأطقم ضيافة', 'قدور وأواني طبخ', 'أجهزة كهربائية صغيرة', 'مؤونة ومواد غذائية'];
    const shapeData = [
      { label: 'خطي', svg: '<rect x="6" y="16" width="52" height="14" rx="2"></rect>' },
      { label: 'حرف L', svg: '<path d="M6 8h52v12H18v22H6z"></path>' },
      { label: 'حرف U', svg: '<path d="M6 8h52v34H46V20H18v22H6z"></path>' },
      { label: 'بجزيرة', svg: '<rect x="6" y="8" width="52" height="12" rx="2"></rect><rect x="18" y="29" width="28" height="11" rx="2"></rect>' },
      { label: 'أحتاج اقتراحكم', svg: '<rect x="6" y="8" width="52" height="34" rx="4" fill="none" stroke-dasharray="4 4"></rect><text x="32" y="32" text-anchor="middle" font-size="17" fill="#3d2418" stroke="none">؟</text>' }
    ];

    let state = {
      wiz: 0,
      use: -1,
      store: [false, false, false, false],
      shape: -1
    };

    const stepsListEl = root.querySelector('[data-role="wiz-steps"]');
    const barFillEl = root.querySelector('[data-role="wiz-bar"]');
    const countEl = root.querySelector('[data-role="wiz-count"]');
    const bodyEl = root.querySelector('[data-role="wiz-body"]');
    const backBtn = root.querySelector('[data-role="wiz-back"]');
    const nextBtn = root.querySelector('[data-role="wiz-next"]');
    const resetBtn = root.querySelector('[data-role="wiz-reset"]');
    const hintEl = root.querySelector('[data-role="wiz-hint"]');

    function render() {
      const wizLabels = ['طبيعة الاستخدام', 'أولويات التخزين', 'تخطيط المساحة', 'التوصية والملخص'];
      const anyStore = state.store.some(Boolean);
      const answered = [state.use >= 0, anyStore, state.shape >= 0, true];
      const canNext = answered[state.wiz];

      if (stepsListEl) {
        stepsListEl.innerHTML = '';
        wizLabels.forEach((l, i) => {
          const li = document.createElement('li');
          const bg = i < state.wiz ? '#3d2418' : i === state.wiz ? '#dfc496' : 'transparent';
          const nfg = i < state.wiz ? '#fbf9f6' : '#231812';
          const bd = i <= state.wiz ? (i < state.wiz ? '#3d2418' : '#dfc496') : '#9c8877';
          const fg = i === state.wiz ? '#231812' : '#625044';
          li.style.cssText = `display:flex;align-items:center;gap:14px;font:600 0.96rem/1.5 var(--font-sans);color:${fg}`;
          li.innerHTML = `<span style="width:34px;height:34px;border-radius:4px;display:inline-flex;align-items:center;justify-content:center;font:700 0.85rem/1 var(--font-sans);background:${bg};color:${nfg};border:1px solid ${bd};transition:all 0.25s ease">${i + 1}</span><span>${l}</span>`;
          stepsListEl.appendChild(li);
        });
      }

      if (barFillEl) barFillEl.style.width = `${Math.round(((state.wiz + 1) / 4) * 100)}%`;
      if (countEl) countEl.textContent = state.wiz < 3 ? `السؤال ${state.wiz + 1} من 3` : 'الملخص جاهز';
      if (backBtn) backBtn.setAttribute('aria-disabled', state.wiz === 0 ? 'true' : 'false');

      if (nextBtn) {
        nextBtn.style.display = state.wiz < 3 ? 'inline-flex' : 'none';
        nextBtn.setAttribute('aria-disabled', canNext ? 'false' : 'true');
      }
      if (resetBtn) {
        resetBtn.style.display = state.wiz === 3 ? 'inline-flex' : 'none';
      }
      if (hintEl) {
        hintEl.textContent =
          state.wiz < 3 && !canNext
            ? state.wiz === 1
              ? 'اختر خيارًا واحدًا على الأقل للمتابعة.'
              : 'اختر إجابة للمتابعة.'
            : '';
      }

      if (!bodyEl) return;
      bodyEl.innerHTML = '';
      bodyEl.classList.remove('animate-in');
      void bodyEl.offsetWidth;
      bodyEl.classList.add('animate-in');

      if (state.wiz === 0) {
        const h = document.createElement('h3');
        h.style.cssText = 'margin-top:22px;font:700 1.4rem/1.4 var(--font-display)';
        h.textContent = 'كيف طبيعة استخدامكم للمطبخ؟';
        bodyEl.appendChild(h);

        const wrap = document.createElement('div');
        wrap.setAttribute('role', 'radiogroup');
        wrap.style.cssText = 'margin-top:18px;display:grid;gap:10px';
        useData.forEach((u, i) => {
          const isOn = i === state.use;
          const b = document.createElement('button');
          b.type = 'button';
          b.setAttribute('role', 'radio');
          b.setAttribute('aria-checked', isOn ? 'true' : 'false');
          b.className = 'opt' + (isOn ? ' opt-on' : '');
          b.innerHTML = `<span class="tick" aria-hidden="true">✓</span><span><span style="display:block">${u.label}</span><span style="display:block;font:400 0.82rem/1.4 var(--font-sans);color:#625044">${u.hint}</span></span>`;
          b.addEventListener('click', () => {
            state.use = i;
            render();
          });
          wrap.appendChild(b);
        });
        bodyEl.appendChild(wrap);
      } else if (state.wiz === 1) {
        const h = document.createElement('h3');
        h.style.cssText = 'margin-top:22px;font:700 1.4rem/1.4 var(--font-display)';
        h.textContent = 'وش أكثر شي يهمكم تنظيمه وتخزينه؟';
        bodyEl.appendChild(h);

        const p = document.createElement('p');
        p.style.cssText = 'margin-top:4px;font:400 0.88rem/1.5 var(--font-sans);color:#625044';
        p.textContent = 'تقدر تختار أكثر من خيار.';
        bodyEl.appendChild(p);

        const wrap = document.createElement('div');
        wrap.className = 'wiz-grid-2';
        storeData.forEach((s, i) => {
          const isOn = state.store[i];
          const b = document.createElement('button');
          b.type = 'button';
          b.setAttribute('role', 'checkbox');
          b.setAttribute('aria-checked', isOn ? 'true' : 'false');
          b.className = 'opt' + (isOn ? ' opt-on' : '');
          b.innerHTML = `<span class="tick" aria-hidden="true">✓</span><span>${s}</span>`;
          b.addEventListener('click', () => {
            state.store[i] = !state.store[i];
            render();
          });
          wrap.appendChild(b);
        });
        bodyEl.appendChild(wrap);
      } else if (state.wiz === 2) {
        const h = document.createElement('h3');
        h.style.cssText = 'margin-top:22px;font:700 1.4rem/1.4 var(--font-display)';
        h.textContent = 'وش التخطيط الأقرب لمساحة مطبخك؟';
        bodyEl.appendChild(h);

        const wrap = document.createElement('div');
        wrap.setAttribute('role', 'radiogroup');
        wrap.className = 'wiz-grid-3';
        shapeData.forEach((sh, i) => {
          const isOn = i === state.shape;
          const b = document.createElement('button');
          b.type = 'button';
          b.setAttribute('role', 'radio');
          b.setAttribute('aria-checked', isOn ? 'true' : 'false');
          b.className = 'opt shape' + (isOn ? ' opt-on' : '');
          b.innerHTML = `<svg width="64" height="50" viewBox="0 0 64 50" aria-hidden="true"><g fill="#e4d8c5" stroke="#3d2418" stroke-width="1.5">${sh.svg}</g></svg><span>${sh.label}</span>`;
          b.addEventListener('click', () => {
            state.shape = i;
            render();
          });
          wrap.appendChild(b);
        });
        bodyEl.appendChild(wrap);
      } else if (state.wiz === 3) {
        const sumUse = state.use >= 0 ? useData[state.use].label : '—';
        const sumStore = anyStore ? storeData.filter((_, i) => state.store[i]).join('، ') : '—';
        const sumShape = state.shape >= 0 ? shapeData[state.shape].label : '—';

        const recs = [];
        if (state.store[1]) recs.push('أدراج عميقة بسكك سحب مخفية تتحمّل أوزان القدور الكبيرة');
        if (state.store[0]) recs.push('أدراج منظمة بفواصل داخلية للصحون وأطقم الضيافة');
        if (state.store[3]) recs.push('عمود تموين (Pantry) بسحب كامل لسهولة الوصول لكل المحتويات');
        if (state.store[2]) recs.push('برج أجهزة مدمج للأفران والميكروويف يحفظ اتساع سطح العمل');
        if (state.shape === 1 || state.shape === 2) recs.push('آلية سحب دوّارة للزوايا لاستثمار كامل المساحة');
        if (state.shape === 3) recs.push('جزيرة وسطية مزودة بوحدات تخزين عميقة وإضاءة مخفية');
        if (state.use === 2) recs.push('مساحة تحضير ممتدة مع توزيع مريح بين المغسلة والموقد');
        if (state.use === 0) recs.push('مفصلات وسكك إغلاق ناعم عالية التحمّل للاستخدام اليومي المكثف');
        recs.push('هيكل PVC Foam Board كامل مقاوم للماء والرطوبة');

        const msg = `السلام عليكم، هذا ملخص احتياج مطبخي من موقع إيوان:\n- طبيعة الاستخدام: ${sumUse}\n- أولويات التخزين: ${sumStore}\n- تخطيط المطبخ: ${sumShape}\nأرغب في تنسيق موعد أو استشارة مع فريقكم.`;
        const waUrl = `${WA_CUSTOMERS}?text=${encodeURIComponent(msg)}`;

        bodyEl.innerHTML = `
          <h3 style="margin-top:22px;font:700 1.4rem/1.4 var(--font-display)">ملخص مطبخك المقترح</h3>
          <dl style="margin:16px 0 0;display:grid;grid-template-columns:auto minmax(0,1fr);gap:0;font:400 0.94rem/1.55 var(--font-sans)">
            <dt style="padding:10px 0;border-top:1px solid #dcd0c0;color:#625044;padding-inline-end:20px">الاستخدام</dt>
            <dd style="margin:0;padding:10px 0;border-top:1px solid #dcd0c0;font-weight:600">${sumUse}</dd>
            <dt style="padding:10px 0;border-top:1px solid #dcd0c0;color:#625044;padding-inline-end:20px">التخزين</dt>
            <dd style="margin:0;padding:10px 0;border-top:1px solid #dcd0c0;font-weight:600">${sumStore}</dd>
            <dt style="padding:10px 0;border-top:1px solid #dcd0c0;color:#625044;padding-inline-end:20px">التخطيط</dt>
            <dd style="margin:0;padding:10px 0;border-top:1px solid #dcd0c0;font-weight:600">${sumShape}</dd>
            <dt style="padding:10px 0;border-top:1px solid #dcd0c0;border-bottom:1px solid #dcd0c0;color:#625044;padding-inline-end:20px">الهيكل</dt>
            <dd style="margin:0;padding:10px 0;border-top:1px solid #dcd0c0;border-bottom:1px solid #dcd0c0;font-weight:600">PVC Foam Board في جميع باقاتنا</dd>
          </dl>
          <p style="margin-top:18px;font:600 0.95rem/1.5 var(--font-sans)">توصيات مهندسي إيوان لمطبخك:</p>
          <ul style="margin:8px 0 0;padding-inline-start:20px;display:grid;gap:6px;color:#231812;font-size:0.92rem">
            ${recs.slice(0, 5).map((r) => `<li>${r}</li>`).join('')}
          </ul>
          <div style="margin-top:24px;display:flex;flex-wrap:wrap;gap:12px">
            <a class="btn btn-gold" href="${waUrl}" target="_blank" rel="noopener">أرسل الملخص على واتساب</a>
            <a class="btn btn-walnut" href="#booking">احجز موعد</a>
          </div>
          <p style="margin-top:12px;font:400 0.8rem/1.5 var(--font-sans);color:#625044">يفتح تطبيق واتساب برسالة جاهزة لمراجعتها قبل الإرسال.</p>
        `;
      }
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (state.wiz > 0) {
          state.wiz--;
          render();
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const anyStore = state.store.some(Boolean);
        const answered = [state.use >= 0, anyStore, state.shape >= 0, true];
        if (answered[state.wiz] && state.wiz < 3) {
          state.wiz++;
          render();
        }
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state = { wiz: 0, use: -1, store: [false, false, false, false], shape: -1 };
        render();
      });
    }

    render();
  }

  // --- 6. قسم الشفافية (وش يغيّر السعر + قائمة المقارنة) ---
  function initCompareSection() {
    const factorsContainer = document.getElementById('factors-accordion');
    if (factorsContainer) {
      let openFactor = 0;
      function renderFactors() {
        factorsContainer.innerHTML = '';
        FACTORS_DATA.forEach((f, idx) => {
          const isOpen = idx === openFactor;
          const item = document.createElement('div');
          item.className = 'acc';
          item.innerHTML = `
            <button type="button" aria-expanded="${isOpen ? 'true' : 'false'}">
              <span style="display:flex;gap:16px">
                <span style="font:700 0.88rem/1.75 var(--font-sans);color:#8a5a25;min-width:24px">${String(idx + 1).padStart(2, '0')}</span>
                <span>${f.title}</span>
              </span>
              <span class="pm" aria-hidden="true">${isOpen ? '−' : '+'}</span>
            </button>
            <p class="ans" style="display:${isOpen ? 'block' : 'none'};padding-inline-start:40px">${f.body}</p>
          `;
          item.querySelector('button').addEventListener('click', () => {
            openFactor = isOpen ? -1 : idx;
            renderFactors();
          });
          factorsContainer.appendChild(item);
        });
      }
      renderFactors();
    }

    const checklistRoot = document.getElementById('compare-checklist');
    if (checklistRoot) {
      let checks = [false, false, false, false, false];
      const listEl = checklistRoot.querySelector('[data-role="checks-list"]');
      const barEl = checklistRoot.querySelector('[data-role="checks-bar"]');
      const countEl = checklistRoot.querySelector('[data-role="checks-count"]');
      const msgEl = checklistRoot.querySelector('[data-role="checks-msg"]');

      function renderChecks() {
        const count = checks.filter(Boolean).length;
        if (barEl) barEl.style.width = `${(count / 5) * 100}%`;
        if (countEl) countEl.textContent = `${count} من 5`;
        if (msgEl) {
          msgEl.textContent =
            count === 5
              ? 'ممتاز، الآن تقدر تقارن بين العروض بوضوح تام. وفي إيوان نلتزم بتوثيق كافة هذه البنود في عرض السعر.'
              : count === 0
              ? 'ابدأ بالبند الأول: خامة الهيكل الداخلي هي الأساس الذي يحدد عمر المطبخ.'
              : `بقي ${5 - count} بنود لتكتمل معك الصورة قبل المقارنة.`;
        }
        if (listEl) {
          listEl.innerHTML = '';
          CHECKS_DATA.forEach((label, idx) => {
            const isOn = checks[idx];
            const b = document.createElement('button');
            b.type = 'button';
            b.setAttribute('role', 'checkbox');
            b.setAttribute('aria-checked', isOn ? 'true' : 'false');
            b.className = 'opt' + (isOn ? ' opt-on' : '');
            b.innerHTML = `<span class="tick" aria-hidden="true">✓</span><span>${label}</span>`;
            b.addEventListener('click', () => {
              checks[idx] = !checks[idx];
              renderChecks();
            });
            listEl.appendChild(b);
          });
        }
      }
      renderChecks();
    }
  }

  // --- 7. قسم الأسئلة الشائعة بتصنيفات تفاعلية ---
  function initFaqSection() {
    const root = document.getElementById('faq-widget');
    if (!root) return;

    let activeCat = 0;
    let openIdx = 0;
    const catsEl = root.querySelector('[data-role="faq-cats"]');
    const listEl = root.querySelector('[data-role="faq-list"]');

    function render(animateList) {
      if (catsEl) {
        catsEl.innerHTML = '';
        FAQ_CATS.forEach((label, idx) => {
          const isSel = idx === activeCat;
          const b = document.createElement('button');
          b.type = 'button';
          b.setAttribute('role', 'tab');
          b.setAttribute('aria-selected', isSel ? 'true' : 'false');
          b.className = 'chip' + (isSel ? ' chip-on' : '');
          b.textContent = label;
          b.addEventListener('click', () => {
            if (activeCat !== idx) {
              activeCat = idx;
              openIdx = 0;
              render(true);
            }
          });
          catsEl.appendChild(b);
        });
      }

      if (listEl) {
        listEl.innerHTML = '';
        if (animateList) {
          listEl.classList.remove('animate-in');
          void listEl.offsetWidth;
          listEl.classList.add('animate-in');
        }
        FAQ_DATA[activeCat].forEach((item, idx) => {
          const isOpen = idx === openIdx;
          const div = document.createElement('div');
          div.className = 'acc';
          div.innerHTML = `
            <button type="button" aria-expanded="${isOpen ? 'true' : 'false'}">
              <span>${item.q}</span>
              <span class="pm" aria-hidden="true">${isOpen ? '−' : '+'}</span>
            </button>
            <p class="ans" style="display:${isOpen ? 'block' : 'none'}">${item.a}</p>
          `;
          div.querySelector('button').addEventListener('click', () => {
            openIdx = isOpen ? -1 : idx;
            render(false);
          });
          listEl.appendChild(div);
        });
      }
    }

    render(false);
  }

  // --- 8. نظام حجز المواعيد الصادق (زيارة المصنع / استشارة عن بُعد لكافة مناطق المملكة) ---
  function initBookingForms() {
    const forms = document.querySelectorAll('[data-role="booking-form"]');
    forms.forEach((form) => {
      let mode = 0; // 0: زيارة المصنع, 1: استشارة عن بعد
      const modes = [
        { label: 'زيارة المصنع', note: 'حياك الله لزيارة المصنع والاطلاع على خطوط الإنتاج والعينات بموعد مسبق (السبت – الخميس، 9 ص – 6 م).' },
        { label: 'استشارة عن بُعد (لكافة مناطق المملكة)', note: 'مكالمة أو اجتماع مرئي مع مهندس التصميم لمراجعة المخططات والمقاسات والخامات أينما كنت في المملكة.' }
      ];

      const modeBtnsContainer = form.querySelector('[data-role="booking-modes"]');
      const modeNoteEl = form.querySelector('[data-role="booking-mode-note"]');
      const statusBox = form.querySelector('[data-role="booking-status"]');

      const dateInput = form.querySelector('input[type="date"]');
      if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
      }

      function renderModes() {
        if (modeNoteEl) modeNoteEl.textContent = modes[mode].note;
        if (modeBtnsContainer) {
          modeBtnsContainer.innerHTML = '';
          modes.forEach((m, idx) => {
            const isSel = idx === mode;
            const b = document.createElement('button');
            b.type = 'button';
            b.setAttribute('aria-pressed', isSel ? 'true' : 'false');
            b.style.cssText = `min-height:46px;border:0;border-radius:6px;cursor:pointer;font:600 0.88rem/1.3 var(--font-sans);background:${isSel ? '#3d2418' : 'transparent'};color:${isSel ? '#fbf9f6' : '#231812'};transition:all 0.22s ease`;
            b.textContent = idx === 0 ? 'زيارة المصنع' : 'استشارة عن بُعد';
            b.addEventListener('click', () => {
              mode = idx;
              renderModes();
            });
            modeBtnsContainer.appendChild(b);
          });
        }
      }

      renderModes();

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (form.querySelector('[name="name"]')?.value || '').trim();
        const phone = (form.querySelector('[name="phone"]')?.value || '').trim();
        const city = form.querySelector('[name="city"]')?.value || 'الرياض';
        const type = form.querySelector('[name="type"]')?.value || 'مطبخ';
        const date = form.querySelector('[name="date"]')?.value || 'أقرب وقت متاح';
        const time = form.querySelector('[name="time"]')?.value || 'صباحًا';
        const note = (form.querySelector('[name="note"]')?.value || '').trim();
        const fileInput = form.querySelector('[name="file"]');
        const hasFile = fileInput && fileInput.files && fileInput.files.length > 0;

        if (!name || !phone) {
          if (statusBox) {
            statusBox.style.display = 'block';
            statusBox.style.background = '#fdf2f2';
            statusBox.style.borderColor = '#b3261e';
            statusBox.style.color = '#b3261e';
            statusBox.innerHTML = '<strong>تنبيه:</strong> فضلًا أدخل الاسم ورقم الجوال ليتواصل معك فريقنا لتأكيد الموعد.';
          }
          return;
        }

        const isB2B = type.includes('شركات') || type.includes('مطور');
        const targetWa = isB2B ? WA_PROJECTS : WA_CUSTOMERS;

        const lines = [
          `السلام عليكم، أرغب في طلب موعد (${idxLabel(mode)}) لدى مصنع إيوان:`,
          `• الاسم: ${name}`,
          `• الجوال: ${phone}`,
          `• المدينة: ${city}`,
          `• نوع المشروع: ${type}`,
          `• الموعد المفضل: ${date} (${time})`
        ];
        if (note) lines.push(`• ملاحظات: ${note}`);
        if (hasFile) lines.push(`• (لدي ملف/صورة سأرفقها لكم في المحادثة)`);

        const waLink = `${targetWa}?text=${encodeURIComponent(lines.join('\n'))}`;

        if (statusBox) {
          statusBox.style.display = 'block';
          statusBox.style.background = '#f5ede0';
          statusBox.style.borderColor = '#3d2418';
          statusBox.style.color = '#231812';
          statusBox.innerHTML = `
            <p style="font-weight:700;color:#2b7a4b">✓ تم تجهيز بطاقة طلب الموعد بنجاح</p>
            <p style="margin-top:6px;font-size:0.88rem;color:#625044">يتواصل معك فريق المصنع لمراجعة وتأكيد اليوم والساعة المناسبة لك. اضغط الزر أدناه لإرسال الطلب مباشرة عبر واتساب:</p>
            <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:10px">
              <a href="${waLink}" target="_blank" rel="noopener" class="btn btn-walnut" style="min-height:42px;padding:0 18px">إرسال طلب الموعد عبر واتساب ←</a>
            </div>
          `;
        }

        window.open(waLink, '_blank', 'noopener');
      });
    });

    function idxLabel(m) {
      return m === 0 ? 'زيارة المصنع' : 'استشارة عن بُعد';
    }
  }

  // --- 9. عارض الصور التفاعلي (Lightbox) ---
  function initLightbox() {
    let lb = document.getElementById('ewan-lightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'ewan-lightbox';
      lb.className = 'lightbox';
      lb.setAttribute('role', 'dialog');
      lb.setAttribute('aria-modal', 'true');
      lb.setAttribute('aria-label', 'معاينة العمل');
      lb.innerHTML = `
        <div class="lightbox-content">
          <button type="button" class="lightbox-close" aria-label="إغلاق المعاينة">×</button>
          <div class="lightbox-media">
            <img data-role="lb-img" src="assets/web/ai-k1-u-island-walnut.jpg" alt="معاينة تصميم مطبخ وخزائن من مصنع إيوان" width="1536" height="1024" loading="lazy" decoding="async">
          </div>
          <div class="lightbox-info">
            <div>
              <span data-role="lb-badge" style="display:inline-block;font:600 0.76rem/1.4 var(--font-sans);background:var(--surface-sand);color:var(--bronze);padding:4px 12px;border-radius:3px;border:1px solid var(--border)"></span>
              <h2 data-role="lb-title" style="margin-top:14px;font:700 1.35rem/1.4 var(--font-display);color:var(--ink)"></h2>
              <p data-role="lb-desc" style="margin-top:10px;font:400 0.94rem/1.68 var(--font-sans);color:var(--ink-muted)"></p>
              <div style="margin-top:22px;padding-top:16px;border-top:1px solid var(--border);font:400 0.88rem/1.65 var(--font-sans);color:var(--ink)">
                <p><strong>الهيكل الداخلي:</strong> PVC Foam Board مقاوم للماء والرطوبة</p>
                <p style="margin-top:4px"><strong>التنفيذ والخدمة:</strong> تصنيع آلي دقيق · نخدم جميع مناطق المملكة</p>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px">
              <a data-role="lb-wa" href="#" target="_blank" rel="noopener" class="btn btn-gold" style="width:100%">اطلب تفصيل مشابه على واتساب</a>
              <a href="booking.html" class="btn btn-walnut" style="width:100%">احجز موعد أو استشارة</a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(lb);

      lb.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
      lb.addEventListener('click', (e) => {
        if (e.target === lb) closeLightbox();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lb.classList.contains('open')) closeLightbox();
      });
    }

    document.querySelectorAll('.masonry figure').forEach((fig) => {
      fig.addEventListener('click', () => {
        const img = fig.querySelector('img');
        const cap = fig.querySelector('figcaption');
        if (!img) return;
        openCustomLightbox({
          title: cap ? cap.textContent : 'تفاصيل الخزانة من الداخل',
          desc: 'التفاصيل الداخلية من مفصلات بإغلاق ناعم وأدراج منظمة وحواف متطابقة هي بصمة إيوان الحقيقية.',
          src: img.src,
          badge: 'الكبينة المفتوحة · تفاصيل من الداخل'
        });
      });
    });
  }

  function openLightboxById(id) {
    const item = GALLERY_ITEMS.find((x) => x.id === id);
    if (!item) return;
    openCustomLightbox({
      title: item.title,
      desc: item.desc,
      src: item.src,
      badge: item.catName
    });
  }

  function openCustomLightbox({ title, desc, src, badge }) {
    const lb = document.getElementById('ewan-lightbox');
    if (!lb) return;
    lb.querySelector('[data-role="lb-img"]').src = src;
    lb.querySelector('[data-role="lb-img"]').alt = title;
    lb.querySelector('[data-role="lb-title"]').textContent = title;
    lb.querySelector('[data-role="lb-desc"]').textContent = desc;
    lb.querySelector('[data-role="lb-badge"]').textContent = badge;
    const msg = `السلام عليكم، أعجبني هذا التصميم في موقع إيوان (${title}) وأرغب في الاستفسار أو طلب تفصيل مشابه.`;
    lb.querySelector('[data-role="lb-wa"]').href = `${WA_CUSTOMERS}?text=${encodeURIComponent(msg)}`;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const lb = document.getElementById('ewan-lightbox');
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  // --- 10. زر تواصل واتساب المعماري العائم (يختفي تلقائيًا عند قسم الحجز والفوتر لمنع التزاحم) ---
  function initFloatingWhatsApp() {
    if (document.querySelector('.floating-wa-btn')) return;
    const btn = document.createElement('a');
    btn.href = WA_CUSTOMERS;
    btn.target = '_blank';
    btn.rel = 'noopener';
    btn.className = 'floating-wa-btn';
    btn.setAttribute('aria-label', 'تواصل مباشر عبر واتساب');
    btn.innerHTML = `
      <svg class="floating-wa-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      <span>استشارة واتساب</span>
    `;
    document.body.appendChild(btn);

    const footer = document.querySelector('.site-footer');
    const booking = document.getElementById('booking');
    if ('IntersectionObserver' in window && (footer || booking)) {
      const hideObs = new IntersectionObserver(
        (entries) => {
          const anyVisible = entries.some((e) => e.isIntersecting);
          btn.classList.toggle('is-hidden', anyVisible);
        },
        { threshold: 0.15 }
      );
      if (footer) hideObs.observe(footer);
      if (booking) hideObs.observe(booking);
    }
  }
})();
