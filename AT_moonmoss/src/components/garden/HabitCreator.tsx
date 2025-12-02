import React, { useState } from 'react';
import type { HabitCategory } from '../../types/habit';

export type NewHabitInput = {
    name: string;
    description?: string;
    category: HabitCategory;
};

interface HabitCreatorProps {
    onAddHabit: (data: NewHabitInput) => void;
}

const CATEGORY_OPTIONS: HabitCategory[] = ['body', 'mind', 'heart', 'home'];

export const HabitCreator: React.FC<HabitCreatorProps> = ({onAddHabit}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<HabitCategory>('body');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name.trim()) return;

        onAddHabit({
            name: name.trim(),
            description: description.trim() || undefined,
            category,
        });

        setName('');
        setDescription('');
        setCategory('body');
    };

    return (
        <form className="habit-creator" onSubmit={handleSubmit}>
            <h3>Add a new ritual</h3>
        </form>
    )
}