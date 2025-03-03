"use client"

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, Button, useMediaQuery, useTheme } from "@mui/material";
import { apiProductService } from '@/services/apiProductService';
import Link from 'next/link';

interface Topic {
  id: string;
  name: string;
  image: string;
  link: string;
}

export default function TopicSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [categories, setCategories] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const response = await apiProductService.getTopics();

        const apiCategories: Topic[] = response.data.map((item: any) => ({
          id: item._id,
          name: item.name,
          image: item.image || '/placeholder.svg?height=600&width=450', 
          link: `/topic/${item.slug}`,
        }));

        setCategories(apiCategories);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch topics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

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

  return (
    <Box sx={{ py: 6}}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {categories.map((topic) => (
            <Grid item xs={12} sm={6} md={3} key={topic.id}>
              <Card
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  height: isMobile ? 300 : 450,
                  boxShadow: "none",
                  "&:hover .topic-overlay": {
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={topic.image}
                  alt={topic.name}
                  sx={{
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  className="topic-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    transition: "background-color 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 3,
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      color: "white",
                      fontWeight: 400,
                      fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                  >
                    {topic.name}
                  </Typography>

                 <Link  href={topic.link}>
                    <Button
                      variant="outlined"
                      href={topic.link}
                      sx={{
                        color: "white",
                        borderColor: "white",
                        borderRadius: 50,
                        textTransform: "none",
                        width: "100%",
                        "&:hover": {
                          borderColor: "white",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      See all
                    </Button>
                 </Link>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}