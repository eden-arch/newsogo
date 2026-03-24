import { sanityClient } from "@/lib/sanity";
import HeroSlider, { type Slide } from "@/components/HeroSlider";
import LogoGrid, { type LogoItem } from "@/components/LogoGrid";

type HeroSection = {
  _type: "heroSection";
  _key: string;
  heading?: string;
  subheading?: string;
};

type HeroSliderSection = {
  _type: "heroSliderSection";
  _key: string;
  slides?: Slide[];
};

type LogoGridSection = {
  _type: "logoGridSection";
  _key: string;
  title?: string;
  logos?: LogoItem[];
};

type TextSection = {
  _type: "textSection";
  _key: string;
  content?: string;
};

type Section = HeroSection | HeroSliderSection | LogoGridSection | TextSection;

type Page = {
  title?: string;
  sections?: Section[];
};

export default async function Home() {
  const homePage: Page | null = await sanityClient.fetch(
    `*[_type == "page" && slug.current == "home"][0]{
      title,
      sections[]{
        ...,
        slides[]{
          ...,
          "imageUrl": image.asset->url
        },
        logos[]{
          ...,
          "imageUrl": image.asset->url
        }
      }
    }`
  );

  if (!homePage) {
    return (
      <main style={{ padding: "2rem" }}>
        <p>No home page content found in Sanity.</p>
      </main>
    );
  }

  return (
    <main>
      {homePage.sections?.map((section) => {
        if (section._type === "heroSliderSection") {
          return <HeroSlider key={section._key} slides={section.slides ?? []} />;
        }

        if (section._type === "logoGridSection") {
          return (
            <LogoGrid
              key={section._key}
              title={section.title}
              logos={section.logos ?? []}
            />
          );
        }

        if (section._type === "heroSection") {
          return (
            <div key={section._key} style={{ padding: "2rem", maxWidth: "720px", margin: "0 auto" }}>
              {section.heading && <h1>{section.heading}</h1>}
              {section.subheading && <p>{section.subheading}</p>}
            </div>
          );
        }

        if (section._type === "textSection") {
          return (
            <div key={section._key} style={{ padding: "0 2rem 1.5rem", maxWidth: "720px", margin: "0 auto" }}>
              {section.content && <p>{section.content}</p>}
            </div>
          );
        }

        return null;
      })}
    </main>
  );
}
