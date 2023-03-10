import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { getAllPosts } from '../../components/helper/posts-util';
import AllPosts from '../../components/posts/AllPosts';

export default function AllPostsPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Head>
                <title>All posts</title>
                <meta name="description" content="All my posts to date"/>
            </Head>
            <AllPosts posts={posts}/>
        </>
    )
}

export const getStaticProps = () => (
    {
        props: {
            posts: getAllPosts(),
        },
    }
)
