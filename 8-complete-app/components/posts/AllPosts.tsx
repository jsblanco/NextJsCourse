import { BlogPost } from '../helper/types';
import classes from './AllPosts.module.css';
import PostsGrid from './PostsGrid';

export default function AllPosts({ posts }: { posts: BlogPost[] }) {
    return (
        <section className={classes.posts}>
            <h1>All posts</h1>
            <PostsGrid posts={posts}/>
        </section>
    )
}
