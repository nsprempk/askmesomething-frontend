import SEO from "../../components/common/SEO.jsx";

const Privacy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Read the Privacy Policy for Ask Me Something and learn how we handle account information, questions, images, voice recordings, AI processing, cookies, analytics, and advertising."
        keywords="Ask Me Something privacy policy, AI privacy policy, user data, AI questions privacy, data protection"
        canonical="https://askmesomething.site/privacy"
      />

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-4xl font-bold text-slate-900">Privacy Policy</h1>

          <p className="mt-4 text-sm text-slate-500">
            Last updated: September 13, 2026
          </p>

          <p className="mt-6 leading-7 text-slate-600">
            Your privacy is important to us. This Privacy Policy explains how
            Ask Me Something collects, uses, processes, and protects information
            when you use our website and services.
          </p>

          {/* Information We Collect */}

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            Information We Collect
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Depending on how you use Ask Me Something, we may collect
            information such as your name, email address, account information,
            questions you submit, and other information that you voluntarily
            provide.
          </p>

          {/* Questions and Content */}

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            Questions and Content
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Questions, images, voice recordings, and other content submitted
            through the platform may be processed by our AI services to
            understand your request and generate an answer.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            We recommend that you do not submit passwords, financial
            information, government identification numbers, or other highly
            sensitive personal information as part of a question or uploaded
            content.
          </p>

          {/* How We Use Information */}

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            How We Use Information
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Information may be used to provide our services, generate AI
            responses, maintain user accounts, improve the functionality of the
            platform, prevent abuse, maintain security, communicate with users,
            and provide customer support.
          </p>

          {/* AI Processing */}

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            AI Processing
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Ask Me Something uses third-party technology and AI services to
            process questions and generate responses. Information submitted
            through the service may therefore be transmitted to service
            providers when necessary to provide the requested functionality.
          </p>

          {/* Account Information */}

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            Account Information
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            If you create an account, we may store information required to
            authenticate your account and provide features such as question
            history, saved answers, and your profile.
          </p>

          {/* Cookies and Analytics */}

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            Cookies and Analytics
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Ask Me Something may use cookies, local storage, analytics
            technologies, and similar tools to maintain functionality,
            understand how visitors use the website, improve our services, and
            measure website performance.
          </p>

          {/* Advertising */}

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            Advertising
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            We may display advertisements through third-party advertising
            services. These services may use cookies or similar technologies to
            provide, measure, and personalize advertisements in accordance with
            their own policies and applicable laws.
          </p>

          {/* Data Security */}

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            Data Security
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            We take reasonable measures to protect information handled through
            our services. However, no internet transmission or electronic
            storage system can be guaranteed to be completely secure.
          </p>

          {/* Third Party Services */}

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            Third-Party Services
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Our website may use third-party services for AI processing,
            analytics, authentication, hosting, security, and advertising. These
            providers may process information according to their own privacy
            policies and terms.
          </p>

          {/* Children's Privacy */}

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            Children's Privacy
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Ask Me Something is not intended to knowingly collect personal
            information from children in violation of applicable laws. If you
            believe that a child has provided personal information to us, please
            contact us so that we can review the request.
          </p>

          {/* Changes */}

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            Changes to This Privacy Policy
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            We may update this Privacy Policy from time to time to reflect
            changes to our services, technology, or legal requirements. Any
            updated version will be posted on this page with a revised "Last
            updated" date.
          </p>

          {/* Contact */}

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            Contact Us
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            If you have questions, concerns, or requests regarding this Privacy
            Policy, please contact us at:
          </p>

          <a
            href="mailto:support@askmesomething.site"
            className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-700"
          >
            support@askmesomething.site
          </a>
        </div>
      </section>
    </>
  );
};

export default Privacy;
