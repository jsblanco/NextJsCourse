import ReactMarkdown from 'react-markdown';
import { BlogPost } from '../../helper/types';
import classes from './PostContent.module.css';
import { PostHeader } from './PostHeader';

export const PostContent = ({ post }: { post: BlogPost }) => (
    <article className={classes.content}>
        <PostHeader title={post.title} image={`/images/posts/${post.slug}/${post.image}`}/>
        <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
)
