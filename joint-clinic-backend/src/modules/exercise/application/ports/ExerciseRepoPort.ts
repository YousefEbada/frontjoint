export interface ExerciseRepoPort {
  create(data: { title: string, description?: string, videoBlobName: string, musclesTargeted?: string[], equipmentNeeded?: string[], difficultyLevel?: string }): Promise<any>;
  find(id: string): any;
  getAll(): any;
  delete(id: string): any;
  assignExercise(data: { patientId: string, exerciseId: string, doctorNixpendId: string }): Promise<any>;
  getAssignedExercises(patientId: string): Promise<any>;
}