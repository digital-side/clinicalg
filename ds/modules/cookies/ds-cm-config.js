// Define dataLayer and the gtag function.
window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

// Set default consent to 'denied' as a placeholder
// Determine actual values based on your own requirements
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied'
});

function printConsentStatus() {
    console.log("------------- CONSENT STATUS -------------");
    try {
        console.log("analytics_storage: " + (window.google_tag_data.ics.getConsentState("analytics_storage") == 1));
        console.log("ad_storage: " + (window.google_tag_data.ics.getConsentState("ad_storage") == 1));
        console.log("ad_user_data: " + (window.google_tag_data.ics.getConsentState("ad_user_data") == 1));
        console.log("ad_personalization: " + (window.google_tag_data.ics.getConsentState("ad_personalization") == 1));
    } catch (e) {
    }
    console.log("-------------------------------------------");
}

function ds_config_cm(silktideCookieBannerManager, cm_params) {
    silktideCookieBannerManager.updateCookieBannerConfig({
        background: {
            showBackground: true
        },
        cookieIcon: {
            position: "bottomRight"
        },
        cookieTypes: [
            {
                id: "necessary",
                name: "Necesarias",
                //{#description: "<p>These cookies are necessary for the website to function properly and cannot be switched off. They help with things like logging in and setting your privacy preferences.</p>",#}
                description: "<p>Estas cookies son necesarias para el correcto funcionamiento del sitio web y no se pueden desactivar. Facilitan tareas como iniciar sesión y configurar tus preferencias de privacidad.</p>",
                required: true,
                onAccept: function () {
                    console.log('necessary: accept event');
                }
            },
            {
                id: "analytics",
                name: "Analíticas",
                //{#description: "<p>These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.</p>",#}
                description: "<p>Estas cookies nos ayudan a mejorar el sitio al rastrear qué páginas son más populares y cómo los visitantes navegan por el sitio.</p>",
                required: false,
                defaultValue: true,
                //{#gtag: 'analytics_storage', // Automatic Google Tag Manager / Silktide Analytics integration#}
                onAccept: function () {
                    gtag('consent', 'update', {analytics_storage: 'granted',});
                    dataLayer.push({'event': 'consent_accepted_analytics',});
                    console.log("analytics: accept event");
                    printConsentStatus();
                },
                onReject: function () {
                    gtag('consent', 'update', {analytics_storage: 'denied',});
                    console.log("analytics: reject event");
                    printConsentStatus();
                }
            },
            {
                id: "marketing",
                name: "Publicidad",
                //{#description: "<p>These cookies provide extra features and personalization to improve your experience. They may be set by us or by partners whose services we use.</p>",#}
                description: "<p>Estas cookies proporcionan funciones adicionales y personalización para mejorar tu experiencia. Pueden ser establecidas por nosotros o por nuestros socios cuyos servicios utilizamos.</p>",
                required: false,
                defaultValue: false,
                //{#gtag: ['ad_storage', 'ad_user_data', 'ad_personalization'],#}
                onAccept: function () {
                    /* con el tag gtag se hace automático este código */
                    gtag('consent', 'update', {
                        ad_storage: 'granted',
                        ad_user_data: 'granted',
                        ad_personalization: 'granted'
                    });
                    dataLayer.push({
                        'event': 'consent_accepted_advertising',
                    });

                    console.log("advertising: accept event");
                    printConsentStatus();
                },
                onReject: function () {
                    /* con el tag gtag se hace automático este código */
                    gtag('consent', 'update', {
                        ad_storage: 'denied',
                        ad_user_data: 'denied',
                        ad_personalization: 'denied'
                    });

                    console.log("advertising: reject event");
                    printConsentStatus();
                }
            }
        ],
        text: {
            banner: {
                // description: "<p>We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic. <a href=\"https://your-website.com/cookie-policy\" target=\"_blank\">Cookie Policy.</a></p>",
                description: "<p>Utilizamos cookies en nuestro sitio para mejorar su experiencia de usuario, proporcionar contenido personalizado y analizar nuestro tráfico.<a href=\"" + cm_params.cookies_policy_url + "\" target=\"_blank\">Política de Cookies.</a></p>",
                acceptAllButtonText: "Aceptar todas",
                acceptAllButtonAccessibleLabel: "Aceptar todas",
                rejectNonEssentialButtonText: "Rechazar no esenciales",
                rejectNonEssentialButtonAccessibleLabel: "Rechazar no esenciales",
                preferencesButtonText: "Preferencias",
                preferencesButtonAccessibleLabel: "Cambiar preferencias"
            },
            preferences: {
                title: "Modificar preferencias de cookies",
                //{#description: "<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.</p>",#}
                description: "<p>Respetamos su derecho a la privacidad. Puede optar por no permitir algunos tipos de cookies. Sus preferencias de cookies se aplicarán en todo nuestro sitio web.</p>",
                creditLinkText: "Get this banner for free",
                creditLinkAccessibleLabel: "Get this banner for free"
            }
        }
    });
}