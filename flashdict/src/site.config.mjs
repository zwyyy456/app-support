// Screenshot paths refer to files in public/assets/ and are rendered by Astro.
// Use only public, approved screenshots and download URLs here.
export const site = {
  screenshots: {
    lookup: "/assets/lookup-mac.png", // 3024 × 1898
    review: "/assets/review-mac.png", // 1800 × 1304
    library: "/assets/library-mac.png", // 3024 × 1898
    mobile: "/assets/review-iphone.png", // 1206 × 2622
  },
  downloads: {
    mac: "https://apps.apple.com/app/id6762287923",
    ios: "https://apps.apple.com/app/id6762287923",
  },
  // Browser extension store listings. Leave a value empty to show the browser
  // name without a link. The Safari extension ships inside the App Store app.
  extensions: {
    chrome: "",
    edge: "",
    firefox: "",
    safari: "https://apps.apple.com/app/id6762287923",
  },
  ogImage: {
    zh: "/assets/og-zh.jpg",
    en: "/assets/og-en.jpg",
  },
};

export const browsers = [
  { key: "chrome", name: "Chrome" },
  { key: "edge", name: "Edge" },
  { key: "firefox", name: "Firefox" },
  { key: "safari", name: "Safari" },
];
