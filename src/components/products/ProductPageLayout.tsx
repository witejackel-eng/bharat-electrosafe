/* ────────────────────────────────────────────────────────────────
   ProductPageLayout — Reusable layout for insulating-mat products
   Renders all 12 sections per the master prompt Section 12.
   Server component — uses client child ProductGallery for image selection.
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
  Shield,
  Ruler,
  Layers,
} from 'lucide-react';

interface ProductPageLayoutProps {
  product: Product;
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
}

export function ProductPageLayout({
  product,
  seoTitle,
  seoDescription,
  canonicalPath,
}: ProductPageLayoutProps) {
  const otherProducts = getOtherProducts(product.slug);

  // ── 1. Breadcrumb visual ──
  // ── 2. Product Hero ──
  // ── 3. Gallery ──
  // ── 4. Overview ──
  // ── 5. Key Functional Benefits ──
  // ── 6. Product Specifications ──
  // ── 7. Material Properties ──
  // ── 8. Dimensions and Installation ──
  // ── 9. Applications ──
  // ── 10. Downloads and Certificates ──
  // ── 11. Related Products ──
  // ── 12. Request a Quote CTA

  return (
    <main id="main-content" className="min-h-screen bg-background">
      {/* ──────────────────────────────────────────
         Section 1: Breadcrumb
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
                <Link href="/products/electrical-insulating-mats">Products</Link>
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
         Section 2: Product Hero
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
                  Request a Quote
                  <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
              {product.matDownloads && product.matDownloads[0] && (
                <Button variant="outline" size="lg" className="border-charcoal-800 text-charcoal-800 hover:bg-charcoal-800 hover:text-white h-12 px-6 rounded-lg" asChild>
                  <a href={`/downloads/${product.matDownloads[0].fileName}`} download>
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
              alt={`${product.name} — primary product image`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
         Section 3: Product Gallery
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
         Section 4: Overview
         ────────────────────────────────────────── */}
      {product.overviewText && (
        <section aria-labelledby="overview-heading" className="container-site py-12">
          <div className="animate-fade-up">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="size-5 text-yellow-500" aria-hidden="true" />
              <h2 id="overview-heading" className="text-section-h2">Overview</h2>
            </div>
            <p className="text-body-lg text-grey-600 max-w-3xl">
              {product.overviewText}
            </p>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────
         Section 5: Key Functional Benefits
         ────────────────────────────────────────── */}
      {product.benefits && product.benefits.length > 0 && (
        <section aria-labelledby="benefits-heading" className="container-site py-12">
          <div className="animate-fade-up">
            <h2 id="benefits-heading" className="text-section-h2 mb-6">Key Functional Benefits</h2>
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
         Section 6: Product Specifications
         ────────────────────────────────────────── */}
      {product.insulationClasses && product.insulationClasses.length > 0 && (
        <section aria-labelledby="specs-heading" className="container-site py-12">
          <div className="animate-fade-up">
            <h2 id="specs-heading" className="text-section-h2 mb-2">Product Specifications</h2>
            <p className="text-small-meta text-grey-600 mb-6">
              Insulation class specifications per IS 15652:2006. All values are minimum requirements.
            </p>
            <div className="max-w-full overflow-x-auto rounded-lg border border-grey-300">
              <Table>
                <TableCaption>
                  IS 15652:2006 class specifications for {product.name}
                </TableCaption>
                <TableHeader>
                  <TableRow className="bg-charcoal-950 hover:bg-charcoal-950">
                    <TableHead className="text-white font-semibold text-xs uppercase tracking-wider">Product Code</TableHead>
                    <TableHead className="text-white font-semibold text-xs uppercase tracking-wider">Class</TableHead>
                    <TableHead className="text-white font-semibold text-xs uppercase tracking-wider text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>Thickness</TableHead>
                    <TableHead className="text-white font-semibold text-xs uppercase tracking-wider text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>Working Voltage</TableHead>
                    <TableHead className="text-white font-semibold text-xs uppercase tracking-wider text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>AC Proof Voltage</TableHead>
                    <TableHead className="text-white font-semibold text-xs uppercase tracking-wider text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>Dielectric Strength</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.insulationClasses.map((cls) => (
                    <TableRow key={cls.productCode}>
                      <TableCell className="font-medium text-charcoal-950">{cls.productCode}</TableCell>
                      <TableCell className="font-semibold text-charcoal-950">Class {cls.classLetter}</TableCell>
                      <TableCell className="text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>{cls.thickness}</TableCell>
                      <TableCell className="text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>{cls.workingVoltage}</TableCell>
                      <TableCell className="text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>{cls.proofVoltage}</TableCell>
                      <TableCell className="text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>{cls.dielectricStrength}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────
         Section 7: Material Properties
         ────────────────────────────────────────── */}
      {product.matMaterialProperties && product.matMaterialProperties.length > 0 && (
        <section aria-labelledby="material-heading" className="container-site py-12">
          <div className="animate-fade-up">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="size-5 text-yellow-500" aria-hidden="true" />
              <h2 id="material-heading" className="text-section-h2">Material Properties</h2>
            </div>
            <p className="text-small-meta text-grey-600 mb-6">
              Physical and electrical material properties per IS 15652:2006 requirements.
            </p>
            <div className="max-w-full overflow-x-auto rounded-lg border border-grey-300">
              <Table>
                <TableCaption>
                  Material properties for {product.name} per IS 15652:2006
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[45%]">Property</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.matMaterialProperties.map((prop, i) => (
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

      {/* Divider */}
      <div className="container-site">
        <div className="h-px bg-gradient-to-r from-transparent via-grey-300 to-transparent" />
      </div>

      {/* ──────────────────────────────────────────
         Section 8: Dimensions and Installation
         ────────────────────────────────────────── */}
      {product.matDimensions && (
        <section aria-labelledby="dimensions-heading" className="container-site py-12">
          <div className="animate-fade-up">
            <div className="flex items-center gap-2 mb-3">
              <Ruler className="size-5 text-yellow-500" aria-hidden="true" />
              <h2 id="dimensions-heading" className="text-section-h2">Dimensions and Installation</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl">
              <div>
                <h3 className="text-sm font-semibold text-charcoal-950 uppercase tracking-wider mb-2">Standard Width</h3>
                <p className="text-body text-charcoal-800">{product.matDimensions.standardWidth}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal-950 uppercase tracking-wider mb-2">Standard Lengths</h3>
                <p className="text-body text-charcoal-800">{product.matDimensions.standardLengths.join(', ')}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal-950 uppercase tracking-wider mb-2">Thicknesses</h3>
                <p className="text-body text-charcoal-800">{product.matDimensions.thicknesses.join(', ')}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal-950 uppercase tracking-wider mb-2">Custom Length</h3>
                <p className="text-body text-grey-600">{product.matDimensions.customLength}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal-950 uppercase tracking-wider mb-2">Standard Colours</h3>
                <p className="text-body text-charcoal-800">{product.matDimensions.standardColours.join(', ')}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────
         Section 9: Applications
         ────────────────────────────────────────── */}
      {product.matApplications && product.matApplications.length > 0 && (
        <section aria-labelledby="applications-heading" className="container-site py-12 bg-yellow-50/50 -mx-0 px-0">
          <div className="container-site animate-fade-up">
            <h2 id="applications-heading" className="text-section-h2 mb-6">Applications</h2>
            <ul className="space-y-3 max-w-3xl" role="list">
              {product.matApplications.map((app, i) => (
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
         Section 10: Downloads and Certificates
         ────────────────────────────────────────── */}
      {product.matDownloads && product.matDownloads.length > 0 && (
        <section aria-labelledby="downloads-heading" className="container-site py-12">
          <div className="animate-fade-up">
            <h2 id="downloads-heading" className="text-section-h2 mb-6">Downloads and Certificates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.matDownloads.map((dl) => (
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
         Section 11: Related Products
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
         Section 12: Request a Quote CTA
         ────────────────────────────────────────── */}
      <section aria-labelledby="quote-cta-heading" className="bg-charcoal-950 py-16">
        <div className="container-site animate-fade-up text-center">
          <h2 id="quote-cta-heading" className="text-section-h2 text-white mb-4">
            Request a Quote for {product.name}
          </h2>
          <p className="text-body-lg text-grey-300 mb-8 max-w-2xl mx-auto">
            Contact our technical sales team for pricing, specification guidance and delivery information for {product.name}.
          </p>
          <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-charcoal-950 font-semibold h-12 px-8 rounded-lg text-base">
            <Link href="/contact-us">
              Request a Quote
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
