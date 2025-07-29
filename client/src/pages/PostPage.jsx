import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {formatISO9075} from 'date-fns';
import Image from 'react-bootstrap/Image';
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
        .catch(err => console.error(err))
    }, [])

    if (!postInfo) 
        return <div className="d-block p-2 text-center text-danger">Invalid Post</div>
    
    return (
        <div className="mx-3">
            <Container className="post-header">
                <h2>{postInfo.title}</h2>
                <p className="text-primary fw-bold">{postInfo.author.username}</p>
                <time className="text-danger mb-2">{ formatISO9075(new Date(postInfo.createdAt)) }</time>
                <Button variant="primary" size="sm">
                    Edit Post
                </Button>
            </Container>
            
            <Image 
                className="post-image"
                src={'http://localhost:3000/'+postInfo.cover}
                alt="Blog Image"
            />

            <div dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
    )
}

export default PostPage