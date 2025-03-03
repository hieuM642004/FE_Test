// src/components/ProductList/ProductList.tsx
"use client";

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";
import React from "react";

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

interface ProductListProps {
  products: Product[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const ProductList = React.memo(({ products, favorites, toggleFavorite }: ProductListProps) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Link href={`/products/${product.slug}`} passHref legacyBehavior>
                <a style={{ textDecoration: "none", color: "inherit" }}>
                  <Card
                    sx={{
                      height: "80%",
                      width: "80%",
                      backgroundColor: "#fffaf2",
                      borderRadius: 2,
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      "&:hover": {
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    {product.sale && (
                      <Chip
                        label={`Sale -${product.sale}%`}
                        color="error"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          zIndex: 1,
                        }}
                      />
                    )}
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{ height: "60%", objectFit: "fill" }}
                    />
                    <IconButton
                      sx={{ position: "absolute", top: 8, right: 8 }}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(product.id);
                      }}
                    >
                      {favorites.includes(product.id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                    <CardContent sx={{ flexGrow: 1, pb: 0 }}>
                      <Typography variant="h6" component="h2">
                        {product.name}
                      </Typography>
                      <Typography>{product.description}</Typography>
                      {product.size && (
                        <Typography variant="body2" color="text.secondary">
                          {product.size}
                        </Typography>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        {product.oldPrice ? (
                          <>
                            <Typography
                              variant="body2"
                              sx={{
                                textDecoration: "line-through",
                                color: "text.secondary",
                                mr: 1,
                              }}
                            >
                              {formatPrice(product.oldPrice)}
                            </Typography>
                            <Typography variant="h6" color="error.main">
                              {formatPrice(product.price)}
                            </Typography>
                          </>
                        ) : (
                          <Typography variant="h6">
                            {formatPrice(product.price)}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                      <IconButton
                        sx={{
                          border: "1px solid #ddd",
                          borderRadius: "50%",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <AddShoppingCartIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
});

ProductList.displayName = "ProductList";