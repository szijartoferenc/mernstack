import React, { useState, useEffect } from 'react';
import { Box, styled, TextareaAutosize, Button, FormControl, InputBase } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

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

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
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

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const defaultImage = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                } else {
                    console.error("Error fetching post:", response);
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const uploadImage = async () => {
            if (file) {
                setLoading(true); // Indítsuk el a feltöltés jelzését
                try {
                    const data = new FormData();
                    data.append("name", file.name);
                    data.append("file", file);

                    const response = await API.uploadFile(data);
                    if (response.isSuccess) {
                        setPost(prevPost => ({
                            ...prevPost,
                            picture: response.data // Frissítjük a poszt képet az új URL-el
                        }));
                    } else {
                        console.error("Error uploading file:", response);
                    }
                } catch (error) {
                    console.error("Error uploading file:", error);
                } finally {
                    setLoading(false); // Befejeződött a feltöltés
                }
            }
        };
        uploadImage();
    }, [file]);

    const updateBlogPost = async () => {
        try {
            const updatedPost = {
                ...post,
                picture: post.picture?.imageUrl || post.picture // A kép URL helyes kezelése
            };

            let response = await API.updatePost(updatedPost);
            if (response.isSuccess) {
                navigate(`/details/${id}`);
            } else {
                setError("Error updating post: " + response.msg); // Hibakezelés a frissítésnél
            }
        } catch (error) {
            console.error("Error updating post:", error);
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    const handleChange = (e) => {
        setPost(prevPost => ({
            ...prevPost,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <Container>
            <Image src={post.picture || defaultImage} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField 
                    onChange={handleChange} 
                    value={post.title} 
                    name='title' 
                    placeholder="Title" 
                />
                <Button onClick={updateBlogPost} variant="contained" color="primary">
                    Update
                </Button>
            </StyledFormControl>

            <StyledTextArea
                minRows={5}
                placeholder="Tell your story..."
                name='description'
                onChange={handleChange} 
                value={post.description}
            />

            {loading && <p>Uploading...</p>}  {/* Visszajelzés a feltöltésről */}
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Hibás üzenet */}
        </Container>
    );
};

export default Update;
