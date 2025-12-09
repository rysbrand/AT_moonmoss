import { GARDEN_PHILOSOPHIES } from "../../configs/gardenConfig"

interface GardenViewProps {
    mood: string;
    intention: string;
    need: "gentle" | "steady" | "playful";
    onReset: () => void;
};

export function GardenView({ mood, intention, need, onReset }: GardenViewProps) {
     const philosophyId =
    need === "gentle"
      ? "gentle_flow"
      : need === "steady"
      ? "natural_rhythm"
      : "dynamic_magic";

      const philosophy = GARDEN_PHILOSOPHIES.find((p) => p.id === philosophyId);

        return (
    <div className="garden-view">
      <h1>Your Moonmoss Garden</h1>

      <section className="garden-summary">
        <h2>Today&apos;s Check-in</h2>
        <p>
          <strong>Mood:</strong> {mood || "Not set"}
        </p>
        <p>
          <strong>Intention:</strong> {intention || "Not set"}
        </p>
        <p>
          <strong>Need:</strong> {need}
        </p>
      </section>

      <section className="garden-tile">
        <h2>Garden Philosophy</h2>
        {philosophy ? (
          <div className="garden-tile-card">
            <h3>{philosophy.name}</h3>
            <p className="tagline">{philosophy.tagline}</p>
            <p className="behavior">{philosophy.behaviorSummary}</p>
          </div>
        ) : (
          <p>No philosophy selected.</p>
        )}
      </section>

      <button className="secondary-btn" onClick={onReset}>
        Back to Morning Gate
      </button>
    </div>
  );
      
}