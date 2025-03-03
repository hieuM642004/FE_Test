"use client";

import { Container, Box } from "@mui/material";
import Image from "next/image";
import banner from "../../public/images/banner.jpg";
import CustomTypography from "@/components/ui/CustomTypography/CustomTypography";
import CategorySection from "@/components/Topics/Topics";
import About from "@/components/About/About";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          mb: 4,
        }}
      >
        <Image
          src={banner}
          alt="Banner Image"
          width={800}
          height={400}
          style={{
            width: "100%",
            height: "auto",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          priority
        />

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
        >
          <CustomTypography
            variant="h2"
            component="div"
            color="text.light"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1.2,
            }}
          >
            Growing Happiness
          </CustomTypography>
        </Box>
      </Box>
      <Container>
        <CustomTypography variant="h5">
          {" "}
          We are PLNTS - the online plant shop for everything a plant lover
          needs!
        </CustomTypography>

        <CustomTypography>
          PLNTS.com is your one-stop shop for all plant related goodness. It’s a
          place to learn how to become the best possible plant parent and
          connect with other plant lovers throughout Europe.
        </CustomTypography>
        <CategorySection />
        <About />
      </Container>
    </>
  );
}
