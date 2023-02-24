export interface BlogPost {
    featured: boolean;
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    content?: string;
}


export interface FeaturedPost extends BlogPost {
    featured: true;
}
