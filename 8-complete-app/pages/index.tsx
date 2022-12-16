import { DUMMY_POSTS } from '../components/helper/dummydata';
import FeaturedPosts from '../components/home/FeaturedPosts';
import Hero from '../components/home/Hero';

export default function HomePage() {

    return <>
        <Hero/>
        <FeaturedPosts posts={DUMMY_POSTS.slice(0,3)}/>
    </>
}
