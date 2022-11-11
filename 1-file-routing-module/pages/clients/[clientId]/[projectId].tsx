import { useRouter } from 'next/router';

export default function SelectedClientProjectPage() {
	const router = useRouter();

	console.log(router.query)
	
	return (
		<div>
			<h1>Selected client project page</h1>
		</div>
	);
};
