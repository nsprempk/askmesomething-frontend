import { Link } from "react-router-dom";
import {
  ArrowRight,
  Image,
  Mic,
  Sparkles,
  MessageSquare,
  Brain,
} from "lucide-react";

import SEO from "../../components/common/SEO.jsx";

const Home = () => {
  const methods = [
    {
      icon: MessageSquare,
      title: "Ask with Text",
      description: "Type your question and get a clear AI-powered answer.",
    },
    {
      icon: Image,
      title: "Ask with Image",
      description:
        "Upload a question, homework problem, diagram or screenshot.",
    },
    {
      icon: Mic,
      title: "Ask with Voice",
      description: "Speak naturally and let AI understand your question.",
    },
  ];

  const categories = [
    ["🎓", "Education"],
    ["🔬", "Science"],
    ["⚽", "Sports"],
    ["🧮", "Mathematics"],
    ["💻", "Technology"],
    ["📚", "General Knowledge"],
    ["🕉️", "Religious"],
    ["🌎", "Geography"],
  ];

  return (
    <>
      {/* ==========================================
          SEO
      ========================================== */}

      <SEO
        title="Ask Me Something - Ask Questions, Get Intelligent AI Answers"
        description="Ask Me Something is an AI-powered question and answer platform where you can ask questions using text, images, or voice and receive clear, helpful answers across education, science, mathematics, technology, sports, geography, and more."
        keywords="ask AI questions, AI question answer, ask anything AI, AI answers, ask questions online, AI homework help, AI image questions, AI voice questions, AI learning assistant"
        canonical="/"
      />

      <div>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                <Sparkles size={16} />
                Your questions. Intelligent answers.
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
                Ask anything.
                <span className="block text-blue-600">
                  Understand everything.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Ask Me Something helps you get answers using text, images, or
                your voice. Choose a topic, ask your question, and let AI do the
                rest.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/ask"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                >
                  <Sparkles size={18} />
                  Ask AI
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/about"
                  className="w-full rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-center font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-slate-200 bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                How it works
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                Get answers in three simple steps
              </h2>

              <p className="mt-4 text-slate-600">
                No complicated process. Just ask your question and get an
                answer.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                [
                  "01",
                  "Choose a topic",
                  "Select the category that best matches your question.",
                ],
                [
                  "02",
                  "Ask your question",
                  "Type it, upload an image, or record your voice.",
                ],
                [
                  "03",
                  "Get your answer",
                  "Receive a clear and useful AI-generated response.",
                ],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-7"
                >
                  <div className="text-sm font-bold text-blue-600">
                    {number}
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-slate-900">
                    {title}
                  </h3>

                  <p className="mt-3 leading-6 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Question methods */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Three ways to ask
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                Ask the way that feels natural
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {methods.map((method) => {
                const Icon = method.icon;

                return (
                  <div
                    key={method.title}
                    className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={24} />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-slate-900">
                      {method.title}
                    </h3>

                    <p className="mt-3 leading-6 text-slate-600">
                      {method.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-slate-900 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                Explore topics
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Questions across many topics
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                From education and science to sports and technology, choose what
                you want to explore.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {categories.map(([icon, name]) => (
                <Link
                  key={name}
                  to="/ask"
                  className="group rounded-2xl border border-slate-700 bg-slate-800 p-5 transition hover:border-blue-500 hover:bg-slate-700"
                >
                  <div className="text-3xl">{icon}</div>

                  <div className="mt-3 font-semibold text-white">{name}</div>

                  <ArrowRight
                    size={17}
                    className="mt-3 text-slate-500 transition group-hover:translate-x-1 group-hover:text-blue-400"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Brain size={28} />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl">
              Have a question?
            </h2>

            <p className="mt-4 text-slate-600">Don't overthink it. Just ask.</p>

            <Link
              to="/ask"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Ask Me Something
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
