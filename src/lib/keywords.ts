import { ResumeData, KeywordAnalysis } from '@/types';

export function suggestKeywords(jobText: string, resume: ResumeData): KeywordAnalysis {
  const clean = (s: string) => 
    s.toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^a-z0-9\s]/g, ' ');
  
  const words = clean(jobText)
    .split(/\s+/)
    .filter(w => w.length > 2);
  
  const freq = new Map<string, number>();
  words.forEach(w => freq.set(w, (freq.get(w) || 0) + 1));
  
  const common = [...freq.entries()]
    .filter(([w, c]) => c > 1)
    .map(([w]) => w);

  const resumeText = clean(JSON.stringify(resume));
  const missing = common.filter(w => !resumeText.includes(w)).slice(0, 20);
  const present = common.filter(w => resumeText.includes(w));
  const score = Math.round(100 * present.length / Math.max(common.length, 1));
  
  return { score, present, missing };
}

export function extractJobKeywords(jobText: string): string[] {
  const clean = (s: string) => 
    s.toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^a-z0-9\s]/g, ' ');
  
  const words = clean(jobText)
    .split(/\s+/)
    .filter(w => w.length > 3);
  
  const freq = new Map<string, number>();
  words.forEach(w => freq.set(w, (freq.get(w) || 0) + 1));
  
  return [...freq.entries()]
    .filter(([w, c]) => c > 1)
    .sort((a, b) => b[1] - a[1])
    .map(([w]) => w)
    .slice(0, 15);
}
