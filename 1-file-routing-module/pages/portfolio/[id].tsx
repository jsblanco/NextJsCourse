import { useRouter } from 'next/router';

export default function ProjectPage() {
	const router = useRouter();
	console.log(router.query.id);

	return (
		<div>
			<h1>Portfolio project page</h1>
		</div>
	);
};
