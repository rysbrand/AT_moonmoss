import React, {createContext, useContext, useMemo, useReducer} from "react";
import type { GardenState, GardenPhilosophyId, Ritual, /*RitualLogEntry*/ } from "../types/garden";

function createId(): string {
    return (Date.now().toString(36) + "-" + Math.random().toString(36).slice(2))
}

type GardenAction =
    | {type: "SET_PHILOSOPHY"; philosophy: GardenPhilosophyId}
    | {type: "ADD_RITUAL"; ritual: Omit<Ritual, "id">}
    | {type: "LOG_RITUAL"; ritualId: string; amount?: number};

const initialState: GardenState = {
    philosophy: null,
    rituals: [],
    ritualLogs: []
};

function gardenReducer(state: GardenState, action: GardenAction) : GardenState {
    switch(action.type) {
        case "SET_PHILOSOPHY":
            return {...state, philosophy: action.philosophy};

        case "ADD_RITUAL":
      return {
        ...state,
        rituals: [...state.rituals, { ...action.ritual, id: createId() }]
      };

    case "LOG_RITUAL":
      return {
        ...state,
        ritualLogs: [
          ...state.ritualLogs,
          {
            id: createId(),
            ritualId: action.ritualId,
            timestamp: new Date().toISOString(),
            amount: action.amount
          }
        ]
      };

    default:
      return state;
  }
}

const GardenContext = createContext<{
    state: GardenState;
    dispatch: React.Dispatch<GardenAction>;
} | null>(null);

export const GardenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(gardenReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <GardenContext.Provider value={value}>{children}</GardenContext.Provider>
  );
};

export function useGarden() {
    const ctx = useContext(GardenContext);
    if(!ctx) {
        throw new Error("useGarden must be used within a GardenProvider");
    }
    return ctx;
}
