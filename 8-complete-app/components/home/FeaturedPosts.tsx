import { BlogPost } from '../helper/types';
import PostsGrid from '../posts/PostsGrid';
import classes from './FeaturedPosts.module.css'

export default function FeaturedPosts({ posts }: {posts: BlogPost[]}) {
    return (
        <section className={classes.latest}>
            <h2>Featured posts</h2>
            <PostsGrid posts={posts}/>
        </section>
    )
}
