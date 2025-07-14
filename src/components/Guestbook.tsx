import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";

const messageSchema = z.object({
  name: z.string().min(2, "Nama harus minimal 2 karakter"),
  message: z.string().min(10, "Pesan harus minimal 10 karakter"),
});

type MessageFormData = z.infer<typeof messageSchema>;

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const Guestbook = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  // Fetch messages from database
  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('guestbook_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Gagal memuat pesan. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  // Load messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const onSubmit = async (data: MessageFormData) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('guestbook_messages')
        .insert([{
          name: data.name,
          message: data.message,
        }]);

      if (error) throw error;

      form.reset();
      await fetchMessages(); // Refresh messages
      
      toast({
        title: "Pesan Terkirim! 💕",
        description: "Terima kasih atas ucapan dan doa baik Anda.",
      });
    } catch (error) {
      console.error('Error submitting message:', error);
      toast({
        title: "Error",
        description: "Gagal mengirim pesan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-romantic">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Guestbook
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leave us a message and share in our joy. Your words mean the world to us!
          </p>
        </div>

        {/* Message Form */}
        <Card className="p-8 bg-card/80 backdrop-blur-sm shadow-elegant border-border/50 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Leave a Message</h3>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Your Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter your name"
                        className="border-border/50 focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Your Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Share your wishes, memories, or words of love..."
                        className="border-border/50 focus:border-primary min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                <Heart className="w-4 h-4 mr-2" />
                Add Message
              </Button>
            </form>
          </Form>
        </Card>

        {/* Messages Display */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-semibold text-foreground text-center mb-8">
            Messages from Our Loved Ones
          </h3>
          
          {messages.map((message, index) => (
            <Card 
              key={message.id} 
              className="p-6 bg-card/80 backdrop-blur-sm shadow-soft border-border/50 hover:shadow-elegant transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary-soft p-3 rounded-full flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-foreground">{message.name}</h4>
                    <span className="text-sm text-muted-foreground">
                      {new Date(message.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-foreground leading-relaxed">{message.message}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {messages.length === 0 && (
          <Card className="p-12 text-center bg-card/80 backdrop-blur-sm shadow-soft border-border/50">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              Be the first to leave a message for the happy couple!
            </p>
          </Card>
        )}
      </div>
    </section>
  );
};

export default Guestbook;