import { Copy, CreditCard, Check } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BankTransfer = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { toast } = useToast();

  const bankDetails = {
    bankName: "BPD",
    accountNumber: "0132158410",
    accountName: "Cahya Maulida Saputri"
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast({
      description: `${field} copied to clipboard`,
    });
    
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
            Wedding Gift
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, 
            you may transfer to our account below.
          </p>
        </div>

        <Card className="max-w-md mx-auto bg-card/90 backdrop-blur-sm border-border/50 shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif text-primary">Bank Transfer</CardTitle>
            <CardDescription>Transfer details for wedding gift</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Bank Name</p>
                  <p className="font-semibold text-foreground">{bankDetails.bankName}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.bankName, "Bank Name")}
                  className="h-8 w-8 p-0"
                >
                  {copiedField === "Bank Name" ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Account Number</p>
                  <p className="font-semibold text-foreground font-mono">{bankDetails.accountNumber}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.accountNumber, "Account Number")}
                  className="h-8 w-8 p-0"
                >
                  {copiedField === "Account Number" ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Account Name</p>
                  <p className="font-semibold text-foreground">{bankDetails.accountName}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.accountName, "Account Name")}
                  className="h-8 w-8 p-0"
                >
                  {copiedField === "Account Name" ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="pt-4 text-center">
              <p className="text-xs text-muted-foreground italic">
                Thank you for your kindness and generosity
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BankTransfer;