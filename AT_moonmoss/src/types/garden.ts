export type GardenPhilosophyId = 
| "gentle_flow"
| "natural_rhythm"
| "focused_ritual"
| "living_health"
| "dynamic_magic";

export interface GardenPhilosophy {
    id: GardenPhilosophyId;
    name: string;
    icon: string;
    tagline: string;
    behaviorSummary: string;
}


//not currently used, for future versions.
export type RitualType = "grounding" | "hearth" | "lumen" | "cycle";


//not currently used, for future versions.
export interface Ritual {
    id: string;
    practicalName: string;
    magicalName?: string;
    type: RitualType;
    targetPerDay?: number;
    targetUnit?: string;
    weeklyTarget?: number;
    isVisibleInDashboard: boolean;
}

//not currently used, for future versions.
export interface RitualLogEntry {
    id: string;
    ritualId: string;
    timestamp: string;
    amount?: number;
}

export interface GardenState {
    philosophy: GardenPhilosophyId | null;
    rituals: Ritual[];
    ritualLogs: RitualLogEntry[];
}