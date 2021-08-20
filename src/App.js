import './App.css';
import { useState, useEffect } from 'react';
import { Layout, Col, Row, Spin } from 'antd';
import SignUp from './Pages/signUp';
import SignIn from './Pages/signIn';
import PrivatePage from './Pages/privatePage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import { useTokenStorage, useLoadingApp } from './useLoadingApp';
const { Content } = Layout;

function App() {
    // const [loader, setLoader] = useState(true);
    const { waiting, setWaiting, setToken, token, fetchData, auth } =
        useLoadingApp();
    const { addToken, tokenInStorage } = useTokenStorage();

    useEffect(() => {
        /*addToken(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTE4NTEyZDI3Yzg3YWZkNjU5OTEyOWYiLCJpYXQiOjE2Mjg5ODM3ODd9.O98cA2BAjh6_u7DpQ1e1qKGN9ZKk_PMWt47D8VME-b0'
        );*/
        console.log('app - tokenInStorage', tokenInStorage, waiting);
        setToken(tokenInStorage);
        fetchData(tokenInStorage);
    }, []);

    useEffect(() => {
        console.log('wait', waiting);
    }, [waiting]);

    return (
        <Layout style={{ height: '100vh' }}>
            <Content>
                <Row align="center">
                    <Col span={10} />
                    <Col span={4}>
                        {waiting ? (
                            <Spin />
                        ) : (
                            <Router>
                                <Switch>
                                    <ProtectedRoute auth={auth} exact path="/">
                                        <PrivatePage />
                                    </ProtectedRoute>

                                    <Route path="/login" component={SignIn} />

                                    <Route path="/signUp" component={SignUp} />
                                </Switch>
                            </Router>
                        )}
                    </Col>
                    <Col span={10} />
                </Row>
            </Content>
        </Layout>
    );
}

export default App;
