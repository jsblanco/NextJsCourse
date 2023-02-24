import { InferGetStaticPropsType } from 'next';
import { getAllPosts } from '../../components/helper/posts-util';
import AllPosts from '../../components/posts/AllPosts';

export default function AllPostsPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <AllPosts posts={posts}/>
    )
}

export const getStaticProps = () => (
    {
        props: {
            posts: getAllPosts(),
        },
    }
)
