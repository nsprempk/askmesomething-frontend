import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Ask Me Something - Ask Questions, Get AI Answers",
  description = "Ask Me Something is an AI-powered question and answer platform where you can ask questions using text, images, or your voice and get helpful AI-generated answers.",
  canonical = "https://askmesomething.site/",
  noindex = false,
}) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      <meta
        name="googlebot"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:url" content={canonical} />

      <meta property="og:type" content="website" />

      <meta property="og:site_name" content="Ask Me Something" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
