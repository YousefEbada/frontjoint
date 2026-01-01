import api from "./axios";

export interface Exercise {
  id: number;
  imageSrc: string;
  title: string;
  status?: string;
  minutes?: number;
  description?: string;
  videoUrl?: string; // If applicable
}

export const getExercises = async (): Promise<Exercise[]> => {
  try {
    const response = await api.get("api/exercises");

    console.log("getExercises response:", response.data);
    return response.data.exercises || [];
  } catch (error) {
    console.error(
      "Error fetching exercises:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

export const assignExercise = async (
  patientId: string,
  exerciseId: number
): Promise<void> => {
  try {
    const response = await api.post(`/exercises/assign`, {
      patientId,
      exerciseId,
    });
    console.log("assignExercise response:", response.data);
  } catch (error) {
    console.error(
      "Error assigning exercise:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};
