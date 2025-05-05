import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';

// Components
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%;
    margin: 0 20px;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
};

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        setComment(prev => ({
            ...prev,
            name: account.username,
            postId: post._id
        }));
    }, [account.username, post._id]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [toggle, post._id]);

    const handleChange = (e) => {
        setComment(prev => ({
            ...prev,
            comments: e.target.value
        }));
    };

    const addComment = async () => {
        try {
            const response = await API.newComment(comment);
            if (response.isSuccess) {
                setComment(prev => ({ ...prev, comments: '' }));
                setToggle(prev => !prev);
            } else {
                console.error("Error adding comment:", response);
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />
                <StyledTextArea
                    placeholder="What's on your mind?"
                    onChange={handleChange}
                    value={comment.comments}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ height: 40 }}
                    onClick={addComment}
                >
                    Post
                </Button>
            </Container>
            <Box>
                {comments.map(comment => (
                    <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                ))}
            </Box>
        </Box>
    );
};

export default Comments;
