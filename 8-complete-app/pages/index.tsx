import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { getFeaturedPosts } from '../components/helper/posts-util';
import FeaturedPosts from '../components/home/FeaturedPosts';
import Hero from '../components/home/Hero';

export default function HomePage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {

    return <>
        <Head>
            <title>JSBlanco</title>
            <meta name="description" content="Welcome to my miniature painting blog"/>
        </Head>
        <Hero/>
        <FeaturedPosts posts={posts}/>
    </>
}

export const getStaticProps = () => (
    {
        props: {
            posts: getFeaturedPosts(),
        },
    }
)
