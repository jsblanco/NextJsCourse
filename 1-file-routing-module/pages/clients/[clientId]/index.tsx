import { useRouter } from 'next/router';

export default function ClientProjectsPage() {
	const router = useRouter();

	const loadProjectHandler = (projectId: string) => {
		//router.push('/clients/' + router.query.clientId + '/projectA');
		router.push({
			pathname: '/clients/[clientId]/[projectId]',
			query: {
				clientId: router.query.clientId,
				projectId,
			}
		})
	};

	return (
		<div>
			<h1>Client Projects page</h1>
			<button onClick={loadProjectHandler.bind(this, 'projectId')}>Load project</button>
		</div>
	);
}
