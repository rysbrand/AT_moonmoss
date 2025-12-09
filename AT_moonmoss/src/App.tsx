import { useState } from "react";
import { MorningGate } from "./components/MorningGate";
import { GardenView } from "./components/garden/GardenView";
import "./App.css";

type MorningEntry = {
  mood: string;
  intention: string;
  need: "gentle" | "steady" | "playful";
};

export default function App() {
  const [entry, setEntry] = useState<MorningEntry | null>(null);

  const today = new Date().toLocaleDateString();

  //show Morning Gate
  if (!entry) {
    return (
      <MorningGate
        today={today}
        onComplete={(data) => setEntry(data)}
        onSkip={undefined}
      />
    );
  }

  // show garden view
  return (
    <GardenView
      mood={entry.mood}
      intention={entry.intention}
      need={entry.need}
      onReset={() => setEntry(null)}
    />
  );
}