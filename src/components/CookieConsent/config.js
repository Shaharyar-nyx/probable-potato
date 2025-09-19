// Push a dataLayer event for ANY <form> submit (native or SPA)
const installFormSubmitListener = () => {
  if (typeof window === "undefined") return;     // SSR guard
  if (window.__formListenerInstalled) return;    // idempotent
  window.__formListenerInstalled = true;

  document.addEventListener(
    "submit",
    function (e) {
      try {
        var f = e && e.target && e.target.tagName &&
                e.target.tagName.toLowerCase() === "form"
                ? e.target
                : null;
        if (!f) return;

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form_submit",                 // GTM trigger listens for this
          form_id: f.id || "",
          form_name: f.getAttribute("name") || "",
          form_target: f.getAttribute("action") || "",
          form_class: f.getAttribute("class") || "",
          page_location: window.location.href
        });
      } catch (_) {}
    },
    true // capture phase so we catch submits even if preventDefault is used
  );
};

const getConfig = () => {
  const config = {
    /**
     * Callback functions
     */
    onFirstConsent: () => {},

    onConsent: () => {},

    onChange: ({ changedCategories }) => {
      // Check if the user accepted the Analytics cookies (which includes GTM)
      if (changedCategories.analytics === "accepted") {
        // Load GTM when user accepts analytics cookies
        loadGTM();
        // Push consent information to dataLayer for real-time tracking in GTM/Google Analytics
        window.dataLayer.push({
          event: "consentGranted",
          analyticsConsent: "accepted",
        });
      } else if (changedCategories.analytics === "rejected") {
        // Disable GTM when user rejects analytics cookies
        window["ga-disable-GTM-WM4FZ8G3"] = true; // Disable all tags and scripts in GTM
        window.dataLayer.push({
          event: "consentDenied",
          analyticsConsent: "rejected",
        });
      }
    },

    onModalReady: () => {},

    onModalShow: () => {},

    onModalHide: () => {},

    guiOptions: {
      consentModal: {
        layout: "bar inline",
        position: "bottom right",
        equalWeightButtons: true,
        flipButtons: true,
      },
      preferencesModal: {
        layout: "box",
        equalWeightButtons: true,
        flipButtons: false,
      },
    },

    categories: {
      necessary: {
        enabled: true, // necessary category is enabled
        readOnly: true, // cannot be disabled by the user
        services: {
          session: {
            label: "Session Cookie",
            description: "This cookie is necessary for the session.",
          },
          auth: {
            label: "Authentication Cookie",
            description: "This cookie is necessary for user authentication.",
          },
        },
      },
      analytics: {
        autoClear: {
          cookies: [
            {
              name: /^_ga/, // regex: match all cookies starting with '_ga'
            },
            {
              name: "_gid", // string: exact cookie name
            },
          ],
        },
        services: {
          ga: {
            label: "Google Tag Manager",
            onAccept: () => {
              loadGTM();
              window.dataLayer.push({
                event: "consentGranted",
                analyticsConsent: "accepted",
              });
            },
            onReject: () => {
              window["ga-disable-GTM-WM4FZ8G3"] = true;
              window.dataLayer.push({
                event: "consentDenied",
                analyticsConsent: "rejected",
              });
            },
          },
        },
      },
    },

    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            title: "We use cookies!",
            description:
              "Hi! This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            showPreferencesBtn: "Manage Individual Preferences",
            // closeIconLabel: 'Reject all and close modal',
            // footer: `<a href="/privacy-policy.html" target="_blank">Privacy Policy</a>`,
          },
          preferencesModal: {
            title: "Manage cookie preferences",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            savePreferencesBtn: "Accept current selection",
            closeIconLabel: "Close modal",
            serviceCounterLabel: "Service|Services",
            sections: [
              {
                title: "Your Privacy Choices",
                description: `In this panel you can express some preferences related to the processing of your personal information. You may review and change expressed choices at any time by resurfacing this panel via the provided link. To deny your consent to the specific processing activities described below, switch the toggles to off or use the “Reject all” button and confirm you want to save your choices.`,
              },
              {
                title: "Strictly Necessary",
                description:
                  "These cookies are essential for the proper functioning of the website and cannot be disabled.",
                linkedCategory: "necessary",
              },
              {
                title: "Performance and Analytics",
                description:
                  "These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.",
                linkedCategory: "analytics",
                cookieTable: {
                  caption: "Cookie table",
                  headers: {
                    name: "Cookie",
                    domain: "Domain",
                    desc: "Description",
                  },
                  body: [
                    {
                      name: "_ga",
                      domain: location.hostname,
                      desc: "This cookie is used by Google Analytics to distinguish users and track their behavior on the website. It helps us analyze site usage patterns and improve your experience.",
                    },
                    {
                      name: "_gid",
                      domain: location.hostname,
                      desc: "This cookie is also used by Google Analytics to distinguish users, but it has a shorter lifespan (expires after 24 hours). It helps track user behavior within a session to improve site performance.",
                    },
                  ],
                },
              },
              {
                title: "More information",
                description:
                  'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="/contact-us">contact us</a>.',
              },
            ],
          },
        },
      },
    },
  };

  return config;
};

// Function to load Google Tag Manager (GTM)
const loadGTM = () => {
  // Check if GTM is already loaded
  if (window.dataLayer) {
    return;
  }

  // Create a new dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];
  
  // catch form submit
  installFormSubmitListener();

  // Dynamically load the GTM script
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtm.js?id=GTM-WM4FZ8G3`; // Replace with your GTM container ID
  script.async = true;
  script.onload = () => {
    // After GTM is loaded, push initial events to the dataLayer
    window.dataLayer.push({
      event: "gtm.loaded",
      gtmContainerId: "GTM-WM4FZ8G3", // Replace with your container ID
    });
  };
  document.head.appendChild(script);

  // Inline Google Tag Manager script
  const inlineScript = document.createElement("script");
  inlineScript.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-WM4FZ8G3');
  `;
  document.head.appendChild(inlineScript);
};

export default getConfig;
