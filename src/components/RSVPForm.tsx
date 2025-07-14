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
import { supabase } from "@/integrations/supabase/client";

const rsvpSchema = z.object({
  fullName: z.string().min(2, "Nama harus minimal 2 karakter"),
  email: z.string().email("Silakan masukkan email yang valid"),
  phone: z.string().min(10, "Silakan masukkan nomor telepon yang valid"),
  attendance: z.enum(["attending", "not-attending"], {
    required_error: "Silakan pilih kehadiran Anda",
  }),
  guestCount: z.string().min(1, "Silakan pilih jumlah tamu"),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional(),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

const RSVPForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const onSubmit = async (data: RSVPFormData) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('rsvp_responses')
        .insert([{
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          attendance: data.attendance,
          guest_count: parseInt(data.guestCount) || 0,
          dietary_restrictions: data.dietaryRestrictions,
          message: data.message,
        }]);

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "RSVP Berhasil Dikirim! 💕",
        description: "Terima kasih atas respons Anda. Kami tidak sabar untuk merayakan bersama Anda!",
      });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      toast({
        title: "Error",
        description: "Gagal mengirim RSVP. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-12 bg-gradient-romantic shadow-elegant border-border/50">
            <Heart className="w-16 h-16 text-primary mx-auto mb-6 animate-float" />
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Terima Kasih!
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              RSVP Anda telah diterima. Kami sangat senang bisa merayakan hari istimewa kami bersama Anda!
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Kirim RSVP Lain
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
            Silakan beritahu kami apakah Anda akan bergabung dalam hari bahagia kami
          </p>
        </div>

        <Card className="p-8 bg-card shadow-elegant border-border/50 batik-accent">
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
                          <RadioGroupItem value="attending" id="attending" className="border-primary text-primary" />
                          <Label htmlFor="attending" className="text-foreground">Ya, saya akan hadir!</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="not-attending" id="not-attending" className="border-primary text-primary" />
                          <Label htmlFor="not-attending" className="text-foreground">Maaf, tidak bisa hadir</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("attendance") === "attending" && (
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