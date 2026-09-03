import type { StaticImageData } from "next/image";

declare module "*.JPG" {
  const source: StaticImageData;
  export default source;
}

declare module "@/assets/IMG_0740.jpg" {
  const source: StaticImageData;
  export default source;
}
