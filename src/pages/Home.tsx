import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Database, MapPin, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Database,
      title: "Digital Land Records",
      description: "Securely store and manage all your land documentation in one place"
    },
    {
      icon: Shield,
      title: "Verification System",
      description: "Verify land ownership and history with our comprehensive database"
    },
    {
      icon: MapPin,
      title: "GPS Integration",
      description: "Track exact land coordinates with precise geolocation technology"
    },
    {
      icon: FileCheck,
      title: "Dispute Resolution",
      description: "Access complete history and dispute records for transparency"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
              Your Land. Your Legacy.
              <br />
              <span className="text-accent">Digitally Secured.</span>
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
              BhumiBandhu brings transparency, security, and efficiency to land management
              with cutting-edge digital solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/add-land")}
                className="text-base font-semibold"
              >
                Add Your Land
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/history-disputes")}
                className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Verify Land
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl"></div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-secondary/20 blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Comprehensive Land Management
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to manage, verify, and secure your land records
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group p-6 transition-all hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Ready to digitize your land records?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of landowners who trust BhumiBandhu for secure land management
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/add-land")}
              className="text-base font-semibold"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
