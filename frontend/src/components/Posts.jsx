import { AlignEndHorizontal, User } from "lucide-react";
import usePostsData from "../customHooks/usePostsData";
import postStyle from '../styles/Posts.module.css';

export default function Posts() {
    const { posts, error, loading } = usePostsData();
    if (error) return <p>{error.message}</p>;
    if (loading) return <p>loading...</p>;
    return (

        <>

            <section className={postStyle.postContainer}>
                {posts.map(post => (
                    <div className={postStyle.post} key={post.id} >

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
                <div className="comments">

                </div>
            </section>



        </>
    );
};