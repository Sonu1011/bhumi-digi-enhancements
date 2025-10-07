import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Conversion rates (all to square meters)
const conversionRates: Record<string, { value: number; label: string }> = {
  "sq_meters": { value: 1, label: "Square Meters" },
  "sq_feet": { value: 0.092903, label: "Square Feet" },
  "acres": { value: 4046.86, label: "Acres" },
  "hectares": { value: 10000, label: "Hectares" },
  "bigha_guj": { value: 2508.38, label: "Bigha (Gujarat)" },
  "bigha_raj": { value: 2529, label: "Bigha (Rajasthan)" },
  "bigha_up": { value: 2990, label: "Bigha (UP)" },
  "guntha": { value: 101.17, label: "Guntha" },
};

const MeasurementTool = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputUnit, setInputUnit] = useState<string>("sq_meters");
  const [results, setResults] = useState<Record<string, number>>({});

  const handleConvert = (value: string, fromUnit: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      setResults({});
      return;
    }

    // Convert to square meters first
    const sqMeters = numValue * conversionRates[fromUnit].value;

    // Convert to all other units
    const converted: Record<string, number> = {};
    Object.keys(conversionRates).forEach((unit) => {
      if (unit !== fromUnit) {
        converted[unit] = sqMeters / conversionRates[unit].value;
      }
    });

    setResults(converted);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    handleConvert(value, inputUnit);
  };

  const handleUnitChange = (unit: string) => {
    setInputUnit(unit);
    if (inputValue) {
      handleConvert(inputValue, unit);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Land Measurement Calculator</h1>
          <p className="text-muted-foreground">
            Convert between different land measurement units with state-wise variations
          </p>
        </div>

        {/* Input Card */}
        <Card className="mb-8 p-6">
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Enter Measurement</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="inputValue">Value</Label>
                <Input
                  id="inputValue"
                  type="number"
                  placeholder="Enter value"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="h-12 text-lg"
                  min="0"
                  step="any"
                />
              </div>
              <div>
                <Label htmlFor="inputUnit">Unit</Label>
                <Select value={inputUnit} onValueChange={handleUnitChange}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(conversionRates).map(([key, data]) => (
                      <SelectItem key={key} value={key}>
                        {data.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-lg bg-muted p-4">
            <div className="flex gap-2">
              <Info className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Regional Variations</p>
                <p className="text-xs text-muted-foreground">
                  Bigha measurements vary by state. Gujarat uses 2508.38 m², Rajasthan uses 2529 m²,
                  and Uttar Pradesh uses 2990 m². Select the appropriate variant for accurate
                  conversions.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Results Grid */}
        {Object.keys(results).length > 0 && (
          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground">Conversion Results</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(results).map(([unit, value]) => (
                <Card key={unit} className="group p-4 transition-all hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {conversionRates[unit].label}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {value.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    {unit.includes("bigha") && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">State-specific measurement</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Conversion Table */}
        <Card className="mt-8 p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Reference Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-2 text-left font-medium text-foreground">Unit</th>
                  <th className="pb-2 text-right font-medium text-foreground">In Square Meters</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(conversionRates).map(([key, data]) => (
                  <tr key={key} className="border-b border-border last:border-0">
                    <td className="py-2 text-muted-foreground">{data.label}</td>
                    <td className="py-2 text-right text-foreground">{data.value.toFixed(2)} m²</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MeasurementTool;
