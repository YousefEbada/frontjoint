export interface ExerciseRepoPort {
  create(data: { title: string | any, description: string | any, videoBlobName: string | any }): any;
  find(id: string): any;
  getAll(): any;
  delete(id: string): any;
  assignExercise(data: { patientId: string, exerciseId: string, doctorNixpendId: string }): Promise<any>;
  getAssignedExercises(patientId: string): Promise<any>;
}