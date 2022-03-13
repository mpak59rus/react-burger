import { useEffect } from "react";
import { ProtectedRoute } from "../protected-route/protected-route";
import ErrorBoundary from "../error-boundary/error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { getIngredient } from "../../services/actions/burger";

import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from "react-router-dom";
import { Profile, ResetPassword, ForgotPassword, Registration, Login, MainPage, FeedsPage } from '../../pages/index'
import { getCookie } from "../../utils/cookies";
import { getUserData } from "../../services/actions/user";
import { Ingredient } from "../../pages/ingredient";
import { Header } from "../app-header/app-header";
import { Modal } from "../modal/modal";
import { CLOSE_FEED } from "../../services/actions/feed-view";
import { FeedDetails } from "../feed-details/feed-details";
import { FeedDetailsPage } from "../../pages/feed-details-page";
import { WS_CONNECTION_START } from "../../services/actions/ws-actions";


export const App = () => {
  let location = useLocation()
  const dispatch = useDispatch();
  const history = useHistory()
  const feed = useSelector(state => state.feed.feedView)

  const { email, userName, token, isAuthenticated } = useSelector((state) => state.user);
  // const ws = new WebSocket("wss://norma.nomoreparties.space/chat")
  // const ws = new WebSocket(`wss://norma.nomoreparties.space/chat?token=${token.split('Bearer ')[1]}`)
  const ws = new WebSocket("wss://norma.nomoreparties.space/api/orders/all")

  ws.onopen = event => {
    console.log('connect', event)
  }
  ws.onmessage = (event) => {
    console.log('message', event)
  }

  const background = location.state && location.state.background;

  const refreshToken = getCookie('refreshToken')

  // useEffect(() => {
  //   // console.log(background)
  //   console.log(token?.split('Bearer ')[1])
  //   // console.log(feed)
  //   console.log('refresh token', refreshToken)
  //   console.log(isAuthenticated)
  // }, [isAuthenticated, refreshToken])

  useEffect(() => {
    dispatch(getIngredient());
  }, [dispatch]);

  useEffect(() => {
    const refreshToken = getCookie('refreshToken')
    console.log('refresh token', refreshToken)
    if (refreshToken) {
      dispatch(getUserData(refreshToken))
    }
  }, [])

  const onClose = (e) => {
    e.preventDefault()
    history.goBack()
    dispatch({ type: CLOSE_FEED })
  }


  // useEffect(() => {
  //   dispatch({ type: WS_CONNECTION_START });
  // }, [])

  return (
    <ErrorBoundary>

      {/* <Router> */}
      <Header />

      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <MainPage />
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/register" exact={true}>
          <Registration />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword />
        </Route>
        <Route path="/feed" exact={true}>
          <FeedsPage />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact={true}>
          <FeedDetailsPage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact={true}>
          <Ingredient />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <FeedDetailsPage />
        </Route>
        {/* <Route></Route> */}
      </Switch>
      {background && <ProtectedRoute path="/profile/orders/:id" exact={true}><Modal onClose={onClose} header={`#${feed}`} ><FeedDetails /></Modal></ProtectedRoute>}
      {background && <Route path="/feed/:id" children={<Modal onClose={onClose} header={`#${feed}`} ><FeedDetails /></Modal>} />}
      {/* </Router> */}
    </ErrorBoundary>
  );
};
