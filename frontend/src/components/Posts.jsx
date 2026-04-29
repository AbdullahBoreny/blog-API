import { AlignEndHorizontal, LoaderIcon, User } from "lucide-react";
import usePostsData from "../customHooks/usePostsData";
import postStyle from '../styles/Posts.module.css';
import useHandleDeletePost from "../customHooks/useDeletePost";

export default function Posts() {
    const { setPosts, posts, error, loading } = usePostsData();
    const { handleDelete, response } = useHandleDeletePost();
    const isLoggedIn = localStorage.getItem('isLogged');
    async function onDelete(id) {
        const success = await handleDelete(id);
        console.log(success);
        if (success) {
            setPosts(prev => prev.filter(p => p.id !== id));
        }
    }
    return (

        <>

            <section className={postStyle.postContainer}>
                {response && <p>{response.deletedPost.title} {response.message}</p>}
                {posts.map(post => (

                    <div className={postStyle.post} key={post.id} >

                        {isLoggedIn && <button onClick={() => onDelete(post.id)}>delete</button>}
                        <div className={postStyle.author}>
                            <span>
                                {post.author.name}
                            </span>
                        </div>

                        <div className={postStyle.title}>
                            {post.title}
                            <div className={postStyle.createdAt}>{new Date(post.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className={postStyle.content}>{post.content}</div>
                        <div className={postStyle.comments}>
                            {post.comments.map(comment => (

                                <div key={comment.id} className={postStyle.comment}>
                                    <div>@{comment.author.name}</div>
                                    <div >{comment.content}</div>


                                </div>

                            ))}
                        </div>
                    </div>
                )

                )}
                {loading && <p><LoaderIcon className={postStyle.spinner} /></p>}
                {error && <p>{error.message}</p>}
            </section >



        </>
    );
};