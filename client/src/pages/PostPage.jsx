import 'bootstrap/dist/css/bootstrap.min.css';

import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();

    useEffect(()=> {
        fetch('http://localhost:3000/api/posts/'+id)
        .then(res => {
            res.json().then(postInfo => {
                setPostInfo(postInfo)
            })
        })
    }, [])

    if (!postInfo) 
        return <div className="d-block p-2 text-center text-danger">Invalid Post</div>
    
    return (
        <div className="mx-3">
            <img 
                src={'http://localhost:3000/'+postInfo.cover}
                alt="Blog Image"
                style={{ height: '100px', width: '100px', objectFit: 'cover' }}
            />
            <h2>{postInfo.title}</h2>
            <div dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
    )
}

export default PostPage