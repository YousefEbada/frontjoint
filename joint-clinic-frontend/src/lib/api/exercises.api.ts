import api from "./axios";

// Backend Exercise type matching the domain model
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  _id: string;
  title: string;
  description?: string;
  musclesTargeted: string[];
  equipmentNeeded: string[];
  difficultyLevel: DifficultyLevel;
  videoBlobName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExerciseRequest {
  title: string;
  description?: string;
  musclesTargeted?: string[];
  equipmentNeeded?: string[];
  difficultyLevel?: DifficultyLevel;
  video: File;
}

// Fetch all exercises
export const getExercises = async (): Promise<Exercise[]> => {
  try {
    const response = await api.get("/exercise");
    console.log("getExercises response:", response.data);

    // Backend returns { ok: boolean, data: Exercise[], error?: string }
    if (response.data.ok && response.data.data) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error(
      "Error fetching exercises:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

// Create new exercise with video upload
export const createExercise = async (
  exerciseData: CreateExerciseRequest
): Promise<Exercise> => {
  try {
    const formData = new FormData();
    formData.append("title", exerciseData.title);

    if (exerciseData.description) {
      formData.append("description", exerciseData.description);
    }

    if (exerciseData.musclesTargeted && exerciseData.musclesTargeted.length > 0) {
      formData.append("musclesTargeted", JSON.stringify(exerciseData.musclesTargeted));
    }

    if (exerciseData.equipmentNeeded && exerciseData.equipmentNeeded.length > 0) {
      formData.append("equipmentNeeded", JSON.stringify(exerciseData.equipmentNeeded));
    }

    if (exerciseData.difficultyLevel) {
      formData.append("difficultyLevel", exerciseData.difficultyLevel);
    }

    formData.append("video", exerciseData.video);

    const response = await api.post("/exercise", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("createExercise response:", response.data);

    if (response.data.ok && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error || "Failed to create exercise");
  } catch (error) {
    console.error(
      "Error creating exercise:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

// Get single exercise by ID
export const getExerciseById = async (id: string): Promise<Exercise> => {
  try {
    const response = await api.get(`/exercise/${id}`);
    console.log("getExerciseById response:", response.data);

    if (response.data.ok && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error || "Failed to fetch exercise");
  } catch (error) {
    console.error(
      "Error fetching exercise by ID:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

// Get exercise video signed URL
export const getExerciseVideo = async (id: string): Promise<string> => {
  try {
    console.log("getExerciseVideo API - Requesting video for ID:", id);
    console.log("getExerciseVideo API - URL:", `/exercise/${id}/video`);

    const response = await api.get(`/exercise/${id}/video`);
    console.log("getExerciseVideo response - Full response:", response);
    console.log("getExerciseVideo response - Data:", response.data);
    console.log("getExerciseVideo response - Ok?:", response.data.ok);
    console.log("getExerciseVideo response - Data field:", response.data.data);

    if (response.data.ok && response.data.data) {
      console.log("getExerciseVideo - Returning URL:", response.data.data);
      return response.data.data; // Backend returns the signed URL in data field
    }

    console.error("getExerciseVideo - Invalid response structure:", response.data);
    throw new Error(response.data.error || "Failed to fetch video URL");
  } catch (error) {
    console.error(
      "Error fetching exercise video:",
      (error as any).response?.data || (error as any).message
    );
    console.error("Full error object:", error);
    throw error;
  }
};

// Delete exercise
export const deleteExercise = async (id: string): Promise<void> => {
  try {
    const response = await api.delete(`/exercise/${id}`);
    console.log("deleteExercise response:", response.data);

    if (!response.data.ok) {
      throw new Error(response.data.error || "Failed to delete exercise");
    }
  } catch (error) {
    console.error(
      "Error deleting exercise:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

// Assign exercise to patient (keeping existing functionality)
export const assignExercise = async (
  patientId: string,
  exerciseId: string
): Promise<void> => {
  try {
    const response = await api.post(`/exercise/assign`, {
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
