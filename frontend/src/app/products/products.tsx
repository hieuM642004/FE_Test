"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import ProductFilters from "@/components/ProductFilters/ProductFilters";
import { ProductList } from "@/components/ProductList/ProductList";
import { apiProductService } from "@/services/apiProductService";
import Link from "next/link";

// Định nghĩa kiểu dữ liệu Product
interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  size?: string;
  image: string;
  featured?: boolean;
  sale?: number;
  views?: number;
  slug?: string;
  idTopic?: {
    _id: string;
    name: string;
    description: string;
    slug: string;
  };
}

interface ProductsProps {
  products?: Product[];
}

export default function Products({ products: initialProducts }: ProductsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [favorites, setFavorites] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    initialProducts || []
  );
  const [loading, setLoading] = useState<boolean>(!initialProducts);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialProducts) {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const response = await apiProductService.getProducts({
            page: 1,
            limit: 10,
          });
          const fetchedProducts = response.data.data.map((item: any) => ({
            id: item._id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.images[0] || "/placeholder.svg?height=300&width=300",
            views: item.views,
            slug: item.slug,
            idTopic: item.idTopic,
            featured: false,
            sale: undefined,
            oldPrice: undefined,
            size: undefined,
          }));
          setProducts(fetchedProducts);
          setFilteredProducts(fetchedProducts);
        } catch (err: any) {
          setError(err.message || "Failed to fetch products");
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [initialProducts]);

  const handleFilterChange = useCallback(
    (searchQuery: string, priceRange: number[]) => {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            product.price >= priceRange[0] &&
            product.price <= priceRange[1]
        )
      );
    },
    [products]
  );

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundImage: "url(/placeholder.svg?height=1200&width=1200)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          color="text.primary"
          sx={{
            mb: 2,
            fontStyle: "italic",
            fontWeight: "light",
          }}
        >
          Products
        </Typography>

        {!initialProducts && (
          <ProductFilters onFilterChange={handleFilterChange} />
        )}

        <ProductList
          products={filteredProducts}
          favorites={favorites}
          toggleFavorite={(id: string) =>
            setFavorites((prev) =>
              prev.includes(id)
                ? prev.filter((favId) => favId !== id)
                : [...prev, id]
            )
          }
        />
      </Container>
    </Box>
  );
}
