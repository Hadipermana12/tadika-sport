import ProductCard from './ProductCard';
import { StaggerContainer, StaggerItem } from '../Common/Animations';

const ProductGrid = ({ title, products }) => {
    return (
        <section className="py-12">
            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-blue-600 pl-4 uppercase tracking-wider">{title}</h2>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <StaggerItem key={product.id}>
                        <ProductCard product={product} />
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </section>
    );
};

export default ProductGrid;
