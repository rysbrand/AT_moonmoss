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

            <div className="form-row">
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Water my body, stretch, journal..."
                        required
                        />
                </label>
            </div>

            <div className="form-row">
                <label>
                    Description
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={2}
                        placeholder="a note for future you!"
                        />
                </label>
            </div>

            <div className="form-row">
                <label>
                    Category
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value as HabitCategory)}
                        >
                        {CATEGORY_OPTIONS.map(cat => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                        </select>
                </label>
            </div>
            <button type="submit" className="button-primary">
                Plant habit
            </button>
        </form>
    );
};

//the commented out sections are the incomplete, currently nonfunctioning bits.