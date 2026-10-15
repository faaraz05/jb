'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import Button from '@/components/ui/button';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const LABEL = 'text-xs uppercase tracking-[0.14em] font-semibold block mb-1.5';
const INPUT_BASE =
  'w-full rounded px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-gold/50';

const inputStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--surface-alt)',
  color: 'var(--ink)',
};

export default function ContactForm() {
  const params = useSearchParams();
  const preSelected = params.get('product') ?? '';

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    preSelected ? [preSelected] : []
  );
  const [website, setWebsite] = useState(''); // honeypot
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-tick product from URL
  useEffect(() => {
    if (preSelected && !selectedProducts.includes(preSelected)) {
      setSelectedProducts([preSelected]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preSelected]);

  const toggleProduct = (slug: string) => {
    setSelectedProducts((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName || fullName.length < 2 || fullName.length > 80)
      e.fullName = 'Please enter your name (2–80 characters).';
    if (!phone || !/^\+?[0-9\s\-]{10,15}$/.test(phone))
      e.phone = 'Please enter a valid Indian mobile number.';
    if (!address || address.length < 5 || address.length > 300)
      e.address = 'Please enter your address (5–300 characters).';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = 'Please enter a valid email address.';
    if (selectedProducts.length === 0)
      e.products = 'Please select at least one product.';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setFormState('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phone, address, email, products: selectedProducts, website }),
      });

      if (!res.ok) throw new Error('Server error');

      setFormState('success');
      // Reset
      setFullName('');
      setPhone('');
      setAddress('');
      setEmail('');
      setSelectedProducts([]);
    } catch {
      setFormState('error');
      setErrorMsg('Something went wrong. Please try again or email us directly.');
    }
  };

  if (formState === 'success') {
    return (
      <div
        className="rounded p-8 flex items-start gap-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--gold)' }}
        role="alert"
      >
        <CheckCircle size={24} style={{ color: 'var(--sage)' }} className="shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-semibold" style={{ color: 'var(--brown)' }}>
            Enquiry received. Thank you!
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--ink)', opacity: 0.75 }}>
            We will respond within one business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6" aria-label="Contact enquiry form">
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        style={{ display: 'none' }}
      />

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className={LABEL} style={{ color: 'var(--gold-text)' }}>Full Name *</label>
        <input
          id="fullName"
          type="text"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={INPUT_BASE}
          style={inputStyle}
          aria-describedby={errors.fullName ? 'err-name' : undefined}
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && (
          <p id="err-name" className="text-xs mt-1 flex items-center gap-1" style={{ color: '#9B2C2C' }}>
            <AlertCircle size={12} aria-hidden="true" /> {errors.fullName}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={LABEL} style={{ color: 'var(--gold-text)' }}>Contact Number *</label>
        <input
          id="phone"
          type="tel"
          required
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 XXXXX XXXXX"
          className={INPUT_BASE}
          style={inputStyle}
          aria-describedby={errors.phone ? 'err-phone' : undefined}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <p id="err-phone" className="text-xs mt-1 flex items-center gap-1" style={{ color: '#9B2C2C' }}>
            <AlertCircle size={12} aria-hidden="true" /> {errors.phone}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={LABEL} style={{ color: 'var(--gold-text)' }}>Email Address *</label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={INPUT_BASE}
          style={inputStyle}
          aria-describedby={errors.email ? 'err-email' : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p id="err-email" className="text-xs mt-1 flex items-center gap-1" style={{ color: '#9B2C2C' }}>
            <AlertCircle size={12} aria-hidden="true" /> {errors.email}
          </p>
        )}
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className={LABEL} style={{ color: 'var(--gold-text)' }}>Address *</label>
        <textarea
          id="address"
          required
          minLength={5}
          maxLength={300}
          rows={3}
          autoComplete="street-address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={INPUT_BASE + ' resize-none'}
          style={inputStyle}
          aria-describedby={errors.address ? 'err-address' : undefined}
          aria-invalid={!!errors.address}
        />
        {errors.address && (
          <p id="err-address" className="text-xs mt-1 flex items-center gap-1" style={{ color: '#9B2C2C' }}>
            <AlertCircle size={12} aria-hidden="true" /> {errors.address}
          </p>
        )}
      </div>

      {/* Products of interest */}
      <fieldset>
        <legend className={LABEL} style={{ color: 'var(--gold-text)' }}>Products of Interest *</legend>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"
          aria-describedby={errors.products ? 'err-products' : undefined}
        >
          {products.map((p) => (
            <label
              key={p.slug}
              className="flex items-center gap-3 cursor-pointer text-sm py-2 px-3 rounded transition-colors"
              style={{
                background: selectedProducts.includes(p.slug) ? 'var(--surface)' : 'transparent',
                border: `1px solid ${selectedProducts.includes(p.slug) ? 'var(--gold)' : 'var(--surface-alt)'}`,
                color: 'var(--ink)',
              }}
            >
              <input
                type="checkbox"
                value={p.slug}
                checked={selectedProducts.includes(p.slug)}
                onChange={() => toggleProduct(p.slug)}
                aria-label={p.name}
              />
              {p.name}
            </label>
          ))}
        </div>
        {errors.products && (
          <p id="err-products" className="text-xs mt-2 flex items-center gap-1" style={{ color: '#9B2C2C' }}>
            <AlertCircle size={12} aria-hidden="true" /> {errors.products}
          </p>
        )}
      </fieldset>

      {/* Error alert */}
      {formState === 'error' && (
        <div
          className="flex items-start gap-3 p-4 rounded text-sm"
          style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#9B2C2C' }}
          role="alert"
          aria-live="polite"
        >
          <AlertCircle size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
          <p>{errorMsg}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={formState === 'submitting'}
        className="self-start"
        aria-live="polite"
      >
        {formState === 'submitting' ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          'Send Enquiry'
        )}
      </Button>
    </form>
  );
}

