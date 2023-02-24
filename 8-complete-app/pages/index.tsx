import { InferGetStaticPropsType } from 'next';
import { getFeaturedPosts } from '../components/helper/posts-util';
import FeaturedPosts from '../components/home/FeaturedPosts';
import Hero from '../components/home/Hero';

export default function HomePage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {

    return <>
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
