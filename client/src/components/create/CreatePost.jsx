import { useState, useEffect, useContext } from 'react';
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)`
    margin: 50px 100px;
`;

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 50px;
    font-size: 18px;
    border: none;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
};

const CreatePost = () => {
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);
    const { account } = useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate();

    const url = post.picture || 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    <Image src={url} alt="post" />
    useEffect(() => {
        if (file) {
            const uploadImage = async () => {
                              
                const data = new FormData();
                data.append("file", file); // Győződj meg róla, hogy a kulcs 'file'!
                
                try {
                    const response = await API.uploadFile(data);
                    console.log("Upload response:", response);
            
                    if (response?.data?.imageUrl) {
                        setPost(prevPost => ({
                            ...prevPost,
                            picture: response.data.imageUrl // Győződj meg róla, hogy az API ezt adja vissza!
                        }));
                    }
                } catch (error) {
                    console.error("Error uploading file:", error);
                }
            };            
            uploadImage();
        }
    }, [file]);

    useEffect(() => {
        setPost(prevPost => ({
            ...prevPost,
            categories: location.search?.split('=')[1] || 'All',
            username: account?.username || ''
        }));
    }, [location.search, account]);

    const savePost = async () => {
        await API.createPost(post);
        navigate('/');
    };

    const handleChange = (e) => {
        setPost(prevPost => ({
            ...prevPost,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <Container>
            <Image src={url} alt="banner" />
            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input 
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}                    
                />
                <InputTextField placeholder="Title" onChange={handleChange} name="title" />
                <Button onClick={savePost} variant="contained">Publish</Button>
            </StyledFormControl>
            <Textarea
                minRows={5}
                placeholder="Tell your story...."
                onChange={handleChange}
                name="description"
            />
        </Container>
    );
};

export default CreatePost;
