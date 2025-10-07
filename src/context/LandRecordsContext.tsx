import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LandRecord } from "@/types/land";
import { dummyLandRecords } from "@/data/dummyData";

interface LandRecordsContextType {
  landRecords: LandRecord[];
  addLandRecord: (record: LandRecord) => void;
  searchRecords: (query: string) => LandRecord[];
}

const LandRecordsContext = createContext<LandRecordsContextType | undefined>(undefined);

export const LandRecordsProvider = ({ children }: { children: ReactNode }) => {
  const [landRecords, setLandRecords] = useState<LandRecord[]>(() => {
    const stored = localStorage.getItem("bhumibandhu_land_records");
    return stored ? JSON.parse(stored) : dummyLandRecords;
  });

  useEffect(() => {
    localStorage.setItem("bhumibandhu_land_records", JSON.stringify(landRecords));
  }, [landRecords]);

  const addLandRecord = (record: LandRecord) => {
    setLandRecords((prev) => [record, ...prev]);
  };

  const searchRecords = (query: string): LandRecord[] => {
    const lowerQuery = query.toLowerCase().trim();
    
    if (!lowerQuery) return landRecords;

    return landRecords.filter(
      (record) =>
        record.landId.toLowerCase().includes(lowerQuery) ||
        record.surveyNumber.toLowerCase().includes(lowerQuery) ||
        record.currentOwner.toLowerCase().includes(lowerQuery) ||
        record.village.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <LandRecordsContext.Provider value={{ landRecords, addLandRecord, searchRecords }}>
      {children}
    </LandRecordsContext.Provider>
  );
};

export const useLandRecords = () => {
  const context = useContext(LandRecordsContext);
  if (!context) {
    throw new Error("useLandRecords must be used within LandRecordsProvider");
  }
  return context;
};
