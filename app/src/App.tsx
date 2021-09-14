import React from 'react'

import { apiProvider } from './api'

import { initialState, reducer } from './store'
import { Actions } from './store/actions'

import { TheHeader } from './components/TheHeader'
import { Form } from './components/Form'

import './App.css'

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    setIsLoading()
    apiProvider.getVisitor()
      .then(visitor => {
        dispatch({ 
          type: Actions.SetVisitor, 
          payload: { 
            visitor, 
          },
        })
        apiProvider.setToken(visitor.id)
      })
      .catch(e => {
        console.log(e)
        // TODO: something
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const setIsLoading = (isLoading: boolean = true) => {
    dispatch({ 
      type: Actions.SetIsLoading, 
      payload: { 
        isLoading, 
      },
    })
  }

  const handleVisitorDidShare = () => {
    setIsLoading()
    apiProvider.setVisitorDidShare()
      .then(() => {
        dispatch({ type: Actions.SetVisitorDidShare })
      })
      .catch(e => {
        console.log(e)
        // TODO: something
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleVisitorDidSubscribe = (email: string) => {
    setIsLoading()
    apiProvider.setVisitorDidSubscribe(email)
      .then(() => {
        dispatch({ 
          type: Actions.SetVisitorDidSubscribe,
          payload: {
            email,
          },
        })
      })
      .catch(e => {
        console.log(e)
        // TODO: something
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const formIsSent = true
    && state.visitor.id !== ''
    && state.visitor.shared !== false
    && state.visitor.email !== ''

  return (
    <div className="app">
      <TheHeader className="app__header wrapper" />
      <div className="app__content wrapper">
        {formIsSent ? (
          <h1 className="app__heading">
            <span className="app__heading_color_red app__heading_is-striked_yes">
              &nbsp;выборы&nbsp;
            </span><br />
            путешествие<br />
            <span className="app__heading_size_larger">
              близко!
            </span>
          </h1>
        ) : (
          <h1 className="app__heading">
            Чтобы выиграть <br />
            путешествие
          </h1>
        )}
        {formIsSent === false && (
          <Form 
            isLoading={state.isLoading}
            shared={state.visitor.shared}
            email={state.visitor.email || ''}
            onDidShare={handleVisitorDidShare}
            onDidSubscribe={handleVisitorDidSubscribe}
            className="app__form"
          />
        )}
      </div>
    </div>
  );
}

export default App;