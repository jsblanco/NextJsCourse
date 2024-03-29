import Head from 'next/head';
import { getPostData, getPostsFilenames, removeFileExtensionFromString } from '../../components/helper/posts-util';
import { PostContent } from '../../components/posts/post-detail/PostContent';

export default function PostPage({ post }) {
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.excerpt}/>
            </Head>
            <PostContent post={post}/>
        </>
    )
}

export const getStaticProps = ({ params: { slug = '' } }) => ({
    props: { post: getPostData(slug) },
    revalidate: 24000,
})

export const getStaticPaths = () => ({
    paths: getPostsFilenames().map(filename => ({
        params: {
            slug: removeFileExtensionFromString(filename),
        }
    }))
    , fallback: 'blocking'
})
