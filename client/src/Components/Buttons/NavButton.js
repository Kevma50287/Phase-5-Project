import { Button } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './ButtonTheme';





const NavButton = ({ title, navigateTo='/', navigateFrom=null, size='small' }) => {
  const navigate = useNavigate()
  const location = useLocation().pathname
  const handleNavigate = () => {
    if (navigateFrom === 'current-page') {
      navigate(`${location}${navigateTo}`)
    } else {
      navigate(`${navigateTo}`)
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Button variant='contained' color='secondary' className='nav-button' onClick={() => handleNavigate()} size={size}>
      {title}
      </Button>
    </ThemeProvider>
    
  )
}

export default NavButton