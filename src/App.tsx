import React from 'react'

import { Box, Container, Typography } from '@mui/material'

import { Questions } from './components/question'

import styles from './app.module.scss'

function App() {
  return (
    <Container>
      <Box className={styles.header}>
        <h1>Help Protect Your Home with a New Security System</h1>
        <h2>Quick and easy. Get matched with the best Home Security company in your area</h2>
      </Box>

      <Box className={styles.quizContainer}>
        <Questions />
      </Box>

      <Box>
        <h3>How It Works:</h3>
        <Typography>
          Safe Home Pros services hundreds of brands and provides trusted information for millions
          of individuals across the United States
        </Typography>
        <Typography>Easily compare competitors</Typography>
        <Typography>Strengthen your consumer awareness</Typography>
        <Typography>Find the best rates for your financial needs</Typography>
      </Box>

      <footer className={styles.footer}>
        <Typography>
          Safe Home Pros offers rankings and reviews for the top companies in many verticals across
          different industries in the United States. We strive to remain both objective and
          informative, with the goal of giving our users the best experience. The opinions and the
          prices we represent on our site(s) are subject to change without notice. We are an
          independent, advertising-supported comparison service. The offers that appear on this site
          are from companies that compensate us. This compensation may impact how and where products
          appear on this site, including, for example, the order in which they may appear within the
          listing categories. Copyright © 2023 Safe Home Pros.
        </Typography>
      </footer>
    </Container>
  )
}

export default App
