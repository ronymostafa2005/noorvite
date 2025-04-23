import api from './api';

/**
 * Fetch all "in_progress" tasks for the authenticated student
 * @returns {Promise<Array<{ id, title, due_date, status }>>}
 */
export const getInProgressTasks = async() => {
    try {
        // your backend accepts status=in_progress
        const { data } = await api.get('/tasks', {
            params: { status: 'in_progress' }
        });
        return data;
    } catch (err) {}
};