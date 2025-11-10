import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://fluxtrade.net';

export function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  article,
  noindex = false,
  geo,
}) {
  const fullTitle = title ? `${title} | FluxTrade` : 'FluxTrade - Advanced Trading Software & Strategies';
  const fullDescription = description || 'FluxTrade builds advanced trading software and subscription-based tools for traders and institutions. Reliable, robust, and innovative solutions for the markets.';
  const fullCanonical = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const fullOgImage = ogImage || `${BASE_URL}/logo512.png`;

  // Structured Data - Organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FluxTrade',
    url: BASE_URL,
    logo: `${BASE_URL}/logo512.png`,
    description: fullDescription,
    sameAs: [
      // Add social media URLs if available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${BASE_URL}/support`,
    },
  };

  // Structured Data - Website
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FluxTrade',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/backtests/explorer?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Structured Data - Article (if article prop provided)
  const articleSchema = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: fullOgImage,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: 'FluxTrade',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FluxTrade',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo512.png`,
      },
    },
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* GEO Targeting */}
      {geo && (
        <>
          <meta name="geo.region" content={geo.region} />
          {geo.placename && <meta name="geo.placename" content={geo.placename} />}
          {geo.position && <meta name="geo.position" content={geo.position} />}
          <meta name="ICBM" content={geo.position || geo.region} />
        </>
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="FluxTrade" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@fluxtrade" />

      {/* LinkedIn */}
      <meta property="linkedin:owner" content="FluxTrade" />

      {/* Additional SEO Meta Tags */}
      <meta name="author" content="FluxTrade" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
}

