import { useMemo, useState } from "react";
import "./AdditionalInformation.css";

const ARRANGEMENT_OPTIONS = [
  {
    id: "pref-seating",
    label: "Preferential seating / teacher proximity",
    description:
      "Student benefits from a specific location in the classroom (e.g., near instruction, reduced distractions).",
  },
  {
    id: "ada-access",
    label: "ADA accommodations (wheelchair access, table heights, etc.)",
    description:
      "Physical arrangement changes are required to ensure accessibility to materials, desks, or pathways.",
  },
  {
    id: "alt-seating",
    label: "Alternative seating or standing options",
    description:
      "Student uses equipment such as wobble stools, standing desks, cushions, or other flexible seating.",
  },
  {
    id: "additional-support",
    label: "Additional adult support or supervision",
    description:
      "Student requires scheduled staff proximity or support to access instruction and materials.",
  },
  {
    id: "aac-space",
    label: "Dedicated AAC device or communication area",
    description:
      "Student needs a defined space for augmentative and alternative communication tools or devices.",
  },
];

const TOILETING_OPTIONS = [
  {
    id: "scheduled-breaks",
    label: "Scheduled bathroom breaks",
    description:
      "Student benefits from reminders or a consistent toileting routine during the school day.",
  },
  {
    id: "visual-supports",
    label: "Visual supports or social stories",
    description:
      "Visual cues, timers, or step-by-step guides are used to promote independence in hygiene tasks.",
  },
  {
    id: "adaptive-equipment",
    label: "Adaptive equipment and accessibility",
    description:
      "Grab bars, step stools, or alternate facilities are needed to access restrooms safely.",
  },
  {
    id: "adult-assistance",
    label: "Adult assistance for toileting",
    description:
      "Staff support is required for transfers, clothing management, or hygiene routines.",
  },
  { id: "other", label: "Other (describe)" },
];

const DAILY_LIVING_OPTIONS = [
  {
    id: "feeding-support",
    label: "Feeding support or adaptive utensils",
    description:
      "Student requires specific positioning, utensils, or prompting during meals or snack time.",
  },
  {
    id: "dressing-support",
    label: "Support for dressing / outerwear",
    description:
      "Assistance is needed with coats, shoes, winter gear, or specialty clothing fasteners.",
  },
  {
    id: "organization-support",
    label: "Organization of materials",
    description:
      "Student benefits from structured systems for personal items, locker, or cubby materials.",
  },
  {
    id: "transition-support",
    label: "Arrival / dismissal transitions",
    description:
      "Adult support or visual schedules are required for transportation and end-of-day routines.",
  },
  { id: "other", label: "Other (describe)" },
];

const COMMUNICATION_OPTIONS = [
  {
    id: "aac-device",
    label: "Dedicated AAC device",
    description:
      "Student uses a speech-generating device or tablet that must be accessible across settings.",
  },
  {
    id: "picture-exchange",
    label: "Picture exchange / communication board",
    description:
      "Visual symbols or boards accompany instruction, transitions, and social interactions.",
  },
  {
    id: "sign-support",
    label: "Sign language or gestures",
    description:
      "Staff and peers incorporate sign language, gestures, or cues to support communication.",
  },
  {
    id: "prompting-support",
    label: "Prompting for communication",
    description:
      "Student benefits from verbal, visual, or tactile prompts to initiate or respond.",
  },
  { id: "other", label: "Other (describe)" },
];

function buildSummary(needs, selections, otherValue, options, prompts) {
  const { none, choose, empty } = prompts;

  if (needs !== "yes") {
    return none;
  }

  if (selections.size === 0 && !otherValue.trim()) {
    return choose;
  }

  const labels = [];
  for (const option of options) {
    if (option.id !== "other" && selections.has(option.id)) {
      labels.push(option.label);
    }
  }

  if (selections.has("other") && otherValue.trim()) {
    labels.push(otherValue.trim());
  }

  if (!labels.length) {
    return empty;
  }

  return labels.join(", ");
}

