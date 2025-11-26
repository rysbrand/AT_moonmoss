import React, {createContext, useContext, useMemo, useReducer} from "react";
import type { GardenState, GardenPhilosophyId, Ritual, RitualLogEntry } from "../types/garden";
import { v4 as uuid} from "uuid";

type GardenAction =
    | {type: "SET_PHILOSOPHY"; philosophy: GardenPhilosophyId}
    | {type: "ADD_RITUAL"; ritual: Omit<Ritual, "id">}
    | {type: "LOG_RITUAL"; ritualId: string; amount?: number};

const initialState: GardenState = {
    philosphy: null,
    rituals: [],
    ritualLogs: []
};

function gardenReducer(state: GardenState, action: GardenAction) : GardenState {
    switch(action.type) {
        case "SET_PHILOSOPHY":
            return {...state, philosphy: action.philosophy};

        case "ADD_RITUAL":
      return {
        ...state,
        rituals: [...state.rituals, { ...action.ritual, id: uuid() }]
      };

    case "LOG_RITUAL":
      return {
        ...state,
        ritualLogs: [
          ...state.ritualLogs,
          {
            id: uuid(),
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

export const GardenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(gardenReducer, initialState);

    const value = useMemo(() => ({ state, dispatch }), [state]);

    return <GardenContext.Provider value={value}>{children}</GardenContext.Provider>;
};
