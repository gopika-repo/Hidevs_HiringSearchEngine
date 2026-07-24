/* ==========================================================================
   HiDevs Hiring Search Engine — Backend Data Validator & API Services
   Phase 10 Backend & Database Schema Integration
   ========================================================================== */

import { mockCandidates } from './mockData.js';

// --- Database Schema Validator ---
export class CandidateSchemaValidator {
  static validate(candidate) {
    const errors = [];

    if (!candidate.id || typeof candidate.id !== 'string') errors.push("Invalid or missing candidate ID");
    if (!candidate.name || typeof candidate.name !== 'string') errors.push("Invalid or missing candidate name");

    // Contact Information Validation
    if (candidate.contact) {
      if (candidate.contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.contact.email)) {
        errors.push("Invalid email format in contact object");
      }
    }

    // Academic Details Validation
    if (candidate.education) {
      if (candidate.education.cgpa !== undefined && (typeof candidate.education.cgpa !== 'number' || candidate.education.cgpa < 0 || candidate.education.cgpa > 10)) {
        errors.push("CGPA must be a valid number between 0 and 10");
      }
    }

    // Coding Activity Validation
    if (candidate.builderProof) {
      if (candidate.builderProof.codeQuestCompleted !== undefined && typeof candidate.builderProof.codeQuestCompleted !== 'number') {
        errors.push("codeQuestCompleted must be a number");
      }
      if (candidate.builderProof.leetZPromptsCompleted !== undefined && typeof candidate.builderProof.leetZPromptsCompleted !== 'number') {
        errors.push("leetZPromptsCompleted must be a number");
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// --- In-Memory Database Indexing Engine ---
class SearchIndexer {
  constructor() {
    this.index = new Map();
  }

  buildIndex(candidates) {
    this.index.clear();
    candidates.forEach(cand => {
      const validation = CandidateSchemaValidator.validate(cand);
      if (!validation.isValid) {
        console.warn(`[SearchIndexer] Candidate ${cand.id} failed schema validation:`, validation.errors);
      }

      const tokens = new Set();

      // Index basic fields
      tokens.add(cand.name.toLowerCase());
      tokens.add(cand.headline.toLowerCase());
      tokens.add(cand.location.toLowerCase());

      // Index platform fields
      if (cand.links?.github) tokens.add("github");
      if (cand.links?.linkedin) tokens.add("linkedin");
      if (cand.availability === "Open to Work") tokens.add("open to work");

      // Index tech stack
      (cand.primarySkills || []).forEach(s => tokens.add(s.toLowerCase()));
      (cand.techStack?.preferred || []).forEach(t => tokens.add(t.name.toLowerCase()));
      (cand.techStack?.additional || []).forEach(a => tokens.add(a.toLowerCase()));

      this.index.set(cand.id, Array.from(tokens));
    });

    console.log(`[SearchIndexer] Indexed ${candidates.length} candidate profiles.`);
  }
}

export const searchIndexer = new SearchIndexer();

// --- Backend API Controller Endpoints (Backward Compatible) ---
export const MockBackendAPI = {
  // GET /api/v1/candidates
  async getCandidates(params = {}) {
    let result = [...mockCandidates];

    // Maintain backward compatibility for standard queries
    if (params.query) {
      const q = params.query.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.headline.toLowerCase().includes(q) ||
        (c.primarySkills || []).some(s => s.toLowerCase().includes(q))
      );
    }

    return {
      status: 200,
      totalCount: result.length,
      data: result
    };
  },

  // GET /api/v1/candidates/:id
  async getCandidateById(id) {
    const candidate = mockCandidates.find(c => c.id === id);
    if (!candidate) {
      return { status: 404, message: "Candidate not found" };
    }

    // Validate schema
    const validation = CandidateSchemaValidator.validate(candidate);

    return {
      status: 200,
      validation,
      data: candidate
    };
  }
};
