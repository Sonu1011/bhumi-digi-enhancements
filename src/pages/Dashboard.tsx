import { Card } from "@/components/ui/card";
import { useLandRecords } from "@/context/LandRecordsContext";
import { BarChart3, FileText, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

const Dashboard = () => {
  const { landRecords } = useLandRecords();

  // --- GUARD CLAUSE ---
  // This prevents the component from crashing if landRecords is null, undefined, 
  // or hasn't been loaded from the context yet. We also ensure it's an array before proceeding.
  if (!landRecords || !Array.isArray(landRecords)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center p-8 rounded-lg border">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
          <p className="text-lg font-medium text-muted-foreground">
            Loading Land Records...
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            If loading persists, ensure LandRecordsContext is properly initialized.
          </p>
        </div>
      </div>
    );
  }

  // Data calculations are now safe because landRecords is guaranteed to exist and be an array.
  const totalLands = landRecords.length;
  // Ensure 'record.disputes' is treated as an array or defaults to length 0
  const totalDisputes = landRecords.reduce((sum, record) => sum + (record.disputes?.length || 0), 0);
  
  const resolvedDisputes = landRecords.reduce(
    (sum, record) => sum + (record.disputes ? record.disputes.filter(d => d.status === "Resolved").length : 0),
    0
  );
  const pendingDisputes = totalDisputes - resolvedDisputes;

  const stats = [
    {
      icon: FileText,
      label: "Total Land Records",
      value: totalLands,
      color: "text-primary"
    },
    {
      icon: CheckCircle,
      label: "Resolved Disputes",
      value: resolvedDisputes,
      color: "text-green-600"
    },
    {
      icon: AlertCircle,
      label: "Pending Disputes",
      value: pendingDisputes,
      color: "text-amber-600"
    },
    {
      icon: BarChart3,
      label: "Total Disputes",
      value: totalDisputes,
      color: "text-secondary"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your land records and disputes</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`rounded-lg bg-muted p-3 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Records */}
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-foreground">Recent Land Records</h2>
          <div className="space-y-4">
            {/* Using optional chaining and null check for safety */}
            {landRecords.slice(0, 5).map((record) => (
              <div
                key={record.landId}
                className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-foreground">{record.surveyNumber}</p>
                  <p className="text-sm text-muted-foreground">{record.village}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{record.currentOwner}</p>
                  <p className="text-sm text-muted-foreground">
                    {/* Ensure record.disputes exists before accessing length/filter */}
                    {record.disputes?.length > 0 ? (
                      <span className="text-amber-600">
                        {/* Use filter only if record.disputes exists */}
                        {record.disputes.filter(d => d.status === "Pending").length} pending
                      </span>
                    ) : (
                      <span className="text-green-600">No disputes</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
            {landRecords.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No land records have been added yet.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;