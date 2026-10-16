import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ProductCatalogue from "@/components/products/ProductCatalogue";
import CtaBanner from "@/components/ui/CtaBanner";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description:
    "Browse the full range of JB Timber Tech plywood: semi-hardwood, full hardwood, marine/premium ISI grades, and film-faced shuttering ply.",
};

export default function ProductsPage() {
  return (
    <>
      {/* <PageHero
        eyebrow="Our Range"
        title="Product Catalogue"
        tagline="Manufacturer Precision. Uncompromising Architectural Luxury."
        eyebrowColor="rgb(0 0 0)"
        titleColor="rgb(0 0 0)"
        taglineColor="rgb(0 0 0)"
        image="/images/Plywood-product-page.jpeg"
      /> */}
      <div className="relative z-20 max-w-[1240px] mx-auto px-12 sm:px-16 w-full">
        <div className="max-w-3xl">
            <FadeIn>
              <p
                className="text-xs uppercase tracking-[0.18em] font-semibold mb-4 mt-4"
                style={{ color: "rgb(0 0 0)" }}
              >
                Our Range
              </p>
            </FadeIn>
          <FadeIn delay={80}>
            <h1
              className="font-display font-semibold tracking-[0.04em] leading-[1.05] mb-4"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "rgb(0 0 0)" }}
            >
             Product Catalogue
            </h1>
          </FadeIn>
            {/* <FadeIn delay={160}>
              <p
                className="font-accent italic leading-[1.3]"
                style={{
                  fontSize: "clamp(20px, 2.4vw, 28px)",
                  color: "rgb(0 0 0)",
                }}
              >
                Manufacturer Precision. Uncompromising Architectural Luxury
              </p>
            </FadeIn> */}
        </div>
      </div>
      <ProductCatalogue />
      <CtaBanner
        heading="Ready to place a bulk order?"
        body="Contact us for ex-factory rates, volume allocations, and logistics across Tamil Nadu & Kerala."
      />
    </>
  );
}
