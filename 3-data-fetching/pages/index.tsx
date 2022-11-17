import path from 'path';
import fs from 'fs/promises';

function HomePage({ products }) {

    return (
        <ul>
            {products.map(product => <li key={product.key}>{product.title}</li>)}
        </ul>
    );
}

export async function getStaticProps() {
    const data = JSON.parse(await fs.readFile(path.join(process.cwd(), 'data', 'dummy-backend.json'), 'utf-8'));

    return {
        props: {
            products: data.products,
        }
    }
}

export default HomePage;
