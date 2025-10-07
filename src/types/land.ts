export interface OwnershipHistory {
  owner: string;
  from: number;
  to: number | "Present";
  transferReason?: string;
}

export interface Dispute {
  year: number;
  type: string;
  status: "Pending" | "Resolved" | "None";
  description?: string;
}

export interface Document {
  name: string;
  link: string;
  uploadDate?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface TDRTransfer {
  toLandId: string;
  toOwner?: string;
  units: number;
  year: number;
  date?: string;
  certificateNumber?: string;
  remarks?: string;
}

export interface TDR {
  issued: boolean;
  units: number;
  certificateId: string;
  issueDate?: string;
  expiryDate?: string;
  transferHistory: TDRTransfer[];
  availableUnits?: number;
  status?: "Active" | "Expired" | "Fully Transferred" | "Partially Transferred";
}

export interface LandRecord {
  landId: string;
  surveyNumber: string;
  village: string;
  currentOwner: string;
  ownershipHistory: OwnershipHistory[];
  disputes: Dispute[];
  documents: Document[];
  coordinates?: Coordinates;
  photos?: string[];
  area?: string;
  unit?: string;
  createdAt?: string;
  officerName?: string;
  tdr?: TDR;
  legalDocumentType?: 'Will' | 'Affidavit' | 'Death Certificate';
  legalDocumentURL?: string;
  allotmentStatus?: 'Verified' | 'Pending Verification' | 'Rejected';
}
