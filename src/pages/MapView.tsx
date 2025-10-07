import { Card } from "@/components/ui/card";
import { dummyLandRecords } from "@/data/dummyData";
import { MapPin } from "lucide-react";

const MapView = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Map View</h1>
          <p className="text-muted-foreground">Visualize all land records on an interactive map</p>
        </div>

        <Card className="mb-8 h-96 overflow-hidden">
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="text-center">
              <MapPin className="mx-auto mb-4 h-16 w-16 text-primary" />
              <p className="text-lg font-semibold text-foreground">Interactive Map Integration</p>
              <p className="text-sm text-muted-foreground">
                Map service integration would display all land records here
              </p>
            </div>
          </div>
        </Card>

        {/* Land Records with Coordinates */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground">Registered Locations</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dummyLandRecords
              .filter((record) => record.coordinates)
              .map((record) => (
                <Card key={record.landId} className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{record.surveyNumber}</p>
                      <p className="text-sm text-muted-foreground">{record.village}</p>
                    </div>
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">
                      <strong>Owner:</strong> {record.currentOwner}
                    </p>
                    {record.coordinates && (
                      <>
                        <p className="text-muted-foreground">
                          <strong>Lat:</strong> {record.coordinates.latitude.toFixed(4)}
                        </p>
                        <p className="text-muted-foreground">
                          <strong>Long:</strong> {record.coordinates.longitude.toFixed(4)}
                        </p>
                      </>
                    )}
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
