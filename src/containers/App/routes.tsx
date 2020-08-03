import React, { lazy, Suspense } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ROUTES from 'strings/routes'

import Loader from 'components/Atoms/Loader'

const Home = lazy(() => import('../HomePage'))
const Error = lazy(() => import('../Error'))

const Routes: React.FC = () => {
    return (
        <div data-testid="routes">
            <Suspense fallback={<Loader />}>
                <Router>
                    <Switch>
                        <Route path={ROUTES.HOME} exact component={Home} />
                        <Route component={Error} />
                    </Switch>
                </Router>
            </Suspense>
        </div>
    )
}

export default Routes
