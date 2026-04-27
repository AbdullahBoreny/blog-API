import usePostsData from "../customHooks/usePostsData";
import postStyle from '../styles/Posts.module.css';
export default function Posts() {
    const { posts, error, loading } = usePostsData();
    if (error) return <p>{error.message}</p>;
    if (loading) return <p>loading...</p>;
    return (
        <>
            <div className={postStyle.postContainer}>
                {posts.map(post => (
                    <div className={postStyle.post} key={post.id} >
                        <h1>title: {post.title}</h1>
                        <h2>content: {post.content}</h2>
                        <h3>created At: {new Date(post.createdAt).toLocaleDateString()}</h3>
                    </div>

                )


                )}
            </div>



        </>
    );
};