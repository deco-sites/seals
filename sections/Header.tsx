import type { ComponentChildren } from "preact";

/**
 * Props interface for Header component
 */
export interface Props {
  /**
   * @title Brand Name
   * @description The brand name to display in the header
   * @default Vanguard
   */
  brandName?: string;

  /**
   * @title Navigation Items
   * @description Array of navigation menu items
   */
  navigationItems?: Array<{
    label: string;
    href: string;
  }>;

  /**
   * @title CTA Button Text
   * @description Text for the call-to-action button
   * @default Start your free trial
   */
  ctaText?: string;

  /**
   * @title CTA Button Link
   * @description URL for the call-to-action button
   * @default /trial
   */
  ctaHref?: string;

  /**
   * @title Show Mobile Menu
   * @description Whether to show mobile hamburger menu
   * @default true
   */
  showMobileMenu?: boolean;
}

/**
 * Navigation Link Component
 */
function NavigationLink({ 
  href, 
  children 
}: { 
  href: string; 
  children: ComponentChildren;
}) {
  return (
    <a
      href={href}
      class="text-sm font-normal text-neutral-800 hover:text-green-600 transition-colors duration-200 px-2 py-1 rounded"
    >
      {children}
    </a>
  );
}

/**
 * Brand Logo Component with gradient background
 */
function BrandLogo({ brandName }: { brandName: string }) {
  return (
    <div class="flex items-center gap-2 sm:gap-2">
      {/* Logo with gradient background matching Figma design */}
      <div class="w-7 h-7 sm:w-6 sm:h-6 rounded-md bg-gradient-to-br from-green-300 via-green-500 to-green-800 flex items-center justify-center">
        <div class="w-5 h-5 sm:w-4 sm:h-4 bg-white/20 rounded-sm"></div>
      </div>
      
      {/* Brand name - Smaller on mobile */}
      <span class="text-lg sm:text-base font-medium text-green-800">
        {brandName}
      </span>
    </div>
  );
}

/**
 * Header component following the Figma design
 */
export default function Header({
  brandName = "Vanguard",
  navigationItems = [
    { label: "Features", href: "/features" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Pricing", href: "/pricing" },
    { label: "Applications", href: "/applications" },
  ],
  ctaText = "Start your free trial",
  ctaHref = "/trial",
  showMobileMenu = true,
}: Props) {
  return (
    <header class="w-full bg-transparent relative">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-20 py-6 sm:py-8 lg:py-12">
        {/* Container with rounded border matching Figma design */}
        <div class="flex items-center justify-between bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full px-2 py-2">
          
          {/* Left section: Brand + Navigation */}
          <div class="flex items-center gap-4 lg:gap-10 pl-3 sm:pl-6">
            {/* Brand Logo */}
            <BrandLogo brandName={brandName} />
            
            {/* Desktop Navigation */}
            <nav class="hidden lg:flex items-center gap-6 xl:gap-8">
              {navigationItems.map((item) => (
                <NavigationLink key={item.label} href={item.href}>
                  {item.label}
                </NavigationLink>
              ))}
            </nav>
          </div>

          {/* Right section: CTA Button */}
          <div class="flex items-center">
            {/* CTA Button */}
            <a
              href={ctaHref}
              class="bg-white border border-green-500 text-green-500 hover:bg-green-50 transition-colors duration-200 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium"
            >
              <span class="hidden sm:inline">{ctaText}</span>
              <span class="sm:hidden">Trial</span>
            </a>

            {/* Mobile Menu Button (Hidden by default, can be implemented later) */}
            {showMobileMenu && (
              <button class="lg:hidden ml-2 sm:ml-4 p-2 text-neutral-600 hover:text-neutral-800">
                <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu (Hidden by default, can be enhanced with JavaScript later) */}
      <div class="lg:hidden hidden bg-white border-t border-neutral-200 mx-4 sm:mx-8 rounded-b-xl">
        <nav class="px-4 py-4 space-y-2">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              class="block px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-100 rounded-lg"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
} 