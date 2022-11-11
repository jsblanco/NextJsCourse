import Link from 'next/link'

export default function HomePage() {
	return <div>
	 <h1>Welcome to NEXT!</h1>
	 <ul>
		<li>
			<Link href="/portfolio">Portfolio</Link>
		</li>
		<li>
			<Link href="/clients">Clients</Link>			
		</li>
		<li>
			<Link href="/blog">Blogs</Link>			
		</li>
	 </ul>
	</div>
}
