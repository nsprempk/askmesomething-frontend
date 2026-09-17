import SEO from "../../components/common/SEO.jsx";

const About = () => {
  return (
    <>
      <SEO
        title="About Ask Me Something"
        description="Learn about Ask Me Something, an AI-powered question answering platform that helps users get useful answers through text, images, and voice."
        keywords="about Ask Me Something, AI question answering, AI assistant, ask AI, AI learning platform"
        canonical="https://askmesomething.site/about"
      />

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <h1 className="text-4xl font-bold text-slate-900">
          About Ask Me Something
        </h1>

        <p className="mt-6 leading-8 text-slate-600">
          Ask Me Something is an AI-powered question answering platform designed
          to make getting useful information simple. Users can ask questions
          using text, images, or voice.
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          Our goal is to make AI easier to use for learning, exploring ideas,
          understanding concepts, and finding helpful explanations.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-slate-900">
          Ask Questions Your Way
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Whether you prefer typing a question, uploading an image, or speaking
          naturally, Ask Me Something provides multiple ways to interact with AI
          and receive helpful responses.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-slate-900">Our Purpose</h2>

        <p className="mt-4 leading-8 text-slate-600">
          Ask Me Something is built to make AI-powered information and
          explanations more accessible and convenient. The platform can be
          useful for students, learners, curious users, and anyone looking for
          help understanding a topic.
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          We aim to provide a simple experience where you can ask a question and
          receive an AI-generated answer without a complicated process.
        </p>
      </section>
    </>
  );
};

export default About;
