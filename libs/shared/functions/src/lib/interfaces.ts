export interface User {
  id: string,
  firstName: string,
  email: string,
}

export interface Workout {
  id: string,
  name: string,
  date?: string,
  exercises: string[]
  weekType: string
}

export interface Exercise {
  id: string,
  title: string,
  description?: string,
  note?: string,
  planReps: number,
  planSets: number,
  planWeight?: number
  realSets?: Set[],
}

export interface PlanExercise {
  id: string,
  title: string,
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

