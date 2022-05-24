import { destroyCookie } from 'nookies'
import {useContext, useEffect } from 'react'
import { Can } from '../componts/Can'
import {AuthContext } from '../contexts/AuthContext'
import { useCan } from '../hooks/useCan'
import { setupApiClient } from '../services/api'
import { api } from '../services/apiClient'
import { AuthTokenError } from '../services/errors/AuthTokenError'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Dashboard(){
  
  const {user,signOut} =useContext(AuthContext)

  // const userCanSeeMetrics = useCan({
  //   // permissions: ['metrics.list'],
  //   roles: ['administrator', 'editor']
  // });


  useEffect(()=>{
    api.get('/me')
    .then(response => console.log(response))
    .catch(error =>console.log(error))
  },[])

  return(
    <>
      <h1>{`email: ${user?.email}`}</h1>
      {/* { userCanSeeMetrics && <div>Métricas</div>} */}
      <Can permissions={['metrics.list']}>
        <div> Métricas </div>
        <button onClick={signOut}>Sign Out</button>
      </Can>

    
    </>
  )
}

export  const getServerSideProps = withSSRAuth(async(ctx) => {

  const apiClient = setupApiClient(ctx)

  const response = await apiClient.get('/me');
  console.log(response.data)

  return {
    props:{

    }
  }
  }
)