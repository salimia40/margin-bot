const templates = require('./templates')
module.exports = {
    templates,
    token : '837589296:AAEIvsMmiH94_eZhy1_t3I3my2cvjOsu3iI',
    tapp_token : '882220621:AAEbh2pgLrq99WDKn35d7eSvymMLW1eGysM',
    db_url : 'mongodb://root:VyD4h5LcmaYfpPCc69muIuFy@s7.liara.ir:30770/mrbotdbv2',
    // db_c : 'b2',
    db_c : 'amir2',
    keys : {
        openfacts: '📜 فاکتور های باز',
        monthlyReport: '🌙 گزارش ماهانه',
        postSettleReport: 'گزارش معاملات پس از تسویه',
        semiSettle: 'تسویه موقت',
        packInv: '⚱️موجودی آبشده',
        changeInv: '💶 موجودی مالی',
        userInfo: '👤 اطلاعات فردی',
        contact: '👨🏻‍💼ارتباط با ما',
        eccountant: 'حسابداری',
        support: 'پشتیبانی',
        summitResipt: '🏦 ثبت فیش واریزی',
        reqCash: '💶 درخواست وجه',
        reqCard: '💳 شماره کارت واریز',
        cardInfo: '💳 شماره کارت شما',
        transactions: '🧮 تراکنش ها',
        help: '📌 راهنما',
        contactManager: '👨🏻‍💼ارتباط با مدیر',
        back: 'بازگشت'
    },
    contract: [
        // "⚖️ قوانین و راهنمای گروه آبشده نقدی(با تسویه هفتگی) ....\n\n١- این گروه ،محلی برای گذاشتن سفارش ( اُردر) خرید و فروش آبشده بین همکاران زرگر  و نقدی کار است.\n۲-کیفیت معامله از طریق گزاردن سفارش خرید یا فروش بوده و همكاران متقاضي ، پيشنهاد خود را براي خريد يا فروش آبشده با گذاشتن اردر و دريافت حواله اعلام مينمايند.ثبت اردر  به منزله  رزرو  آن اردر و موجب ايجاد قول و تعهد قطعی در مظنه موردنظر شده وليكن عمل بيع در مظنه ثبت شده بعد از پرداخت و دريافت وجه صورت ميگيرد.وجه تضمين سپرده شده،وجه تضمين  برای حفظ حواله  بدلیل نوسانات بازار بوده نه ثمن و مثمن معامله.\n٣- وجه تضمين به منظور سفارش (اُردر) برای خرید یا فروش هرکیلو آبشده طلا ۱۱،۵۰۰،۰۰۰  میلیون تومان وحداقل آن ۱،۱۵۰،۰۰۰ تومان و کمسیون  هرکیلو بابت هر معامله ۱۰۰هزارتومان میباشد.\n  ٤-باتوجه به نوسانات بازار ، نرم افزار مجهز به مارجین بوده بدین معنا که با خرید یا فروش ، ربات بصورت هوشمند و آنلاین حجم معاملات را با قیمت اردرهای ثبت شده،محاسبه و آنالیز کرده و نرخ مشخصی را به عنوان مارجين تعریف و چنانچه  اردر توسط شما  بسته نشود ربات ابتدا به شما هشدار ورود به منطقه زیان زیاد داده و در صورت عدم توجه و ورود به ضرر بیشتر ،گروه از طرف شما وکیل بوده تا اردر شما را در گروه حراج و به معامله گران دیگر پیشنهاد دهد. در اینصورت و بازگشت قیمت ، معامله گر زیاندیده حق اعتراضی نخواهد داشت\n  ٥-تسویه هر هفته در روز شنبه براساس نرخ تسویه آبشده بازار تهران خواهد بود و گروه هیچ دخالتی در تعیین نرخ تسویه ندارد.بدیهی است انجام تسویه صرفا برای حواله هايي که هنوز باز بوده کارآمد بوده و تاثیری بر حوالجات بسته معامله گران ندارد. \n  ",
        // "٦-تمامی حواله هاي بایستی تاتسویه ساعت١٣ شنبه بسته شوددرغیراینصورت گروه، وكيل بوده تا درعددتسویه،حواله ها را ببندد. \n  ٧-هرلفظ جهت انجام معامله تنهایک دقیقه اعتبار داردودرصورتی که توسط همكارديگر گرفته شودامکان حذف یاباطل شدن ندارد.\n  ٨-تمامی اردرهاي گرفته شده، توسط ربات بصورت حواله با شماره تراكنش ثبت میشودودر لحظه بابسته شدن معاملات توسط همكار ،سود و ضرر محاسبه و بر وجه تضمين اعمال ميگردد.\n ٩-تمامی همكاران نفربه نفربا يكدیگرمعامله میکنند وگروه هیچ دخل وتصرفی درمعاملات نداشته و فقط تضمین پرداختي با گروه است.\n\n  ۱۰- تمامی همكاران اقرار می نمایند که هر گونه قطعی در بستر اینترنت و یا قطع شدن سرور را بدون هیچگونه اعتراضی پذیرفته و همچنین هرگونه  لفظ اشتباه در  خرید یا فروش حواله آبشده در گروه متوجه معامله گر بوده و گروه هیچ مسئولیتی در قبال اشتباه همكاران ندارد.\n۱۱- حواله صادره به منزله خرید یا فروش قطعی نبوده و همكاران می بایست تا پايان تايم كاري آن روز گروه؛ شماره تراکنش خود را به آی دی حسابدار ارسال و هماهنگی لازم را برای پرداخت و دريافت قیمت طلا و نحوه تحویل يا اخذ فیزیکی اعلام نموده و یا حواله خود را در گروه حسب مورد بفروش رسانیده یا بخرد . تاکید میگردد معامله  فقط و فقط بعد از پرداخت وجه(غير از وجه تضمين) یا تحویل طلا به دفتر قطعیت یافته و در صورت عدم واریز وجه یا عدم هماهنگی حواله هاي باز با تسویه يادشده  بسته شده و سود یا زیان حاصل از خرید و فروش حواله غیرقطعی بر وجه تضمین وی اعمال میگردد . محدودیتی در تعداد خرید و فروش حواله در گروه (با درنظر گرفتن میزان وجه تضمین ) وجود ندارد.\n  ۱۲- در هر روز کاری گروه به استثناء شنبه همكاران میبایست حدكثر ظرف ٢٤ساعت از ثبت اردر با حضور در دفتر گروه یا دفاتر نمایندگان ،حسب مورد نسبت به اخذ یا ارائه فیزیکی طلا و با پرداخت قیمت آن اقدام نمایند.در كليه موارد تحويل يا اخذ فيزيكي ،كارمزد به میزان یک درصد قیمت کل بابت هزينه ري گيري و... محاسبه شده و تحویل و اخذ فیزیکی منوط به احراز هویت و ارایه مجوز صنفی خود يا شخص موردنظر وي است.\n  ۱۳- در صورتی که امکان حضور در محل جهت دریافت براي  همكاري که دارای حواله خرید غیر قطعی بوده ،وجود نداشته باشد میتواند با هماهنگی حسابدار، نسبت به واریز وجه  طلا به حساب گروه اقدام و فیش واریزی را ارسال نماید که در این صورت بعد از تایید فیش ، معامله قطعی شده و طلا موضوع حواله خرید از طريق مراجعه معامله گر به نزديك ترين نماينده و يا از طريق شرکت پست به آدرس اعلامی همكار ارسال میگردد . بدیهی است هزینه ارسال و بیمه کالا تماما بر عهده معامله گر  موصوف  است.  \n۱۴- کلیه معاملات نقدي بوده و معاملات كاغذي نداريم.\n۱۵- این گروه معاملاتی تابع قوانین و مقررات جمهوری اسلامی ایران  است. تمامی معاملات  براساس اسم واقعی همكاران صورت گرفته و اسم همكاران با کارت بانکی بايد همخوانی داشته باشد.\n۱۶-معاملات گروه براساس مواد ١٠ و ١٩٠ قانون مدنی و قانون تجارت الکترونیک صورت گرفته و  همكاران با ورود و ثبت نام در  گروه و تایید دکمه قبول ، علم و آگاهی و رضایت خویش را از نحوه و کیفیت معاملات و سایر موارد منعکس در فوق  را  اعلام و حق هرگونه اعتراض را از خود سلب مینماید .\nمعاملات آبشده نقدی ...."
    `☑️شرایط مبادله‌ی فیزیکی طلای آبشده:

    1️⃣لازم به ذکر است که ثبت سفارش و صدور حواله به تنهایی به منزله‌ی ایجاد تعهد برای تبادل فیزیکی طلای آبشده نیست.
    
     2️⃣معامله‌گر باید در صورت تمایل جهت مبادله‌ی فیزیکی طلای آبشده، تا پایان زمان کاری همان روز ثبت سفارش، شماره تراکنش خود را به آی دی حسابداری ارسال کند و هماهنگی‌های لازم را برای تبادل فیزیکی طلای آبشده انجام دهد. پس از آن معامله‌گر باید حدکثر ظرف ۲۴ ساعت پس از ثبت سفارش (به جز روزهای تسویه) با حضور در دفتر تی‌اپ یا دفاتر نمایندگان معرفی شده در شهرهای مختلف، نسبت به مبادله‌ی فیزیکی طلا و نیز واریز و یا دریافت وجه آن اقدام نماید.
    
    3️⃣در کلیه‌ی موارد مبادله‌ی فیزیکی طلای آبشده، مبلغ ۱۱۵/۰۰۰ تومان به ازای هر ۱۰۰ گرم طلای آبشده‌ی مبادله شده، بابت هزینه ری‌گیری و سایر هزینه‌ها از حساب معامله‌گرکسر می‌گردد.
    
    4️⃣تحویل و اخذ فیزیکی منوط به احراز هویت معامله‌گر و یا ارایه‌ی مجوز صنفی است.
    
    5️⃣در صورت عدم امکان حضور معامله‌گر (تنها معامله‌گری که سفارش خرید ثبت کرده و تمایل به دریافت فیزیکی طلای آبشده است) در دفتر تی‌اپ و یا دفاتر نمایندگان معرفی شده، وی می‌تواند با هماهنگی حسابداری، نسبت به واریز وجه طلای مورد نظر اقدام کند و پس از تایید فیش واریزی توسط حسابداری، تا مادامی که شرایط حضور او در دفتر تی‌اپ فراهم شود، طلا به صورت امانت نزد دفتر تی‌اپ می‌ماند.
    
    6️⃣ارسال طلای آبشده از طریق شرکت‌های پستی و یا پیک امکان‌پذیر است. بدیهی است هزینه‌ی ارسال و بیمه‌ی کالا تماما بر عهده‌ی معامله‌گر است.
    
    7️⃣تاکید می‌گردد که معامله فقط و فقط بعد از پرداخت وجه (غیر از وجه تضمین) یا تحویل طلا به دفتر تی‌اپ (و دفاتر نمایندگان) قطعیت دارد و در صورت عدم هماهنگی توسط معامله‌گر برای مبادله‌ی فیزیکی، حواله‌های باز با نرخ تسویه (هر نوع تسویه) بسته می‌شوند و پس از آن سود و یا زیان ناشی از بسته شدن معامله برای وی محاسبه می‌شود.
    
    ⬅️ادامه ...`, 
    `☑️شرایط تسویه:

    1️⃣تسویه هر هفته در روز شنبه ساعت ۱۳:۰۰ براساس نرخ تسویه‌ی طلای آبشده بازار تهران است و گروه معاملاتی تی‌اپ هیچ دخالتی در تعیین نرخ تسویه ندارد.
    
    2️⃣در صورتی که بازار بنا به هر دلیلی در روز شنبه تعطیل باشد، فرایند تسویه به اولین روز غیرتعطیل بعد از شنبه موکول می‌شود.
    
    3️⃣تمامی حواله‌ها بایستی تا زمان تسویه بسته شوند. در غیر این‌صورت، گروه معاملاتی تی‌اپ وکیل است تا حواله‌ها را در مظنه‌ی تسویه ببندد. بدیهی است انجام تسویه صرفا برای حواله‌هایی است که حین تسویه باز هستند و این فرایند بر حواله‌های بسته شده‌ی معامله‌گران تاثیری ندارد.
    
    4️⃣قانون تسویه اضطراری: درصورت ایجاد گپ بیشتر از ۵۰ هزار تومان در مظنه‌ی آبشده نسبت به کلوز‌ شبانه‌ی روز قبل و یا تغییر ۱۰۰ هزار تومانی نسبت به تسویه‌ی روزانه، اتاق معاملاتی تی‌اپ همگام با اتاق‌های معاملاتی روزانه، تسویه‌ی اضطراری خواهد خورد.
    
    ⬅️ادامه ...`,
    `☑️نکات فنی:

    1️⃣لفظ‌های ارایه شده توسط معامله‌گران جهت انجام معامله تنها یک دقیقه اعتبار دارد.
    
    2️⃣در صورتی که لفظ ارایه شده به وسیله‌ی معامله‌گر، توسط معامله‌گران دیگر اجابت شود، این فرایند به منزله‌ی ثبت سفارش قطعی است و امکان حذف یا ابطال آن وجود ندارد.
    
    3️⃣تمامی سفارش‌های ثبت شده توسط معامله‌گران، به صورت حواله با شماره تراکنش خاص توسط ربات ثبت می‌شود. 
    
    4️⃣با بسته شدن معاملات توسط معامله‌گران، ربات به صورت هوشمند سود و یا زیان معاملات بسته شده را محاسبه و آن را بر وجه تضمین اعمال می‌کند. 
    
    5️⃣باتوجه به نوسانات بازار، ربات مجهز به سیستم مارجین است؛ بدین معنا که با توجه به سفارش‌های خرید و یا فروش توسط معامله‌گران، ربات به صورت هوشمند حجم معاملات را با میانگین قیمت سفارش‌های ثبت شده محاسبه و نرخ مشخصی را به عنوان مارجین تعریف می‌کند. در صورتی که معامله‌ی معامله‌گر به حد زیان برسد و سفارش توسط وی بسته نشود، ابتدا ربات به او هشدار ورود به منطقه زیان می‌دهد و در صورت عدم توجه، گروه معاملاتی تی‌اپ از طرف معامله‌گر وکیل است تا سفارش وی را در گروه حراج کند و به معامله‌گران دیگر پیشنهاد دهد. قطعا، معامله‌گر زیان‌دیده حق هیچ‌گونه اعتراضی نخواهد داشت. 
    
    6️⃣معامله‌گر، هر گونه اختلال در اینترنت و یا قطعی در سرور را بدون هیچ‌گونه اعتراضی می‌پذیرد.
    
    7️⃣هرگونه لفظ‌گذاری اشتباه در خرید و یا فروش حواله‌ی طلای آبشده در گروه متوجه معامله‌گر است و گروه معاملاتی تی‌اپ هیچ گونه مسئولیتی در قبال اشتباه معامله‌گران ندارد.
    
    8️⃣لازم به ذکر است، ضمانت پرداختی‌ها به معامله‌گران با گروه معاملاتی تی‌اپ است و هم‌چنین کلیه‌ی معاملات انجام گرفته در این گروه براساس ماده‌ی ۱۰ قانون مدنی و ماده‌ی ۱۹۰ قانون تجارت الکترونیک صورت می‌گیرد و معامله‌گر با ورود و ثبت نام در گروه و تایید دکمه‌ی قبول، علم و آگاهی و رضایت خویش را از نحوه‌ی معاملات و شرایط آن اعلام و حق هرگونه اعتراض را از خود سلب می‌نماید .
    
    
    ✍️ تی‌اپ- خرید و فروش در منزل`
    ],
      role_admin : 'bot-admin',
      role_owner : 'bot-owner',
      role_member : 'bot-member'
}