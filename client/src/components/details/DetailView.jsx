import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

//Components
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const IconContainer = styled(Box)`
    float: right;
`;

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    cursor: pointer;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    cursor: pointer;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState(null);
    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    const { id } = useParams();
   
    
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
    }, [id]); // 🔹 id hozzáadása a dependency array-be

    const deleteBlog = async () => {  
        try {
            const response = await API.deletePost(post._id);
            console.log("Delete response:", response);  // 🔹 válasz naplózása a hiba jobb megértéséhez
            if (response.isSuccess) {
                navigate('/');
            } else {
                console.error("Failed to delete post:", response);
                
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            
        }
    };

    if (!post) {
        return <Typography>Loading...</Typography>; // 🔹 Ha nincs még adat, ne dobjon hibát
    }

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />
            
            {account.username === post.username && (
                <IconContainer>
                    <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                    <DeleteIcon onClick={deleteBlog} color="error" />
                </IconContainer>
            )}

            <Heading>{post.title}</Heading>

            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{ fontWeight: 600 }}>{post.username}</span></Typography>
                </Link>
                <Typography style={{ marginLeft: 'auto' }}>
                    {post.createdDate ? new Date(post.createdDate).toDateString() : 'Unknown Date'}
                </Typography>
            </Author>

            <Typography>{post.description}</Typography>
            <Comments post={post} />
        </Container>
    );
}

export default DetailView;
