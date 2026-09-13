import { Mail } from "lucide-react";
import SEO from "../../components/common/SEO.jsx";

const Contact = () => {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Contact Ask Me Something for questions, suggestions, feedback, or support. Get in touch with the Ask Me Something team at support@askmesomething.site."
        keywords="contact Ask Me Something, Ask Me Something support, AI support, AI question answering support"
      />

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>

          <p className="mt-4 leading-7 text-slate-600">
            Have a question, suggestion, or need help with Ask Me Something?
            We'd love to hear from you.
          </p>

          <a
            href="mailto:support@askmesomething.site"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Mail size={18} />
            support@askmesomething.site
          </a>
        </div>
      </section>
    </>
  );
};

export default Contact;
