import React, { lazy, Suspense } from 'react'

import { Switch, Route } from 'react-router-dom'

import ROUTES from 'strings/routes'

import Loader from 'components/Atoms/Loader'

// import Home from '../HomePage'
// import Error from '../Error'

const Home = lazy(() => import('../HomePage'))
const Error = lazy(() => import('../Error'))

const Routes: React.FC = () => {
    return (
        <div data-testid="routes">
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route
                        data-testid="homeRoute"
                        path={ROUTES.HOME}
                        exact
                        component={Home}
                    />

                    <Route component={Error} />
                </Switch>
            </Suspense>
        </div>
    )
}

export default Routes
