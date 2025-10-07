import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, FileText, Download, AlertCircle, CheckCircle } from "lucide-react";
import { useLandRecords } from "@/context/LandRecordsContext";
import { LandRecord } from "@/types/land";

const HistoryDisputes = () => {
  const { searchRecords } = useLandRecords();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<LandRecord | null>(null);
  const [searchResults, setSearchResults] = useState<LandRecord[]>([]);

  const handleSearch = () => {
    const results = searchRecords(searchQuery);
    setSearchResults(results);
    if (results.length === 1) {
      setSelectedRecord(results[0]);
    }
  };

  // Helper: download a file from a URL with fallback to opening in a new tab
  const downloadFromUrl = async (url: string, filename: string) => {
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (e) {
      // If cross-origin prevents downloading, open in a new tab as a fallback
      window.open(url, "_blank");
    }
  };

  // Download a specific document from the selected record
  const handleDownloadDoc = async (doc: { name: string; link: string }) => {
    const fileNameFromName = doc.name.replace(/\s+/g, "_");
    const ext = doc.link.split(".").pop() || "file";
    await downloadFromUrl(doc.link, `${fileNameFromName}.${ext}`);
  };

  // Download a simple JSON summary of the selected record (placeholder for PDF)
  const handleDownloadRecord = () => {
    if (!selectedRecord) return;
    const summary = {
      landId: selectedRecord.landId,
      surveyNumber: selectedRecord.surveyNumber,
      village: selectedRecord.village,
      currentOwner: selectedRecord.currentOwner,
      area: selectedRecord.area,
      unit: selectedRecord.unit,
      createdAt: selectedRecord.createdAt,
      coordinates: selectedRecord.coordinates,
      ownershipHistory: selectedRecord.ownershipHistory,
      disputes: selectedRecord.disputes,
      documents: selectedRecord.documents,
    };
    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: "application/json" });
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = `${selectedRecord.landId}-record.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">History & Disputes</h1>
          <p className="text-muted-foreground">Search and verify land records with complete history</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-foreground">Verify Land Record</h2>
            <p className="text-sm text-muted-foreground">
              Search by Land ID, Survey Number, or Owner Name
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter Land ID, Survey Number, or Owner Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-12"
              />
            </div>
            <Button onClick={handleSearch} size="lg">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Search Results ({searchResults.length})
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {searchResults.map((record) => (
                <Card
                  key={record.landId}
                  className="cursor-pointer p-4 transition-all hover:shadow-lg"
                  onClick={() => setSelectedRecord(record)}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{record.surveyNumber}</p>
                      <p className="text-sm text-muted-foreground">{record.village}</p>
                    </div>
                    {record.allotmentStatus === 'Pending Verification' ? (
                      <Badge variant="secondary" className="gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Pending Verification
                      </Badge>
                    ) : record.disputes.some((d) => d.status === "Pending") ? (
                      <Badge variant="destructive" className="gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Dispute
                      </Badge>
                    ) : (
                      <Badge variant="default" className="gap-1 bg-green-600">
                        <CheckCircle className="h-3 w-3" />
                        Clear
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm">
                    <strong>Owner:</strong> {record.currentOwner}
                  </p>
                  <p className="text-sm">
                    <strong>ID:</strong> {record.landId}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Selected Record Details */}
        {selectedRecord && (
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {selectedRecord.surveyNumber}
                  </h2>
                  <p className="text-muted-foreground">{selectedRecord.village}</p>
                </div>
                <Button variant="outline" onClick={handleDownloadRecord}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Land ID</p>
                  <p className="font-semibold text-foreground">{selectedRecord.landId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Owner</p>
                  <p className="font-semibold text-foreground">{selectedRecord.currentOwner}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="font-semibold text-foreground">
                    {selectedRecord.area} {selectedRecord.unit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Registered</p>
                  <p className="font-semibold text-foreground">{selectedRecord.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Entered By</p>
                  <p className="font-semibold text-foreground">{selectedRecord.officerName || 'N/A'}</p>
                </div>
              </div>
            </Card>

            {/* Map Location */}
            {selectedRecord.coordinates && (
              <Card className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Location</h3>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm">
                    <strong>Latitude:</strong> {selectedRecord.coordinates.latitude}
                  </p>
                  <p className="text-sm">
                    <strong>Longitude:</strong> {selectedRecord.coordinates.longitude}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Map preview would be displayed here with actual coordinates
                  </p>
                </div>
              </Card>
            )}

            {/* Ownership History */}
            <Card className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-foreground">Ownership History</h3>
              <div className="space-y-4">
                {selectedRecord.ownershipHistory.map((history, index) => (
                  <div key={index} className="flex gap-4 border-l-2 border-primary pl-4">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{history.owner}</p>
                      <p className="text-sm text-muted-foreground">
                        {history.from} - {history.to}
                      </p>
                      {history.transferReason && (
                        <p className="text-sm text-muted-foreground">
                          Reason: {history.transferReason}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Disputes */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <h3 className="text-xl font-semibold text-foreground">Disputes</h3>
              </div>
              {selectedRecord.disputes.length > 0 ? (
                <div className="space-y-4">
                  {selectedRecord.disputes.map((dispute, index) => (
                    <div key={index} className="rounded-lg border border-border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="font-semibold text-foreground">{dispute.type} Dispute</p>
                        <Badge
                          variant={dispute.status === "Resolved" ? "default" : "destructive"}
                          className={dispute.status === "Resolved" ? "bg-green-600" : ""}
                        >
                          {dispute.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Year: {dispute.year}</p>
                      {dispute.description && (
                        <p className="mt-2 text-sm text-foreground">{dispute.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No disputes recorded</p>
              )}
            </Card>

            {/* Documents */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Documents</h3>
              </div>
              <div className="space-y-2">
                {selectedRecord.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      {doc.uploadDate && (
                        <p className="text-sm text-muted-foreground">
                          Uploaded: {doc.uploadDate}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadDoc(doc)}
                    >
                      <Download className="mr-2 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryDisputes;