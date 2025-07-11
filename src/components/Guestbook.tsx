import { useState } from "react";
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

const messageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type MessageFormData = z.infer<typeof messageSchema>;

interface Message {
  id: number;
  name: string;
  message: string;
  timestamp: string;
}

const Guestbook = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "Emily Johnson",
      message: "Sarah and Michael, your love story is absolutely beautiful! Wishing you a lifetime of happiness and adventures together. Can't wait to celebrate with you! 💕",
      timestamp: "2 days ago"
    },
    {
      id: 2,
      name: "David & Lisa Chen",
      message: "We are so excited to witness your special day! You two are perfect for each other and we couldn't be happier for you both. Here's to forever! 🥂",
      timestamp: "1 week ago"
    },
    {
      id: 3,
      name: "Jessica Williams",
      message: "Congratulations to the most amazing couple! Sarah, you're going to be the most beautiful bride, and Michael, you're one lucky guy! Love you both! ❤️",
      timestamp: "1 week ago"
    }
  ]);

  const { toast } = useToast();

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  const onSubmit = (data: MessageFormData) => {
    const newMessage: Message = {
      id: messages.length + 1,
      name: data.name,
      message: data.message,
      timestamp: "Just now"
    };

    setMessages([newMessage, ...messages]);
    form.reset();
    
    toast({
      title: "Message Added! 💕",
      description: "Thank you for your beautiful words!",
    });
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
                    <span className="text-sm text-muted-foreground">{message.timestamp}</span>
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