import { LandRecord } from "@/types/land";

export const dummyLandRecords: LandRecord[] = [
  {
    landId: "ULP123456789012",
    surveyNumber: "GN-45/12",
    village: "Sector-5 Gandhinagar",
    currentOwner: "Meera Patel",
    ownershipHistory: [
      { owner: "Rajesh Patel", from: 1985, to: 2005, transferReason: "Inheritance" },
      { owner: "Meera Patel", from: 2005, to: "Present", transferReason: "Will" }
    ],
    disputes: [
      { year: 2018, type: "Boundary", status: "Resolved", description: "Boundary dispute with neighboring plot resolved through survey" }
    ],
    documents: [
      { name: "Will 1995", link: "/docs/gn45_will1995.pdf", uploadDate: "1995-06-15" },
      { name: "Survey Report 2018", link: "/docs/gn45_survey2018.pdf", uploadDate: "2018-03-22" }
    ],
    coordinates: { latitude: 23.2156, longitude: 72.6369 },
    area: "1200",
    unit: "sq meters",
    createdAt: "2005-08-10"
  },
  {
    landId: "ULP123456789013",
    surveyNumber: "GN-67/8",
    village: "Sector-7 Gandhinagar",
    currentOwner: "Vikram Shah",
    ownershipHistory: [
      { owner: "Anil Shah", from: 1990, to: 2010, transferReason: "Purchase" },
      { owner: "Vikram Shah", from: 2010, to: "Present", transferReason: "Gift Deed" }
    ],
    disputes: [],
    documents: [
      { name: "Sale Deed 1990", link: "/docs/gn67_sale1990.pdf", uploadDate: "1990-11-20" },
      { name: "Gift Deed 2010", link: "/docs/gn67_gift2010.pdf", uploadDate: "2010-04-15" }
    ],
    coordinates: { latitude: 23.2289, longitude: 72.6503 },
    area: "800",
    unit: "sq meters",
    createdAt: "2010-04-15"
  },
  {
    landId: "ULP123456789014",
    surveyNumber: "GN-23/45",
    village: "Sector-3 Gandhinagar",
    currentOwner: "Priya Desai",
    ownershipHistory: [
      { owner: "Ramesh Desai", from: 1980, to: 2000, transferReason: "Allotment" },
      { owner: "Kiran Desai", from: 2000, to: 2015, transferReason: "Inheritance" },
      { owner: "Priya Desai", from: 2015, to: "Present", transferReason: "Inheritance" }
    ],
    disputes: [
      { year: 2012, type: "Ownership", status: "Resolved", description: "Ownership claim by distant relative, resolved in favor of legal heir" }
    ],
    documents: [
      { name: "Allotment Letter 1980", link: "/docs/gn23_allot1980.pdf", uploadDate: "1980-02-10" },
      { name: "Will 2000", link: "/docs/gn23_will2000.pdf", uploadDate: "2000-07-25" }
    ],
    coordinates: { latitude: 23.1956, longitude: 72.6256 },
    area: "1500",
    unit: "sq meters",
    createdAt: "2015-09-20"
  },
  {
    landId: "ULP123456789015",
    surveyNumber: "GN-89/34",
    village: "Sector-9 Gandhinagar",
    currentOwner: "Amit Kumar",
    ownershipHistory: [
      { owner: "Amit Kumar", from: 2018, to: "Present", transferReason: "Purchase" }
    ],
    disputes: [
      { year: 2020, type: "Encroachment", status: "Pending", description: "Encroachment dispute with adjacent property under investigation" }
    ],
    documents: [
      { name: "Sale Deed 2018", link: "/docs/gn89_sale2018.pdf", uploadDate: "2018-12-10" },
      { name: "Complaint 2020", link: "/docs/gn89_complaint2020.pdf", uploadDate: "2020-05-15" }
    ],
    coordinates: { latitude: 23.2389, longitude: 72.6656 },
    area: "950",
    unit: "sq meters",
    createdAt: "2018-12-10"
  },
  {
    landId: "ULP123456789016",
    surveyNumber: "GN-12/67",
    village: "Sector-1 Gandhinagar",
    currentOwner: "Sunita Sharma",
    ownershipHistory: [
      { owner: "Manoj Sharma", from: 1995, to: 2012, transferReason: "Purchase" },
      { owner: "Sunita Sharma", from: 2012, to: "Present", transferReason: "Divorce Settlement" }
    ],
    disputes: [],
    documents: [
      { name: "Purchase Deed 1995", link: "/docs/gn12_purchase1995.pdf", uploadDate: "1995-03-18" },
      { name: "Court Order 2012", link: "/docs/gn12_court2012.pdf", uploadDate: "2012-08-30" }
    ],
    coordinates: { latitude: 23.1889, longitude: 72.6189 },
    area: "1100",
    unit: "sq meters",
    createdAt: "2012-08-30"
  }
];

// Function to search land records
export const searchLandRecords = (query: string): LandRecord[] => {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) return dummyLandRecords;

  return dummyLandRecords.filter(
    (record) =>
      record.landId.toLowerCase().includes(lowerQuery) ||
      record.surveyNumber.toLowerCase().includes(lowerQuery) ||
      record.currentOwner.toLowerCase().includes(lowerQuery) ||
      record.village.toLowerCase().includes(lowerQuery)
  );
};
