import * as fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { BlogPost, FeaturedPost } from './types';

const postsDirectory = path.join(process.cwd(), 'posts')

const emptyPost: BlogPost = {
    featured: false,
    slug: '',
    title: '',
    excerpt: '',
    image: '',
    date: '',
}

export const getPostsFilenames = (): string[] => fs.readdirSync(postsDirectory);

export const removeFileExtensionFromString = (filename: string ) => filename.replace(/\.md$/, '');

export const getPostData = (postIdentifier: string): BlogPost => {
    const postSlug = removeFileExtensionFromString(postIdentifier);
    const { data, content } = matter(fs.readFileSync(path.join(postsDirectory, `${postSlug}.md`), 'utf-8'));

    return {
        ...emptyPost,
        slug: postSlug,
        ...data,
        content,
    }
}

export const getAllPosts = (): BlogPost[] => getPostsFilenames()
    .map(post => getPostData(post))
    .sort((a, b) => a.date > b.date ? -1 : 1);

export const getFeaturedPosts = (): FeaturedPost[] => getAllPosts().filter(post => post.featured) as FeaturedPost[];
