import { sanityClient } from "@/lib/sanity";

type HeroSection = {
  _type: "heroSection";
  _key: string;
  heading?: string;
  subheading?: string;
};

type TextSection = {
  _type: "textSection";
  _key: string;
  content?: string;
};

type Section = HeroSection | TextSection;

type Page = {
  title?: string;
  sections?: Section[];
};

export default async function Home() {
  const homePage: Page | null = await sanityClient.fetch(
    `*[_type == "page" && slug.current == "home"][0]`
  );

  if (!homePage) {
    return (
      <main style={{ padding: "2rem" }}>
        <p>No home page content found in Sanity.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "720px", margin: "0 auto" }}>
      {homePage.sections?.map((section) => {
        if (section._type === "heroSection") {
          return (
            <div key={section._key} style={{ marginBottom: "2rem" }}>
              {section.heading && <h1>{section.heading}</h1>}
              {section.subheading && <p>{section.subheading}</p>}
            </div>
          );
        }

        if (section._type === "textSection") {
          return (
            <div key={section._key} style={{ marginBottom: "1.5rem" }}>
              {section.content && <p>{section.content}</p>}
            </div>
          );
        }

        return null;
      })}
    </main>
  );
}
