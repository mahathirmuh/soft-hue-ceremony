import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, Upload, Image, MapPin, Calendar, Heart, Users, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContentManagement = () => {
  const [content, setContent] = useState({
    hero_title: "Our Wedding",
    hero_subtitle: "Join us for our special day",
    wedding_date: "2024-12-25",
    wedding_time: "15:00",
    venue_name: "Beautiful Garden Venue",
    venue_address: "123 Wedding Street, Love City",
    venue_coordinates: "37.7749,-122.4194",
    couple_story: "Our love story begins...",
    gift_account_name: "Wedding Gift Account",
    gift_account_number: "1234567890",
    gift_bank_name: "Love Bank"
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from("website_content")
        .select("*")
        .single();

      if (error && error.code !== "PGRST116") { // Not found error is ok
        throw error;
      }

      if (data) {
        setContent(prevContent => ({ ...prevContent, ...data }));
      }
    } catch (error) {
      console.error("Error loading content:", error);
      toast({
        title: "Error",
        description: "Failed to load website content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      const { error } = await (supabase as any)
        .from("website_content")
        .upsert(content, { onConflict: "id" });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Website content saved successfully",
      });
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Error",
        description: "Failed to save website content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // Here you would implement image upload to Supabase Storage
      // For now, we'll just show a placeholder message
      toast({
        title: "Image Upload",
        description: "Image upload functionality needs to be implemented with Supabase Storage",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Content Management
          </CardTitle>
          <CardDescription>
            Edit website content, images, and venue information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="venue">Venue</TabsTrigger>
              <TabsTrigger value="story">Love Story</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hero_title">Website Title</Label>
                  <Input
                    id="hero_title"
                    value={content.hero_title}
                    onChange={(e) => handleInputChange("hero_title", e.target.value)}
                    placeholder="Our Wedding"
                  />
                </div>
                <div>
                  <Label htmlFor="hero_subtitle">Website Subtitle</Label>
                  <Input
                    id="hero_subtitle"
                    value={content.hero_subtitle}
                    onChange={(e) => handleInputChange("hero_subtitle", e.target.value)}
                    placeholder="Join us for our special day"
                  />
                </div>
                <div>
                  <Label htmlFor="wedding_date">Wedding Date</Label>
                  <Input
                    id="wedding_date"
                    type="date"
                    value={content.wedding_date}
                    onChange={(e) => handleInputChange("wedding_date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="wedding_time">Wedding Time</Label>
                  <Input
                    id="wedding_time"
                    type="time"
                    value={content.wedding_time}
                    onChange={(e) => handleInputChange("wedding_time", e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="venue" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="venue_name">Venue Name</Label>
                  <Input
                    id="venue_name"
                    value={content.venue_name}
                    onChange={(e) => handleInputChange("venue_name", e.target.value)}
                    placeholder="Beautiful Garden Venue"
                  />
                </div>
                <div>
                  <Label htmlFor="venue_address">Venue Address</Label>
                  <Input
                    id="venue_address"
                    value={content.venue_address}
                    onChange={(e) => handleInputChange("venue_address", e.target.value)}
                    placeholder="123 Wedding Street, Love City"
                  />
                </div>
                <div>
                  <Label htmlFor="venue_coordinates">Venue Coordinates (lat,lng)</Label>
                  <Input
                    id="venue_coordinates"
                    value={content.venue_coordinates}
                    onChange={(e) => handleInputChange("venue_coordinates", e.target.value)}
                    placeholder="37.7749,-122.4194"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Used for map integration. Format: latitude,longitude
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Gift Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="gift_account_name">Account Name</Label>
                    <Input
                      id="gift_account_name"
                      value={content.gift_account_name}
                      onChange={(e) => handleInputChange("gift_account_name", e.target.value)}
                      placeholder="Wedding Gift Account"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gift_account_number">Account Number</Label>
                    <Input
                      id="gift_account_number"
                      value={content.gift_account_number}
                      onChange={(e) => handleInputChange("gift_account_number", e.target.value)}
                      placeholder="1234567890"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gift_bank_name">Bank Name</Label>
                    <Input
                      id="gift_bank_name"
                      value={content.gift_bank_name}
                      onChange={(e) => handleInputChange("gift_bank_name", e.target.value)}
                      placeholder="Love Bank"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="story" className="space-y-4">
              <div>
                <Label htmlFor="couple_story">Your Love Story</Label>
                <Textarea
                  id="couple_story"
                  value={content.couple_story}
                  onChange={(e) => handleInputChange("couple_story", e.target.value)}
                  placeholder="Tell your love story..."
                  rows={6}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Share your journey together. This will be displayed in the love story section.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="images" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hero Images</CardTitle>
                    <CardDescription>Main banner images for the website</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Hero Background Image</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload hero background image
                        </p>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "hero")}
                          className="hidden"
                          id="hero-upload"
                        />
                        <Button asChild variant="outline">
                          <label htmlFor="hero-upload" className="cursor-pointer">
                            Choose File
                          </label>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Gallery Images</CardTitle>
                    <CardDescription>Images for the photo gallery</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Gallery Images</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload gallery images
                        </p>
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleImageUpload(e, "gallery")}
                          className="hidden"
                          id="gallery-upload"
                        />
                        <Button asChild variant="outline">
                          <label htmlFor="gallery-upload" className="cursor-pointer">
                            Choose Files
                          </label>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {/* Show current gallery images */}
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Backup & Export</CardTitle>
                  <CardDescription>Download current images and content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Images
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Content
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end pt-6 border-t">
            <Button onClick={saveContent} disabled={saving} className="gap-2">
              {saving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;