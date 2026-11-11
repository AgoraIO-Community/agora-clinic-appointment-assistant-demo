// Public reference only. Keep private records, live inventory and business actions out of this module.
export const SCENARIO_KNOWLEDGE = {
  "clinic": "Agora Family Clinic",
  "hours": "Monday-Friday 9:00 AM-5:00 PM, U.S. Eastern Time",
  "timezone": "America/New_York",
  "address": "120 Maple Street, Boston, MA 02110, United States",
  "parking": "Free parking behind the clinic. Step-free access is available at the main entrance.",
  "policy": "General consultations and follow-up visits only. Prescription, test-result and billing questions need the clinic team. This assistant cannot send messages, place emergency calls or transfer to a person.",
  "doctors": [
    {
      "name": "Dr. Maya Bennett",
      "specialty": "Family medicine for adults"
    },
    {
      "name": "Dr. Daniel Brooks",
      "specialty": "Internal medicine for adults"
    },
    {
      "name": "Dr. Sofia Patel",
      "specialty": "Pediatrics"
    }
  ],
  "source": {
    "kind": "Fictional clinic reception reference",
    "revision": "2026-11-05",
    "scope": "General clinic information only; no patient records, schedules or clinical assessment are included."
  },
  "timeZone": "America/New_York",
  "specialtyGuide": {
    "familyMedicine": "Routine adult primary care and follow-up questions.",
    "internalMedicine": "Routine adult internal-medicine visit questions.",
    "pediatrics": "Routine visit questions for children under eighteen. Exact suitability and appointment acceptance need the clinic team."
  },
  "preparation": [
    "A short description of the visit goal and questions",
    "A current medication list for the clinician, not for reading into this call",
    "Relevant referral or visit documents if the clinic requests them",
    "Insurance or payment questions to check with the clinic; no coverage or price can be confirmed here"
  ],
  "emergencyGuidance": "For a possible immediate threat to life or safety, advise calling 911 or the local emergency number now. This assistant cannot place a call or dispatch help.",
  "hoursBoundary": "Monday-Friday office hours are not a doctor's availability. The assistant does not have a live clock or schedule for confirming that an individual appointment is possible now."
} as const;
