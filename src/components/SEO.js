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
  faq,
  products,
  breadcrumbs,
  softwareApplication,
  howTo,
  video,
}) {
  const fullTitle = title ? `${title} | FluxTrade` : 'FluxTrade - Advanced Trading Software & Strategies';
  const fullDescription = description || 'FluxTrade builds advanced trading software and subscription-based tools for traders and institutions. Reliable, robust, and innovative solutions for the markets.';
  const fullCanonical = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const fullOgImage = ogImage || `${BASE_URL}/logo512.png`;

  // Structured Data - Organization (Enhanced for GEO)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FluxTrade',
    url: BASE_URL,
    logo: `${BASE_URL}/logo512.png`,
    description: 'FluxTrade provides advanced trading software, automated strategies, and indicators for NinjaTrader and TradingView. Professional-grade trading solutions for prop firms and individual traders.',
    foundingDate: '2020',
    legalName: 'FluxTrade',
    sameAs: [
      // Add social media URLs if available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${BASE_URL}/support`,
      availableLanguage: 'English',
    },
    areaServed: 'Worldwide',
    knowsAbout: [
      'Trading Software',
      'Automated Trading Strategies',
      'NinjaTrader Indicators',
      'TradingView Strategies',
      'Prop Firm Trading',
      'Algorithmic Trading',
      'Backtested Trading Strategies',
    ],
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

  // Structured Data - FAQPage (for GEO - AI engines love FAQs)
  const faqSchema = faq && faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  // Structured Data - Product/Service (for pricing pages)
  const productSchemas = products && products.length > 0 ? products.map(product => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'FluxTrade',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'USD',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}${canonical || ''}`,
      priceValidUntil: product.priceValidUntil,
    },
    category: product.category || 'Trading Software',
    applicationCategory: 'Trading Software',
    operatingSystem: product.platform || 'NinjaTrader, TradingView',
  })) : null;

  // Structured Data - BreadcrumbList (helps AI understand site structure)
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.url}`,
    })),
  } : null;

  // Structured Data - SoftwareApplication (since you're selling trading software)
  const softwareSchema = softwareApplication ? {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: softwareApplication.name || 'FluxTrade Trading Software',
    applicationCategory: 'Trading Software',
    operatingSystem: softwareApplication.operatingSystem || 'NinjaTrader, TradingView',
    offers: {
      '@type': 'Offer',
      price: softwareApplication.price,
      priceCurrency: softwareApplication.currency || 'USD',
      availability: 'https://schema.org/InStock',
    },
    description: softwareApplication.description || fullDescription,
    url: fullCanonical,
    publisher: {
      '@type': 'Organization',
      name: 'FluxTrade',
    },
  } : null;

  // Structured Data - HowTo (for tutorials/guides)
  const howToSchema = howTo ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
      url: step.url,
    })),
  } : null;

  // Structured Data - VideoObject (for video content)
  const videoSchema = video ? {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name || title,
    description: video.description || description,
    thumbnailUrl: video.thumbnailUrl || fullOgImage,
    uploadDate: video.uploadDate,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl,
    duration: video.duration,
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

      {/* GEO Optimization: Enhanced meta tags for AI engines */}
      <meta name="topic" content="Trading Software, Automated Trading Strategies, NinjaTrader, TradingView" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="Traders, Prop Firms, Trading Institutions" />
      <meta name="audience" content="Professional Traders, Algorithmic Traders, Prop Firm Traders" />

      {/* Structured Data - Always include Organization and Website */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {/* Conditional Structured Data */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {productSchemas && productSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {softwareSchema && (
        <script type="application/ld+json">
          {JSON.stringify(softwareSchema)}
        </script>
      )}
      {howToSchema && (
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      )}
      {videoSchema && (
        <script type="application/ld+json">
          {JSON.stringify(videoSchema)}
        </script>
      )}
    </Helmet>
  );
}

