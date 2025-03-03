'use client';

import * as React from 'react';
import { Box, Grid, Typography, TextField, Button, IconButton, Container } from '@mui/material';
import CustomTypography from './ui/CustomTypography/CustomTypography';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const footerLinks = {
  shop: [
    { name: 'All houseplants', href: '/shop/all-houseplants' },
    { name: 'All Baby houseplants', href: '/shop/all-baby-houseplants' },
  ],
  myAccount: [
    { name: 'My account', href: '/my-account' },
    { name: 'Login', href: '/login' },
  ],
  customerService: [
    { name: 'Frequently asked questions', href: '/faq' },
    { name: 'Contact', href: '/contact' },
    { name: 'Payments', href: '/payments' },
    { name: 'Transport and delivery', href: '/transport' },
    { name: 'Guarantee', href: '/guarantee' },
    { name: 'Return policy', href: '/return-policy' },
  ],
  about: [
    { name: 'Giftcard', href: '/giftcard' },
    { name: 'About us', href: '/about-us' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'B2B', href: '/b2b' },
    { name: 'Collaborations', href: '/collaborations' },
    { name: 'Press', href: '/press' },
    { name: 'Job opportunities', href: '/jobs' },
  ],
};

export default function Footer() {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value && !/^\S+@\S+\.\S+$/.test(value) ? 'Invalid email address' : null);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailError && email) {
      console.log('Subscribed with email:', email);
      setEmail('');
      setEmailError(null);
    } else {
      setEmailError('Please enter a valid email address');
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        bgcolor: '#4A704A', 
        color: '#ffffff',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={2}>
            <CustomTypography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
              PLNTS.com
            </CustomTypography>
            <Box>
              {footerLinks.shop.map((link, index) => (
                <CustomTypography
                  key={index}
                  variant="body1"
                  sx={{ color: '#ffffff', mb: 1, '&:hover': { color: '#debe48' } }}
                >
                  <a href={link.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {link.name}
                  </a>
                </CustomTypography>
              ))}
              {footerLinks.myAccount.map((link, index) => (
                <CustomTypography
                  key={index}
                  variant="body1"
                  sx={{ color: '#ffffff', mb: 1, '&:hover': { color: '#debe48' } }}
                >
                  <a href={link.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {link.name}
                  </a>
                </CustomTypography>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={2}>
            <CustomTypography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
              Customer service
            </CustomTypography>
            {footerLinks.customerService.map((link, index) => (
              <CustomTypography
                key={index}
                variant="body1"
                sx={{ color: '#ffffff', mb: 1, '&:hover': { color: '#debe48' } }}
              >
                <a href={link.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {link.name}
                </a>
              </CustomTypography>
            ))}
          </Grid>

          <Grid item xs={12} sm={2}>
            <CustomTypography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
              About PLNTS
            </CustomTypography>
            {footerLinks.about.map((link, index) => (
              <CustomTypography
                key={index}
                variant="body1"
                sx={{ color: '#ffffff', mb: 1, '&:hover': { color: '#debe48' } }}
              >
                <a href={link.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {link.name}
                </a>
              </CustomTypography>
            ))}
          </Grid>

          <Grid item xs={12} sm={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CustomTypography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
              Follow us
            </CustomTypography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                sx={{ color: '#ffffff', '&:hover': { color: '#debe48' } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://pinterest.com"
                target="_blank"
                sx={{ color: '#ffffff', '&:hover': { color: '#debe48' } }}
              >
                <PinterestIcon />
              </IconButton>
              <IconButton
                href="https://youtube.com"
                target="_blank"
                sx={{ color: '#ffffff', '&:hover': { color: '#debe48' } }}
              >
                <YouTubeIcon />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                sx={{ color: '#ffffff', '&:hover': { color: '#debe48' } }}
              >
                <InstagramIcon />
              </IconButton>
             
             
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTypography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
              What's the word on the street?
            </CustomTypography>
            <CustomTypography variant="body1" sx={{ color: '#ffffff', mb: 2 }}>
              Be part of our community by subscribing to our newsletters!
            </CustomTypography>
            <TextField
              fullWidth
              id="email"
              label="Your email address"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ffffff' },
                  '&:hover fieldset': { borderColor: '#debe48' },
                  '&.Mui-focused fieldset': { borderColor: '#debe48' },
                },
                '& .MuiInputLabel-root': { color: '#ffffff' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#debe48' },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                bgcolor: '#debe48',
                color: '#ffffff',
                borderRadius: 2,
                padding: '10px 20px',
                '&:hover': {
                  bgcolor: '#d4a93e',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                },
              }}
              onClick={handleSubscribe}
            >
              Surprise me!
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, borderTop: '1px solid #ffffff', pt: 2 }}>
          <CustomTypography variant="body2" sx={{ color: '#ffffff' }}>
            © {new Date().getFullYear()} Le Minh Hieu. All rights reserved.
          </CustomTypography>
        </Box>
      </Container>
    </Box>
  );
}