export interface User {
  id: string,
  firstName: string,
  email: string,
}

export interface Workout {
  uid: string,
  id: string,
  name: string,
  date?: string,
  exercises: Exercise[]
  weekType: string
}

export interface ExecutedWorkout {
  id: string,
  uid: string,
  name?: string,
  planWorkoutId: string
  date: string,
  executedExercises: ExecutedExercise[]
  weekType?: string
}

export interface Exercise {
  uid: string,
  id: string,
  title: string,
  key?: string
  weekType?: string
  description?: string,
  planReps: number,
  planSets: number,
  order?: number,
  planWeight?: number
}


export interface ExecutedExercise {
  id: string,
  planExerciseID: string,
  title: string,
  note?: string,
  planReps: number,
  planSets: number,
  planWeight?: number
  realSets?: Set[],
}


export interface Set {
  id?: string,
  repetitions?: number,
  weight?: number,
  isDone: boolean
  withoutChanges: boolean
}

export interface SetForUI  {
  id?: string,
  repetitions?: number,
  weight?: number,
  withoutChanges: boolean
  isDone: boolean
  editMode: boolean
}

export enum WeekType {
  max="MAX",
  min="MIN"
}
