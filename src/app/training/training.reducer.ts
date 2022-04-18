import { ExerciseModel } from "./exercise.model"
import * as fromApp from '../app.reducer'
import { SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING, TrainingActions } from "./training.actions"
import { createFeatureSelector, createSelector } from "@ngrx/store"

export interface TrainingState {
    availableExercises: ExerciseModel[],
    finishedExercises: ExerciseModel[],
    activeTraining: ExerciseModel | null
}

export interface State extends fromApp.AppState {
    training: TrainingState
}

const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    activeTraining: null
}

export function trainingReducer(state: TrainingState, actions: TrainingActions) {
    switch (actions.type) {
        case SET_AVAILABLE_TRAININGS:
            return {
                ...state,
                availableExercises: actions.payload
            }
        case SET_FINISHED_TRAININGS: 
            return {
                ...state,
                finishedExercises: actions.payload
            }
        case START_TRAINING:
            return {
                ...state,
                activeTraining: actions.payload
            }
        case STOP_TRAINING: 
            return {
                ...state,
                activeTraining: null
            }
        default:
            return state;
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableTrainings = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedTrainings = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getCurrentTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
