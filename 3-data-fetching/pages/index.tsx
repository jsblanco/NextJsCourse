import Link from 'next/link';
import path from 'path';
import fs from 'fs/promises';
import { getData } from '../helpers';

export default function HomePage({ products }) {
    return (
        <ul>
            {products.map((product) => <li key={product.id}>
                <Link href={'/products/' + product.id}>
                    {product.title}
                </Link>
            </li>)}
        </ul>
    );
}

export async function getStaticProps() {
    const data = await getData();

    if (!data.products || data.products.length === 0)
        return { notFound: true };

    return {
        revalidate: 10,
        props: {
            products: data.products,
        },
    }
}
