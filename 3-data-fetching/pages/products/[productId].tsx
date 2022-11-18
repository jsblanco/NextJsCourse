import fs from 'fs/promises';
import { GetStaticPaths } from 'next';
import path from 'path';
import { getData } from '../../helpers';

export default function ProductDetailPage({ product }) {

    if (!product) return <p>Loading...</p>

    return <>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
    </>
}

export async function getStaticProps(context) {
    const { params: { productId } } = context;
    const data = await getData();

    if (!data.products || data.products.length === 0)
        return { notFound: true };

    const product = data.products.find(product => product.id === productId);

    if (!product)
        return { notFound: true };

    return {
        revalidate: 10,
        props: {
            product,
        },
    }
}


export const getStaticPaths = async () => ({
    paths: [
        { params: { productId: 'p1' } },
        { params: { productId: 'p2' } },
        { params: { productId: 'p3' } },
    ],
    fallback: true,
    // fallback: 'blocking',
})
