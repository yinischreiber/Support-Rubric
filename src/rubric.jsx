import React, { useState, useRef, useEffect } from "react";
import "./index.css";

const DEFAULT_LEVEL_LABELS = [
  "Independent",
  "Minimal > Moderate",
  "Moderate > Maximum",
  "Maximum Supports & Extensive Resources",
];

const sections = [
  {
    sectionTitle: "Independent Functioning",
    areas: [
      {
        title: "Transitions within the school day (i.e. bus, lunch, PE, recess, music, etc.)",
        descriptions: [
          "Able to move from one area of the campus to another independently or with minimal assistance (i.e., given explicit instruction and practice, alternate route, peer support, accommodation such as needing a special spot in line).",
          "Able to move from one area of the campus to another with minimal to moderate assistance (i.e., staff proximity, social stories).",
          "Able to move to and from some areas of the campus with moderate to maximum assistance (i.e., staff supervision, timers, visual supports).",
          "Moving around campus is extremely limited – extensive resources and adult assistance is needed for various reasons. Students require handheld assistance to move around campus.",
        ],
        suggestions: [
          ["Peer buddy system", "Visual schedules", "Campus maps"],
          ["Staff check-ins", "Social stories", "Practice walks"],
          ["Timers", "Adult supervision", "Verbal cues"],
          ["Handheld guidance", "Assistive devices", "Mobility training"],
        ],
      },
      {
        title: "Daily Routines",
        descriptions: [
          "Student can follow daily routines within the classroom independently or with minimal supports while being provided universally designed supports (i.e., clearly labeled cubbies, work boxes, whole classroom schedule, clearly defined zones, use of visual classroom timers, priority seating, proximity support, UDL seating, fidgets).",
          "Student can follow daily routines within the classroom with minimal to moderate support while being provided universally designed classroom management (i.e., visual schedules/supports with adult prompting).",
          "Students can follow some daily routines when provided moderate to maximum supports (i.e., personalized schedules, explicit instruction, support for changes in schedule, specific behavioral interventions and visual supports including greater detail and task analysis, verbal prompting during specific routines throughout the day).",
          "Students have difficulty following most daily routines. Requires maximum support and extensive resources (i.e., ongoing explicit training and maximum adult guidance during daily routine).",
        ],
        suggestions: [
          ["Visual schedules", "Priority seating", "Fidgets", "Timers"],
          ["Adult prompting", "Social stories", "Classroom visuals"],
          ["Task analysis", "Behavioral interventions", "Frequent verbal prompts"],
          ["1:1 support", "Continuous adult guidance", "Daily routine training"],
        ],
      },
      {
        title: "Follows Directions",
        descriptions: [
          "Student can follow directions independently or with minimal supports on a variety of tasks; responds appropriately most of the time when given a directive (i.e., verbal or visual directions).",
          "Student can follow directions with minimal to moderate supports on a variety of tasks; responds appropriately most of the time when given a directive and periodic teacher cueing.",
          "Student can follow directions with moderate to maximum supports on a variety of tasks; responds appropriately some of the time when given a directive and teacher prompting (i.e., task checklist, increased adult cueing).",
          "Student requires ongoing maximum assistance and extensive resources to follow all directions (i.e., ongoing explicit training and maximum adult guidance to follow directions).",
        ],
        suggestions: [
          ["Visual directions", "Verbal prompts", "First/Then boards"],
          ["Periodic teacher cueing", "Checklists", "Visual reminders"],
          ["Task checklists", "Frequent adult cueing", "Simple step breakdowns"],
          ["1:1 support", "Direct instruction", "Frequent repetition"],
        ],
      },
    { type: "notes"}
    ]
  },
  {
    sectionTitle: "Communication",
    areas: [
      {
      title: "Expressive Communication",
      descriptions: [
        "Student can use an identified communication method independently or with minimal support.",
        "Student can use an identified communication method with minimal to moderate support for most of the school day.",
        "Student can use an identified communication method with moderate to maximum support in some or most situations.",
        "Team is working to identify the most effective mode; communication requires continuous support and ongoing trials.",
      ],
      suggestions: [
        ["Peer modeling", "Opportunities for choice-making", "Natural conversation practice"],
        ["Sentence starters", "Visual prompts", "Prompt fading plan"],
        ["Modeled language (Aided/Verbal)", "Communication scripts", "Frequent partner support"],
        ["Communication inventory/assessment", "Partner-assisted techniques", "High-frequency aided modeling"],
      ],
    },
    {
      title: "Receptive Communication",
      descriptions: [
        "Given a task with choices, student can make a selection independently or with minimal support across tasks and follow routine directions.",
        "Given a task with choices, student can make a selection with minimal to moderate prompts; follows routine directions with minimal to moderate prompting.",
        "Given a task with choices, student can make a selection with moderate prompts and follows some routine directions with moderate to maximum prompting.",
        "Given a task with choices, student needs continuous scaffolds to make selections; follows routine directions with maximum prompts from staff; receptive language is limited in number of contexts.",
      ],
      suggestions: [
        ["Clear, concise directions", "Check for understanding", "Visual choice boards"],
        ["First/Then visuals", "Gesture + verbal prompts", "Visual schedules"],
        ["Task analysis steps", "Errorless teaching trials", "Increased wait time"],
        ["Partner-assisted response formats", "Highly simplified choices", "Repetition with multi-modal cues"],
      ],
    },
    {
      title: "Social Communication / Pragmatics",
      descriptions: [
        "Initiates and uses functional/effective social interactions with staff/peers independently or with minimal support during the majority of the school day.",
        "Initiates and uses functional/effective social interactions with staff/peers with minimal to moderate support in most situations.",
        "Initiates or responds to social interactions with staff/peers in known situations with moderate to maximum prompting and use of scripting.",
        "Does not initiate or respond to social interactions without staff/peer facilitation; interactions require maximum prompting and scripted supports.",
      ],
      suggestions: [
        ["Peer buddy/mentors", "Structured social opportunities", "Role play"],
        ["Sentence stems", "Prompt fading in greetings", "Turn-taking visuals"],
        ["Social scripts", "Video modeling", "Priming before activities"],
        ["Partner-assisted interaction routines", "Highly structured practice sets", "Frequent adult mediation"],
      ],
    },
    {
      title: "Augmentative & Alternative Communication (AAC)",
      descriptions: [
        "Student is able to use AAC device/tools independently or with minimal support.",
        "Student is able to use AAC device/tools with minimal to moderate support.",
        "Student is able to use AAC device/tools with moderate to maximum support (e.g., frequent modeling, aided language input, picture supports).",
        "Student requires maximum to continuous assistance and partner-aided modeling to use AAC effectively across the majority of the day.",
      ],
      suggestions: [
        ["Daily AAC opportunities across settings", "Core/fringe vocabulary growth", "Peer modeling with AAC"],
        ["Aided language stimulation", "Key-word signs/gestures", "Consistent symbol locations"],
        ["Partner-prompted trials", "Personalized topic boards", "Environment-specific pages"],
        ["Partner-assisted scanning", "Yes/No systems", "Intensive modeling with short work/break cycles"],
      ],
    },
      {type: "notes"}
    ]
  
  },

  {
    sectionTitle: "Behavior",
    areas: [
      {
      title: "Response to Redirection / Adult Support",
      descriptions: [
        "Student responds to redirection independently or with minimal support (verbal prompt, visual cue) and minimal staff proximity.",
        "Student responds to redirection with minimal to moderate support (verbal prompt, visual cue, staff proximity, choices, reminders).",
        "Student responds to redirection with moderate to maximum support (physical prompt, repeated reminders, staff proximity, incentive).",
        "Student requires maximum to continuous support and extensive resources (physical prompts, staff proximity at all times, individualized plan, crisis intervention team).",
      ],
      suggestions: [
        ["Verbal reminders", "Visual cues", "Staff check-ins"],
        ["Choice boards", "Timely breaks", "Routine reminders"],
        ["Physical prompts", "Incentive systems", "Frequent supervision"],
        ["Crisis plan", "Individualized supports", "Continuous staff proximity"],
      ],
    },
    {
      title: "Self-Regulation / Coping Strategies",
      descriptions: [
        "Student uses self-regulation/coping strategies independently or with minimal supports.",
        "Student uses self-regulation/coping strategies with minimal to moderate supports.",
        "Student uses self-regulation/coping strategies with moderate to maximum supports.",
        "Student requires maximum to continuous supports and extensive resources to use self-regulation/coping strategies.",
      ],
      suggestions: [
        ["Scheduled sensory breaks", "Calm down corner", "Breathing exercises"],
        ["Fidget tools", "Visual reminders", "Partial prompts"],
        ["Direct modeling", "Physical support", "Staff-guided coping"],
        ["Crisis plan", "Individual behavior plan", "Continuous adult support"],
      ],
    },
    {
      title: "Engagement in Instructional Activities",
      descriptions: [
        "Student engages in instructional activities independently or with minimal supports.",
        "Student engages in instructional activities with minimal to moderate supports.",
        "Student engages in instructional activities with moderate to maximum supports.",
        "Student requires maximum to continuous supports and extensive resources to engage in instructional activities.",
      ],
      suggestions: [
        ["Peer models", "Routine reminders", "Visual schedules"],
        ["Frequent breaks", "Staff proximity", "Choice boards"],
        ["Direct prompts", "Incentive systems", "Physical support"],
        [
        "Individualized plan",
        "Continuous adult support",
        "Alternative activities",
        ],
      ],
    },
    {
      title: "Physical Safety / Aggression",
      descriptions: [
        "Student maintains physical safety independently or with minimal supports.",
        "Student maintains physical safety with minimal to moderate supports.",
        "Student maintains physical safety with moderate to maximum supports.",
        "Student requires maximum to continuous supports and extensive resources to maintain physical safety.",
      ],
      suggestions: [
        ["Safety reminders", "Staff check-ins", "Calm down strategies"],
        ["Staff proximity", "Visual reminders", "Partial prompts"],
        ["Direct intervention", "Physical support", "Incentive systems"],
        [
        "Crisis intervention",
        "Individual behavior plan",
        "Continuous adult supervision",
        ],
      ],
    },
      {type: "notes"}
    ]
  
  }
]
const SUGGESTIONS_PANEL_WIDTH = 220;
const TITLE_COLUMN_WIDTH = 180;

