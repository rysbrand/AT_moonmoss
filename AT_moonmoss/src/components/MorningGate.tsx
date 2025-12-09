import React, {useState} from "react";

 interface MorningGateProps {
    today: string;
    onComplete: (data: {
        mood: string;
        intention: string;
        need: "gentle" | "steady" | "playful";
    }) => void;
    onSkip?: () => void;
 }

 //look at renaming these
 const MOODS = [
    { id: "low", label: "Tired" },
    { id: "meh", label: "Foggy" },
    { id: "ok", label: "Quiet" },
    { id: "good", label: "softly glowing"},
    { id: "high", label: "Charged"},
 ];

 export const MorningGate: React.FC<MorningGateProps> = ({
    today,
    onComplete,
    onSkip,
 }) => {
    const [mood, setMood] = useState("");
    const [intention, setIntention] = useState("");
    const [need, setNeed] = useState<"gentle" | "steady" | "playful">("gentle");

    const handleSubmit = (e: React.FormEvent) =>
         {
            e.preventDefault();
            onComplete({ mood, intention, need });
         };

         return (
<div className="morning-gate">
    <h1>Morning Gate</h1>
    <p className="subtitle">{today}</p>

    <form onSubmit={handleSubmit} className="morning-gate-form">
        <section>
            <h2>Mood</h2>
            <div className="mood-grid">
                {MOODS.map((m) => (
                    <button type="button" 
                    key={m.id} 
                    onClick={() => setMood(m.id)} 
                    className={"mood-button" + 
                    (mood === m.id ? " mood-button--active" : "")}>
                        <span>{m.label}</span>
                    </button>
                ))}
            </div>
        </section>

        <section>
            <h2>Intention</h2>
            <div>
                <textarea className="intention-input"
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                placeholder="Example: Be gentle with myself today."
                rows={3} />
            </div>

        </section>

        <section>
            <h2>Need</h2>
            <div>
                <div className="need-row">
                    <label>
                        <input type="radio"
                        name="need"
                        value="gentle"
                        checked={need==="gentle"}
                        onChange={() => setNeed("gentle")} />
                        Gentle
                    </label>
                    <label>
                        <input type="radio"
                        name="need"
                        value="steady"
                        checked={need==="steady"}
                        onChange={() => setNeed("steady")} />
                        Steady
                    </label>
                    <label>
                        <input type="radio"
                        name="need"
                        value="playful"
                        checked={need==="playful"}
                        onChange={() => setNeed("playful")} />
                        Playful
                    </label>
                </div>
            </div>
                
        </section>
        <div className="button-row">
            <button type="submit" className="primary-btn">
                Save today&apos;s entry
            </button>

            {onSkip && (
                <button type="button" onClick={onSkip} className="secondary-btn">
                    Skip for now
                </button>
            )}
        </div>
    </form>
</div>
);
};