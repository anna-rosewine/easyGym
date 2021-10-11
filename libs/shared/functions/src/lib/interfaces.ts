export interface User {
  id: string,
  firstName: string,
  email: string,
}

export interface Workout {
  id: string,
  name: string,
  date?: string,
  exercises: Exercise[]
  weekType: string
}

export interface ExecutedWorkout {
  id: string,
  name: string,
  planWorkoutId: string
  date: string,
  executedExercises: ExecutedExercise[]
  weekType?: string
}

export interface Exercise {
  id: string,
  title: string,
  weekType?: string
  description?: string,
  planReps: number,
  planSets: number,
  planWeight?: number
}


export interface ExecutedExercise {
  id: string,
  planExerciseID: string,
  title?: string,
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
  withoutChanges: boolean
}

export enum WeekType {
  max="MAX",
  min="MIN"
}
