import type { Product } from '@/data/products';
import ProductCard from './ProductCard';
import FadeIn from '@/components/ui/FadeIn';

type Props = {
  products: Product[];
  columns?: 2 | 3 | 4;
};

const colClass: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

export default function ProductGrid({ products, columns = 4 }: Props) {
  return (
    <div
      className={`grid gap-6 items-start ${colClass[columns]}`}
    >
      {products.map((product, i) => (
        <FadeIn key={product.slug} delay={i * 80} direction="up">
          <ProductCard product={product} />
        </FadeIn>
      ))}
    </div>
  );
}