export default function App() {
  const trackRefs = useRef([]);
  
  const [indices, setIndices] = useState(() => sections.flatMap(section => section.areas.map(() => 0)));
  
  useEffect(() => {
    const totalAreas = sections.flatMap(s => s.areas).length;
    if (indices.length !== totalAreas) {
      setIndices(rubricAreas.map(() => 0));
    }
  }, [indices.length]);

  return (
    <div
      style={{
        maxWidth: 1400,
        margin: "auto",
        fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
        background: "var(--bg)",
        color: "var(--fg)",
        padding: 16,
      }}
    >
      <h2 style={{ marginTop: 0 }}>Support Rubric (Interactive)</h2>

      {sections.map((section, sectionIdx) => (
        <div key={section.sectionTitle}>
          <h3>{section.sectionTitle}</h3>
          
          {section.areas.map((area, areaIdx) => {
            const flatIndex = sections
            .slice(0, sectionIdx)
            .reduce((sum,s) => sum + s.areas.length, 0) + areaIdx;
            
            if (area.type === "notes") {
              return (
                <div key={`notes-${sectionIdx}`} style={{ display: "flex", marginBottom:30}}>
                  <title> Notes </title>
                  <div style={{ 
                    minWidth: TITLE_COLUMN_WIDTH, 
                    width: TITLE_COLUMN_WIDTH, 
                    height: 120,
                    padding:12, 
                    background: "var(--card)", 
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "var(--fg)",
                    borderRight: "2px solid var(--card-border)",
                    }}
                  >
                    <b>Notes:</b>
                  </div>
                  {/* Empty description columns - 4 of them */}
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        borderLeft: idx > 0 ? "1px solid var(--card-border)" : "",
                        padding: 12,
                        background: "var(--card)",
                        minHeight: 60,
                      }}
                    />
                  ))}

                  {/* Empty suggestions column */}
                  <div
                    style={{
                      minWidth: SUGGESTIONS_PANEL_WIDTH,
                      width: SUGGESTIONS_PANEL_WIDTH,
                      padding: 12,
                      borderLeft: "2px solid var(--card-border)",
                      background: "var(--card)",
                    }}
                  />

                </div>
              
              );
            } 
            
            else {
              const levels = area.descriptions.length;
              const labels =
                area.levelLabels && area.levelLabels.length === levels
                  ? area.levelLabels
                  : DEFAULT_LEVEL_LABELS.slice(0, levels);

              const currentIdx = indices[flatIndex] ?? 0;
              
              const safeIdx = Math.min(currentIdx, levels - 1);

              return (
                <div key={`$sectionIdx-${areaIdx}`} style={{ marginBottom: -24 }}>
                  {/* TITLE + TEXT GRID + SUGGESTIONS */}
                  <div style={{ display: "flex", alignItems: "stretch" }}>
                    {/* Left column - Area Title */}
                    <div
                      style={{
                        minWidth: TITLE_COLUMN_WIDTH,
                        width: TITLE_COLUMN_WIDTH,
                        padding: 12,
                        background: "var(--card)",
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "var(--fg)",
                        borderRight: "2px solid var(--card-border)",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {area.title}
                    </div>

                    {/* Description columns */}
                    {area.descriptions.map((desc, idx) => (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          borderLeft: idx > 0 ? "1px solid var(--card-border)" : "",
                          padding: 12,
                          background: "var(--card)",
                          fontSize: 14,
                          color: "var(--fg)",
                        }}
                      >
                        <b>{labels[idx] ?? `Level ${idx + 1}`}</b>
                        <div style={{ opacity: 0.95, marginTop: 6 }}>{desc}</div>
                      </div>
                    ))}

                    {/* Right column - Suggestions */}
                    <div
                      style={{
                        minWidth: SUGGESTIONS_PANEL_WIDTH,
                        width: SUGGESTIONS_PANEL_WIDTH,
                        padding: 12,
                        borderLeft: "2px solid var(--card-border)",
                        background: "var(--card)",
                        color: "var(--fg)",
                      }}
                    >
                      <b>Suggestions</b>
                      <ul style={{ margin: "8px 0 0 18px", paddingLeft: 0 }}>
                        {area.suggestions[safeIdx].map((s, idx) => (
                          <li key={idx} style={{ marginBottom: 4 }}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CONTINUUM BAR - aligned with description columns only */}
                  <div style={{ display: "flex", marginTop: -24, height: 55}}>
                    {/* Spacer for title column */}
                    <div style={{ minWidth: TITLE_COLUMN_WIDTH, width: TITLE_COLUMN_WIDTH}} />
                    
                    {/* Track container matching description columns width */}
                    <div
                      ref={(el) => (trackRefs.current[flatIndex] = el)}
                      style={{
                        position: "relative",
                        flex: 1,
                        height: "100%",
                      }}
                    >
                      {/* Track */}
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          height: 10,
                          background: "var(--link)",
                          opacity: 0.35,
                          borderRadius: 6,
                          top: 22,
                          zIndex: 0,
                        }}
                      />

                      {/* Column markers */}
                      {Array.from({ length: levels - 1 }, (_, k) => {
                        const pct = ((k + 1) * 100) / levels;
                        return (
                          <div
                            key={k}
                            style={{
                              position: "absolute",
                              left: `calc(${pct}% - 2px)`,
                              width: 4,
                              height: 28,
                              background: "var(--link)",
                              top: 14,
                              zIndex: 1,
                              opacity: 0.8,
                            }}
                          />
                        );
                      })}

                      {/* Range slider */}
                      <input
                        type="range"
                        min={0}
                        max={levels}
                        step={1}
                        value={currentIdx}
                        onChange={(e) => {
                          const next = [...indices];
                          next[flatIndex] = Number(e.target.value);
                          setIndices(next);
                        }}
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          top: 0,
                          height: 55,
                          zIndex: 5,
                          width: "100%",
                          background: "transparent",
                          cursor: "pointer",
                          accentColor: "var(--link)",
                        }}
                      />

                      {/* X marker */}
                      <XMarker
                        columnIndex={currentIdx}
                        levels={levels}
                        containerRef={trackRefs.current[flatIndex]}
                      />
                    </div>
                    
                    {/* Spacer for suggestions column */}
                    <div style={{ minWidth: SUGGESTIONS_PANEL_WIDTH, width: SUGGESTIONS_PANEL_WIDTH }} />
                  </div>
                </div>
              );
            }
          })}
          </div>
        ))}
      </div>
  );
}

function XMarker({ columnIndex, levels, containerRef }) {
  const [leftPx, setLeftPx] = useState(0);

  useEffect(() => {
    function calc() {
      if (!containerRef) return;
      const barWidth = containerRef.offsetWidth;
      const denom = Math.max(1, levels);
      const boundaryRatio = columnIndex / denom;
      setLeftPx(boundaryRatio * barWidth);
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [columnIndex, levels, containerRef]);

  return (
    <div
      style={{
        position: "absolute",
        left: leftPx - 12,
        top: 7,
        width: 24,
        height: 24,
        pointerEvents: "none",
        zIndex: 10,
        color: "var(--fg)",
      }}
    >
      <span
        style={{
          fontSize: 28,
          fontWeight: "bold",
          userSelect: "none",
          textShadow: "0 1px 2px rgba(0,0,0,.35)",
        }}
      >
        X
      </span>
    </div>
  );
}