import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getExercises,
  assignExercise,
  Exercise,
} from "@/lib/api/exercises.api";

export const useExercises = () => {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: getExercises,
  });
};

export const useAssignExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      patientId,
      exerciseId,
    }: {
      patientId: string;
      exerciseId: number;
    }) => assignExercise(patientId, exerciseId),
    onSuccess: () => {
      // Invalidate relevant queries (e.g., patient details or exercises list if it tracks assignments)
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
  });
};
