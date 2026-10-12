document.querySelectorAll('[data-contact-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const isArabic = document.documentElement.lang.toLowerCase().startsWith('ar');
        const message = isArabic
            ? [
                `الاسم: ${data.get('name')}`,
                `بريد العمل: ${data.get('email')}`,
                `الشركة: ${data.get('company') || 'غير محدد'}`,
                '',
                'كيف يمكننا مساعدتك؟',
                data.get('message')
            ].join('\n')
            : [
                `Name: ${data.get('name')}`,
                `Work email: ${data.get('email')}`,
                `Company: ${data.get('company') || 'Not provided'}`,
                '',
                'How can we help?',
                data.get('message')
            ].join('\n');
        const subject = isArabic
            ? `استفسار من الموقع من ${data.get('name')}`
            : `Website enquiry from ${data.get('name')}`;

        window.location.href = `mailto:info@cortexims.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        form.querySelector('[role="status"]').textContent = isArabic
            ? 'من المفترض أن يُفتح تطبيق البريد الإلكتروني مع مسودة. راجعها واضغط «إرسال» للتواصل معنا.'
            : 'Your email app should open with a draft. Review it and press Send to contact our team.';
    });
});
