import { DUMMY_POSTS } from '../../components/helper/dummydata';
import AllPosts from '../../components/posts/AllPosts';

export default function AllPostsPage() {
    return (
            <AllPosts posts={DUMMY_POSTS}/>
    )
}
