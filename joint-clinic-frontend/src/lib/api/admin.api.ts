import api from "./axios";

export const getTasks = async (userId: string) => {
    const response = await api.get(`/admin/get-tasks/${userId}`);
    return response.data;
};

export const addTask = async (userId: string, content: string, tag: string) => {
    const response = await api.post("/admin/add-task", { userId, content, tag });
    return response.data;
};

export const updateTask = async (taskId: string, updateData: any) => {
    const response = await api.put(`/admin/update-task/${taskId}`, updateData);
    return response.data;
};

export const removeTask = async (taskId: string) => {
    const response = await api.delete(`/admin/remove-task/${taskId}`);
    return response.data;
};
