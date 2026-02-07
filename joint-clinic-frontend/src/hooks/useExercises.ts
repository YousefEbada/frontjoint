import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getExercises,
  createExercise,
  getExerciseById,
  getExerciseVideo,
  deleteExercise,
  assignExercise,
  getAssignedExercises,
  getAssignedExerciseByExerciseId,
  Exercise,
  AssignedExercise,
  CreateExerciseRequest,
} from "@/lib/api/exercises.api";

// Get all exercises
export const useExercises = () => {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: getExercises,
  });
};

// Create new exercise
export const useCreateExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (exerciseData: CreateExerciseRequest) =>
      createExercise(exerciseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
  });
};

// Get exercise by ID (fetches all and filters since backend doesn't have GET /exercise/:id)
export const useExerciseById = (id: string) => {
  return useQuery({
    queryKey: ["exercise", id],
    queryFn: async () => {
      console.log("useExerciseById - Fetching exercise with ID:", id);
      const exercises = await getExercises();
      console.log("useExerciseById - All exercises:", exercises);
      console.log("useExerciseById - All exercise IDs:", exercises.map(ex => ex._id));
      const exercise = exercises.find(ex => ex._id === id);
      console.log("useExerciseById - Found exercise:", exercise);
      if (!exercise) {
        throw new Error(`Exercise with ID ${id} not found`);
      }
      return exercise;
    },
    enabled: !!id, // Only fetch if id is provided
  });
};

// Get exercise video URL
export const useExerciseVideo = (id: string) => {
  console.log("useExerciseVideo - Called with ID:", id);
  console.log("useExerciseVideo - Enabled:", !!id);

  return useQuery<string>({
    queryKey: ["exerciseVideo", id],
    queryFn: async () => {
      console.log("useExerciseVideo queryFn - Fetching video for ID:", id);
      try {
        const url = await getExerciseVideo(id);
        console.log("useExerciseVideo queryFn - Received URL:", url);
        return url;
      } catch (error) {
        console.error("useExerciseVideo queryFn - Error:", error);
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes - signed URLs are valid for longer, but refresh periodically
    retry: 1, // Only retry once
  });
};

// Delete exercise
export const useDeleteExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteExercise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
  });
};

// Assign exercise to patient
export const useAssignExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      patientId,
      exerciseId,
      doctorNixpendId,
      noOfReps,
      noOfSets,
      sessionNumber,
    }: {
      patientId: string;
      exerciseId: string;
      doctorNixpendId: string;
      noOfReps: number;
      noOfSets: number;
      sessionNumber: number;
    }) => assignExercise(patientId, exerciseId, doctorNixpendId, noOfReps, noOfSets, sessionNumber),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      queryClient.invalidateQueries({ queryKey: ["assigned-exercises"] });
    },
  });
};

// Get assigned exercises
export const useAssignedExercises = (patientId: string) => {
  return useQuery({
    queryKey: ["assigned-exercises", patientId],
    queryFn: () => getAssignedExercises(patientId),
    enabled: !!patientId,
  });
};

// Get specific assigned exercise
export const useAssignedExercise = (patientId: string, exerciseId: string) => {
  return useQuery({
    queryKey: ["assigned-exercise", patientId, exerciseId],
    queryFn: () => getAssignedExerciseByExerciseId(patientId, exerciseId),
    enabled: !!patientId && !!exerciseId,
  });
};
