/**
 * Site configuration — Centralized site settings following Astro Rocket reference
 * This is the source of truth for all site-wide configuration
 * It mirrors current SITE_CONFIG but with additional fields for future enhancements
 */

/** Site configuration interface */
export interface SiteConfig {
  /* Core site metadata */
  url: string;
  name: string;
  mark: string;
  description: string;
  author: string;
  email: string;
  authorImage?: string;

  /* Social media and contact links */
  socialLinks: Array<{
    platform: string;
    url: string;
    icon?: string;
    label?: string;
  }>;

  /* Header configuration */
  header: {
    showSocialLinks: boolean;
    twitter?: string;
  };

  /* Search engine verification */
  verification: {
    google: string;
    bing: string;
  };

  /* Open Graph and social image */
  ogImage: string;

  /* Blog configuration */
  blog: {
    postsPerPage: number;
    tagCloudLimit: number;
  };

  /* Services configuration */
  services: {
    perPage: number;
    tagCloudLimit: number;
  };

  /* Article features */
  articleFeatures: {
    toc: {
      enabled: boolean;
      layout: "sidebar" | "inline" | "none";
      sidebarPosition: "left" | "right";
      minHeadings: number;
      maxDepth: number;
    };
    comments: { enabled: boolean };
  };

  /* Blog image overlay */
  blogImageOverlay: boolean;

  /* Branding configuration */
  branding: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      foreground: string;
      border: string;
      ring: string;
    };
    logo: { light: string; dark: string };
    favicon: string;
  };

  /* i18n configuration */
  i18n: {
    enabled: boolean;
    locales: string[];
    defaultLocale: string;
    routing: { prefixDefaultLocale: boolean };
  };
}

export const siteConfig: SiteConfig = {
  url: "https://lorenzobaronio22.github.io/ml-move",
  name: "ML Move",
  mark: "ML",
  description: "Rent cargo and passenger vans — flexible, reliable, no hassle. ML Move gets you moving.",
  author: "ML Move Team",
  email: "hello@ml-move.dev",
  authorImage: "/images/author.jpg",

  socialLinks: [
    {
      platform: "instagram",
      url: "https://instagram.com/ml-move",
      icon: "simple-icons:instagram",
      label: "Instagram",
    },
  ],

  header: {
    showSocialLinks: true,
  },

  verification: {
    google: "",
    bing: "",
  },

  ogImage: "/images/og-default.jpg",

  blog: {
    postsPerPage: 10,
    tagCloudLimit: 20,
  },

  services: {
    perPage: 12,
    tagCloudLimit: 20,
  },

  articleFeatures: {
    toc: {
      enabled: true,
      layout: "sidebar",
      sidebarPosition: "right",
      minHeadings: 2,
      maxDepth: 3,
    },
    comments: { enabled: false },
  },

  blogImageOverlay: true,

  branding: {
    colors: {
      primary: "#171717",
      secondary: "#737373",
      accent: "#404040",
      background: "#ffffff",
      foreground: "#171717",
      border: "#e5e5e5",
      ring: "#171717",
    },
    logo: {
      light: "/logos/logo-light.svg",
      dark: "/logos/logo-dark.svg",
    },
    favicon: "/favicon.svg",
  },

  i18n: {
    enabled: true,
    locales: ["en", "it"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
} as const;

export default siteConfig;
