'use client'

import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  IconButton, 
  Tabs,
  Tab,
  Paper,
  Stack,
  Divider,
  ToggleButton,
  CardMedia
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight, 
  FavoriteBorder,
  CheckCircle,
  Info,
  Star,
  LocalShipping,
  Verified,
  Add,
  Remove
} from '@mui/icons-material';
import { apiProductService } from '@/services/apiProductService';
import Products from '../products';
import { formatPrice } from '@/utils/formatPrice';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  views?: number;
  slug?: string;
  idTopic?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function ProductDetail({ slug }: { slug: string }) {

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        setLoading(false);
        setError('Invalid product slug');
        return;
      }
      try {
        setLoading(true);
        const response = await apiProductService.getProductBySlug(slug);
        setProduct(response.data.product);
        setRelatedProducts(response.data.relatedProducts || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);


  const handleImageChange = (direction: 'next' | 'prev') => {
    if (!product?.images || product.images.length <= 1) return;
    if (direction === 'next') {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    } else {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6">Product not found</Typography>
      </Box>
    );
  }

  const compatibleRelatedProducts: any[] = relatedProducts.map(related => ({
    ...related,
    image: related.images[0] || '/placeholder.svg?height=300&width=300', 
  }));

  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: '#f8f5f2' }}>
      <Grid container spacing={4}>
        {/* Left side - Image gallery */}
        <Grid item xs={12} md={7}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Thumbnails */}
            <Stack spacing={2} sx={{ width: 80 }}>
              {product.images.map((img, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    cursor: 'pointer',
                    border: index === selectedImage ? '2px solid #2e7d32' : '1px solid #ddd',
                    borderRadius: 4,
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <CardMedia
                    component="img"
                    image={img || "/placeholder.svg"}
                    alt={`Product view ${index + 1}`}
                    sx={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 4 }}
                  />
                </Paper>
              ))}
            </Stack>

            {/* Main image */}
            <Box sx={{ position: 'relative', flex: 1 }}>
              <CardMedia
                component="img"
                image={product.images[selectedImage] || "/placeholder.svg"}
                alt="Product main view"
                sx={{ width: '100%', height: 500, objectFit: 'contain' }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
                  borderRadius: '50%',
                }}
                onClick={() => handleImageChange('prev')}
                disabled={product.images.length <= 1}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
                  borderRadius: '50%',
                }}
                onClick={() => handleImageChange('next')}
                disabled={product.images.length <= 1}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        {/* Right side - Product details */}
        <Grid item xs={12} md={5}>
          <Box sx={{ position: 'relative', backgroundColor: '#f8f5f2', p: 2 }}>
            <IconButton 
              sx={{ 
                position: 'absolute', 
                right: 0, 
                top: 0,
                color: '#2e7d32'
              }}
            >
              <FavoriteBorder />
            </IconButton>

            <Typography variant="h3" component="h1" sx={{ color: '#2e7d32', mb: 1, fontWeight: 600 }}>
              {product.name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#2e7d32' }}>
            </Typography>
            <Typography variant="h4" sx={{ mb: 4, color: '#2e7d32', fontWeight: 600 }}>
              {formatPrice(product.price)}
            </Typography>

            {/* Size selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32' }}>
                1. Select the size of your plant pot
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <ToggleButton
                  value="M"
                  selected={true}
                  sx={{
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    color: '#2e7d32',
                    '&.Mui-selected': {
                      bgcolor: '#2e7d32',
                      color: 'white',
                      '&:hover': { bgcolor: '#2e7d32' },
                    },
                    '&:hover': { borderColor: '#2e7d32' },
                  }}
                >
                  M
                </ToggleButton>
                <Button 
                  variant="text" 
                  sx={{ 
                    color: '#2e7d32',
                    textDecoration: 'underline',
                    fontSize: '0.9rem'
                  }}
                >
                  Pot size guide
                </Button>
              </Box>
            </Box>

            {/* Quantity and Add to cart */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32' }}>
                2. Find a matching plant
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography sx={{ color: '#2e7d32' }}>{product.name} (M)</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 4 }}>
                  <IconButton 
                    size="small"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    sx={{ color: '#2e7d32' }}
                  >
                    <Remove />
                  </IconButton>
                  <Typography sx={{ px: 2, color: '#2e7d32' }}>{quantity}</Typography>
                  <IconButton 
                    size="small"
                    onClick={() => setQuantity(quantity + 1)}
                    sx={{ color: '#2e7d32' }}
                  >
                    <Add />
                  </IconButton>
                </Box>
                <Typography sx={{ color: '#2e7d32', fontWeight: 600 }}>
                  {formatPrice(product.price * quantity)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<Add />}
                fullWidth
                sx={{
                  bgcolor: '#2e7d32',
                  color: 'white',
                  '&:hover': { bgcolor: '#1b5e20' },
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
                Add to cart
              </Button>
            </Box>

            {/* Features */}
            <Box sx={{ mb: 4 }}>
              {[
                'Already sent more than 100,000 plants',
                '100% recyclable packaging materials',
                'The most exclusive houseplants'
              ].map((feature, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <CheckCircle sx={{ color: '#2e7d32' }} />
                  <Typography sx={{ color: '#2e7d32' }}>{feature}</Typography>
                </Box>
              ))}
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                sx={{
                  '& .MuiTab-root': {
                    color: '#2e7d32',
                    textTransform: 'none',
                    fontSize: '1rem',
                  },
                  '& .Mui-selected': {
                    color: '#2e7d32',
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#2e7d32',
                  }
                }}
              >
                <Tab icon={<Info />} label="About this pot" />
                <Tab icon={<Star />} label="Reviews" />
                <Tab icon={<LocalShipping />} label="Shipment" />
                <Tab icon={<Verified />} label="Guarantee" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Box>
                <Grid container spacing={4} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ color: '#2e7d32' }}>Diameter</Typography>
                      <Typography>16cm</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ color: '#2e7d32' }}>Height</Typography>
                      <Typography>15cm</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Typography sx={{ color: '#444' }}>
                  {product.description || 'No description available.'}
                </Typography>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography>No reviews yet</Typography>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography>Shipping information</Typography>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Typography>Product guarantee details</Typography>
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 6, mb: 4 }}>
          <Typography variant="h5" sx={{ color: '#2e7d32', mb: 3, fontWeight: 600 }}>
            Related Products
          </Typography>
          <Products products={compatibleRelatedProducts} /> 
        </Box>
      )}
    </Container>
  );
}