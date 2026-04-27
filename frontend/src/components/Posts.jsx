import { AlignEndHorizontal, User } from "lucide-react";
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

                        <h1 style={{ display: 'flex' }} className="author">
                            <User />
                            <span>
                                {post.author.name}
                            </span>



                        </h1>
                        <h1>{post.title}</h1>
                        <h2>content: {post.content}</h2>
                        <h3>created At: {new Date(post.createdAt).toLocaleDateString()}</h3>
                        <div className="comments">
                            {post.comments.map(comment => (

                                <div key={comment.id} className="comment">
                                    <h2>@{comment.author.name}</h2>
                                    <h1 >{comment.content}</h1>

                                </div>

                            ))}
                        </div>
                    </div>


                )


                )}
                <div className="comments">

                </div>
            </div>



        </>
    );
};