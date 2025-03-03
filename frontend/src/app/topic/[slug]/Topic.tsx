"use client"

import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  CardMedia,
} from '@mui/material';
import Products from '@/app/products/products';
import { apiProductService } from '@/services/apiProductService';
interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  views?: number;
  slug?: string;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  products: Product[];
  slug: string;
  image: string;
}

export default function Topic({ slug }: { slug: string }) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setLoading(true);
        const response = await apiProductService.getTopicBySlug(slug);

        const topicData: Topic = {
          id: response.data._id,
          name: response.data.name,
          description: response.data.description,
          products: response.data.products.map((item: any) => ({
            id: item._id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.images[0] || '/placeholder.svg?height=300&width=300',
            views: item.views,
            slug: item.slug,
          })),
          slug: response.data.slug,
          image: response.data.image || '/placeholder.svg?height=600&width=450',
        };

        setTopic(topicData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch topic');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!topic) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6">Topic not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2, backgroundColor: "#fff" }}>
      <Container maxWidth="lg">
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={topic.image}
            alt={topic.name}
            sx={{
              width: '100%', 
              height: 400, 
              objectFit: 'cover',
              filter: 'brightness(70%)', 
              borderRadius: 2,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.3)', 
              p: 4,
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              {topic.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ maxWidth: '800px', fontSize: '1.1rem' }}
            >
              {topic.description}
            </Typography>
          </Box>
        </Box>

        <Products products={topic.products} />
      </Container>
    </Box>
  );
}