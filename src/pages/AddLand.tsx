import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Camera, Upload, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface PastOwner {
  name: string;
  year: string;
  reason: string;
}

const AddLand = () => {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [pastOwners, setPastOwners] = useState<PastOwner[]>([]);
  const [newOwner, setNewOwner] = useState<PastOwner>({ name: "", year: "", reason: "" });

  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          toast.success("Location captured successfully!");
        },
        (error) => {
          toast.error("Failed to capture location. Please enable GPS.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  const addPastOwner = () => {
    if (newOwner.name && newOwner.year) {
      setPastOwners([...pastOwners, newOwner]);
      setNewOwner({ name: "", year: "", reason: "" });
      toast.success("Past owner added!");
    } else {
      toast.error("Please fill in owner name and year");
    }
  };

  const removePastOwner = (index: number) => {
    setPastOwners(pastOwners.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Land record added successfully!");
    // Form submission logic here
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Add Land Record</h1>
          <p className="text-muted-foreground">Enter complete details of your land property</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="p-6">
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Basic Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="landId">Land ID / ULPIN</Label>
                  <Input id="landId" placeholder="ULP123456789012" required />
                </div>
                <div>
                  <Label htmlFor="surveyNumber">Survey Number</Label>
                  <Input id="surveyNumber" placeholder="GN-45/12" required />
                </div>
                <div>
                  <Label htmlFor="village">Village / Area</Label>
                  <Input id="village" placeholder="Sector-5 Gandhinagar" required />
                </div>
                <div>
                  <Label htmlFor="currentOwner">Current Owner Name</Label>
                  <Input id="currentOwner" placeholder="Enter owner name" required />
                </div>
                <div>
                  <Label htmlFor="area">Land Area</Label>
                  <Input id="area" type="number" placeholder="1200" required />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sq_meters">Square Meters</SelectItem>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="bigha">Bigha</SelectItem>
                      <SelectItem value="guntha">Guntha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Geolocation */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Location</h2>
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={captureLocation}
                  className="w-full md:w-auto"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Capture GPS Location
                </Button>
                {coordinates && (
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Latitude:</strong> {coordinates.latitude.toFixed(6)}
                      <br />
                      <strong>Longitude:</strong> {coordinates.longitude.toFixed(6)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Photo Upload */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Site Photos</h2>
              <div className="flex gap-4">
                <Button type="button" variant="outline">
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
                <Button type="button" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </div>
            </div>

            {/* Ownership History */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Past Ownership History</h2>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="pastOwnerName">Owner Name</Label>
                    <Input
                      id="pastOwnerName"
                      placeholder="Previous owner"
                      value={newOwner.name}
                      onChange={(e) => setNewOwner({ ...newOwner, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownershipYear">Year of Ownership</Label>
                    <Input
                      id="ownershipYear"
                      type="number"
                      placeholder="2005"
                      value={newOwner.year}
                      onChange={(e) => setNewOwner({ ...newOwner, year: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="transferReason">Transfer Reason</Label>
                    <Input
                      id="transferReason"
                      placeholder="Inheritance, Sale, etc."
                      value={newOwner.reason}
                      onChange={(e) => setNewOwner({ ...newOwner, reason: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="button" variant="outline" onClick={addPastOwner} className="w-full md:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Past Owner
                </Button>

                {pastOwners.length > 0 && (
                  <div className="space-y-2">
                    {pastOwners.map((owner, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-border bg-muted p-3"
                      >
                        <div>
                          <p className="font-medium text-foreground">{owner.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {owner.year} {owner.reason && `- ${owner.reason}`}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removePastOwner(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Disputes */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Disputes (Optional)</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="disputeStatus">Dispute Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="disputeType">Dispute Type</Label>
                  <Input id="disputeType" placeholder="Boundary, Ownership, etc." />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="disputeDescription">Dispute Description</Label>
                <Textarea
                  id="disputeDescription"
                  placeholder="Describe the dispute details..."
                  rows={3}
                />
              </div>
            </div>

            {/* Documents */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Documents</h2>
              <Button type="button" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Documents
              </Button>
              <p className="mt-2 text-sm text-muted-foreground">
                Upload relevant documents like sale deeds, will, court orders, etc.
              </p>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="submit" size="lg" className="flex-1">
                Submit Land Record
              </Button>
              <Button type="button" variant="outline" size="lg">
                Cancel
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default AddLand;