export default function AdditionalInformation() {
  const [needsArrangement, setNeedsArrangement] = useState("");
  const [selectedArrangementOptions, setSelectedArrangementOptions] = useState(
    () => new Set()
  );
  const [arrangementOtherDetails, setArrangementOtherDetails] = useState("");

  const [needsToiletingSupport, setNeedsToiletingSupport] = useState("");
  const [toiletingSelections, setToiletingSelections] = useState(() => new Set());
  const [toiletingOther, setToiletingOther] = useState("");

  const [needsDailyLivingSupport, setNeedsDailyLivingSupport] = useState("");
  const [dailyLivingSelections, setDailyLivingSelections] = useState(
    () => new Set()
  );
  const [dailyLivingOther, setDailyLivingOther] = useState("");

  const [needsCommunicationSupport, setNeedsCommunicationSupport] = useState("");
  const [communicationSelections, setCommunicationSelections] = useState(
    () => new Set()
  );
  const [communicationOther, setCommunicationOther] = useState("");

  const arrangementSummary = useMemo(
    () =>
      buildSummary(
        needsArrangement,
        selectedArrangementOptions,
        arrangementOtherDetails,
        ARRANGEMENT_OPTIONS,
        {
          none: "No specialized classroom arrangement is required at this time.",
          choose: "Select all equipment or arrangements that apply.",
          empty: "No specific equipment has been selected.",
        }
      ),
    [needsArrangement, selectedArrangementOptions, arrangementOtherDetails]
  );

  const toiletingSummary = useMemo(
    () =>
      buildSummary(
        needsToiletingSupport,
        toiletingSelections,
        toiletingOther,
        TOILETING_OPTIONS,
        {
          none: "No toileting or hygiene supports are required at this time.",
          choose: "Select all toileting supports that apply.",
          empty: "No specific toileting supports have been selected.",
        }
      ),
    [needsToiletingSupport, toiletingSelections, toiletingOther]
  );

  const dailyLivingSummary = useMemo(
    () =>
      buildSummary(
        needsDailyLivingSupport,
        dailyLivingSelections,
        dailyLivingOther,
        DAILY_LIVING_OPTIONS,
        {
          none: "No daily living supports are needed within the classroom.",
          choose: "Select all daily living supports that apply.",
          empty: "No specific daily living supports have been selected.",
        }
      ),
    [needsDailyLivingSupport, dailyLivingSelections, dailyLivingOther]
  );

  const communicationSummary = useMemo(
    () =>
      buildSummary(
        needsCommunicationSupport,
        communicationSelections,
        communicationOther,
        COMMUNICATION_OPTIONS,
        {
          none: "No specialized communication devices or supports are required at this time.",
          choose: "Select all communication supports that apply.",
          empty: "No specific communication supports have been selected.",
        }
      ),
    [needsCommunicationSupport, communicationSelections, communicationOther]
  );

  function createToggle(setter, setOtherText) {
    return (id) => {
      setter((previous) => {
        const next = new Set(previous);

        if (next.has(id)) {
          next.delete(id);
          if (id === "other" && typeof setOtherText === "function") {
            setOtherText("");
          }
        } else {
          next.add(id);
        }

        return next;
      });
    };
  }

  const toggleArrangementOption = createToggle(
    setSelectedArrangementOptions,
    setArrangementOtherDetails
  );
  const toggleToiletingOption = createToggle(
    setToiletingSelections,
    setToiletingOther
  );
  const toggleDailyLivingOption = createToggle(
    setDailyLivingSelections,
    setDailyLivingOther
  );
  const toggleCommunicationOption = createToggle(
    setCommunicationSelections,
    setCommunicationOther
  );

  function renderOptionList(
    options,
    selections,
    toggle,
    otherValue,
    setOtherValue,
    placeholder
  ) {
    return (
      <ul className="additional-info__option-list">
        {options.map((option) => (
          <li key={option.id}>
            <label className="additional-info__checkbox">
              <input
                type="checkbox"
                value={option.id}
                checked={selections.has(option.id)}
                onChange={() => toggle(option.id)}
              />
              <span>
                <span className="additional-info__option-label">{option.label}</span>
                {option.description && (
                  <span className="additional-info__option-description">
                    {option.description}
                  </span>
                )}
              </span>
            </label>
            {option.id === "other" && selections.has("other") && (
              <textarea
                className="additional-info__other-input"
                value={otherValue}
                onChange={(event) => setOtherValue(event.target.value)}
                placeholder={placeholder}
                rows={2}
              />
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="additional-info" aria-labelledby="additional-information-heading">
      <h2 id="additional-information-heading">Additional Information</h2>

      <div
        className="additional-info__table"
        role="group"
        aria-labelledby="classroom-arrangement-heading"
      >
        <div className="additional-info__header additional-info__header--classroom">
          <h3 id="classroom-arrangement-heading">Classroom Arrangement</h3>
        </div>

        <div className="additional-info__header additional-info__header--environment">
          <h3>Environmental Considerations</h3>
        </div>

        <div className="additional-info__subheader">Playground</div>
        <div className="additional-info__subheader">Lunchroom</div>

        <div className="additional-info__cell additional-info__cell--classroom">
          <fieldset className="additional-info__fieldset">
            <legend className="additional-info__prompt">
              Does the student require any specialized equipment or arrangement?
            </legend>
            <p className="additional-info__fieldset-description">
              Consider accessibility, mobility, and any classroom layout changes that
              help the student access instruction and materials.
            </p>
            <div
              className="additional-info__radio-group"
              role="radiogroup"
              aria-label="Specialized equipment or arrangement"
            >
              <label className="additional-info__radio-option">
                <input
                  type="radio"
                  name="needs-arrangement"
                  value="yes"
                  checked={needsArrangement === "yes"}
                  onChange={() => {
                    setNeedsArrangement("yes");
                  }}
                />
                <span>Yes</span>
              </label>
              <label className="additional-info__radio-option">
                <input
                  type="radio"
                  name="needs-arrangement"
                  value="no"
                  checked={needsArrangement === "no"}
                  onChange={() => {
                    setNeedsArrangement("no");
                    setSelectedArrangementOptions(new Set());
                    setArrangementOtherDetails("");
                  }}
                />
                <span>No</span>
              </label>
            </div>

            {needsArrangement === "yes" && (
              <div className="additional-info__options">
                <p className="additional-info__hint">Select all that apply:</p>
                {renderOptionList(
                  ARRANGEMENT_OPTIONS,
                  selectedArrangementOptions,
                  toggleArrangementOption,
                  arrangementOtherDetails,
                  setArrangementOtherDetails,
                  "Describe the specialized equipment or arrangement"
                )}
              </div>
            )}

            <div className="additional-info__summary" aria-live="polite">
              <span className="additional-info__summary-label">Summary:</span>
              <span>{arrangementSummary}</span>
            </div>
          </fieldset>
        </div>

        <div className="additional-info__cell">
          <label className="additional-info__textarea-label" htmlFor="playground-arrangement">
            Are there playground supports or considerations to note?
          </label>
          <textarea
            id="playground-arrangement"
            className="additional-info__textarea"
            placeholder="Describe supervision, equipment, safety, or accessibility needs"
            rows={6}
          />
        </div>

        <div className="additional-info__cell">
          <label className="additional-info__textarea-label" htmlFor="lunchroom-arrangement">
            Are there lunchroom supports or considerations to note?
          </label>
          <textarea
            id="lunchroom-arrangement"
            className="additional-info__textarea"
            placeholder="Describe dietary, seating, or supervision needs"
            rows={6}
          />
        </div>

        <div className="additional-info__cell additional-info__cell--classroom">
          <fieldset className="additional-info__fieldset">
            <legend className="additional-info__prompt">Toileting &amp; Hygiene Supports</legend>
            <p className="additional-info__fieldset-description">
              Note routines, adult assistance, or accessibility needs that ensure the
              student can manage restroom breaks with dignity.
            </p>
            <div
              className="additional-info__radio-group"
              role="radiogroup"
              aria-label="Toileting and hygiene supports"
            >
              <label className="additional-info__radio-option">
                <input
                  type="radio"
                  name="needs-toileting"
                  value="yes"
                  checked={needsToiletingSupport === "yes"}
                  onChange={() => {
                    setNeedsToiletingSupport("yes");
                  }}
                />
                <span>Yes</span>
              </label>
              <label className="additional-info__radio-option">
                <input
                  type="radio"
                  name="needs-toileting"
                  value="no"
                  checked={needsToiletingSupport === "no"}
                  onChange={() => {
                    setNeedsToiletingSupport("no");
                    setToiletingSelections(new Set());
                    setToiletingOther("");
                  }}
                />
                <span>No</span>
              </label>
            </div>

            {needsToiletingSupport === "yes" && (
              <div className="additional-info__options">
                <p className="additional-info__hint">Select all that apply:</p>
                {renderOptionList(
                  TOILETING_OPTIONS,
                  toiletingSelections,
                  toggleToiletingOption,
                  toiletingOther,
                  setToiletingOther,
                  "Describe the toileting or hygiene support"
                )}
              </div>
            )}

            <div className="additional-info__summary" aria-live="polite">
              <span className="additional-info__summary-label">Summary:</span>
              <span>{toiletingSummary}</span>
            </div>
          </fieldset>
        </div>

        <div className="additional-info__cell">
          <label className="additional-info__textarea-label" htmlFor="playground-toileting">
            Playground considerations
          </label>
          <textarea
            id="playground-toileting"
            className="additional-info__textarea"
            placeholder="Note restroom access, supervision plans, or transition routines during recess"
            rows={5}
          />
        </div>

        <div className="additional-info__cell">
          <label className="additional-info__textarea-label" htmlFor="lunchroom-toileting">
            Lunchroom considerations
          </label>
          <textarea
            id="lunchroom-toileting"
            className="additional-info__textarea"
            placeholder="Describe supports during lunch, snacks, or hygiene after meals"
            rows={5}
          />
        </div>

        <div className="additional-info__cell additional-info__cell--classroom">
          <fieldset className="additional-info__fieldset">
            <legend className="additional-info__prompt">Daily Living / Self-Help Supports</legend>
            <p className="additional-info__fieldset-description">
              Highlight supports that foster independence with feeding, dressing, and
              organization throughout the day.
            </p>
            <div
              className="additional-info__radio-group"
              role="radiogroup"
              aria-label="Daily living supports"
            >
              <label className="additional-info__radio-option">
                <input
                  type="radio"
                  name="needs-daily-living"
                  value="yes"
                  checked={needsDailyLivingSupport === "yes"}
                  onChange={() => {
                    setNeedsDailyLivingSupport("yes");
                  }}
                />
                <span>Yes</span>
              </label>
              <label className="additional-info__radio-option">
                <input
                  type="radio"
                  name="needs-daily-living"
                  value="no"
                  checked={needsDailyLivingSupport === "no"}
                  onChange={() => {
                    setNeedsDailyLivingSupport("no");
                    setDailyLivingSelections(new Set());
                    setDailyLivingOther("");
                  }}
                />
                <span>No</span>
              </label>
            </div>

            {needsDailyLivingSupport === "yes" && (
              <div className="additional-info__options">
                <p className="additional-info__hint">Select all that apply:</p>
                {renderOptionList(
                  DAILY_LIVING_OPTIONS,
                  dailyLivingSelections,
                  toggleDailyLivingOption,
                  dailyLivingOther,
                  setDailyLivingOther,
                  "Describe the daily living support"
                )}
              </div>
            )}

            <div className="additional-info__summary" aria-live="polite">
              <span className="additional-info__summary-label">Summary:</span>
              <span>{dailyLivingSummary}</span>
            </div>
          </fieldset>
        </div>

        <div className="additional-info__cell">
          <label className="additional-info__textarea-label" htmlFor="playground-daily-living">
            Playground considerations
          </label>
          <textarea
            id="playground-daily-living"
            className="additional-info__textarea"
            placeholder="Note supports for snacks, outerwear, or transitions during recess"
            rows={5}
          />
        </div>

        <div className="additional-info__cell">
          <label className="additional-info__textarea-label" htmlFor="lunchroom-daily-living">
            Lunchroom considerations
          </label>
          <textarea
            id="lunchroom-daily-living"
            className="additional-info__textarea"
            placeholder="Describe feeding supports, seating, or adaptive equipment"
            rows={5}
          />
        </div>

        <div className="additional-info__cell additional-info__cell--classroom">
          <fieldset className="additional-info__fieldset">
            <legend className="additional-info__prompt">Communication Devices &amp; Supports</legend>
            <p className="additional-info__fieldset-description">
              Capture how expressive and receptive communication is supported across
              the day and any equipment that must travel with the student.
            </p>
            <div
              className="additional-info__radio-group"
              role="radiogroup"
              aria-label="Communication devices and supports"
            >
              <label className="additional-info__radio-option">
                <input
                  type="radio"
                  name="needs-communication"
                  value="yes"
                  checked={needsCommunicationSupport === "yes"}
                  onChange={() => {
                    setNeedsCommunicationSupport("yes");
                  }}
                />
                <span>Yes</span>
              </label>
              <label className="additional-info__radio-option">
                <input
                  type="radio"
                  name="needs-communication"
                  value="no"
                  checked={needsCommunicationSupport === "no"}
                  onChange={() => {
                    setNeedsCommunicationSupport("no");
                    setCommunicationSelections(new Set());
                    setCommunicationOther("");
                  }}
                />
                <span>No</span>
              </label>
            </div>

            {needsCommunicationSupport === "yes" && (
              <div className="additional-info__options">
                <p className="additional-info__hint">Select all that apply:</p>
                {renderOptionList(
                  COMMUNICATION_OPTIONS,
                  communicationSelections,
                  toggleCommunicationOption,
                  communicationOther,
                  setCommunicationOther,
                  "Describe the communication device or support"
                )}
              </div>
            )}

            <div className="additional-info__summary" aria-live="polite">
              <span className="additional-info__summary-label">Summary:</span>
              <span>{communicationSummary}</span>
            </div>
          </fieldset>
        </div>

        <div className="additional-info__cell">
          <label className="additional-info__textarea-label" htmlFor="playground-communication">
            Playground considerations
          </label>
          <textarea
            id="playground-communication"
            className="additional-info__textarea"
            placeholder="Explain how communication devices are protected or used outdoors"
            rows={5}
          />
        </div>

        <div className="additional-info__cell">
          <label className="additional-info__textarea-label" htmlFor="lunchroom-communication">
            Lunchroom considerations
          </label>
          <textarea
            id="lunchroom-communication"
            className="additional-info__textarea"
            placeholder="Describe communication supports during meals or group conversations"
            rows={5}
          />
        </div>

        <div className="additional-info__cell additional-info__cell--full">
          <label className="additional-info__textarea-label" htmlFor="additional-notes">
            Additional comments or considerations
          </label>
          <textarea
            id="additional-notes"
            className="additional-info__textarea"
            placeholder="Include transportation plans, behavior supports, or other environmental notes"
            rows={6}
          />
        </div>
      </div>
    </section>
  );
}
