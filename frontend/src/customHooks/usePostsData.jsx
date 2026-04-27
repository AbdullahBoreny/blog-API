import { useState, useEffect } from "react";

export default function usePostsData() {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/posts')
            .then(result => result.json())
            .then(json =>  {setPosts(json)
                console.log(json);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));


    }, []);
    return { posts, error, loading };
}