"use client";

import { Box, Container, Typography, Button } from "@mui/material";
import Image from "next/image";
import image1 from "../../../public/images/image (2).jpg";
import image2 from "../../../public/images/image (3).jpg";
import image3 from "../../../public/images/image (4).jpg";
import image4 from "../../../public/images/image (5).jpg";
import image5 from "../../../public/images/image (6).jpg";
import image6 from "../../../public/images/image (77).jpg";
export default function About() {
  return (
    <>
      {/* Baby Plants Section */}
      <Box
        sx={{
          bgcolor: "#A65D57",
          color: "#fff",
          py: { xs: 6, md: 10 },

          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 4, md: 8 },
              alignItems: "center",
            }}
          >
            {/* Text Content */}
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontFamily: "serif",
                  mb: 3,
                  fontStyle: "italic",
                  letterSpacing: "0.02em",
                  color: "#fff",
                }}
              >
                BabyPLNTS
              </Typography>
              <Typography
                sx={{
                  mb: 4,
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  opacity: 0.9,
                  color: "#fff",
                }}
              >
                In plant terms, babies full of charm, fun and joy that you can
                watch grow into something spectacular. Watching a tiny plant
                grow into a big, strong plant is a great feeling. Being able to
                give your plant baby the right growing conditions is key to
                helping them grow and thrive.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  borderRadius: 50,
                  px: 4,
                  py: 1,
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
                onClick={() => alert("Shopping feature coming soon!")}
              >
                Shop all BabyPLNTS
              </Button>
            </Box>

            {/* Images Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: 300,
                  gridColumn: "span 2",
                }}
              >
                <Image
                  src={image1}
                  alt="Hands holding a small plant"
                  width={800}
                  height={300}
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  height: 200,
                }}
              >
                <Image
                  src={image2}
                  alt="Close up of baby plant leaves"
                  width={400}
                  height={200}
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  height: 200,
                }}
              >
                <Image
                  src={image3}
                  alt="Potting baby plants"
                  width={400}
                  height={200}
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Rare Plants Section */}
      <Box
        sx={{
          bgcolor: "#2D4544",
          color: "#fff",
          py: { xs: 6, md: 10 },
          mb: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 4, md: 8 },
              alignItems: "center",
            }}
          >
            {/* Images Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: 300,
                  gridColumn: "span 2",
                }}
              >
                <Image
                  src={image6}
                  alt="Large rare plant specimen"
                  width={800}
                  height={300}
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  height: 200,
                }}
              >
                <Image
                  src={image4}
                  alt="Rare plant leaf detail"
                  width={400}
                  height={200}
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  height: 200,
                }}
              >
                <Image
                  src={image5}
                  alt="Caring for rare plants"
                  width={400}
                  height={200}
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Box>

            {/* Text Content */}
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontFamily: "serif",
                  mb: 3,
                  fontStyle: "italic",
                  letterSpacing: "0.02em",
                  color: "#fff",
                }}
              >
                RarePLNTS
              </Typography>
              <Typography
                sx={{
                  mb: 4,
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  opacity: 0.9,
                  color: "#fff",
                }}
              >
                Rare plants are the most unique items we collect as plant shops.
                They're the conversation starters, the pride of our collections,
                and the ones that make our hearts skip a beat. These plants are
                often rare because they're slow to propagate or difficult to
                grow, making them more valuable and sought after.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  borderRadius: 50,
                  px: 4,
                  py: 1,
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
                onClick={() => alert("Shopping feature coming soon!")}
              >
                Shop all RarePLNTS
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
