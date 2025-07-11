import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Heart, Send } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const rsvpSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  attendance: z.enum(["yes", "no"], {
    required_error: "Please select your attendance",
  }),
  guestCount: z.string().min(1, "Please select number of guests"),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional(),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

const RSVPForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      attendance: undefined,
      guestCount: "",
      dietaryRestrictions: "",
      message: "",
    },
  });

  const onSubmit = (data: RSVPFormData) => {
    console.log("RSVP Data:", data);
    setIsSubmitted(true);
    toast({
      title: "RSVP Submitted Successfully! 💕",
      description: "Thank you for your response. We can't wait to celebrate with you!",
    });
  };

  if (isSubmitted) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-12 bg-gradient-romantic shadow-elegant border-border/50">
            <Heart className="w-16 h-16 text-primary mx-auto mb-6 animate-float" />
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Thank You!
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Your RSVP has been received. We're so excited to celebrate our special day with you!
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Submit Another RSVP
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            RSVP
          </h2>
          <p className="text-lg text-muted-foreground">
            Please let us know if you'll be joining us for our special day
          </p>
        </div>

        <Card className="p-8 bg-card shadow-elegant border-border/50">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter your full name"
                        className="border-border/50 focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Email</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          placeholder="Enter your email"
                          className="border-border/50 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Phone</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="tel"
                          placeholder="Enter your phone number"
                          className="border-border/50 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="attendance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Will you be attending?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-8"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="yes" className="border-primary text-primary" />
                          <Label htmlFor="yes" className="text-foreground">Yes, I'll be there!</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="no" className="border-primary text-primary" />
                          <Label htmlFor="no" className="text-foreground">Sorry, can't make it</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("attendance") === "yes" && (
                <div className="space-y-6 animate-fade-in">
                  <FormField
                    control={form.control}
                    name="guestCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-medium">Number of Guests</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-border/50 focus:border-primary">
                              <SelectValue placeholder="Select number of guests" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 Guest</SelectItem>
                            <SelectItem value="2">2 Guests</SelectItem>
                            <SelectItem value="3">3 Guests</SelectItem>
                            <SelectItem value="4">4 Guests</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dietaryRestrictions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-medium">Dietary Restrictions</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Any dietary restrictions or allergies?"
                            className="border-border/50 focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Message (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Share a message with the happy couple..."
                        className="border-border/50 focus:border-primary min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 text-lg"
                disabled={form.formState.isSubmitting}
              >
                <Send className="w-5 h-5 mr-2" />
                Submit RSVP
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
};

export default RSVPForm;