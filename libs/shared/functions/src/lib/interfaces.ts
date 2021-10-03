export interface User {
  id: number,
  firstName: string,
  email: string,
}

export interface Workout {
  id: number,
  name: string,
  date?: string,
  exercises: Exercise[]
  weekType: string
}

export interface Exercise {
  id: number,
  name: string,
  description: string,
  note?: string,
  sets: Set[],
  workoutId: number
}


export interface Set {
  id: number,
  exerciseId: number,
  repetitions: number,
  weight: number
}
