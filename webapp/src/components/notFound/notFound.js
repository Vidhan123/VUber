import React from 'react';

function NotFound () {

  const styles = {
    h1: {
      textAlign: 'center',
      letterSpacing: '1px',
      fontSize: '1000%',
      fontWeight: 'bold',
      marginTop: '20vh',
      marginBottom: '3vh',
    },
    p: {
      textAlign: 'center',
      fontSize: '100%',
      marginBottom: '30vh',
    },    
    body: {
      fontFamily: 'sans-serif',
      color: '#3f51b5',
    },
  }

  return(
    <div style={styles.body}>
      <h1 style={styles.h1}>404</h1>
      <p style={styles.p}>Page does not exist! Unless you were looking for this error page</p>
    </div>
  )
}

export default NotFound;