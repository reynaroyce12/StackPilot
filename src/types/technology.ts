export interface Technology {
  id: string;
  name: string;
  category: string;
  firstDetected: string | null;
  evidence: string[];
}

export interface CompanyProfile {
  name: string;
  domain: string;
  technologies: Technology[];
}