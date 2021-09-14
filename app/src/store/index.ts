import { IVisitor } from '../types'
import { Action, Actions } from './actions'

interface IState {
  isLoading: boolean
  visitor: IVisitor
}

export const initialState: IState = {
  isLoading: false,
  visitor: {
    id: '',
    shared: false,
    email: '',
  } as IVisitor
}

export const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case Actions.SetIsLoading: {
      const {
        isLoading,
      } = action.payload
      return {
        ...state,
        isLoading,
      }
    }

    case Actions.SetVisitor: {
      const {
        visitor,
      } = action.payload
      return {
        ...state,
        visitor,
      }
    }

    case Actions.SetVisitorDidShare: {
      return {
        ...state,
        visitor: {
          ...state.visitor,
          shared: true,
        },
      }
    }

    case Actions.SetVisitorDidSubscribe: {
      const {
        email,
      } = action.payload
      return {
        ...state,
        visitor: {
          ...state.visitor,
          email,
        },
      }
    }

    default:
      throw new Error('unexpected action type')
  }
}