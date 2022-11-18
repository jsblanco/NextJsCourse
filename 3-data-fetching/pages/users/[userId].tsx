export default function UserIdPage({ user }) {
    return <h1>{user.id}
    </h1>
}

export async function getServerSideProps({ params }) {
const {userId} = params;

return {
    props: {
        user: {
            id: userId,
        }
    }
}


}
