
export type Macroarea = 
  | 'Comercial' 
  | 'Administración de Flota' 
  | 'Operaciones' 
  | 'Patio' 
  | 'Administración' 
  | 'Renting Operaciones';

export type TimeOption = 
  | '0 a 6 meses' 
  | '6 meses a 1 año' 
  | '1 año a 3 años' 
  | '3+ años';

  export type rango_edad = 
  | '18 a 28 años (Gen Z)' 
  | '29 a 44 años (Millennial)' 
  | '45 a 60 años (Gen X)' 
  | '61+ años (Baby Boomers)';

export type SupportOption = 
  | 'NONE'
  | 'ASSISTANCE'
  | 'SENSITIVE';

export interface UserData {
  macroarea: Macroarea | null;
  department: string | null;
  ageRange: string | null;
  timeInCompany: TimeOption | null;
  supportOption: SupportOption;
  phone: string;
  email: string;
}

export enum AppStep {
  WELCOME = 'WELCOME',
  REGISTRATION = 'REGISTRATION',
  SURVEY_PAGE_1 = 'SURVEY_PAGE_1',
  SURVEY_PAGE_2 = 'SURVEY_PAGE_2',
  SUPPORT_PAGE = 'SUPPORT_PAGE',
  FINISH = 'FINISH'
}

export interface Question {
  id: number;
  text: string;
}

export interface QuestionBlock {
  title: string;
  questions: Question[];
}
