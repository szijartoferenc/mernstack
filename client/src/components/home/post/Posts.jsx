import { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { API } from '../../../service/api';

// Components
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => { 
            let response = await API.getAllPosts({ category: category || '' });
            if (response.isSuccess) {
                setPosts(response.data);
            }
        };
        fetchData();
    }, [category]);

    return (
        <Grid container spacing={2}>
            {posts?.length ? (
                posts.map(post => (
                    <Grid key={post._id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 4', lg: 'span 3' } }}>
                        <Link 
                            to={`details/${post._id}`} 
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Post post={post} />
                        </Link>
                    </Grid>
                ))
            ) : (
                <Box 
                    sx={{
                        color: '#878787', 
                        margin: '30px auto', 
                        fontSize: 18, 
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h6">
                        No data is available for the selected category
                    </Typography>
                </Box>
            )}
        </Grid>
    );
};

export default Posts;
