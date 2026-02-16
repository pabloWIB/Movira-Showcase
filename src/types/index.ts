export interface VideoAsset {
  id: string;
  url: string;
  type: "landing" | "ecommerce" | "dashboard" | "mobile" | "webapp";
  format: "desktop" | "mobile";
  duration: number;
}
