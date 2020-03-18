import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import ROUTES from 'strings/routes'

import Loader from 'components/Atoms/Loader'

const Home = lazy(() => import('../HomePage'))
const Error = lazy(() => import('../Error'))

const Routes: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route path={ROUTES.HOME} exact={true} component={Home} />
                <Route component={Error} />
            </Switch>
        </Suspense>
    )
}

export default Routes
