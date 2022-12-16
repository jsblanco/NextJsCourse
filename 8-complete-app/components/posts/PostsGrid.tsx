import { BlogPost } from '../helper/types';
import PostItem from './PostItem';
import classes from './PostsGrid.module.css'

export default function PostsGrid({ posts }: {posts: BlogPost[]}) {
    return (
        <ul className={classes.grid}>
            {posts.map(post => <PostItem key={post.slug} post={post}/>)}
        </ul>
    )
}
