import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bluetooth, Wifi, Zap, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const MeasurementTool = () => {
  const [connectionStatus, setConnectionStatus] = useState<"disconnected" | "connected">("disconnected");
  const [capturedData, setCapturedData] = useState<any>(null);

  const handleConnect = (method: "bluetooth" | "wifi") => {
    const toastId = toast.loading(`Connecting via ${method}...`);
    
    // Simulate connection
    setTimeout(() => {
      setConnectionStatus("connected");
      toast.dismiss(toastId);
      toast.success(`Connected via ${method}!`);
    }, 1500);
  };

  const handleStartCapture = () => {
    if (connectionStatus !== "connected") {
      toast.error("Please connect device first");
      return;
    }

    const toastId = toast.loading("Capturing field data...");

    // Simulate data capture with dummy data
    setTimeout(() => {
      const dummyData = {
        coordinates: [
          { lat: 23.0225, lng: 72.5714 },
          { lat: 23.0227, lng: 72.5716 },
          { lat: 23.0229, lng: 72.5714 },
          { lat: 23.0227, lng: 72.5712 },
        ],
        area: 1247.35,
        unit: "sq_meters",
        deviceId: "BMB-DEV-2024-001",
        timestamp: new Date().toISOString(),
        witnessCount: 2,
      };

      setCapturedData(dummyData);
      toast.dismiss(toastId);
      toast.success("Data captured successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Field Measurement Integration</h1>
          </div>
          <p className="text-muted-foreground">
            Connect your portable measurement device to capture precise boundary coordinates and site data
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Device Connection Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Device Connection</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Select a method to connect your portable measurement tool.
              </p>

              <div className="space-y-3">
                <Button
                  onClick={() => handleConnect("bluetooth")}
                  variant="outline"
                  className="w-full justify-start h-12"
                  disabled={connectionStatus === "connected"}
                >
                  <Bluetooth className="mr-2 h-4 w-4" />
                  Connect via Bluetooth
                </Button>

                <Button
                  onClick={() => handleConnect("wifi")}
                  variant="outline"
                  className="w-full justify-start h-12"
                  disabled={connectionStatus === "connected"}
                >
                  <Wifi className="mr-2 h-4 w-4" />
                  Connect via Wi-Fi
                </Button>

                <Button
                  onClick={handleStartCapture}
                  className="w-full h-12 bg-primary hover:bg-primary/90"
                  disabled={connectionStatus === "disconnected"}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Start Data Capture
                </Button>
              </div>
            </Card>

            {/* Current Status */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Current Status</h3>
              
              {connectionStatus === "disconnected" ? (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive">Disconnected. Ready to connect.</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Select a connection method above to begin.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">Connected and Ready</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Device is ready to capture field measurements.
                    </p>
                  </div>
                </div>
              )}
            </Card>

            {/* Captured Data Display */}
            {capturedData && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Captured Data</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Area Measured</p>
                    <p className="text-2xl font-bold text-foreground">
                      {capturedData.area.toFixed(2)} m²
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Device ID</p>
                      <p className="font-medium">{capturedData.deviceId}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Witnesses</p>
                      <p className="font-medium">{capturedData.witnessCount}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Boundary Points</p>
                    <p className="text-xs font-mono text-foreground mt-1">
                      {capturedData.coordinates.length} coordinates captured
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Supported Units Section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Supported Land Measurement Units</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              BhumiBandhu supports native regional units for seamless data integration.
            </p>

            <div className="space-y-6">
              {/* North India */}
              <div>
                <h3 className="text-primary font-semibold mb-3">North India</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-foreground">Bigha (Varies)</p>
                    <p className="text-xs text-muted-foreground">≈ 27,000 sq ft (UP)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-foreground">Biswa (Varies)</p>
                    <p className="text-xs text-muted-foreground">Sub-unit of Bigha</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-foreground">Kanal</p>
                    <p className="text-xs text-muted-foreground">5,445 sq ft</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-foreground">Marla</p>
                    <p className="text-xs text-muted-foreground">272.25 sq ft</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-foreground">Gaj</p>
                    <p className="text-xs text-muted-foreground">9 sq ft (1 Square Yard)</p>
                  </div>
                </div>
              </div>

              {/* East India */}
              <div>
                <h3 className="text-primary font-semibold mb-3">East India</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-foreground">Decimal</p>
                    <p className="text-xs text-muted-foreground">435.6 sq ft (1/100th Acre)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-foreground">Katha (Varies)</p>
                    <p className="text-xs text-muted-foreground">≈ 720 to 1,361 sq ft</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-foreground">Chatak</p>
                    <p className="text-xs text-muted-foreground">Smaller unit (West Bengal)</p>
                  </div>
                </div>
              </div>

              {/* West India */}
              <div>
                <h3 className="text-primary font-semibold mb-3">West India</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-foreground">Guntha</p>
                    <p className="text-xs text-muted-foreground">1,089 sq ft</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-foreground">Bigha (Varies)</p>
                    <p className="text-xs text-muted-foreground">Used in Rajasthan/Gujarat</p>
                  </div>
                </div>
              </div>

              {/* South India */}
              <div>
                <h3 className="text-primary font-semibold mb-3">South India</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-foreground">Cent</p>
                    <p className="text-xs text-muted-foreground">435.6 sq ft (1/100th Acre)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-foreground">Ground</p>
                    <p className="text-xs text-muted-foreground">2,400 sq ft</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-foreground">Ankanam</p>
                    <p className="text-xs text-muted-foreground">72 sq ft (Tamil Nadu)</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MeasurementTool;
