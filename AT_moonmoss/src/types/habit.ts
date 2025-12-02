export type HabitCategory = 'body' | 'mind' | 'heart' | 'home';

export interface Habit {
    id: string;
    name: string;
    description?: string
    category: HabitCategory
    completedToday: boolean;
}