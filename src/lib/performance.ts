// Preload critical videos
export const preloadVideos = (urls: string[]) => {
  if (typeof window === "undefined") return;

  urls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = url;
    document.head.appendChild(link);
  });
};

// Call this in app/layout.tsx useEffect
// preloadVideos(['/videos/hero.mp4', '/videos/best-project.mp4']);
