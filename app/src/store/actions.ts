import { IVisitor } from '../types'

export enum Actions {
  SetIsLoading = 'set-is-loading',
  SetVisitor = 'set-visitor',
  SetVisitorDidShare = 'set-visitor-did-share',
  SetVisitorDidSubscribe = 'set-visitor-did-subscribe',
}

export type Action = 
  | { type: Actions.SetIsLoading, payload: { isLoading: boolean }}
  | { type: Actions.SetVisitor, payload: { visitor: IVisitor }}
  | { type: Actions.SetVisitorDidShare }
  | { type: Actions.SetVisitorDidSubscribe, payload: { email: IVisitor['email'] }}