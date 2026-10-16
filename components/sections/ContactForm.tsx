"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import Button from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Loader2,
  X,
} from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

const LABEL = "text-xs uppercase tracking-[0.14em] font-semibold block mb-1.5";
const INPUT_BASE =
  "w-full rounded px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-gold/50";

const inputStyle = {
  background: "var(--surface)",
  border: "1px solid var(--surface-alt)",
  color: "var(--ink)",
};

export default function ContactForm() {
  const params = useSearchParams();
  const preSelected = params.get("product") ?? "";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    preSelected ? [preSelected] : [],
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [website, setWebsite] = useState(""); // honeypot
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Close dropdown on outside click or escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Pre-tick product from URL
  useEffect(() => {
    if (preSelected && !selectedProducts.includes(preSelected)) {
      setSelectedProducts([preSelected]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preSelected]);

  const toggleProduct = (slug: string) => {
    setSelectedProducts((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      if (next.length > 0 && errors.products) {
        setErrors((err) => {
          const { products: _, ...rest } = err;
          return rest;
        });
      }
      return next;
    });
  };

  const getDropdownLabel = () => {
    if (selectedProducts.length === 0) return "Select products of interest...";
    if (selectedProducts.length === 1) {
      const prod = products.find((p) => p.slug === selectedProducts[0]);
      return prod ? prod.name : "1 product selected";
    }
    if (selectedProducts.length === products.length) {
      return `All products selected (${products.length})`;
    }
    const first = products.find((p) => p.slug === selectedProducts[0]);
    return `${first?.name ?? ""} (+${selectedProducts.length - 1} more)`;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName || fullName.length < 2 || fullName.length > 80)
      e.fullName = "Please enter your name (2–80 characters).";
    if (!phone || !/^\+?[0-9\s\-]{10,15}$/.test(phone))
      e.phone = "Please enter a valid Indian mobile number.";
    if (!address || address.length < 5 || address.length > 300)
      e.address = "Please enter your address (5–300 characters).";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Please enter a valid email address.";
    if (selectedProducts.length === 0)
      e.products = "Please select at least one product.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setFormState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          address,
          email,
          products: selectedProducts,
          website,
        }),
      });

      if (!res.ok) throw new Error("Server error");

      setFormState("success");
      // Reset
      setFullName("");
      setPhone("");
      setAddress("");
      setEmail("");
      setSelectedProducts([]);
    } catch {
      setFormState("error");
      setErrorMsg(
        "Something went wrong. Please try again or email us directly.",
      );
    }
  };

  if (formState === "success") {
    return (
      <div
        className="rounded p-8 flex items-start gap-4"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--gold)",
        }}
        role="alert"
      >
        <CheckCircle
          size={24}
          style={{ color: "var(--sage)" }}
          className="shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div>
          <p className="font-semibold" style={{ color: "var(--brown)" }}>
            Enquiry received. Thank you!
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--ink)", opacity: 0.75 }}
          >
            We will respond within one business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-3"
      aria-label="Contact enquiry form"
    >
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        style={{ display: "none" }}
      />

      {/* Full Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        <div className="w-full">
          {/* <label htmlFor="fullName" className={LABEL} style={{ color: 'var(--gold-text)' }}>Full Name *</label> */}
          <input
            id="fullName"
            type="text"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={INPUT_BASE}
            style={inputStyle}
            aria-describedby={errors.fullName ? "err-name" : undefined}
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <p
              id="err-name"
              className="text-xs mt-1 flex items-center gap-1"
              style={{ color: "#9B2C2C" }}
            >
              <AlertCircle size={12} aria-hidden="true" /> {errors.fullName}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="w-full">
          {/* <label htmlFor="phone" className={LABEL} style={{ color: 'var(--gold-text)' }}>Contact Number *</label> */}
          <input
            id="phone"
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Contact Number"
            className={INPUT_BASE}
            style={inputStyle}
            aria-describedby={errors.phone ? "err-phone" : undefined}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p
              id="err-phone"
              className="text-xs mt-1 flex items-center gap-1"
              style={{ color: "#9B2C2C" }}
            >
              <AlertCircle size={12} aria-hidden="true" /> {errors.phone}
            </p>
          )}
        </div>
      </div>
      {/* Email */}
      <div>
        {/* <label htmlFor="email" className={LABEL} style={{ color: 'var(--gold-text)' }}>Email Address *</label> */}
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          className={INPUT_BASE}
          style={inputStyle}
          aria-describedby={errors.email ? "err-email" : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p
            id="err-email"
            className="text-xs mt-1 flex items-center gap-1"
            style={{ color: "#9B2C2C" }}
          >
            <AlertCircle size={12} aria-hidden="true" /> {errors.email}
          </p>
        )}
      </div>

      {/* Address */}
      <div>
        {/* <label htmlFor="address" className={LABEL} style={{ color: 'var(--gold-text)' }}>Address *</label> */}
        <textarea
          id="address"
          required
          minLength={5}
          maxLength={300}
          rows={3}
          autoComplete="street-address"
          value={address}
          placeholder="Message"
          onChange={(e) => setAddress(e.target.value)}
          className={INPUT_BASE + " resize-none"}
          style={inputStyle}
          aria-describedby={errors.address ? "err-address" : undefined}
          aria-invalid={!!errors.address}
        />
        {errors.address && (
          <p
            id="err-address"
            className="text-xs mt-1 flex items-center gap-1"
            style={{ color: "#9B2C2C" }}
          >
            <AlertCircle size={12} aria-hidden="true" /> {errors.address}
          </p>
        )}
      </div>

      {/* Products of interest dropdown */}
      <div className="relative" ref={dropdownRef}>
        <label
          id="products-label"
          className={LABEL}
          style={{ color: "var(--gold-text)" }}
        >
          Products of Interest *
        </label>

        {/* Dropdown Trigger Button */}
        <button
          type="button"
          id="products-dropdown"
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          aria-labelledby="products-label"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className={`${INPUT_BASE} flex items-center justify-between text-left cursor-pointer transition-all`}
          style={{
            ...inputStyle,
            borderColor: errors.products
              ? "#9B2C2C"
              : isDropdownOpen
                ? "var(--gold)"
                : "var(--surface-alt)",
          }}
        >
          <span
            className={`truncate ${
              selectedProducts.length === 0
                ? "opacity-60 text-sm"
                : "text-sm font-medium"
            }`}
          >
            {getDropdownLabel()}
          </span>

          <div className="flex items-center gap-2 shrink-0 ml-2">
            {selectedProducts.length > 0 && (
              <span
                className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: "var(--surface-alt)",
                  color: "var(--brown)",
                  border: "1px solid var(--gold)",
                }}
              >
                {selectedProducts.length}
              </span>
            )}
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              style={{ color: "var(--gold-text)" }}
              aria-hidden="true"
            />
          </div>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            className="absolute z-30 left-0 right-0 mt-1.5 rounded-md shadow-xl max-h-64 overflow-y-auto p-1.5 flex flex-col gap-1 border"
            style={{
              background: "var(--surface)",
              borderColor: "var(--gold)",
              boxShadow:
                "0 10px 25px -5px rgba(43, 29, 16, 0.15), 0 8px 10px -6px rgba(43, 29, 16, 0.1)",
            }}
            role="listbox"
            aria-multiselectable="true"
            aria-labelledby="products-label"
          >
            {/* Action Bar: Select All / Clear */}
            <div
              className="flex items-center justify-between px-3 py-1.5 border-b text-xs pb-2"
              style={{ borderColor: "var(--surface-alt)" }}
            >
              <span
                className="font-medium"
                style={{ color: "var(--gold-text)" }}
              >
                {selectedProducts.length} of {products.length} selected
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProducts(products.map((p) => p.slug));
                    if (errors.products) {
                      setErrors((err) => {
                        const { products: _, ...rest } = err;
                        return rest;
                      });
                    }
                  }}
                  className="text-[11px] hover:underline font-medium cursor-pointer"
                  style={{ color: "var(--brown)" }}
                >
                  Select All
                </button>
                <span style={{ color: "var(--surface-alt)" }}>|</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProducts([]);
                  }}
                  className="text-[11px] hover:underline font-medium cursor-pointer"
                  style={{ color: "var(--brown)" }}
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="flex flex-col gap-1 pt-1">
              {products.map((p) => {
                const isSelected = selectedProducts.includes(p.slug);
                return (
                  <label
                    key={p.slug}
                    className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer text-sm transition-colors select-none"
                    style={{
                      background: isSelected
                        ? "var(--surface-alt)"
                        : "transparent",
                      color: "var(--ink)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.background =
                          "rgba(184, 137, 58, 0.08)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <input
                      type="checkbox"
                      value={p.slug}
                      checked={isSelected}
                      onChange={() => toggleProduct(p.slug)}
                      className="w-4 h-4 rounded text-gold accent-[#B8893A] cursor-pointer"
                      aria-label={p.name}
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-medium truncate">{p.name}</span>
                      {p.core && (
                        <span
                          className="text-[11px] opacity-70 truncate"
                          style={{ color: "var(--gold-text)" }}
                        >
                          {p.core} {p.dipping ? "· dipped" : ""}
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Product Chips (Removable) */}
        {selectedProducts.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {selectedProducts.map((slug) => {
              const prod = products.find((p) => p.slug === slug);
              if (!prod) return null;
              return (
                <span
                  key={slug}
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full transition-colors"
                  style={{
                    background: "var(--surface-alt)",
                    border: "1px solid var(--gold)",
                    color: "var(--brown)",
                  }}
                >
                  <span className="truncate max-w-[200px] font-medium">
                    {prod.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleProduct(slug)}
                    className="hover:opacity-70 p-0.5 rounded-full inline-flex items-center justify-center cursor-pointer"
                    style={{ color: "var(--gold-text)" }}
                    aria-label={`Remove ${prod.name}`}
                  >
                    <X size={12} aria-hidden="true" />
                  </button>
                </span>
              );
            })}
          </div>
        )}

        {/* Error message */}
        {errors.products && (
          <p
            id="err-products"
            className="text-xs mt-2 flex items-center gap-1"
            style={{ color: "#9B2C2C" }}
          >
            <AlertCircle size={12} aria-hidden="true" /> {errors.products}
          </p>
        )}
      </div>

      {/* Error alert */}
      {formState === "error" && (
        <div
          className="flex items-start gap-3 p-4 rounded text-sm"
          style={{
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            color: "#9B2C2C",
          }}
          role="alert"
          aria-live="polite"
        >
          <AlertCircle
            size={18}
            className="shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p>{errorMsg}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={formState === "submitting"}
        className="self-start"
        aria-live="polite"
      >
        {formState === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Send Enquiry"
        )}
      </Button>
    </form>
  );
}
