import { Card } from "@/components/ui/card";
import { useLandRecords } from "@/context/LandRecordsContext";
import { BarChart3, FileText, AlertCircle, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const { landRecords } = useLandRecords();
  const totalLands = landRecords.length;
  const totalDisputes = landRecords.reduce((sum, record) => sum + record.disputes.length, 0);
  const resolvedDisputes = landRecords.reduce(
    (sum, record) => sum + record.disputes.filter(d => d.status === "Resolved").length,
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
                    {record.disputes.length > 0 ? (
                      <span className="text-amber-600">
                        {record.disputes.filter(d => d.status === "Pending").length} pending
                      </span>
                    ) : (
                      <span className="text-green-600">No disputes</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
