import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

interface UserState {
    readonly user: object
}

type UserActions = ActionType<typeof actions>

export type ContainerUserState = UserState
export type ContainerUserActions = UserActions
