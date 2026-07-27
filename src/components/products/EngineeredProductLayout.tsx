/* ────────────────────────────────────────────────────────────────
   EngineeredProductLayout — template for products that are not rated
   to IS 15652 voltage classes: BharatMembrane and BharatHydro Seal.

   Deliberately DIFFERENT from ProductPageLayout — no Class A/B/C
   table, no working/proof voltage, no dielectric strength, and no
   electrical insulation material table. Rendering one of those on a
   waterproofing product would imply an electrical rating it does not
   carry.

   Every product-specific string is supplied through the Product
   record, so adding another engineered product needs data only.

   Sections: hero → gallery → overview → benefits → standards →
   variants → properties → applications → notes → documents →
   related products → enquiry CTA.
   ──────────────────────────────────────────────────────────────── */

import Link from 'next/link';
import Image from 'next/image';
import type { Product, ProductSlug } from '@/data/products';
import { getOtherProducts } from '@/data/products';
import { ProductGallery } from '@/components/products/ProductGallery';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import {
  ArrowRight,
  Download,
  FileText,
  CheckCircle2,
  Wrench,
  Layers,
} from 'lucide-react';

interface EngineeredProductLayoutProps {
  product: Product;
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
}

export function EngineeredProductLayout({
  product,
  seoTitle,
  seoDescription,
  canonicalPath,
}: EngineeredProductLayoutProps) {
  const otherProducts = getOtherProducts(product.slug);

  return (
    <main id="main-content" className="min-h-screen bg-background">
      {/* ──────────────────────────────────────────
         1. Breadcrumb
         ────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="container-site pt-28 pb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products/bharat-membrane">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      {/* ──────────────────────────────────────────
         1b. Product Hero
         ────────────────────────────────────────── */}
      <section aria-labelledby="product-hero-heading" className="container-site pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: text content */}
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              {product.standards.map((std) => (
                <Badge key={std} variant="outline" className="border-yellow-500/40 text-charcoal-950 bg-yellow-50">
                  <FileText className="size-3 mr-1 text-yellow-600" />
                  {std}
                </Badge>
              ))}
            </div>
            <h1 id="product-hero-heading" className="text-product-h1 mb-4">
              {product.name}
            </h1>
            <p className="text-body-lg text-grey-600 mb-6 max-w-xl">
              {product.detailCopy}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-charcoal-950 font-semibold h-12 px-6 rounded-lg">
                <Link href="/contact-us">
                  Project Enquiry
                  <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
              {product.engineeredDownloads && product.engineeredDownloads[0] && (
                <Button variant="outline" size="lg" className="border-charcoal-800 text-charcoal-800 hover:bg-charcoal-800 hover:text-white h-12 px-6 rounded-lg" asChild>
                  <a href={`/downloads/${product.engineeredDownloads[0].fileName}`} download>
                    <Download className="size-4 mr-2" />
                    Download Datasheet
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Right: hero image */}
          <div className="animate-fade-up relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-muted" style={{ animationDelay: '100ms' }}>
            <Image
              src={product.image}
              alt={product.heroImageAlt ?? `${product.name} product image`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
         Product Gallery (if images available)
         ────────────────────────────────────────── */}
      {product.galleryImages && product.galleryImages.length > 0 && (
        <section className="container-site pb-12">
          <ProductGallery
            images={product.galleryImages}
            productName={product.name}
          />
        </section>
      )}

      {/* Divider */}
      <div className="container-site">
        <div className="h-px bg-gradient-to-r from-transparent via-grey-300 to-transparent" />
      </div>

      {/* ──────────────────────────────────────────
         2. Product Overview
         ────────────────────────────────────────── */}
      {product.overviewText && (
        <section aria-labelledby="overview-heading" className="container-site py-12">
          <div className="animate-fade-up">
            <h2 id="overview-heading" className="text-section-h2 mb-4">Overview</h2>
            <p className="text-body-lg text-grey-600 max-w-3xl">
              {product.overviewText}
            </p>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────
         Key Benefits
         ────────────────────────────────────────── */}
      {product.benefits && product.benefits.length > 0 && (
        <section aria-labelledby="benefits-heading" className="container-site py-12">
          <div className="animate-fade-up">
            <h2 id="benefits-heading" className="text-section-h2 mb-6">Key Benefits</h2>
            <ul className="space-y-4 max-w-3xl" role="list">
              {product.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-yellow-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-body text-charcoal-800">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="container-site">
        <div className="h-px bg-gradient-to-r from-transparent via-grey-300 to-transparent" />
      </div>

      {/* ──────────────────────────────────────────
         3. Applicable Standard
         ────────────────────────────────────────── */}
      <section aria-labelledby="standard-heading" className="container-site py-12">
        <div className="animate-fade-up">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="size-5 text-yellow-500" aria-hidden="true" />
            <h2 id="standard-heading" className="text-section-h2">Applicable Standard</h2>
          </div>
          <p className="text-body-lg text-grey-600 max-w-3xl">
            {product.standardsNarrative}
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────
         4. Thickness Options
         ────────────────────────────────────────── */}
      {product.variantOptions && product.variantOptions.length > 0 && (
        <section aria-labelledby="thickness-heading" className="container-site py-12">
          <div className="animate-fade-up">
            <h2 id="thickness-heading" className="text-section-h2 mb-6">
              {product.variantOptionsTitle ?? 'Available options'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl">
              {product.variantOptions.map((opt) => (
                <div
                  key={opt.thickness}
                  className="p-4 rounded-lg border border-grey-300 bg-white hover:border-yellow-500/50 transition-colors min-h-[44px]"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-yellow-100 text-sm font-bold text-charcoal-950" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {opt.thickness.replace(' mm', '')}
                    </span>
                    <div>
                      <span className="text-sm font-semibold text-charcoal-950 block" style={{ fontVariantNumeric: 'tabular-nums' }}>{opt.thickness}</span>
                      <span className="text-small-meta text-grey-600">{opt.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="container-site">
        <div className="h-px bg-gradient-to-r from-transparent via-grey-300 to-transparent" />
      </div>

      {/* ──────────────────────────────────────────
         5. Material and Physical Properties
         ────────────────────────────────────────── */}
      {product.engineeredProperties && product.engineeredProperties.length > 0 && (
        <section aria-labelledby="properties-heading" className="container-site py-12">
          <div className="animate-fade-up">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="size-5 text-yellow-500" aria-hidden="true" />
              <h2 id="properties-heading" className="text-section-h2">Material and Physical Properties</h2>
            </div>
            <p className="text-small-meta text-grey-600 mb-6">
              {product.propertiesCaption}
            </p>
            <div className="max-w-full overflow-x-auto rounded-lg border border-grey-300">
              <Table>
                <TableCaption>{product.propertiesTableSummary}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[45%]">Property</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.engineeredProperties.map((prop, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium text-charcoal-950">{prop.label}</TableCell>
                      <TableCell className="text-right text-charcoal-800" style={{ fontVariantNumeric: 'tabular-nums' }}>{prop.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────
         6. Applications
         ────────────────────────────────────────── */}
      {product.engineeredApplications && product.engineeredApplications.length > 0 && (
        <section aria-labelledby="applications-heading" className="container-site py-12 bg-yellow-50/50">
          <div className="container-site animate-fade-up">
            <h2 id="applications-heading" className="text-section-h2 mb-6">Applications</h2>
            <ul className="space-y-3 max-w-3xl" role="list">
              {product.engineeredApplications.map((app, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" aria-hidden="true" />
                  <span className="text-body text-charcoal-800">{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="container-site">
        <div className="h-px bg-gradient-to-r from-transparent via-grey-300 to-transparent" />
      </div>

      {/* ──────────────────────────────────────────
         7. Installation or Welding Considerations
         ────────────────────────────────────────── */}
      {product.engineeredNotes && product.engineeredNotes.length > 0 && (
        <section aria-labelledby="installation-heading" className="container-site py-12">
          <div className="animate-fade-up">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="size-5 text-yellow-500" aria-hidden="true" />
              <h2 id="installation-heading" className="text-section-h2">
                {product.engineeredNotesTitle ?? 'Installation'}
              </h2>
            </div>
            <ul className="space-y-4 max-w-3xl" role="list">
              {product.engineeredNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-yellow-100 text-xs font-bold text-charcoal-950 flex-shrink-0" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {i + 1}
                  </span>
                  <span className="text-body text-charcoal-800">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────
         8. Quality and Documents
         ────────────────────────────────────────── */}
      {product.engineeredDownloads && product.engineeredDownloads.length > 0 && (
        <section aria-labelledby="quality-heading" className="container-site py-12">
          <div className="animate-fade-up">
            <h2 id="quality-heading" className="text-section-h2 mb-6">Quality and Documents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.engineeredDownloads.map((dl) => (
                <a
                  key={dl.fileName}
                  href={`/downloads/${dl.fileName}`}
                  download
                  className="flex items-center gap-3 p-4 rounded-lg border border-grey-300 bg-white hover:border-yellow-500/50 hover:bg-yellow-50/50 transition-colors group min-h-[44px]"
                >
                  <Download className="size-5 text-yellow-500 group-hover:text-yellow-600" aria-hidden="true" />
                  <div>
                    <span className="text-sm font-medium text-charcoal-950">{dl.label}</span>
                    <span className="text-small-meta text-grey-600 block capitalize">{dl.type.replace('-', ' ')}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────
         Related Products (other 4 products)
         ────────────────────────────────────────── */}
      <section aria-labelledby="related-heading" className="container-site py-12">
        <div className="animate-fade-up">
          <h2 id="related-heading" className="text-section-h2 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherProducts.map((related) => (
              <Link
                key={related.slug}
                href={related.exploreLink}
                className="group flex flex-col p-4 rounded-lg border border-grey-300 bg-white hover:border-yellow-500/50 hover:bg-yellow-50/50 transition-colors min-h-[44px]"
              >
                <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-muted mb-3">
                  <Image
                    src={related.image}
                    alt={`${related.shortName} — related product`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-sm font-semibold text-charcoal-950 mb-1">{related.shortName}</h3>
                <p className="text-small-meta text-grey-600">{related.description}</p>
                <span className="text-sm font-medium text-yellow-600 mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  View product
                  <ArrowRight className="size-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
         9. Project Enquiry CTA → /contact-us
         ────────────────────────────────────────── */}
      <section aria-labelledby="enquiry-cta-heading" className="bg-charcoal-950 py-16">
        <div className="container-site animate-fade-up text-center">
          <h2 id="enquiry-cta-heading" className="text-section-h2 text-white mb-4">
            Project Enquiry for {product.name}
          </h2>
          <p className="text-body-lg text-grey-300 mb-8 max-w-2xl mx-auto">
            {product.enquiryBlurb}
          </p>
          <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-charcoal-950 font-semibold h-12 px-8 rounded-lg text-base">
            <Link href={`/contact-us?product=${product.slug}`}>
              Submit a Project Enquiry
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
