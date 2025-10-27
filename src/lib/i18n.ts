// File: src/lib/i18n.ts
export type Lang = "tr" | "es" | "ar" | "de" | "en" | "fr";

export const messages: Record<Lang, Record<string, string>> = {
  tr: {
    // Header / Page
    title: "Ekvador Savunma Doğrulama Portalı",
    subtitle: "Güvenli ürün, güvenli sistem • Ekvador",
    pageSectionTitle: "Ürün Doğrulama (Ekvador)",
    pageSectionHint: "Seri numarasını girin ve kategori seçin. Örnek seri:",
    footer: "Ekvador Savunma Doğrulama Portalı • “Güvenli ürün, güvenli sistem”",

    // Success toast
    activatedSuccess: "Ürün başarıyla etkinleştirildi!",

    // Demo note
    demoNote:
      "KVKK: Bu demo arayüzde girilen kişisel veriler sadece gösterim amaçlıdır. Gerçek sistemde verileriniz; Ekvador’da sunulan ürünlerin doğrulama güvenliği, sahtecilik önleme ve destek süreçleri için ilgili mevzuata uygun şekilde işlenir ve saklanır.",

    // Verify form
    serialPlaceholder: "Seri numarası örn: TR-BAL-001",
    selectCategory: "Kategori seçin",
    verify: "Doğrula",

    // Errors (modal step 1)
    errFillAll: "Lütfen ad, soyad ve telefon alanlarını doldurun",
    errPhone: "Telefon formatı geçersiz",
    errChecks: "Lütfen gerekli onay kutucuklarını işaretleyin",

    // ResultCard texts
    enteredCode: "Girilen kod:",
    codeNotFound: "Kod bulunamadı",
    codeNotFoundDesc: "Yazımı kontrol edin veya satıcı ile iletişime geçin.",
    warnSelectCategory: "Lütfen kategori seçin",
    warnCategoryMismatch: "Seçilen kategori bu kod ile uyuşmuyor. Beklenen:",
    warnAlreadyActivated:
      "Bu kod daha önce etkinleştirilmiş. Ürün orijinal olmayabilir, lütfen destek birimi ile iletişime geçin.",
    product: "Ürün",
    note: "Not:",
    category: "Kategori",
    registeredOwner: "Kayıtlı Sahip (maskeli)",
    firstName: "Ad",
    lastName: "Soyad",
    phone: "Telefon",
    activate: "Etkinleştir",

    // ActivateModal
    activationTitle: "Aktivasyon Bilgileri",
    activationSubtitle: "Daha güvenli doğrulama için bilgilerinizi girin.",
    phonePlaceholder: "Telefon (örn: +90 555 555 55 55)",
    agreePolicy: "Politikayı okudum ve kabul ediyorum.",
    confirmAccuracy: "Bilgilerimin doğru olduğunu beyan ederim.",
    kvkkText:
      "KVKK Aydınlatma Metni kapsamında bilgileriniz; doğrulama güvenliği, sahtecilik tespiti ve destek süreçleri için mevzuata uygun şekilde işlenir.",
    cancel: "İptal",
    continue: "Devam et",
    summaryTitle: "Özet ve Onay",
    code: "Kod",
    fullName: "Ad Soyad",
    edit: "Düzenle",
    confirming: "Onaylanıyor…",
    confirmActivation: "Aktivasyonu Onayla",

    // NEW: Categories
    "category.uniform1": "Üniforma 1",
    "category.uniform2": "Üniforma 2",
    "category.uniform3": "Üniforma 3",

    // NEW: Status meta
    "status.UNUSED.label": "Orijinal: etkinleştirilmedi",
    "status.UNUSED.desc": "Kod bulundu. Satın alımda etkinleştirilebilir.",
    "status.ACTIVATED.label": "Kod zaten etkinleştirildi",
    "status.ACTIVATED.desc": "Bu ürün daha önce doğrulandı.",
    "status.BLOCKED.label": "Kod engellendi",
    "status.BLOCKED.desc": "Lütfen satıcı veya destek ile iletişime geçin.",
  },

  es: {
    title: "Portal de Verificación de Defensa de Ecuador",
    subtitle: "Producto seguro, sistema seguro • Ecuador",
    pageSectionTitle: "Verificación de Producto (Ecuador)",
    pageSectionHint: "Introduzca el número de serie y seleccione la categoría. Ejemplo:",
    footer: "Portal de Verificación de Defensa de Ecuador • “Producto seguro, sistema seguro”",
    activatedSuccess: "¡Producto activado correctamente!",
    demoNote:
      "Aviso: Los datos personales introducidos en esta demo son solo para demostración. En un sistema real se procesan conforme a la normativa aplicable en Ecuador.",

    serialPlaceholder: "Número de serie ej.: TR-BAL-001",
    selectCategory: "Seleccione categoría",
    verify: "Verificar",

    errFillAll: "Por favor, complete nombre, apellido y teléfono",
    errPhone: "Formato de teléfono no válido",
    errChecks: "Marque las casillas de confirmación requeridas",

    enteredCode: "Código introducido:",
    codeNotFound: "Código no encontrado",
    codeNotFoundDesc: "Verifique la escritura o contacte con el vendedor.",
    warnSelectCategory: "Seleccione una categoría",
    warnCategoryMismatch: "La categoría elegida no coincide. Esperado:",
    warnAlreadyActivated:
      "Este código ya fue activado. El producto podría no ser original; póngase en contacto con soporte.",
    product: "Producto",
    note: "Nota:",
    category: "Categoría",
    registeredOwner: "Propietario registrado (enmascarado)",
    firstName: "Nombre",
    lastName: "Apellido",
    phone: "Teléfono",
    activate: "Activar",

    activationTitle: "Datos de Activación",
    activationSubtitle: "Introduzca sus datos para una verificación más segura.",
    phonePlaceholder: "Teléfono (p. ej.: +593 99 999 9999)",
    agreePolicy: "He leído y acepto la política.",
    confirmAccuracy: "Declaro que mis datos son correctos.",
    kvkkText:
      "Sus datos se procesarán conforme a la normativa aplicable con fines de seguridad de verificación, detección de fraude y soporte.",
    cancel: "Cancelar",
    continue: "Continuar",
    summaryTitle: "Resumen y Confirmación",
    code: "Código",
    fullName: "Nombre y Apellido",
    edit: "Editar",
    confirming: "Confirmando…",
    confirmActivation: "Confirmar Activación",

    // NEW: Categories
    "category.uniform1": "Uniforme 1",
    "category.uniform2": "Uniforme 2",
    "category.uniform3": "Uniforme 3",

    // NEW: Status meta
    "status.UNUSED.label": "Original: no activado",
    "status.UNUSED.desc": "Código encontrado. Puede activarse en la compra.",
    "status.ACTIVATED.label": "Código ya activado",
    "status.ACTIVATED.desc": "Este producto ya fue verificado.",
    "status.BLOCKED.label": "Código bloqueado",
    "status.BLOCKED.desc": "Póngase en contacto con el vendedor o soporte.",
  },

  ar: {
    title: "بوابة التحقق الدفاعية في الإكوادور",
    subtitle: "منتج آمن، نظام آمن • الإكوادور",
    pageSectionTitle: "التحقق من المنتج (الإكوادور)",
    pageSectionHint: "أدخل الرقم التسلسلي واختر الفئة. مثال:",
    footer: "بوابة التحقق الدفاعية في الإكوادور • «منتج آمن، نظام آمن»",
    activatedSuccess: "تم تفعيل المنتج بنجاح!",
    demoNote:
      "ملاحظة: البيانات الشخصية المُدخلة في هذا العرض لأغراض توضيحية فقط. في النظام الفعلي تُعالج وفق القوانين المعمول بها في الإكوادور.",

    serialPlaceholder: "رقم تسلسلي مثال: TR-BAL-001",
    selectCategory: "اختر الفئة",
    verify: "تحقق",

    errFillAll: "يرجى إدخال الاسم والكنية ورقم الهاتف",
    errPhone: "صيغة رقم الهاتف غير صحيحة",
    errChecks: "يرجى تحديد مربعات التأكيد المطلوبة",

    enteredCode: "الرمز المُدخل:",
    codeNotFound: "لم يتم العثور على الرمز",
    codeNotFoundDesc: "تحقق من الكتابة أو تواصل مع البائع.",
    warnSelectCategory: "يرجى اختيار فئة",
    warnCategoryMismatch: "الفئة المختارة لا تطابق هذا الرمز. المتوقعة:",
    warnAlreadyActivated:
      "تم تفعيل هذا الرمز سابقًا. قد لا يكون المنتج أصليًا، يُرجى التواصل مع الدعم.",
    product: "المنتج",
    note: "ملاحظة:",
    category: "الفئة",
    registeredOwner: "المالك المسجل (مخفي)",
    firstName: "الاسم",
    lastName: "الكنية",
    phone: "الهاتف",
    activate: "تفعيل",

    activationTitle: "بيانات التفعيل",
    activationSubtitle: "أدخل بياناتك لضمان تحقق أكثر أمانًا.",
    phonePlaceholder: "الهاتف (مثال: +90 555 555 55 55)",
    agreePolicy: "قرأت السياسة وأوافق عليها.",
    confirmAccuracy: "أقرّ بصحة بياناتي.",
    kvkkText:
      "تُعالج بياناتك وفق القوانين لأغراض أمان التحقق وكشف الاحتيال ودعم العملاء.",
    cancel: "إلغاء",
    continue: "متابعة",
    summaryTitle: "ملخص وتأكيد",
    code: "الرمز",
    fullName: "الاسم الكامل",
    edit: "تعديل",
    confirming: "جارٍ التأكيد…",
    confirmActivation: "تأكيد التفعيل",

    // NEW: Categories
    "category.uniform1": "الزي 1",
    "category.uniform2": "الزي 2",
    "category.uniform3": "الزي 3",

    // NEW: Status meta
    "status.UNUSED.label": "أصلي: غير مُفعّل",
    "status.UNUSED.desc": "تم العثور على الرمز. يمكن تفعيله عند الشراء.",
    "status.ACTIVATED.label": "الرمز مُفعّل سابقًا",
    "status.ACTIVATED.desc": "تم التحقق من هذا المنتج مسبقًا.",
    "status.BLOCKED.label": "الرمز محظور",
    "status.BLOCKED.desc": "يرجى التواصل مع البائع أو الدعم.",
  },

  de: {
    title: "Ecuador Verteidigungs-Verifizierungsportal",
    subtitle: "Sicheres Produkt, sicheres System • Ecuador",
    pageSectionTitle: "Produktverifizierung (Ecuador)",
    pageSectionHint: "Seriennummer eingeben und Kategorie wählen. Beispiel:",
    footer: "Ecuador Verteidigungs-Verifizierungsportal • „Sicheres Produkt, sicheres System“",
    activatedSuccess: "Produkt erfolgreich aktiviert!",
    demoNote:
      "Hinweis: In dieser Demo eingegebene personenbezogene Daten dienen nur der Vorführung. Im Produktivsystem werden sie gemäß den Vorschriften in Ecuador verarbeitet.",

    serialPlaceholder: "Seriennummer z. B.: TR-BAL-001",
    selectCategory: "Kategorie wählen",
    verify: "Prüfen",

    errFillAll: "Bitte Vorname, Nachname und Telefonnummer ausfüllen",
    errPhone: "Telefonformat ist ungültig",
    errChecks: "Bitte erforderliche Bestätigungsfelder ankreuzen",

    enteredCode: "Eingegebener Code:",
    codeNotFound: "Code nicht gefunden",
    codeNotFoundDesc: "Bitte Schreibweise prüfen oder den Verkäufer kontaktieren.",
    warnSelectCategory: "Bitte eine Kategorie wählen",
    warnCategoryMismatch: "Die gewählte Kategorie stimmt nicht überein. Erwartet:",
    warnAlreadyActivated:
      "Dieser Code wurde bereits aktiviert. Das Produkt könnte nicht original sein. Bitte Support kontaktieren.",
    product: "Produkt",
    note: "Hinweis:",
    category: "Kategorie",
    registeredOwner: "Registrierter Besitzer (maskiert)",
    firstName: "Vorname",
    lastName: "Nachname",
    phone: "Telefon",
    activate: "Aktivieren",

    activationTitle: "Aktivierungsdaten",
    activationSubtitle: "Geben Sie Ihre Daten für eine sichere Verifizierung ein.",
    phonePlaceholder: "Telefon (z. B.: +49 151 23456789)",
    agreePolicy: "Ich habe die Richtlinie gelesen und stimme zu.",
    confirmAccuracy: "Ich bestätige die Richtigkeit meiner Angaben.",
    kvkkText:
      "Ihre Daten werden gemäß den Vorschriften zum Zwecke der Verifizierungssicherheit, Betrugserkennung und des Supports verarbeitet.",
    cancel: "Abbrechen",
    continue: "Weiter",
    summaryTitle: "Zusammenfassung & Bestätigung",
    code: "Code",
    fullName: "Vollständiger Name",
    edit: "Bearbeiten",
    confirming: "Wird bestätigt…",
    confirmActivation: "Aktivierung bestätigen",

    // NEW: Categories
    "category.uniform1": "Uniform 1",
    "category.uniform2": "Uniform 2",
    "category.uniform3": "Uniform 3",

    // NEW: Status meta
    "status.UNUSED.label": "Original: nicht aktiviert",
    "status.UNUSED.desc": "Code gefunden. Kann beim Kauf aktiviert werden.",
    "status.ACTIVATED.label": "Code bereits aktiviert",
    "status.ACTIVATED.desc": "Dieses Produkt wurde bereits verifiziert.",
    "status.BLOCKED.label": "Code gesperrt",
    "status.BLOCKED.desc": "Bitte Verkäufer oder Support kontaktieren.",
  },

  en: {
    title: "Ecuador Defense Verification Portal",
    subtitle: "Secure product, secure system • Ecuador",
    pageSectionTitle: "Product Verification (Ecuador)",
    pageSectionHint: "Enter serial and choose category. Example:",
    footer: "Ecuador Defense Verification Portal • “Secure product, secure system”",
    activatedSuccess: "Product activated successfully!",
    demoNote:
      "Note: Personal data entered in this demo is for demonstration only. In production it is processed under applicable regulations in Ecuador.",

    serialPlaceholder: "Serial e.g. TR-BAL-001",
    selectCategory: "Select category",
    verify: "Verify",

    errFillAll: "Please fill first name, last name and phone",
    errPhone: "Invalid phone format",
    errChecks: "Please tick the required confirmation boxes",

    enteredCode: "Entered code:",
    codeNotFound: "Code not found",
    codeNotFoundDesc: "Check the spelling or contact the seller.",
    warnSelectCategory: "Please select a category",
    warnCategoryMismatch: "Selected category does not match. Expected:",
    warnAlreadyActivated:
      "This code has already been activated. The product may not be original; please contact support.",
    product: "Product",
    note: "Note:",
    category: "Category",
    registeredOwner: "Registered Owner (masked)",
    firstName: "First name",
    lastName: "Last name",
    phone: "Phone",
    activate: "Activate",

    activationTitle: "Activation Details",
    activationSubtitle: "Enter your details for a more secure verification.",
    phonePlaceholder: "Phone (e.g.: +1 555 555 5555)",
    agreePolicy: "I have read and accept the policy.",
    confirmAccuracy: "I confirm my information is accurate.",
    kvkkText:
      "Your data is processed for verification security, fraud detection, and support under applicable regulations.",
    cancel: "Cancel",
    continue: "Continue",
    summaryTitle: "Summary & Confirmation",
    code: "Code",
    fullName: "Full name",
    edit: "Edit",
    confirming: "Confirming…",
    confirmActivation: "Confirm Activation",

    // NEW: Categories
    "category.uniform1": "Uniform 1",
    "category.uniform2": "Uniform 2",
    "category.uniform3": "Uniform 3",

    // NEW: Status meta
    "status.UNUSED.label": "Original: not activated",
    "status.UNUSED.desc": "Code found. Can be activated on purchase.",
    "status.ACTIVATED.label": "Code already activated",
    "status.ACTIVATED.desc": "This product has been verified before.",
    "status.BLOCKED.label": "Code blocked",
    "status.BLOCKED.desc": "Please contact the seller or support.",
  },

  fr: {
    title: "Portail de Vérification de Défense de l’Équateur",
    subtitle: "Produit sûr, système sûr • Équateur",
    pageSectionTitle: "Vérification du Produit (Équateur)",
    pageSectionHint: "Saisissez le numéro de série et choisissez la catégorie. Exemple :",
    footer: "Portail de Vérification de Défense de l’Équateur • « Produit sûr, système sûr »",
    activatedSuccess: "Produit activé avec succès !",
    demoNote:
      "Note : Les données personnelles saisies dans cette démo servent uniquement d’illustration. En production elles sont traitées selon la réglementation en vigueur en Équateur.",

    serialPlaceholder: "N° de série ex. : TR-BAL-001",
    selectCategory: "Choisir une catégorie",
    verify: "Vérifier",

    errFillAll: "Veuillez renseigner le prénom, le nom et le téléphone",
    errPhone: "Format de téléphone invalide",
    errChecks: "Veuillez cocher les cases de confirmation requises",

    enteredCode: "Code saisi :",
    codeNotFound: "Code introuvable",
    codeNotFoundDesc: "Vérifiez la saisie ou contactez le vendeur.",
    warnSelectCategory: "Veuillez choisir une catégorie",
    warnCategoryMismatch: "La catégorie choisie ne correspond pas. Attendu :",
    warnAlreadyActivated:
      "Ce code a déjà été activé. Le produit peut ne pas être original ; veuillez contacter le support.",
    product: "Produit",
    note: "Note :",
    category: "Catégorie",
    registeredOwner: "Propriétaire enregistré (masqué)",
    firstName: "Prénom",
    lastName: "Nom",
    phone: "Téléphone",
    activate: "Activer",

    activationTitle: "Données d’Activation",
    activationSubtitle: "Saisissez vos informations pour une vérification plus sûre.",
    phonePlaceholder: "Téléphone (ex. : +33 6 12 34 56 78)",
    agreePolicy: "J’ai lu et j’accepte la politique.",
    confirmAccuracy: "Je certifie l’exactitude de mes informations.",
    kvkkText:
      "Vos données sont traitées, conformément à la réglementation, pour la sécurité de vérification, la détection de fraude et l’assistance.",
    cancel: "Annuler",
    continue: "Continuer",
    summaryTitle: "Récapitulatif & Confirmation",
    code: "Code",
    fullName: "Nom complet",
    edit: "Modifier",
    confirming: "Confirmation…",
    confirmActivation: "Confirmer l’Activation",

    // NEW: Categories
    "category.uniform1": "Uniforme 1",
    "category.uniform2": "Uniforme 2",
    "category.uniform3": "Uniforme 3",

    // NEW: Status meta
    "status.UNUSED.label": "Original : non activé",
    "status.UNUSED.desc": "Code trouvé. Peut être activé lors de l’achat.",
    "status.ACTIVATED.label": "Code déjà activé",
    "status.ACTIVATED.desc": "Ce produit a déjà été vérifié.",
    "status.BLOCKED.label": "Code bloqué",
    "status.BLOCKED.desc": "Veuillez contacter le vendeur ou le support.",
  },
};
