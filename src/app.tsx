import { FC } from 'react'
import { useRoutes } from 'react-router-dom'
import Header from './components/Header/Header'
import routes from './constants/routes'

const AppContainer: FC = () => {
  const content = useRoutes(routes)

  return (
    <div className={'wrapper'}>
        <Header />
      {content}
    </div>
  )
}

export default AppContainer