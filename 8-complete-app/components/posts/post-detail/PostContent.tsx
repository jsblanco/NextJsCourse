import ReactMarkdown from 'react-markdown';
import { DUMMY_CONTENT, DUMMY_POSTS } from '../../helper/dummydata';
import classes from './PostContent.module.css';
import { PostHeader } from './PostHeader';

export const PostContent = () => {

    const post = {
        ...DUMMY_POSTS[1],
        content: DUMMY_CONTENT,
    }

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={`/images/posts/${post.slug}/${post.image}`}/>
            <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
    )
}
